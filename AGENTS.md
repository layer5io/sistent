# Project agent memory

This file is the project's committed home for project-intrinsic agent knowledge: build, test, release, architecture, and sharp-edge notes that should travel with the code.

- Add durable project-specific notes here as they are discovered through real work.

## Releasing

Automation-driven; do not `npm publish`, `npm version`, or tag by hand. Merge to `master`, let
Release Drafter update the draft, then publish the draft - `release.yml` does the rest.
Runbook: [`.claude/skills/cut-release/SKILL.md`](.claude/skills/cut-release/SKILL.md).

Resolve "what is currently released" from the npm `latest` dist-tag and publish timestamps
(`npm view @sistent/sistent dist-tags time --json`), not by eyeballing semver order.

Verify a published release **by content**, not by the version number moving. Two properties carry
the three-repo chain, and losing either fails downstream with errors that point nowhere near sistent:

1. `dist/` still exports `MESHERY_EXTENSION_CONTRACT_VERSION` (present in `index.js`, `index.mjs`,
   and both `.d.ts` files) - meshery-extensions gates compatibility on it.
2. `dist/` still has no module-scope require of an optional peer - see the check below.

## The barrel must not require an optional peer

`src/index.tsx` re-exports nearly everything, so **a module-scope `import` of an optional peer in
any reachable file makes `import { anything } from '@sistent/sistent'` throw** for consumers who
did not install it - with a message naming sistent rather than the missing peer. Optional peers
are listed under `peerDependenciesMeta` in `package.json`.

An optional dependency must be either used conditionally (`React.lazy` / dynamic `import()`, as
`src/base/DateTimePicker/DateTimePicker.tsx` does) or declared honestly as a real dependency.
`import type` is fine - it is erased at runtime.

**CI cannot see this**, because the repo always has its own devDependencies installed. It surfaces
only in a downstream clean install, so the check has to run from a real consumer install - requiring
`./dist/index.js` in the repo tree proves nothing, since Node resolves the optional peers out of the
repo's own `node_modules`. Pack the build and load it from a throwaway consumer:

```bash
npm run build
tgz="$PWD/$(npm pack --silent | tail -1)"      # published build: npm pack @sistent/sistent@<version> --silent
cd "$(mktemp -d)" && npm init -y >/dev/null
npm install "$tgz"                             # npm installs required peers, NOT optional ones
ls node_modules/date-fns >/dev/null 2>&1 && echo "WARNING: optional peer present, check is void"
node -e "require('@sistent/sistent')"          # throws iff an optional peer is required at module scope
```

The same procedure verifies an already-published version - use the `npm pack @sistent/sistent@<version>`
form and skip the build. Always confirm the optional peers really are absent before trusting a pass.

Known live instance: [#1735](https://github.com/layer5io/sistent/issues/1735) (`date-fns` in
`src/custom/UniversalFilter.tsx`).

## Repo state that looks broken but is pre-existing

`prettier --check` fails on ~82 files and `tsc --noEmit` reports errors across `src/` (including
missing `@types/jest` wiring for `src/__testing__`). Neither is a CI gate - CI runs
`.github/workflows/node-checks.yml` (lint + build) and `jest`. Do not assume you caused these;
do not mass-reformat to "fix" them.

## Maintaining this file

Keep this file for knowledge useful to almost every future agent session in this project.
Do not repeat what the codebase already shows; point to the authoritative file or command instead.
Prefer rewriting or pruning existing entries over appending new ones.
When updating this file, preserve this bar for all agents and keep entries concise.
