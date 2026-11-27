# Research

Dated findings with sources, newest first. Tags: [Certain] (read in a primary source), [Likely] (consistent across sources, not primary), [Guessing] (inference).

## 2026-11-27: How do we keep repo files off aihugh.org on Cloudflare Pages?

Question from PLAYBOOK "The site" (the `_redirects` note was tagged [Likely; check after each deploy]) and issue #20. Four sources, about 15 minutes, plus a direct check of the live site.

- **Repo files outside the `_redirects` rules are served today.** On 27 Nov 2026 at about 2:10am CT, `https://aihugh.org/CLAUDE.md`, `/.gitignore`, `/.github/workflows/check-site.yml` and `/.claude/settings.json` all returned 200 with the raw file; `/docs/STATE.md` and `/tools/check-site/package.json` returned 302 to the home page. [Certain: fetched tonight] The repo is public, so nothing secret is exposed, but agent files sit on the domain employers open.
- **A redirect wins over a file at the same path.** Cloudflare's docs: "Redirects are always followed, regardless of whether or not an asset matches the incoming request." Limits are 2,000 static and 100 dynamic rules; allowed codes are 301, 302, 303, 307, 308 and 200 proxying, default 302; one splat per rule. [Certain: Cloudflare docs] https://developers.cloudflare.com/pages/configuration/redirects/
- **Pages publishes the build output directory, and there is no ignore file.** With no framework the build command is left blank; the build output directory is "where your application's content lives", and it can be a subfolder. The official pages read list no `.cfignore` or exclude list. [Likely: Cloudflare docs; the subfolder point is inferred from the presets] https://developers.cloudflare.com/pages/configuration/build-configuration/ and https://developers.cloudflare.com/pages/framework-guides/deploy-anything
- **One practitioner found a deployed `.claude/settings.json` stayed reachable, and says removed files can stay reachable for up to a week.** [Guessing: personal blog, Dec 2025, not checked against Cloudflare's docs] https://jmasson-net.pages.dev/posts/2025-12-excluding-files-from-cloudflare-pages

**What it means here.** Two fixes, both Hugh's: (1) the quick one, issue #20 widened to add `_redirects` rules for `/CLAUDE.md`, `/.gitignore`, `/.github/*` and `/.claude/*`, plus a check that every tracked top level path is covered; (2) the lasting one, move the page files into one folder (for example `site/`) and set that as the build output directory in the Cloudflare Pages project, so only the page is published whatever the repo grows to [Likely]. Option 2 changes a Cloudflare setting and guarded paths, so it is a proposal for Hugh, never a fleet build.

**PLAYBOOK change:** "The site" now records which paths are served (checked tonight) and that a redirect beats a file; the after deploy check now includes the repo file paths.

## 2026-11-26 (folded 27 Nov from issue #24): The page gives employers no LinkedIn or resume link

Filed by the night shift as research only. The live page and the PR #4 draft both end with only an email link and a GitHub link [Certain: index.html on main, read 27 Nov].

- 64% of employers say they have viewed a job seeker's professional network profile (such as LinkedIn) before hiring. Robert Walters, 14 Dec 2022; sample size not stated. [Likely] https://www.robertwalters.co.uk/insights/career-advice/blog/64-percent-of-employers-view-candidate-professional-social-network-profiles-before-hiring.html
- "86% of employers will visit your portfolio website if you include the link", and the portfolio, resume and LinkedIn should point at each other. Attributed to FlexJobs with no date, on an affiliate page (Feb 2026). [Guessing] https://blog.theinterviewguys.com/do-you-need-a-portfolio-website/

**What it means here.** A LinkedIn link and a resume link next to email and GitHub is public wording, so it goes through a "NEEDS HUGH: copy" pull request, ideally in the PR #4 review (proposal issue #25). A resume linked from a public page should carry no phone number or home address [Guessing]. The LinkedIn URL and which resume file are not in any doc read [VERIFY with Hugh].

**PLAYBOOK change:** none.

## 2026-11-26: What exhibit works when the code is private?

Question from VISION.md next steps ("an exhibit per project ... since the code is private"). Five sources (one read through a summary), about 15 minutes. None cites a study or outcome data.

- **A written account beats screenshots for work you cannot show.** A recruitment firm's guide favours describing the problem, the method, the stack and how it was tested over product screenshots for confidential engineering work. [Likely: recruiter guide, 2026; read through a summary, not quoted] https://www.randstad.com.au/career-advice/career-tips/how-to-showcase-engineering-project-works-under-nda/
- **Interviewers expect limits and probe the reasoning.** Developers interviewed by an editorial site say hiring managers "are rarely expecting a production org walkthrough" and that "the artifact proves nothing" on its own; explaining trade offs and constraints is what counts. [Likely: editorial, Salesforce developers, undated] https://www.salesforceben.com/salesforce-developers-cant-show-their-best-work-so-how-do-they-get-hired/
- **A short demo, if any.** One vendor says "Length: 60 to 120 seconds" and "Three minutes is the hard ceiling", paired with a written breakdown. Another says project videos "should be 60-90 seconds each", but that for highly technical roles a talking video "isn't going to impress anyone": show dashboards, code samples and documentation instead. [Guessing: two vendor blogs, Jul and Jan 2026, no data] https://slategit.com/blog/video-walkthroughs-for-portfolio-projects and https://eportfolio-c0z.pages.dev/blog/2026-01-23-video-portfolios-when-they-work-and-when-they-dont
- **Reviewers rarely run anything.** "They rarely clone and run anything"; "Visual proof that it runs beats any paragraph." [Guessing: practitioner post, undated, about public repos] https://dev.to/pickuma/how-to-build-a-portfolio-project-that-survives-a-2026-recruiter-screen-49kp

**What it means here.** For the three private projects, the cheapest strong exhibit is the write up itself (problem, one decision and its trade off, how it was tested), which PR #4 already drafts, plus one screenshot of the thing running, cleared by Hugh for client and guest data [Guessing]. A narrated demo of 60 to 120 seconds is optional and lower value for engineer titled roles [Guessing]. Any screenshot or video goes through Hugh (PLAYBOOK project write up format, "Exhibit"; VISION next step 3; decision 0007).

**PLAYBOOK change:** none; the sources disagree on video and none has data.

## 2026-11-25: One page, or a page per project?

Question from VISION.md open questions. Two of three sources loaded, about 10 minutes.

- **For engineering portfolios there is little data.** The only engineering source found is a vendor blog: a one page portfolio "makes a depth claim", a multi project site "makes a range claim", and with "three or more projects that are each finished, documented" a multi project layout "usually serves you better". Its reading times (two to three minutes on one story, 15 to 30 seconds per project title) cite no study. [Guessing: vendor blog selling portfolio sites, 27 Jun 2026] https://slategit.com/blog/one-pager-vs-multi-project-developer-portfolio
- **Reviewers skim, so the summary goes first.** A survey of 100+ design reviewers: "80% of recruiters say they spend 3 minutes or less" on a portfolio, while most design managers spend 5 to 10 minutes. Its advice: "have the summary at the top for the recruiter and then to link off to the full case study" for the manager. [Likely for design roles; Guessing that it carries over to forward deployed roles; undated, about 2020] https://uxdesign.cc/ever-wonder-how-recruiters-look-at-your-design-portfolio-cc8dd1ecb698
- A Blind thread on whether managers read long case studies did not load.

**What it means here.** Hugh now has five pieces of work for the page (Shayke evaluation, SwipeBy, and the three in PR #4). The sources differ: the survey favours a short summary on top for a reader who skims, and the vendor blog favours separate pages once three or more projects are finished and documented. A middle path is one page of short summaries that scans in under three minutes, linking to a fuller page per project once that page exists [Guessing]. PR #4's short write ups fit the first half. The choice stays Hugh's (VISION.md).

**PLAYBOOK change:** none; the finding is not clear enough.

## 2026-11-24: What do hiring managers for forward deployed and applied AI roles look for first in a portfolio?

Question from VISION.md open questions. Three sources read, about 15 minutes.

- **Frame past work by customer outcome, not by what was implemented.** A hiring guide for forward deployed engineers names this as its green flag: "I deployed a pipeline that cut a customer's processing from three days to four hours" beats "I built a data pipeline". It also says customer empathy and comfort with ambiguity are the hardest things to screen for. [Likely: one recruiter firm's guide, Sep 2026] https://www.paraform.com/insights/how-to-hire-a-forward-deployed-engineer
- **Two or three finished systems up front, each with an exhibit a stranger can open.** Reviewers look for verifiable evidence (repo, merged pull request, write up), a short note on trade offs, failures and cost, and a project a reviewer can understand without asking the author. [Likely: careers site guide, 2 Nov 2026, general software roles] https://underdog.io/blog/software-engineer-portfolio
- **Show the reasoning behind decisions.** A cold read scans for "reasoned design decisions under real constraints": problem, process, decisions (including rejected options and why), outcomes with how they were measured; keep each case study short. [Likely for design and UX roles; Guessing that it carries over to forward deployed roles] https://mentorcruise.com/blog/how-to-write-a-ux-case-study-that-passes-the-hiring-managers-cold-read/

**What it means here.** Each project write up should lead with who it was for and what changed for them, then what was built and one decision with its trade off. Hugh's three new projects sit in private repos, so the "exhibit" cannot be a code link; a screenshot or a short recorded walkthrough Hugh approves is the likely substitute [Guessing]. Where no result is on record, the write up says the status plainly (live, pilot, not launched) instead of inventing an outcome.

**PLAYBOOK change:** project write up format added (Problem, For whom, What was built, One decision, Result on record or status, Exhibit).
