# Roadmap

The plan for aihugh.org. The Planner and Hugh own this file; the fleet builds only from approved-tonight issues or planned issues inside the current milestone below. Next milestones need Hugh's yes before any work starts. Ship rules: [R1 guarded builds](decisions/0001-guarded-builds.md), [R2 go live and visual review](decisions/0002-go-live-and-visual-review.md), [R3 credits low](decisions/0003-credits-low.md).

## Current milestone (confirmed by Hugh, 24 Nov 2026, issue #9)

**Current roles and recent projects live.** Target: Fri 4 Dec 2026.

Done when:

1. Pull request 4 is reviewed by Hugh and merged or replaced.
2. The page lists the current target roles and the recent projects.
3. The line saying the agent fleet is paused is corrected.
4. The site check runs on every pull request.
5. This repository holds only public material.

Status on 27 Nov 2026 (Planner):

- Item 1: waits for Hugh (PR #4, review session Tasks row 560, due Mon 30 Nov).
- Item 2: drafted in PR #4; ships when Hugh merges it.
- Item 3: built, PR #26 "NEEDS HUGH: copy" (issue #15), with three questions for Hugh; waits for his yes (STATE 27 Nov).
- Item 4: met. PR #10 merged 25 Nov 2026; `.github/workflows/check-site.yml` runs on every pull request and on pushes to `main`. It blocks a merge only once branch protection requires it (docs/SECURITY.md item 1, Hugh's setting).
- Item 5: open. On 27 Nov aihugh.org served `/CLAUDE.md`, `/.gitignore` and files under `.github/` and `.claude/` as raw files (issue #20 comment, STATE 27 Nov). Issue #20 is tonight's approved build. Also open: where private ops notes live [VERIFY with Hugh, due Mon 30 Nov].

## Next milestones (need Hugh's yes)

- An exhibit per project (a screenshot or short walkthrough Hugh approves), since the source repos are private (VISION.md). Needs Hugh's yes.
- A watch on aihugh.org itself once the fleet's network can reach it. Needs Hugh's yes.

## Backlog

Ordered by the priorities (landing a job first). Lanes: PRODUCT, AUTOMATE, MAINTAIN, SECURITY. Status: idea, planned, approved, built.

1. **Full copy refresh (roles and three project write ups).** PRODUCT. The page employers open is a month out of date; milestone items 1 and 2. Status: built, PR #4, waiting for Hugh (issue #1).
2. **Correct the agent fleet status line.** PRODUCT. A stale claim on the page undercuts every true one; milestone item 3. Status: built, PR #26, waiting for Hugh (issue #15).
3. **Keep repo files off aihugh.org: redirect `/CLAUDE.md`, `/.gitignore`, `/.github/*` and `/.claude/*`, with a check that every repo file is covered.** SECURITY (SECURITY.md item 10); milestone item 5. Touches `_redirects`, so R1. Status: approved 27 Nov, tonight's one guarded item (issue #20). The lasting alternative, a `site/` folder as the Cloudflare build output directory, is a Cloudflare setting and Hugh's call (RESEARCH.md 27 Nov).
4. **Commit a lockfile for tools/check-site, install with npm ci.** SECURITY (SECURITY.md item 9). CI then checks the exact tree that was tested. Touches `.github/`, so R1. Status: planned (issue #16); next guarded slot after #20.
5. **Branch protection on `main` requiring `guard` and `check-site`.** SECURITY (SECURITY.md item 1). Without it the two workflows report but cannot stop a merge. A repo setting only Hugh changes. Status: idea, waiting on Hugh.
6. **LinkedIn, resume and a short call line in the PR #4 review.** PRODUCT. Recruiters look for a way to reach Hugh (issue #24 folded into RESEARCH.md 27 Nov). Public wording, so Hugh decides in the PR #4 review session. Status: idea (proposal #25).
7. **Weekly draft of project write up updates from the other repos' STATE stories.** AUTOMATE. Stops the page drifting out of date again (VISION.md "Current"). Public wording and a new automation, so R1 and R2, never merged by the fleet. Status: idea, needs Hugh's yes (proposal #23).
8. **Weekly scheduled link check.** AUTOMATE. Runs `npm run check:online` so a dead outbound link is caught without anyone opening the page (VISION.md "Links work"). New automation and a `.github/` change, so R1 and R2. Proposal #23 notes scheduled workflows in public repos switch off after 60 days without activity [Likely]. Status: idea.
9. **Exhibit per project.** PRODUCT. Private repos mean a stranger cannot open the code (RESEARCH.md, 24 and 26 Nov). Next milestone, needs Hugh's yes. Status: idea.
10. **Staff contest board exhibit with made up data.** PRODUCT. A game mechanic shown on the page, so Hugh designs it. Status: idea (proposal #22), with item 9.
11. **One page or a page per project.** PRODUCT. Research is thin and mixed (RESEARCH.md, 25 Nov); Hugh decides. Status: idea.
12. **Playwright 1.63 to 1.65.** MAINTAIN. Minor update; needs a machine that can run `npx playwright install` [VERIFY]. Status: idea.
13. **Verify Dependabot alerts are on; consider version updates for tools/check-site.** SECURITY (SECURITY.md item 8). A config file under `.github/` would be R1. Status: idea.
14. **Delete branches `fleet/2026-11-25-guard-dryrun` and, once PR #26 is decided, `fleet/2026-11-27-pr15-screens`.** MAINTAIN. The fleet only deletes branches it merged, so these are Hugh's. Status: idea.

Built and merged: required docs (PR #18), html-validate 11 (PR #17), html-validate 11.23 (PR #27), site check on every PR (PR #10).
