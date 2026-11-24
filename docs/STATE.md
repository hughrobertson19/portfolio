# State

What is true now. Newest entry first. Every claim traces to code, a check run tonight, GitHub, or the Career-Business STATE; otherwise it says [VERIFY].

## 2026-11-24 (fleet portfolio, night run)

- **Maintained.** Created the four docs (VISION, STATE, PLAYBOOK, RESEARCH) and a README from the repo and the Career-Business STATE (Project rules, External-claim guardrails, Changelog). Folded issue #2 (Hugh's UX and game design strength) into VISION. No dependencies, so nothing to update. Secret search over the full history (three files: `index.html`, `og.png`, `.gitignore`): nothing found.
- **Checks at start.** html-validate: 3 errors (lowercase doctype, `aria-label` on a list with no role, a `div` with `role="region"`). axe: no `main` landmark, and the hero outside any landmark, at 390 and 1280 px in light and dark. Lighthouse 100 in all four categories on mobile and desktop (LCP 0.8 s mobile). Links: both public repos and the `lib/quotable_span/` folder exist.
- **Fixed.** Content wrapped in `main`; the detail panel is a labelled `section`; the moves list has `role="list"`; canonical link added; `_redirects` keeps `docs/`, `tools/` and the README off the live site. After: no HTML errors, no axe violations. No visible wording changed.

## Current facts

- One static page (`index.html`, about 19 KB) and `og.png`, deployed by Cloudflare Pages from `main` (check run "Cloudflare Pages" on commit 924e382, 20 Oct 2026).
- Last content change before tonight: 20 Oct 2026 ("wall and evaluator readable without clicking").
- The page shows the Shayke evaluation story, SwipeBy, and background. It does not yet show the guest page pilot, Funding Radar or the Chicago Swans app (issue #1).
- The fleet reaches GitHub through the Composio connector only; it cannot open aihugh.org directly.
