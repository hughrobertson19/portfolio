// One command check for aihugh.org. Run from this folder: npm run check
// Checks the page in this repo (or SITE_DIR), never the live site.
// Exit code 0 means every check passed.
import { createServer } from "node:http";
import { readFileSync, statSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, extname, join, normalize, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { HtmlValidate } from "html-validate";
import { chromium } from "playwright";

const require = createRequire(import.meta.url);
const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(process.env.SITE_DIR || join(here, "..", ".."));
const online = process.argv.includes("--online");
const BUDGET = { "index.html": 40_000, "og.png": 100_000 };
const WIDTHS = [390, 1280];
const SCHEMES = ["light", "dark"];
const AXE_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"];
const SETTLE_MS = 600; // longer than the page's 0.15 s colour transitions

const results = [];
const record = (ok, name, detail) => results.push({ ok, name, detail });

// 1. HTML
async function checkHtml() {
  const config = JSON.parse(readFileSync(join(here, ".htmlvalidate.json"), "utf8"));
  const report = await new HtmlValidate(config).validateFile(join(root, "index.html"));
  const msgs = report.results.flatMap((r) => r.messages.map((m) => `${m.line}:${m.column} ${m.ruleId} ${m.message}`));
  record(report.valid, "html", report.valid ? "no errors" : msgs.join("; "));
}

// 2. Size budgets and link preview image
function checkSize() {
  const parts = [];
  let ok = true;
  for (const [file, max] of Object.entries(BUDGET)) {
    const size = statSync(join(root, file)).size;
    if (size > max) ok = false;
    parts.push(`${file} ${size} of ${max} bytes`);
  }
  const png = readFileSync(join(root, "og.png"));
  const w = png.readUInt32BE(16), h = png.readUInt32BE(20);
  if (w !== 1200 || h !== 630) ok = false;
  parts.push(`og.png ${w} x ${h}`);
  record(ok, "size", parts.join(", "));
}

// A tiny static server for the repo root, so the page loads as it does on Cloudflare Pages.
const TYPES = { ".html": "text/html; charset=utf-8", ".png": "image/png", ".css": "text/css", ".js": "text/javascript" };
function serve() {
  const server = createServer((req, res) => {
    let path;
    try {
      path = decodeURIComponent(new URL(req.url, "http://x").pathname);
    } catch {
      res.writeHead(400).end("bad request");
      return;
    }
    const file = normalize(join(root, path === "/" ? "index.html" : path));
    if (!file.startsWith(root + sep) || !existsSync(file) || statSync(file).isDirectory()) {
      res.writeHead(404).end("not found");
      return;
    }
    res.writeHead(200, { "content-type": TYPES[extname(file)] || "application/octet-stream" });
    res.end(readFileSync(file));
  });
  return new Promise((ok) => server.listen(0, "127.0.0.1", () => ok(server)));
}

async function openPage(browser, url, width, scheme) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, colorScheme: scheme });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  await page.goto(url, { waitUntil: "load" });
  await page.addScriptTag({ path: require.resolve("axe-core/axe.min.js") });
  return { page, errors };
}

const runAxe = (page, tags) => page.evaluate(async (t) => {
  const r = await window.axe.run(document, { runOnly: t });
  return r.violations.map((v) => `${v.id} (${v.nodes.length}): ${v.nodes.slice(0, 2).map((n) => n.target.join(" ")).join(", ")}`);
}, tags);

// 3. Accessibility, layout and console at each width and colour scheme
async function checkPages(browser, url) {
  for (const scheme of SCHEMES) {
    for (const width of WIDTHS) {
      const { page, errors } = await openPage(browser, url, width, scheme);
      const violations = await runAxe(page, AXE_TAGS);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      const problems = [...violations];
      if (overflow > 0) problems.push(`horizontal scroll of ${overflow}px`);
      if (errors.length) problems.push(`console: ${errors.join(" | ")}`);
      record(problems.length === 0, `a11y ${width}px ${scheme}`, problems.length ? problems.join("; ") : "no axe violations, no horizontal scroll, no console errors");
      await page.close();
    }
  }
}

