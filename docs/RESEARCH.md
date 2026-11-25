# Research

Dated findings with sources, newest first. Tags: [Certain] (read in a primary source), [Likely] (consistent across sources, not primary), [Guessing] (inference).

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
