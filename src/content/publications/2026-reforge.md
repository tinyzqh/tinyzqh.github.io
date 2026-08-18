---
title: "ReForge: Keeping ABR Algorithms Never Finished with Verified Large Language Model Edits"
authors:
  - { name: "Zhiqiang He", me: true }
  - { name: "Zhi Liu" }
venue: "arXiv preprint"
venueShort: "arXiv"
year: 2026
status: "preprint"
arxiv: "2608.15138"
paperUrl: "https://arxiv.org/abs/2608.15138"
pdf: "https://arxiv.org/pdf/2608.15138"
image: "/images/papers/reforge.jpg"
tags: ["llm", "video-streaming", "continual-learning"]
order: 120
abstract: "An ABR algorithm designed for one network scenario fails on the scenarios that arrive later. ReForge is a continual heuristic learning framework in which an LLM repeatedly proposes one small edit to a single page of fuzzy rules routing decisions among a frozen pool of pre-trained policies, and a replay over every network served so far decides whether the edit lands. Across nine real-world 3G/4G/5G families arriving one at a time, mean QoE rises from 1.23 to 1.74, past the best single policy at 1.66 and to 94% of an oracle."
---

An LLM keeps redesigning the ABR algorithm as new networks arrive, proposing one small
edit at a time to a page of fuzzy routing rules; a replay over every scenario served so
far accepts the edit only if it harms none of them.
