# 0001 Guarded builds go to an unmerged NEEDS HUGH pull request (R1)

Status: Accepted
Date: 2026-11-25

## Decision

Guarded work may be built overnight ahead of Hugh's yes, at most one guarded item per repo per night, and only to an unmerged pull request titled "NEEDS HUGH: <what>" with a two sentence plain explanation of what the code does. A fleet never merges it. In this repo the guarded paths are `index.html`, `og.png`, `_redirects`, `.github/` and `.claude/` (docs/SECURITY.md), and any wording employers read is guarded.

## Why

Hugh wants the fleets building every night with as little of his input as possible, while keeping a human in the loop before anything goes live. Building ahead to an unmerged pull request saves a day without giving up the decision.

## Source

Hugh, Today chat, 25 Nov 2026 (8:37pm to 9:33pm ET), as recorded in the Planner scheduled task ("Hugh's overnight rulings", R1). Related: the "NEEDS HUGH: copy" rule in docs/PLAYBOOK.md.
