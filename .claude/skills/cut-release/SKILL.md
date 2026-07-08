---
name: cut-release
description: Runbook for cutting a release of @sistent/sistent to npm. Use when asked to "cut a release", "release Sistent", "publish a new version", or "ship the next @sistent/sistent". The flow is: wait for Release Drafter to fold the merged PR into the draft release, then publish that draft — Release Drafter has already set the version and notes, and release.yml handles the npm publish (OIDC provenance) and the auto-merged version-bump-back.
user-invocable: true
---

# Cut a Sistent Release

Publishes a new version of the `@sistent/sistent` npm package. Releasing is **automation-driven** and requires **no manual preparation**: Release Drafter already computes the next version and writes the release notes, and the publish workflow does the rest. You do **not** run `npm publish`, bump `package.json`, write release notes, or create a git tag by hand.

- **Package:** `@sistent/sistent` (public, scope `@sistent`), published with npm **provenance** via OIDC trusted publishing.
- **Release branch:** `master` (protected — requires PR approval).
- **Workflows:** [`.github/workflows/release-drafter.yml`](../../workflows/release-drafter.yml) maintains the draft Release; [`.github/workflows/release.yml`](../../workflows/release.yml) ("Publish Node.js Package") does the `npm publish`, then opens **and auto-merges** the version-bump-back PR; `notify-dependents.yml` updates downstream consumers after a successful publish.

## The release chain (what actually happens)

1. **A PR merges to `master`** → `release-drafter.yml` runs and updates the **draft GitHub Release**: it folds that PR into the changelog and computes the next version from the PR's labels (major / minor / patch).
2. **You publish the draft Release.** The tag (e.g. `v0.21.31`) becomes the version source of truth.
3. Publishing emits `release: published` → **`release.yml`**: sets `package.json#version` from the tag, `npm ci` → `npm run build` → `npm publish --provenance --access public`, then opens the `release/version-bump/vX.Y.Z` PR and **auto-merges it** so `master`'s `package.json`/`package-lock.json` track the published version without sitting idle.
4. `notify-dependents.yml` fires on the publish workflow's success and bumps downstream consumers (e.g. meshery, meshery-cloud) to the new version.

## Procedure

The only human step is publishing the drafted release — Release Drafter has already done the versioning and notes.

1. **Wait for Release Drafter to fold your merged PR into the draft.** After the PR merges to `master`, `release-drafter.yml` runs (a few seconds). Confirm the draft now reflects the merged PR and shows the intended next version:
   ```bash
   gh release list --repo layer5io/sistent          # find the draft (isDraft = true)
   gh release view <vX.Y.Z> --repo layer5io/sistent  # confirm version + notes
   ```
   If the version bump is wrong, it's driven by the merged PR's labels — relabel and let Release Drafter re-draft; do not hand-edit the tag.

2. **Publish the draft Release. That's it.** No version editing, no notes, no tagging:
   ```bash
   gh release edit <vX.Y.Z> --repo layer5io/sistent --draft=false --latest
   ```
   Publishing triggers `release.yml`, which publishes to npm and auto-merges the version-bump-back PR.

## Verify

1. Watch the publish workflow to success:
   ```bash
   gh run watch --repo layer5io/sistent \
     "$(gh run list --repo layer5io/sistent --workflow release.yml --limit 1 --json databaseId --jq '.[0].databaseId')"
   ```
2. Confirm the version is live on npm:
   ```bash
   npm view @sistent/sistent version
   ```
3. Confirm the `release/version-bump/vX.Y.Z` PR auto-merged (it should close on its own) and that `notify-dependents` opened the downstream consumer bump PRs.

## What NOT to do

- ❌ Don't `npm publish` locally or `npm version`-tag by hand — the workflow owns publishing (with provenance) and the version comes from the release tag.
- ❌ Don't edit the draft's version or release notes — Release Drafter owns both; fix PR labels instead.
- ❌ Don't publish expecting an unmerged PR to be included — the release ships `master`'s current state; merge first, then let Release Drafter update the draft.
- ❌ Don't republish an already-published npm version — npm publishes are effectively permanent; cut a new patch instead.

## Permissions note

Publishing a release deploys to the public npm registry — an irreversible, outward-facing action, and it runs against a protected branch. Restricted agent / CI sessions can be blocked from publishing releases and merging protected branches (e.g. `403 "not permitted for this session type"`); in that case, hand the publish step to a maintainer with release rights rather than attempting to force it.
