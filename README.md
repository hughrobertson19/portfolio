# aihugh.org

Hugh Robertson's portfolio page: what he has built, how he tests AI systems, and how to reach him. It is the page employers open to check his work, so it has to be fast, accessible, current and true.

## How it works

- `index.html` is the whole site: one page, inline CSS and a few lines of JS for the two interactive diagrams. No build step, no framework, no trackers.
- `og.png` is the link preview image (1200 x 630).
- Cloudflare Pages deploys `main` to aihugh.org on every push. Other branches get a preview link from the "Cloudflare Pages" check on the commit.
- `_redirects` keeps repo files (`docs/`, `tools/`, this README, `CLAUDE.md`, `.gitignore`, `.github/`, `.claude/`) off the live site; check 6 below fails if a new one is missed.
- `tools/check-site/` is the one command site check (below).

## Checks

One command, run before any merge:

```
cd tools/check-site
npm install
npx playwright install chromium   # once
npm run check                     # or npm run check:online to also fetch external links
```

It checks the page in this repo, never the live site, and prints one PASS or FAIL line per check:

1. HTML: html-validate 11 (upgraded from 9 on 26 Nov 2026, issue #12, to clear three moderate `npm audit` findings in its glob and minimatch dependencies; needs Node 22.22 or later on the 22 line, or 24.8 or later), recommended rules, with `no-redundant-role` off (`role="list"` on the styled list is deliberate, because Safari drops list semantics when `list-style` is none).
2. Size: `index.html` under 40 KB, `og.png` under 100 KB and 1200 x 630.
3. Accessibility: axe-core (WCAG 2.2 AA and best practice) at 390 and 1280 px, light and dark, plus no horizontal scroll and no console errors.
4. Interaction: every diagram button updates its pressed state and the detail panel, and colour contrast holds in every state.
5. Links: every in-page anchor and `aria-controls` target exists; external links are listed, and fetched with `--online`.
6. Repo files: every tracked file other than `index.html`, `og.png` and `_redirects` (dotfiles and dot folders included) is caught by a `_redirects` rule, because Cloudflare Pages publishes the whole repo and a redirect wins over a file at the same path (issue #20).

It prints 10 PASS or FAIL lines and exits 0 only when every check passes. Set `SITE_DIR` to check another copy of the page.

Baseline on 24 Nov 2026: all 9 checks pass, and Lighthouse scores 100 in every category on mobile and desktop.

## Guards

Changes to the public page and the guard files (`index.html`, `og.png`, `_redirects`, `.github/`, `.claude/`) are for Hugh to merge. A workflow fails any pull request that touches them unless it is titled "NEEDS HUGH: ...", the site check runs on every pull request, and a Claude Code hook blocks deploy, publish, migrate, push to main and force push commands. The workflows stop a merge only once branch protection on `main` requires them. Details and the ranked hardening list: [SECURITY](docs/SECURITY.md).

## Docs

- [VISION](docs/VISION.md): where the site is going.
- [STATE](docs/STATE.md): what is true now, newest first.
- [PLAYBOOK](docs/PLAYBOOK.md): how agents work here, and what waits for Hugh.
- [RESEARCH](docs/RESEARCH.md): dated findings with sources.
- [SECURITY](docs/SECURITY.md): guarded paths and the hardening list.
- [ROADMAP](docs/ROADMAP.md): the current milestone and backlog.
- [decisions](docs/decisions/): accepted decisions, one rule per record.
- [CLAUDE.md](CLAUDE.md): the short entry point for agents working in this repo.

Wording employers read never merges without Hugh: it goes to a pull request titled "NEEDS HUGH: copy".
