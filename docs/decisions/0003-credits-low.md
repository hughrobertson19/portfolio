# 0003 When shared API credits run low, this repo does maintenance and security only (R3)

Status: Accepted
Date: 2026-11-25

## Decision

The fleets share a fixed monthly allowance of included API credits; a fleet never buys more and never turns on auto reload. If a run can see that less than 25% of the month's credits remain (from the Console usage page, a usage email, or a STATE.md cost line), this repo builds MAINTAIN and SECURITY items only, and the run says so in its report.

## Why

Other fleets carry nearer term income work and keep building when credits are low; this repo can wait a few days without harm.

## Source

Hugh, Today chat, 25 Nov 2026 (8:37pm to 9:33pm ET), as recorded in the Planner scheduled task ("Hugh's overnight rulings", R3).
