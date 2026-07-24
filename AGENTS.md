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

Two complementary guards, and you need both:

**1. Source level, in CI.** [`src/__testing__/optionalPeerDependencies.test.ts`](src/__testing__/optionalPeerDependencies.test.ts)
scans `src/` for every load-time form (`import from`, `export ... from`, bare `import`, `require`)
of an enforced optional peer, and fails `jest` if one appears. `await import()` is deliberately not
matched - deferring resolution is the fix, not the defect. That file is also the source of truth for
*which* optional peers are enforced: `react` / `react-dom` are marked optional in `package.json` but
exempted there on the record, because every component imports React at module scope and always will.

**2. Built artifact, by hand.** The CI guard reads source, so it cannot speak for what the bundler
actually emitted or for a tarball already on npm. That only shows up in a downstream clean install -
and requiring `./dist/index.js` from inside the repo tree does not reproduce one, because Node
resolves the optional peers out of the repo's own `node_modules`. Pack the build and load it from a
throwaway consumer:

```bash
npm run build
tgz="$PWD/$(npm pack --silent | tail -1)"   # published build: npm pack @sistent/sistent@<version> --silent

( set -e
  cd "$(mktemp -d)" && npm init -y >/dev/null
  npm install "$tgz"                        # npm installs required peers, NOT optional ones
  for p in @mui/x-date-pickers date-fns; do # fail closed: if one is present the load proves nothing
    [ ! -e "node_modules/$p" ] || { echo "ABORT: optional peer $p is installed"; exit 1; }
  done
  node -e "require('@sistent/sistent')"     # throws iff an optional peer resolves at module scope
) && echo "clean-consumer load OK"
```

Keep that peer list in step with the enforced set in the test above. Use the
`npm pack @sistent/sistent@<version>` form to verify a release that is already published.

Known live instance: [#1735](https://github.com/layer5io/sistent/issues/1735) (`date-fns` in
`src/custom/UniversalFilter.tsx`).

## New public exports need an explicit root re-export

`rollup-plugin-dts` (used by tsup for the declaration bundle) silently drops symbols that reach
the root barrel only through a nested `export * from './custom'` (or `./base`, etc.) - the runtime
export in `dist/index.*js` survives, but the declaration is missing from `dist/index.d.ts`, so
`import { Foo, type FooProps } from '@sistent/sistent'` fails type-checking downstream. When you add
a new public component or type in a `src/<domain>/` subtree, also add an explicit
`export { Foo, type FooProps } from './<domain>/Foo';` to `src/index.tsx` (see the documented block
of examples there, e.g. `FeedbackButton`, `NavigationItem`). Verify by building and grepping
`dist/index.d.ts` for the symbol - a green `jest`/lint run will not catch this.

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
