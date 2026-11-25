#!/usr/bin/env node
// PreToolUse hook for Bash. Exit 2 blocks the command and tells Claude why; exit 0 lets it run.
// Blocks commands an unattended run must never make: deploys, publishes, database migrations
// or pushes, pushes to main, force pushes, merges, writes to the repo through the API, and calls
// to the branch protection or rulesets API.
// Wired in .claude/settings.json. Tested by block-risky.test.mjs (node --test .claude/hooks/block-risky.test.mjs).

// Text between a tool name and its subcommand, within one command (stops at ; & | and newlines).
const ARGS = String.raw`[^;&|\n]*?`;
// "git", then any global options such as -C <dir> or -c key=value, then "push".
const GIT_PUSH = String.raw`\bgit(\s+(-C|-c)\s+\S+|\s+--[a-z-]+(=\S+)?)*\s+push\b`;

const RULES = [
  ["deploy", new RegExp(String.raw`\bwrangler\b${ARGS}\b(deploy|publish)\b|\bvercel\b${ARGS}(\bdeploy\b|\s--prod\b)|(^|[;&|]\s*|\bnpx\s+)vercel\s*($|[;&|])|\bnetlify\b${ARGS}\bdeploy\b|\bfirebase\b${ARGS}\bdeploy\b|\bfly(ctl)?\b${ARGS}\bdeploy\b|\brailway\s+up\b|\bheroku\b${ARGS}\bdeploy\b|\bgcloud\b${ARGS}\bdeploy\b|\baws\s+s3\s+sync\b|\beas\s+(submit|update)\b`)],
  ["publish", new RegExp(String.raw`\b(npm|pnpm|yarn|bun)\b${ARGS}\s(publish|pub)(\s|$)|\bgh\s+release\s+create\b|\btwine\s+upload\b|\bcargo\s+publish\b`)],
  ["database migrate or push", new RegExp(String.raw`\bsupabase\b${ARGS}\b(db\s+(push|reset)|migration\s+up)\b|\bprisma\b${ARGS}\b(migrate\s+(deploy|dev|reset)|db\s+push)\b|\bdrizzle-kit\s+(push|migrate)\b|\bknex\s+migrate\b|\bsequelize\s+db:migrate\b|\balembic\s+upgrade\b|\brails\s+db:migrate\b`)],
  ["push to main", new RegExp(String.raw`${GIT_PUSH}${ARGS}(\s|:|\+|["'])(refs\/heads\/)?(main|master)(["']|\s|$|;|&|\|)|${GIT_PUSH}${ARGS}\s--(all|mirror)\b`)],
  ["force push", new RegExp(String.raw`${GIT_PUSH}${ARGS}(\s--force(-with-lease)?\b|\s-[a-zA-Z]*f[a-zA-Z]*\b|\s["']?\+\S+)`)],
  ["merge", /\bgh\s+pr\s+merge\b/],
  ["write to the repo through the API", new RegExp(String.raw`\bgh\s+api\b(?=${ARGS}(-X|--method)[\s=]*["']?(PUT|POST|PATCH|DELETE)\b)(?=${ARGS}\/(contents|git\/refs|merges)\b)`)],
  ["branch protection or rulesets API", new RegExp(String.raw`\b(gh\s+api|curl)\b${ARGS}(\/branches\/\S*\/protection|\/rulesets\b|(create|update|delete)BranchProtectionRule|(create|update|delete)RepositoryRuleset)`, "i")],
];

function check(command) {
  for (const [name, re] of RULES) {
    if (re.test(command)) return name;
  }
  return null;
}

async function main() {
  let raw = "";
  for await (const chunk of process.stdin) raw += chunk;
  let command;
  try {
    command = JSON.parse(raw)?.tool_input?.command;
  } catch {
    process.stderr.write("Guard hook: could not read the tool input, so the command is blocked.\n");
    process.exit(2);
  }
  if (typeof command !== "string") process.exit(0);
  const hit = check(command);
  if (hit) {
    process.stderr.write(`Guard hook: "${hit}" commands are blocked in this repo. Push a branch and open a pull request titled "NEEDS HUGH: ..." instead.\n`);
    process.exit(2);
  }
  process.exit(0);
}

main();
