# Playbook

How agents work in this repo. Short, and changed only when a finding is clear (see RESEARCH.md).

## The site

- One static page: `index.html` with inline CSS and JS, plus `og.png` (link preview, 1200 x 630). No build step, no framework, no third party scripts.
- **Deploy:** Cloudflare Pages Git integration. A push to `main` deploys aihugh.org; every other branch gets a preview deployment, linked from the "Cloudflare Pages" check on the commit (seen on commit 924e382). Deploy only between 11:00pm and 6:00am Chicago time, then check the home page loads.
- `_redirects` sends `/docs/*`, `/README.md` and `/tools/*` back to the home page, so repo files do not show up as pages on aihugh.org. [Likely; check after each deploy]

## Every night

1. Read VISION, STATE (newest first), this file and RESEARCH.
2. Fold open `docs-update` issues into the right doc, then close each with a one line comment.
3. Run the site check (see README) and fix anything it finds: HTML errors, axe accessibility violations at 390 and 1280 px in light and dark, broken links, Lighthouse below 90.
4. Secret check: search the tree and new commits for keys and tokens. If one is found, stop, push nothing, open "SECURITY: secret found" with the file path only.
5. Up to two builds, each planned first in a `fleet-build` issue with acceptance criteria, on a branch `fleet/<date>-<slug>`.
6. A fresh reviewer (one that did not write the code) answers PASS or FAIL against the criteria, the checks and the guards.

## What merges and what waits for Hugh

- **Merges** (checks pass and reviewer says PASS): code, markup, links, speed, accessibility, docs.
- **Never merges:** any change to wording employers read (claims, titles, project write ups, the meta description and link preview text). It goes to a pull request titled "NEEDS HUGH: copy" with every claim listed against its source.
- Changing a screen reader label or alt text is accessibility, not copy, unless it adds a claim.

## Copy rules for drafts

- Only facts in a named source: the docs of the source repo, the Career-Business STATE (Project rules, External-claim guardrails, Changelog), or this repo's code. Otherwise [VERIFY].
- Keep "learned" and "built" apart. Shayke is "an applied learning project" with no customers. Never "Founder".
- No private repo details or links, client data, client staff names, guest data, venue names Hugh has not cleared, or criticism of any former employer.
- **Project write up format** (24 Nov 2026, RESEARCH.md): Problem; For whom; What was built; One decision and its trade off; Result on record, or the plain status if there is none; Exhibit (a public link, or a screenshot or walkthrough Hugh approves). Lead with who it was for and what changed for them. Keep each one short.
- Public text: US English, no em or en dashes, no hyphens as punctuation.

## Access notes

- The fleet's scheduled task has no direct git push for this repo; GitHub work goes through the Composio GitHub connector (issues, branches, commits, pull requests, merges). Never force push.
- The fleet's network cannot open aihugh.org directly; the home page check after a deploy uses the web fetch tool.
- axe can report a false contrast failure if it runs during a 0.15 s colour transition; wait 600 ms after a click before checking.
