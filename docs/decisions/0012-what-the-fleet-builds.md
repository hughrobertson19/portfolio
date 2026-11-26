# 0012 The fleet builds only approved or planned work in a confirmed milestone

Status: Accepted
Date: 2026-11-24

## Decision

Each night the fleet builds at most two items, one after the other: the oldest open issue labelled `approved-tonight`, and if none is left, the oldest open `planned` issue inside the current milestone in docs/ROADMAP.md, once Hugh has confirmed that milestone (not marked draft). Any item that touches a guarded path or a guard is built only as [0001](0001-guarded-builds.md) allows: at most one guarded item a night, to an unmerged "NEEDS HUGH:" pull request. The fleet builds against the issue's own acceptance criteria and never writes its own. Milestones after the current one need Hugh's yes before any work starts (docs/ROADMAP.md). With nothing to build, the night is maintenance and research only.

## Why

Hugh decides what gets built and the acceptance criteria it is checked against; the fleet builds it (fleet portfolio scheduled task, step 4: "do not write your own contract").

## Source

Hugh, fleet portfolio scheduled task (step 4, 23 Nov 2026); Career-Business STATE, Changelog 24 Nov 2026 (account audit 2: the fleets read docs/ROADMAP.md and docs/decisions/ and build only from approved-tonight issues or planned issues inside a confirmed milestone), read 26 Nov 2026; issue #9 (milestone confirmed 24 Nov 2026); docs/ROADMAP.md header and "Next milestones"; [0001](0001-guarded-builds.md).
