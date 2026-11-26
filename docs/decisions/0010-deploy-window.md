# 0010 Deploy from main, only between 11:00pm and 6:00am Chicago time

Status: Accepted
Date: 2026-11-23

## Decision

Cloudflare Pages deploys `main` to aihugh.org on every push, and gives every other branch a preview link (the "Cloudflare Pages" check on the commit). The fleet merges to `main`, and so deploys, only between 11:00pm and 6:00am Chicago time, then checks that the home page loads. Outside that window a change waits on its branch. This record is the home of the deploy window; [0002](0002-go-live-and-visual-review.md) applies it to fixes.

## Why

Hugh set this window (fleet portfolio scheduled task, DEPLOY WINDOW). No reason is on record [VERIFY with Hugh].

## Source

Hugh, fleet portfolio scheduled task (DEPLOY WINDOW, 23 Nov 2026); docs/PLAYBOOK.md "The site"; Cloudflare Pages check seen on commit 924e382.
