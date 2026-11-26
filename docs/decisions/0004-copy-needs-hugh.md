# 0004 Wording employers read ships only through a "NEEDS HUGH: copy" pull request

Status: Accepted
Date: 2026-11-23

## Decision

Any change to wording a visitor or employer reads on aihugh.org (claims, titles, roles, project write ups, the meta description and link preview text) goes to a pull request titled "NEEDS HUGH: copy" that lists every claim against its source. The fleet never merges it; Hugh does. Wording about Hugh's UX and game design strength follows the same rule. A screen reader label or alt text change is accessibility, not copy, unless it adds a claim. Fixes to code, links, speed and accessibility follow the normal merge rules (decision 0002).

## Why

The site is public and is where employers check Hugh's work (fleet portfolio scheduled task: "because it is public").

## Source

Hugh, fleet portfolio scheduled task (EXTRA GUARDS, 23 Nov 2026); issue #2 (docs-update, 23 Nov 2026), folded into docs/VISION.md "Never"; docs/PLAYBOOK.md "What merges and what waits for Hugh". Guarded paths and the overnight build rule: [0001](0001-guarded-builds.md).
