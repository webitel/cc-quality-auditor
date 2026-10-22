---
title: "make-release.yml: keep version scripting simple and commented"
author: Roman
date: 2026-10-22
standing: true
id: l-2157f98f
scope: repo
status: active
touches:
  - ".github/workflows/make-release.yml"
---

## Decided
In `.github/workflows/make-release.yml`, the "Set version variables" and "Bump version in main" steps must stay readable. Avoid dense inline `node -e` one-liners and unexplained `cut`/`tr` parsing of a comma-separated input. Prefer the simpler earlier form, and add a comment explaining the input format (`version,nextVersion`).
Example: in PR #122, the next-version bump used a long inline `node -e` JSON rewrite and the reviewer asked to go back to the earlier, simpler step.

_From review on #122 here, merged Apr 27._
