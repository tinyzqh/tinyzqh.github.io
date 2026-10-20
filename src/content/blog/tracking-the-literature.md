---
title: Four Tools I Use to Keep Up with the Literature
description: Google Scholar citations, a trained Twitter feed, alphaXiv likes, and Connected Papers — how I find the papers worth reading without reading everything.
date: 2026-10-20
tags: [research, tools]
draft: true
---

Reinforcement learning alone puts dozens of new papers on arXiv every day. Finding papers is not the hard part; the hard part is not missing the few that matter, and not drowning in the rest. Over the past few years I have settled on four tools, each answering a different question:

- **Google Scholar** — who has built on a paper I care about?
- **Twitter/X** — what are the people I trust reading right now?
- **alphaXiv** — which new papers is the community actually paying attention to?
- **Connected Papers** — what else looks like this paper?

None of them is clever on its own. What makes them work is using each one for the single thing it does well.

## Google Scholar: follow the citations forward

I don't use Scholar for search; everyone knows how to do that. I use it for the **Cited by** link under a paper.

A paper's reference list tells you where an idea came from. Its *Cited by* list tells you where the idea went: the follow-ups, the fixes, the papers that beat it, and the papers that quietly showed it doesn't hold up. When I find a paper central to my work, the citing papers are usually the most relevant reading I can get.

The raw list is long and sorted by relevance, so I cut it down in two steps:

1. **Filter by year.** In the left sidebar, restrict to recent years (e.g. *Since 2025*, or a custom range). For an active area, citations from the last year or two are where the current state of the art lives.
2. **Scan the citation counts.** Within the filtered list, each entry shows its own *Cited by N*. A recent paper that has already picked up many citations is one the field has noticed, and that is where I start reading.


The same trick works on my own papers: the *Cited by* list is the most direct way to find work that is closest to mine.

**Limitation:** Scholar indexes with a delay and does no curation. Citation counts reward age, so a strong paper from last month will look weak by this measure. That gap is what the next two tools fill.

## Twitter/X: train the feed

On Twitter the value comes from the recommendation algorithm, and the algorithm only learns what you teach it. So I treat the account like a model in training:

- **Follow people, not topics.** Authors whose papers I like, their labs, and researchers who regularly share and comment on new work. One good follow brings in the people *they* interact with.
- **Like and repost the papers I'd actually read.** Every like is a label. After a few weeks of consistent signal, the *For you* tab fills up with new papers from my area, often on the day they appear on arXiv and well before they show up anywhere else.
- **Don't engage with the rest.** Clicking on off-topic posts trains the feed on off-topic posts.


**Limitation:** It takes deliberate effort before the feed becomes useful, and it drifts back toward noise if you stop. It is also an echo chamber by construction: you see what your corner of the field is excited about, not necessarily what is important.

## alphaXiv: let the community vote

[alphaXiv](https://www.alphaxiv.org/) is built on top of arXiv. Readers can like papers and discuss them, and its feed surfaces papers that are drawing attention.

I use it as a filter for the daily flood: instead of reading arXiv listings, I look at **likes**. A paper that many researchers bothered to like in its first few days has passed a cheap but surprisingly effective first round of review. Where Twitter reflects *my* circle, alphaXiv reflects a much broader readership, so the two complement each other.


**Limitation:** Popularity is not quality. Likes favour big labs, catchy titles, and topics already in fashion. A niche paper that is exactly right for my problem may sit at a handful of likes, so I never treat a low count as a reason to skip something I already know is relevant.

## Connected Papers: find the look-alikes

[Connected Papers](https://www.connectedpapers.com/) takes one paper and draws a graph of papers *similar* to it. Similarity is computed from co-citation and bibliographic coupling (two papers are close if they are cited together, or cite the same things), not from direct citation links. Node size shows citation count and colour shows publication year.

I use it for one thing: **finding papers that are very similar to one I already know.** Paste in the paper, look at the nodes clustered tightly around it, and read those. This catches work that Scholar's *Cited by* misses: papers that solve the same problem without citing each other, often because they were written at the same time.


**Limitation:** The graph is only as good as the citation data behind it, so very new papers have too few links to place well. The free tier also limits how many graphs you can build each month.

## Putting it together

Each tool covers a different blind spot:

| Tool | Question it answers | Signal |
|---|---|---|
| Google Scholar | Who built on this paper? | Citations, filtered by year |
| Twitter/X | What is my circle reading? | A feed trained by follows and likes |
| alphaXiv | What is the wider community noticing? | Likes |
| Connected Papers | What else is like this? | Co-citation similarity |

Twitter and alphaXiv bring new papers to me. Scholar and Connected Papers take one paper I already trust and expand outward from it. Between them, the chance that something important passes by unnoticed gets small.

Then comes the part no tool can do for you: actually reading the papers.