// 4. Every interactive button updates its pressed state and, where there is one, the detail panel
async function checkInteraction(browser, url) {
  for (const width of WIDTHS) {
    const { page } = await openPage(browser, url, width, "light");
    const count = await page.locator("[data-group] button[data-text]").count();
    const problems = [];
    for (let i = 0; i < count; i++) {
      const btn = page.locator("[data-group] button[data-text]").nth(i);
      await btn.click();
      await page.waitForTimeout(SETTLE_MS);
      const state = await btn.evaluate((b) => {
        const group = b.closest("[data-group]");
        const others = [...group.querySelectorAll("button[data-text]")].filter((x) => x !== b);
        const panel = group.querySelector(".panel");
        return {
          label: b.innerText.trim().replace(/\s+/g, " ").slice(0, 40),
          pressed: b.getAttribute("aria-pressed") === "true",
          othersOff: others.every((x) => x.getAttribute("aria-pressed") === "false"),
          panelOk: !panel || panel.querySelector("p")?.textContent === b.dataset.text,
        };
      });
      if (!state.pressed || !state.othersOff) problems.push(`"${state.label}" pressed state wrong`);
      if (!state.panelOk) problems.push(`"${state.label}" did not update the panel`);
      const contrast = await runAxe(page, ["color-contrast"]);
      if (contrast.length) problems.push(`after "${state.label}": ${contrast.join("; ")}`);
    }
    if (count === 0) problems.push("no interactive buttons found");
    record(problems.length === 0, `interaction ${width}px`, problems.length ? problems.join("; ") : `${count} buttons, each updates its state and panel, contrast holds`);
    await page.close();
  }
}

// 5. Links: in-page anchors and aria-controls resolve; external links listed, fetched only with --online
async function checkLinks(browser, url) {
  const { page } = await openPage(browser, url, 1280, "light");
  const found = await page.evaluate(() => {
    const ids = new Set([...document.querySelectorAll("[id]")].map((e) => e.id));
    const hrefs = [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href"));
    const controls = [...document.querySelectorAll("[aria-controls]")].map((e) => e.getAttribute("aria-controls"));
    return {
      missing: [...hrefs.filter((h) => h.startsWith("#")).map((h) => h.slice(1)), ...controls].filter((id) => !ids.has(id)),
      external: [...new Set(hrefs.filter((h) => !h.startsWith("#")))],
    };
  });
  await page.close();
  const problems = found.missing.map((id) => `#${id} does not exist`);
  if (online) {
    for (const href of found.external.filter((h) => h.startsWith("http"))) {
      try {
        let r = await fetch(href, { method: "HEAD", redirect: "follow", signal: AbortSignal.timeout(15_000) });
        if (r.status >= 400) r = await fetch(href, { redirect: "follow", signal: AbortSignal.timeout(15_000) });
        if (r.status >= 400) problems.push(`${href} returned ${r.status}`);
      } catch (e) {
        problems.push(`${href} failed: ${e.message}`);
      }
    }
  }
  record(problems.length === 0, "links", problems.length ? problems.join("; ")
    : `in-page anchors ok; ${found.external.length} external ${online ? "checked online" : "listed (use --online to fetch)"}: ${found.external.join(" ")}`);
}

const server = await serve();
const url = `http://127.0.0.1:${server.address().port}/`;
const browser = await chromium.launch();
try {
  await checkHtml();
  checkSize();
  await checkPages(browser, url);
  await checkInteraction(browser, url);
  await checkLinks(browser, url);
} catch (e) {
  record(false, "checker", `could not finish: ${e.message}`);
} finally {
  await browser.close();
  server.close();
}

for (const r of results) console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.name.padEnd(22)} ${r.detail}`);
const failed = results.filter((r) => !r.ok).length;
console.log(failed ? `\n${failed} check(s) failed.` : `\nAll ${results.length} checks passed.`);
process.exit(failed ? 1 : 0);
