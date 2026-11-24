# State

What is true now. Newest entry first. Every claim traces to code, a check run tonight, GitHub, or the Career-Business STATE; otherwise it says [VERIFY].

## 2026-11-24 (fleet portfolio, night run)

- **Maintained (merged, PR #3).** Created the four docs (VISION, STATE, PLAYBOOK, RESEARCH) and a README from the repo and the Career-Business STATE (Project rules, External-claim guardrails, Changelog). Folded issue #2 (Hugh's UX and game design strength) into VISION and closed it. No dependencies, so nothing to update. Secret search over the full history (three files: `index.html`, `og.png`, `.gitignore`): nothing found.
- **Checks at start.** html-validate: 3 errors (lowercase doctype, `aria-label` on a list with no role, a `div` with `role="region"`). axe: no `main` landmark, and the hero outside any landmark, at 390 and 1280 px in light and dark. Lighthouse 100 in all four categories on mobile and desktop (LCP 0.8 s mobile). Links: both public repos and the `lib/quotable_span/` folder exist.
- **Fixed.** Content wrapped in `main`; the detail panel is a labelled `section`; the moves list has `role="list"`; canonical link added; `_redirects` keeps `docs/`, `tools/` and the README off the live site (seen working on the preview). After: no HTML errors, no axe violations, screenshots byte identical. No visible wording changed. Deployed by Cloudflare Pages from main at about 1:50am Chicago time.
- **Built 1, PR #4, not merged (NEEDS HUGH: copy).** Full refresh draft from issue #1: three project write ups (guest page pilot, Funding Radar, Chicago Swans club app), target roles, a Workwalk AI role, every claim listed against its source. The reviewer failed it twice and both rounds were fixed (pilot status and visitor ID wording; the staff contest left off the page). **Waiting for Hugh's review session (Tasks row 560, due 30 Nov).** Story: "The site was a month out of date, so I drafted three short write ups from each project's own docs, with a source for every claim, and left the wording for me to approve."
- **Built 2, PR #6, merged (issue #5).** `tools/check-site`: one command that checks HTML, accessibility at phone and desktop sizes in light and dark, every diagram button, anchors and size budgets. 9 of 9 pass on main and on the PR #4 draft; a broken copy fails 7 and exits 1. Story: "Four manual checks became one command that fails loudly, so every change to the page proves it still works before it ships."
- **Learned.** Hiring guides for forward deployed roles favour work framed by customer outcome, with two or three finished systems up front and an exhibit for each (RESEARCH.md). PLAYBOOK now has a project write up format.
- **Waiting on Hugh.** (1) Review PR #4 and its questions (venue name, the sport, Workwalk on the public site, go-to-market roles, where the section sits). (2) This fleet's scheduled task has no direct GitHub access to this repo; tonight's run worked through the Composio connector. To fix, ask Claude in a new chat to add the repos the fleet needs and recreate the scheduled task there. (3) The lockfile for `tools/check-site` is not committed; the three direct packages are pinned exactly.

## Current facts

- One static page (`index.html`, about 19 KB) and `og.png`, deployed by Cloudflare Pages from `main` (check run "Cloudflare Pages" on each commit; branches get preview links).
- `tools/check-site` is the site check: `npm run check` in that folder.
- The page shows the Shayke evaluation story, SwipeBy, and background. The three newer projects are drafted in PR #4, not live.
- The fleet reaches GitHub through the Composio connector only; it cannot open aihugh.org directly, so the home page check after a deploy uses the web fetch tool.
