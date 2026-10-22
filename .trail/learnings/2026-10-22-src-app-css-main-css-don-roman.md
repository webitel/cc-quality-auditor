---
title: "src/app/css/main.css: don't wrap ui-sdk import in a @layer"
author: Roman
date: 2026-10-22
standing: true
id: l-f0c06b5c
scope: repo
status: active
touches:
  - src/app/css/main.css
---

## Decided
In `src/app/css/main.css`, keep `@import "@webitel/ui-sdk/src/css/main";` as is. Do not add an `@layer wt-default { ... }` wrapper. The ui-sdk already provides the layering, so the extra layer is not needed.
Example: in PR #189, an `@layer wt-default` block was added to main.css and the reviewer asked to remove it. The wfm app had already dropped it and styles worked fine.

_From review on #189 here, merged Oct 9._
