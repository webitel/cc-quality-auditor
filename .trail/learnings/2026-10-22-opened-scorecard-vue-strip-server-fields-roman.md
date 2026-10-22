---
title: "opened-scorecard.vue: strip server fields in the API layer, not the component"
author: Roman
date: 2026-10-22
standing: true
id: l-63dd9b6f
scope: repo
status: active
touches:
  - src/modules/scorecards/components/opened-scorecard.vue
---

## Decided
When building a copy of a scorecard in `opened-scorecard.vue`, do not null out server-managed fields (`id`, `createdAt`, `createdBy`, `updatedAt`, `updatedBy`) by hand in the component. The API layer should sanitize the payload using the zod schema. The create schema does not include those fields, so they are dropped there.
Example: in PR #177, the save-copy code set these fields to `undefined` in `itemInstance`. The reviewer asked to move this into API-level sanitizing.

_From review on #177 here, merged Sep 10._
