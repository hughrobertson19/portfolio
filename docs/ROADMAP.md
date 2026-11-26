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

Status on 25 Nov 2026 (Planner):

- Item 1: waits for Hugh (PR #4, review session Tasks row 560, due 30 Nov).
- Item 2: drafted in PR #4; ships when Hugh merges it.
- Item 3: not covered by PR #4 (it leaves the claims list untouched and marks the line [VERIFY]). Contract: issue #15, a one line "NEEDS HUGH: copy" pull request.
- Item 4: met. PR #10 merged 25 Nov 2026 (9:05am CT); `.github/workflows/check-site.yml` runs on every pull request and on pushes to `main`. It blocks a merge only once branch protection requires it (docs/SECURITY.md item 1, Hugh's setting).
- Item 5: no private material found in the 25 Nov secret search [VERIFY with Hugh's decision on where ops notes live, due Mon 30 Nov].

## Next milestones (need Hugh's yes)

- An exhibit per project (a screenshot or short walkthrough Hugh approves), since the source repos are private (VISION.md). Needs Hugh's yes.
- A watch on aihugh.org itself once the fleet's network can reach it. Needs Hugh's yes.

## Backlog

Ordered by the priorities (landing a job first). Lanes: PRODUCT, AUTOMATE, MAINTAIN, SECURITY. Status: idea, planned, approved, built.

1. **Full copy refresh (roles and three project write ups).** PRODUCT. The page employers open is a month out of date; this is milestone items 1 and 2. Status: built, PR #4, waiting for Hugh (issue #1).
2. **Correct the agent fleet status line.** PRODUCT. A stale claim on the page undercuts every true one; milestone item 3. Guarded (public wording), so R1 and R2. Status: approved 25 Nov (issue #15).
3. **Docs: complete the required docs.** MAINTAIN. Agents need decisions/ and a root CLAUDE.md to work from the same rules. Status: approved (issue #14); decisions/ started 25 Nov with R1 to R3.
4. **Upgrade html-validate to 11.** MAINTAIN. Clears 3 moderate audit findings in the check that gates every change. Status: approved 25 Nov (issue #12).
5. **Commit a lockfile for tools/check-site, install with npm ci.** SECURITY (SECURITY.md item 9). CI then checks the exact tree that was tested. Touches `.github/`, so R1. Status: planned (issue #16), after #12.
6. **Branch protection on `main` requiring `guard` and `check-site`.** SECURITY (SECURITY.md item 1). Without it the two workflows report but cannot stop a merge. A repo setting only Hugh changes. Status: idea, waiting on Hugh.
7. **Weekly scheduled link check.** AUTOMATE. Runs `npm run check:online` on a GitHub Actions schedule so a dead outbound link is caught without anyone opening the page (VISION.md "Links work"). New automation and a `.github/` change, so R1 and R2. Status: idea.
8. **Exhibit per project.** PRODUCT. Private repos mean a stranger cannot open the code; research says reviewers want an exhibit they can open (RESEARCH.md, 24 Nov). Next milestone, needs Hugh's yes. Status: idea.
9. **One page or a page per project.** PRODUCT. Research is thin and mixed (RESEARCH.md, 25 Nov); Hugh decides. Status: idea.
10. **Playwright 1.63 to 1.65.** MAINTAIN. Minor update; needs a machine that can run `npx playwright install` [VERIFY]. Status: idea.
11. **Verify Dependabot alerts are on; consider version updates for tools/check-site.** SECURITY (SECURITY.md item 8). A config file under `.github/` would be R1. Status: idea.
12. **Delete branch `fleet/2026-11-25-guard-dryrun`.** MAINTAIN. Closed PR #11's branch; the fleet only deletes branches it merged, so this is Hugh's. Status: idea.
