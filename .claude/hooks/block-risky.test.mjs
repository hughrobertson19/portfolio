// Run from the repo root: node --test .claude/hooks/block-risky.test.mjs
// Feeds the hook the same JSON Claude Code sends and checks the exit code: 2 blocks, 0 allows.
import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const hook = fileURLToPath(new URL("./block-risky.mjs", import.meta.url));

function run(input) {
  const r = spawnSync(process.execPath, [hook], { input, encoding: "utf8", timeout: 10_000 });
  return { code: r.status, stderr: r.stderr };
}
const bash = (command) => JSON.stringify({ tool_name: "Bash", tool_input: { command } });

const blocked = [
  "npx wrangler pages deploy .",
  "wrangler deploy",
  "vercel --prod",
  "npm publish",
  "gh release create v1.0.0",
  "supabase db push",
  "npx prisma migrate deploy",
  "npx drizzle-kit push",
  "git push origin main",
  "git push origin HEAD:main",
  "git push -u origin master",
  "git push --force origin fleet/2026-11-25-x",
  "git push -f origin fleet/2026-11-25-x",
  "git push --force-with-lease",
  "git push origin +fleet/2026-11-25-x",
  "gh api -X PUT repos/o/r/branches/main/protection",
  "gh api repos/o/r/rulesets",
  "cd tools/check-site && npm publish",
  "npm pub",
  "pnpm -r publish",
  "npx wrangler@3 pages deploy .",
  "npx wrangler --cwd . pages deploy",
  "vercel",
  "git -C /home/claude/portfolio push origin main",
  "git -c x=y push origin main",
  'git push origin "main"',
  "git push origin 'main'",
  'bash -c "git push origin main"',
  "git push --all origin",
  "git push --mirror",
  "gh pr merge 12 --squash",
  "gh api --method PUT repos/o/r/contents/index.html -f message=x",
  "gh api -X PATCH /repos/o/r/git/refs/heads/main -f sha=abc",
  "curl -X PUT https://api.github.com/repos/o/r/branches/main/protection",
  "gh api graphql -f query='mutation { createBranchProtectionRule(input: {}) { clientMutationId } }'",
];

const allowed = [
  "npm run check",
  "cd tools/check-site && npm install",
  "git push -u origin fleet/2026-11-25-guard-files",
  "git push origin fleet/2026-11-25-maintain",
  "git push origin fleet/2026-11-25-main-fix",
  "git status",
  "git log --oneline main",
  "node --test .claude/hooks",
  "cat vercel.json",
  "gh pr list",
  "grep -r vercel .",
  "npx wrangler pages deployment list",
  "git -C /home/claude/portfolio push -u origin fleet/2026-11-25-guard-files",
  "gh api repos/o/r/contents/index.html",
  "npx playwright install --with-deps chromium",
  "npm ci",
];

for (const command of blocked) {
  test(`blocks: ${command}`, () => {
    const r = run(bash(command));
    assert.equal(r.code, 2, r.stderr);
    assert.match(r.stderr, /Guard hook/);
  });
}

for (const command of allowed) {
  test(`allows: ${command}`, () => {
    assert.equal(run(bash(command)).code, 0);
  });
}

test("allows a tool call with no command", () => {
  assert.equal(run(JSON.stringify({ tool_name: "Read", tool_input: { file_path: "README.md" } })).code, 0);
});

test("blocks when the input cannot be read", () => {
  assert.equal(run("not json").code, 2);
});
