# 0002 Nothing a visitor sees goes live without Hugh, and he sees it first (R2)

Status: Accepted
Date: 2026-11-25

## Decision

New features, new automations, and anything a visitor or employer would see never go live without Hugh's say so: they ship to a pull request titled "NEEDS HUGH: go live <what>" (in this repo, wording changes keep the "NEEDS HUGH: copy" title) and stay unmerged until he says yes. Every such pull request shows the change: the Cloudflare Pages preview link from the "Cloudflare Pages" check, before and after screenshots at 390 x 844 and at desktop width (1280), and the site check output. Bug and security fixes that change nothing a visitor sees keep the normal rules (tests pass, a separate reviewer passes, no guard applies), and deploy only in the repo's deploy window (11:00pm to 6:00am Chicago, docs/PLAYBOOK.md) with a home page check after; a fix that visibly changes the page goes through the NEEDS HUGH pull request instead.

## Why

Hugh's goal is accuracy and only a few messages to act on each day; seeing the change in the pull request lets him decide in one look. Holds at least through 31 Dec 2026.

## Source

Hugh, Today chat, 25 Nov 2026 (8:37pm to 9:33pm ET), as recorded in the Planner scheduled task ("Hugh's overnight rulings", R2).
