# Security

How this repo stops an unattended run from shipping a guarded change, and what to harden next. Ranked: most protection for the least effort first. Ticked items are in the repo; the rest wait for Hugh or a later issue.

## Guarded paths

`index.html`, `og.png`, `_redirects`, `.github/`, `.claude/`. A change to any of them goes to a pull request titled "NEEDS HUGH: ..." and only Hugh merges it.

## Hardening list

1. [ ] **Branch protection on `main`** (Hugh sets this in repo settings; the fleet never changes settings). Require a pull request, require the `guard` and `check-site` checks to pass, and block force pushes and deletion. Without it the two workflows below report but cannot stop a merge.
2. [x] **Guard workflow** (`.github/workflows/guard.yml`, issue #8). Fails any pull request that changes a guarded path unless the title starts with "NEEDS HUGH:". Renames count on both sides, unusual file names are read intact, and it runs again when the title is edited.
3. [x] **Site check on every pull request** (`.github/workflows/check-site.yml`, issue #8). Runs `tools/check-site` (HTML, accessibility, interaction, links, size budgets) and the guard hook tests.
4. [x] **PreToolUse hook** (`.claude/hooks/block-risky.mjs`, issue #8). Exits 2, so Claude Code refuses the command, on deploys, publishes, database migrations or pushes, pushes to `main` (including `git -C <dir> push`, `--all` and `--mirror`), force pushes, `gh pr merge`, writes to repo contents or refs through `gh api`, and calls to the branch protection or rulesets API. If it cannot read its input it blocks. Tested by `node --test .claude/hooks/block-risky.test.mjs` (53 cases).
5. [x] **Permission deny rules** (`.claude/settings.json`, issue #8). Deny pushing to `main`, force pushes, `gh pr merge`, the branch protection and rulesets API, editing `.claude/` or `.github/`, and reading `.env` files. Bash rules match by prefix, so a reworded command can slip past them; the hook above is the stronger guard for commands.
6. [x] **Actions pinned to a commit** (both workflows) with read only `contents` permission and no saved git credentials, so a moved tag or a step cannot write to the repo.
7. [x] **Secret search every night** (PLAYBOOK, Every night, step 4). A find stops the run: no push, an issue titled "SECURITY: secret found" with the file path only.
8. [ ] **Dependabot alerts** are on (Career-Business STATE, 24 Nov 2026) [VERIFY in repo settings]. Version updates for `tools/check-site` could follow; patch and minor only merge, majors become issues.
9. [ ] **Commit a lockfile for `tools/check-site`** so CI installs the exact tree that was checked. Today the three direct packages are pinned exactly but their dependencies are not.
10. [ ] **This repo holds only public material** (milestone item 5). Private operations notes belong in a private repo [VERIFY with Hugh, decision due Mon 30 Nov].

## Limits

- The hook and deny rules only apply to Claude Code sessions that load this repo's `.claude/settings.json`. Work done through other tools (for example a GitHub connector) is covered only by the workflows and branch protection.
- The Edit and Read deny rules cover Claude Code's file tools only. A shell command (for example `sed -i` on a workflow, or `cat .env`) is not stopped by them.
- The hook cannot tell which branch a bare `git push` goes to, so it does not block one made while on `main`.
- Under `pull_request`, a pull request runs its own copy of `guard.yml`, so a pull request that edits or deletes the guard can pass itself. The guard checks the title, not who wrote it. Branch protection with a required review (item 1) is what keeps the merge in Hugh's hands.
