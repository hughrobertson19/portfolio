# 0009 One static page, checked before every merge

Status: Accepted
Date: 2026-11-24

## Decision

The site stays one static page (`index.html` with inline CSS and JS, plus `og.png`): no build step, no framework, no third party scripts, no trackers. Every change passes the one command site check (`npm run check` in `tools/check-site`, 9 of 9) before it merges: valid HTML, no axe violations at 390 and 1280 px in light and dark, every diagram button works, every anchor resolves, and size budgets hold. Lighthouse scored 100 on mobile and desktop at the 24 Nov 2026 baseline, which is the goal (docs/VISION.md); a score below 90 is a fault to fix that night (docs/PLAYBOOK.md, Every night, step 3).

## Why

Hugh wants the page fast, working and current before he applies anywhere (fleet portfolio scheduled task, PRIORITY, 23 Nov 2026; docs/VISION.md "Why it exists").

## Source

Hugh, fleet portfolio scheduled task (PRIORITY: fast, working and current, 23 Nov 2026); docs/VISION.md "Fast and accessible"; README "Checks"; issue #5 (site check, merged in PR #6).
