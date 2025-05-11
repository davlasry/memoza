**Product Requirements Document (PRD)**

**Project Name:** Memoza

**Last Updated:** 2025-05-11

---

## 1. Overview

**Memoza** is a productivity tool for developers that automatically generates concise summaries of their recent work activity, such as commits, pull requests, and ticket updates. It is designed to help with daily standup meetings, bi-annual performance reviews, and personal reflection. Memoza aims to reduce the friction of remembering and reporting what was worked on, by integrating directly with tools like GitHub (initially), and later expanding to Jira, GitLab, and others.

---

## 2. Problem Statement

Developers often struggle to recall exactly what they worked on during a given day or week, especially under pressure during standups or feedback cycles. While ticketing systems and git history exist, they often require manual review and filtering. This leads to:

* Time wasted on prep for meetings
* Incomplete or vague standup updates
* Lost opportunity to reflect on and document contributions

---

## 3. Target Audience

* Full-time software engineers working in teams
* Tech leads and managers who need visibility into team contributions
* Individuals preparing for performance reviews or retrospectives

---

## 4. Goals

* Automatically summarize recent dev activity into readable bullet points
* Support filtering by time range (e.g. yesterday, last 7 days, last semester)
* Provide exportable summaries for sharing or documentation
* Keep the product lightweight, non-invasive, and easy to integrate

---

## 5. Features (MVP)

### Core Features:

* GitHub OAuth login
* Sync GitHub activity (commits, PRs, comments)
* Daily summary view (default: yesterday)
* Weekly/semester summary view
* Smart grouping of similar activities
* Bullet point generation with natural language summaries

### Optional/Near-Future Features:

* Manual note additions
* AI-powered summarization improvements
* Standup mode (3-part update: what you did, doing, blocked on)
* Export (Markdown / Email / Slack)
* Jira integration

---

## 6. Technical Requirements

* Web-based frontend (React, Next.js or similar)
* Backend API (Node.js/Express or similar)
* GitHub OAuth & API integration
* Basic AI summarization (OpenAI API or custom rules)
* Database for storing user settings & cached summaries

---

## 7. Success Metrics

* % of users returning weekly
* Avg. time to prepare a standup reduced
* Weekly active users (WAU)
* # of summaries exported/shared
* User satisfaction score (via onboarding survey or feedback tool)

---

## 8. Milestones

* Week 1: Landing page + waitlist
* Week 2–3: GitHub OAuth + GitHub data fetcher
* Week 4: Basic bullet summarization and daily view
* Week 5–6: UX polish + beta testers
* Week 7: Public beta + feedback collection

---

## 9. Risks & Assumptions

* Devs may feel uncomfortable giving OAuth access to their GitHub data
* Teams may prefer built-in Jira/GitHub reports over external tools
* Quality of auto-summaries must be high to earn user trust

---

## 10. Future Opportunities

* Expand integrations: GitLab, Bitbucket, Jira, Linear
* Team-wide dashboards and insights
* AI coaching for review cycles
* Browser extension for journaling or note-taking

---

## 11. Appendix

* Competitor: GitDailies, Linear Insights, Jira summaries
* Project repo: (to be added)
* Slack community: (to be created)
