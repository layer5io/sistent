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
_which_ optional peers are enforced: `react` / `react-dom` are marked optional in `package.json` but
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

## A type in the public API needs a real dependency, not a devDependency

The runtime bundle and the declaration bundle disagree about externals. `tsup` inlines
`@meshery/schemas` (`noExternal` in `tsup.config.ts`), but `rollup-plugin-dts` still emits
`export { Key } from '@meshery/schemas/permissions'` into `dist/index.d.ts`. A `devDependency`
satisfies that reference inside this repo and nowhere else, so the package builds green here and
then, for a consumer who did not install the package independently:

- `skipLibCheck: false` -> `TS2307: Cannot find module`, pointing at sistent's own `.d.ts`;
- `skipLibCheck: true` (the common default) -> the re-exported type **silently becomes `any`**.

The silent case is the one that bites. `Key` is the permission-key contract behind `permissionKey`
on Button/IconButton/MenuItem/ListItem/ListItemButton, `PermissionShield`, `PermissionProvider` and
`useHasPermission`; when it collapses to `any` those props stop being checked and nothing reports it.

So: **if a package's types reach `dist/index.d.ts`, it must be a `dependency` or a _non-optional_
`peerDependency`.** A peer marked optional in `peerDependenciesMeta` does not discharge it either -
a consumer is entitled to skip that peer, and the reference then fails the same two ways. Bundling
the runtime does not discharge it either; only the type reference matters here. This is the
declaration-side twin of the optional-peer rule above, and the two fail in opposite directions:
that one is broken by a _runtime_ import, this one by a _type_ re-export.

[`src/__testing__/publishedTypeSurfaceDependencies.test.ts`](src/__testing__/publishedTypeSurfaceDependencies.test.ts)
is the guard. It reads the built `dist/index.d.ts` (CI's `node-checks.yml` runs `make build` before
`make tests`, so it is present; a local `jest` with no build skips, and skipping is itself a failure
when `CI` is set). It is also the source of truth for the two exemption lists and the per-package
rationale behind each: packages that leak _undeclared_ (today the redux-facing surface reached
through `src/actors/*` and `src/redux-persist/*`, whose remedy is its own opt-in entry point, not a
dependency), and packages that _are_ declared but only as optional peers, whose remedy is to stop
naming them in the public type surface. Every entry is asserted to still be needed, so it cannot
outlive its problem - read that file, not a copy here, before touching either list.

Declaring one has a downstream consequence a `devDependency` did not: a real `dependency` takes part
in the consumer's own dedupe, so installing sistent can lift the consumer's copy of that package to
satisfy sistent's range. `.github/workflows/test-meshery-integration.yml` pins a Meshery commit for
exactly this reason, and the pin must be on or after the commit where Meshery UI itself adopted the
`@meshery/schemas` range sistent declares. Behind an older pin npm resolves one shared copy from the
newer range, and Meshery UI fails to build on a generated RTK hook that release renamed.

## Permission keys are owned by `meshery/schemas`, not by sistent

sistent consumes the `Key` _interface_ (`id`, `category`, `subcategory`, `function`, `description`)
from `@meshery/schemas/permissions` and nothing else - it never names a key moniker, never re-exports
the generated `Keys` / `PermissionKeys` map, and must not acquire a local copy of either. If a key is
wrong, orphaned, or misspelled, the fix belongs in `meshery/schemas` (and upstream of it, the
canonical permissions Google Sheet that `build/permissions.csv` is refreshed from), never here.

Worth knowing when triaging a downstream key error: the generated constant _name_ is derived from the
sheet's human-readable category + function text, while the UUID is stable. Editing that prose - a
typo fix, a plural made singular - renames the exported constant and orphans the old one. That is how
`1.3.35 -> 1.3.36` renamed 10 keys with every UUID unchanged, in a patch release.

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

`prettier --check` fails on dozens of files and `tsc --noEmit` reports errors across `src/`
(including missing `@types/jest` wiring for `src/__testing__`). Neither is a CI gate - CI runs
`.github/workflows/node-checks.yml` (lint + build) and `jest`. Do not assume you caused these;
do not mass-reformat to "fix" them.

A type contract can still be gated, just not by a type-only assertion file: jest transforms with
`@swc/jest`, which strips types without checking them, so such a file passes no matter what it
asserts. Shell out to `tsc` over a scoped fixture, assert the fixture is in the compiled program
(`--listFiles`) before trusting an empty diagnostic list, then filter the diagnostics to that
fixture - [`src/__testing__/navigationItemTitleTypes.test.ts`](src/__testing__/navigationItemTitleTypes.test.ts)
is the worked pattern, including the checks that keep the filter from turning the guard vacuous.

## Every commit needs a sign-off matching its own author

DCO is a blocking required check with nothing enforcing it locally, and the trailer must match that
commit's own author identity. The rule, the enforcement, and the repair recipe live in
[`CONTRIBUTING.md`](CONTRIBUTING.md#commit-signing) - read it before rewriting history.

The agent-specific trap: the usual offender is a follow-up commit (review fix, doc update, rebase
fixup), not the first one. Sign every commit you add, including the ones an automated pass makes
for you.

## Maintaining this file

Keep this file for knowledge useful to almost every future agent session in this project.
Do not repeat what the codebase already shows; point to the authoritative file or command instead.
Prefer rewriting or pruning existing entries over appending new ones.
When updating this file, preserve this bar for all agents and keep entries concise.
