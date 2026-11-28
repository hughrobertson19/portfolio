# CLAUDE.md

aihugh.org: Hugh Robertson's one page portfolio, the page employers open to check his work. This repo is PUBLIC.

## Read first, in this order

- [docs/VISION.md](docs/VISION.md): where the site is going and what it must never do. Check any change against it.
- [docs/ROADMAP.md](docs/ROADMAP.md): the current milestone and backlog. Build only what it and [0012](docs/decisions/0012-what-the-fleet-builds.md) allow.
- [docs/STATE.md](docs/STATE.md): what is true now, newest first. Start from the top entry; add a new top entry at the end of every run.
- [docs/PLAYBOOK.md](docs/PLAYBOOK.md): how agents work here, night by night, and the copy rules for drafts.
- [docs/RESEARCH.md](docs/RESEARCH.md): dated findings with sources. Add to it; change PLAYBOOK only when a finding is clear.
- [docs/SECURITY.md](docs/SECURITY.md): guarded paths and the ranked hardening list.
- [docs/decisions/](docs/decisions/): accepted decisions. They bind every agent; one rule per record.

## Show the site check passing

```
cd tools/check-site
npm install
npx playwright install chromium   # once per machine
npm run check        # must end "All 10 checks passed."
```

Paste the raw output into every pull request. `SITE_DIR=<folder>` checks another copy of the page.

## Guarded paths

`index.html`, `og.png`, `_redirects`, `.github/`, `.claude/`, and any wording employers read. A change to any of them goes to a pull request titled "NEEDS HUGH: ..." and is never merged by an agent.

## Ship rule

- R1, guarded builds: [0001](docs/decisions/0001-guarded-builds.md). At most one guarded item a night, to an unmerged NEEDS HUGH pull request.
- R2, go live and visual review: [0002](docs/decisions/0002-go-live-and-visual-review.md). Nothing a visitor sees goes live without Hugh; show the preview link and screenshots at 390 and 1280.
- R3, credits low: [0003](docs/decisions/0003-credits-low.md).
- Copy: [0004](docs/decisions/0004-copy-needs-hugh.md). Claims: [0005](docs/decisions/0005-claims-trace-to-sources.md), [0006](docs/decisions/0006-shayke-wording.md), [0008](docs/decisions/0008-former-employers.md).
- Public material only: [0007](docs/decisions/0007-public-material-only.md). Site shape: [0009](docs/decisions/0009-one-static-page.md). Deploy window: [0010](docs/decisions/0010-deploy-window.md). Style: [0011](docs/decisions/0011-public-text-style.md).

A fix that changes nothing a visitor sees merges only when the site check passes 10 of 10, a separate reviewer says PASS and no guard applies.

## Never

- Push to `main` directly, force push, rewrite history, or change repo settings, secrets or visibility.
- Send a message to anyone.
- Commit secrets, client data, staff names, guest data or private repo internals.
