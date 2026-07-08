---
name: cut-release
description: Runbook for cutting a release of @sistent/sistent to npm. Use when asked to "cut a release", "release Sistent", "publish a new version", or "ship the next @sistent/sistent". Covers the release-drafter → publish-GitHub-release → npm publish (OIDC provenance) → version-bump-back flow, the workflow_dispatch fallback, preconditions, and verification.
user-invocable: true
---

# Cut a Sistent Release

Publishes a new version of the `@sistent/sistent` npm package. Releasing is **automation-driven**: publishing a GitHub Release (or dispatching the publish workflow) is the trigger — you do **not** run `npm publish` by hand, hand-edit `package.json`'s version, or create a git tag manually. This skill's job is to drive that automation correctly and verify the result.

- **Package:** `@sistent/sistent` (public, scope `@sistent`), published with npm **provenance** via OIDC trusted publishing.
- **Release branch:** `master` (protected — requires PR approval; `github-actions[bot]` is **not** in the bypass list).
- **Workflows:** [`.github/workflows/release-drafter.yml`](../../workflows/release-drafter.yml) drafts notes as PRs merge; [`.github/workflows/release.yml`](../../workflows/release.yml) ("Publish Node.js Package") does the actual `npm publish`; `notify-dependents.yml` updates downstream consumers after a successful publish.

## The release chain (what actually happens)

1. **PRs merge to `master`** → `release-drafter.yml` runs and keeps a **draft GitHub Release** up to date, computing the next version from PR labels (major / minor / patch) and accumulating the changelog.
2. **A maintainer publishes that draft Release** (sets it non-draft). The tag (e.g. `v0.21.31`) is the version source of truth.
3. Publishing emits the `release: published` event → **`release.yml`** runs and, on `master`:
   - Sets `package.json#version` from the tag (`v0.21.31` → `0.21.31`, `npm version --no-git-tag-version --allow-same-version`).
   - `npm ci --legacy-peer-deps` → `npm run build` → `npm publish --provenance --access public`.
   - Opens a **version-bump-back PR** (`release/version-bump/vX.Y.Z`) via `peter-evans/create-pull-request` so `master`'s `package.json` / `package-lock.json` track what was published (a direct push is impossible — `master` is protected and the bot isn't a bypass actor).
4. `notify-dependents.yml` fires on the publish workflow's success and bumps downstream consumers (e.g. meshery, meshery-cloud) to the new version.

## Preconditions (verify before publishing)

- **Everything you want in the release is already merged to `master`.** The release ships `master`'s current state, not any open PR. An unmerged PR (e.g. a fix under review) will **not** be in the release — merge it first.
- **`master` CI is green** on the commit you're releasing.
- The **draft Release** reflects the intended version and changelog. If the version bump is wrong, it's driven by PR labels — fix labels and let release-drafter re-draft, rather than hand-editing the tag.

## Procedure

### Option A — publish the drafted release (normal path)

1. Confirm the draft and its target commit:
   ```bash
   gh release list --repo layer5io/sistent
   gh release view <vX.Y.Z> --repo layer5io/sistent
   ```
2. Publish it (this is the trigger — it starts `npm publish`):
   ```bash
   gh release edit <vX.Y.Z> --repo layer5io/sistent --draft=false --latest
   ```

### Option B — manual dispatch (no draft, or re-run a publish)

`release.yml` also accepts `workflow_dispatch` with a `tag_name` input:
```bash
gh workflow run release.yml --repo layer5io/sistent -f tag_name=<vX.Y.Z>
```
Use this only when you deliberately want to (re)publish a specific version without going through a drafted GitHub Release.

### Verify

1. Watch the publish workflow to success:
   ```bash
   gh run watch --repo layer5io/sistent $(gh run list --repo layer5io/sistent --workflow release.yml --limit 1 --json databaseId --jq '.[0].databaseId')
   ```
2. Confirm the version is live on npm:
   ```bash
   npm view @sistent/sistent version
   ```
3. **Merge the auto-opened `release/version-bump/vX.Y.Z` PR** so `master` stops drifting behind npm. It needs an approving review like any PR (branch protection). If the automated step was skipped, open the bump manually.
4. Confirm `notify-dependents` opened/updated the downstream consumer bump PRs.

## What NOT to do

- ❌ Don't `npm publish` locally or `npm version`-tag by hand — the workflow owns publishing (with provenance) and the version is derived from the release tag.
- ❌ Don't push a `package.json` version bump directly to `master` — it's protected; use the auto-generated bump-back PR.
- ❌ Don't publish a release expecting it to contain an unmerged PR — merge to `master` first.
- ❌ Don't delete/republish an already-published npm version — npm publishes are effectively permanent; cut a new patch instead.

## Permissions note

Cutting a release requires publishing a GitHub Release (or dispatching a workflow) with write access, and it deploys to the public npm registry — an irreversible, outward-facing action. Automated/CI or restricted agent sessions may be blocked from merging protected branches and publishing releases (e.g. `403 "not permitted for this session type"`); in that case, hand these steps to a maintainer with release rights rather than attempting to force them.
