# aihugh.org

Hugh Robertson's portfolio page: what he has built, how he tests AI systems, and how to reach him. It is the page employers open to check his work, so it has to be fast, accessible, current and true.

## How it works

- `index.html` is the whole site: one page, inline CSS and a few lines of JS for the two interactive diagrams. No build step, no framework, no trackers.
- `og.png` is the link preview image (1200 x 630).
- Cloudflare Pages deploys `main` to aihugh.org on every push. Other branches get a preview link from the "Cloudflare Pages" check on the commit.
- `_redirects` keeps repo files (`docs/`, `tools/`, this README) off the live site.

## Checks

Run before any merge:

1. HTML: `npx html-validate index.html` (recommended rules, with `no-redundant-role` off: `role="list"` on the styled list is deliberate, because Safari drops list semantics when `list-style` is none).
2. Accessibility: axe-core in Playwright at 390 and 1280 px, light and dark.
3. Speed: Lighthouse, mobile and desktop.
4. Links: every link opens a public page.

Baseline on 24 Nov 2026: no HTML errors, no axe violations, Lighthouse 100 in every category on mobile and desktop.

## Docs

- [VISION](docs/VISION.md): where the site is going.
- [STATE](docs/STATE.md): what is true now, newest first.
- [PLAYBOOK](docs/PLAYBOOK.md): how agents work here, and what waits for Hugh.
- [RESEARCH](docs/RESEARCH.md): dated findings with sources.

Wording employers read never merges without Hugh: it goes to a pull request titled "NEEDS HUGH: copy".
