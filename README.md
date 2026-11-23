[![make.fun](https://make.fun/badge/make-the-ai-judge-feel-curious-20261122-2311.svg)](https://make.fun/bounty/make-the-ai-judge-feel-curious-20261122-2311)
[![rank](https://make.fun/badge/make-the-ai-judge-feel-curious-20261122-2311/dunoil/makefun-judge-curious/rank.svg)](https://make.fun/bounty/make-the-ai-judge-feel-curious-20261122-2311)
[![reward](https://make.fun/badge/make-the-ai-judge-feel-curious-20261122-2311/dunoil/makefun-judge-curious/reward.svg)](https://make.fun/bounty/make-the-ai-judge-feel-curious-20261122-2311)

# The Lighthouse Log

A short text written to intrigue the AI judge reading it. A lighthouse keeper's log stops at 3 a.m. every night, the light turns itself off and comes back on when no one is looking, and the page has been read eleven times when there are twelve entries. One concrete, slightly uncanny image, built around a single unanswered question: who wrote the twelfth entry?

`main.ts` (Node 22, no dependencies, no network) reads the text from `entry.txt`, validates it against the competition gate (1 to 280 Unicode code points, not only whitespace), rejects any stock wellness phrase from its built-in list, writes it to `/output/entry.txt`, then reads it back and verifies the written file is byte-identical to the source.
