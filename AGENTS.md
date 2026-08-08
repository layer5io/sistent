# Project agent memory

This file is the project's committed home for project-intrinsic agent knowledge: build, test, release, architecture, and sharp-edge notes that should travel with the code.

- Add durable project-specific notes here as they are discovered through real work.

## Skills live in `.agents/skills`, and only there

`.agents/skills` is the single source of truth for this repo's agent skills. `.claude/skills` is a
relative symlink to it (`../.agents/skills`), because Claude Code does not discover `.agents/skills`
on its own. Add a new skill under `.agents/skills/<name>/SKILL.md`; never add one under
`.claude/skills`, which would write through the symlink and land in the wrong place conceptually.

There is deliberately no `.codex/skills` or `.opencode/skills` link: both tools already read
`.agents/skills` natively (Codex via `repo_agents_skill_roots` in `codex-rs/core-skills/src/loader.rs`;
OpenCode per its skills docs), so a link would be redundant rather than load-bearing.

That rule is aimed at a human, but the actor that will actually write to `.claude/skills` is a tool:
the AXI skills installer, which produced commit `5482d046` ("Install AXI agent tooling") and
maintains the tracked `skills-lock.json`. That lockfile records four installer-managed skills -
`chrome-devtools-axi`, `gh-axi`, `lavish`, `quota-axi` - and the installer's own layout is content
under `.agents/skills/<name>/` **plus** a per-skill `.claude/skills/<name>` symlink, which is exactly
what this change replaced with the single directory-level link. So on its next install or update run
the installer will try to create `.claude/skills/<name>`; because `.claude/skills` is now itself a
symlink to `../.agents/skills`, that final path component resolves to `.agents/skills/<name>`, which
already exists as a real directory. Best case it errors with `EEXIST` and does nothing. Worst case an
installer that force-replaces its destination (`rm -rf` followed by `symlink`) deletes the canonical
skill directory and leaves a self-referential `.agents/skills/<name> -> ../../.agents/skills/<name>`
loop, destroying the skill content.

Which of those happens has **not** been established: no installer CLI managing `skills-lock.json` is
present in this repo or on `PATH`, and the destructive path was deliberately not tested by running
it. Establish the installer's replace semantics before re-running it against this layout.

## Releasing

Automation-driven; do not `npm publish`, `npm version`, or tag by hand. Merge to `master`, let
Release Drafter update the draft, then publish the draft - `release.yml` does the rest.
Runbook: [`.agents/skills/cut-release/SKILL.md`](.agents/skills/cut-release/SKILL.md).

Resolve "what is currently released" from the npm `latest` dist-tag and publish timestamps
(`npm view @sistent/sistent dist-tags time --json`), not by eyeballing semver order.

A consumer-visible breaking change - a published type that gains a required field, narrows, or
changes shape - is a **minor** here, not a major: sistent is pre-1.0, so `major` would assert 1.0
stability rather than describe the break. Label the PR `minor`, and note that the label is the only
signal that moves the version: [`.github/release-drafter.yml`](.github/release-drafter.yml) owns the
label-to-bump mapping and defaults to `patch`, so an unlabelled PR publishes a breaking change as a
patch.

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
dependency), and packages that _are_ declared but only as optional peers, where the remedy is
usually to stop naming them in the public type surface - though the one remaining entry, `react`,
is permanent rather than deferred. Every entry is asserted to still be needed, so it cannot
outlive its problem - read that file, not a copy here, before touching either list.

Note what "stop naming them" has to cover. Dropping a `export type { X } from '<peer>'` re-export is
not enough on its own if an _exported component_ is still typed with the peer's props: the
declaration bundle keeps the import alive to serve that declaration. #1749 was exactly this - the
props re-export and `DateTimePicker`'s own `ForwardRefExoticComponent<...>` type were two separate
references, and only removing both got the count to zero.

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

## Wire shapes are derived from `@meshery/schemas`, never re-declared

Any type that is decoded from or encoded to a Meshery/Layer5 API is owned by `meshery/schemas`.
Sistent is upstream of every Meshery UI, so a shape hand-copied here propagates to all of them and a
rename upstream reaches consumers as a silent `undefined` rather than an error. Derive from the
canonical construct instead
(`import type { components } from '@meshery/schemas/constructs/<ver>/<c>/<C>'`), and express any
divergence as an explicit `Pick`/`Omit`/`&` carrying the reason.

**`Omit<T, 'gone'>` where `T` has no `gone` is a silent no-op**, so derivation alone does not survive
the rename it was adopted to catch: the omit stops removing anything and the override quietly becomes
an addition. [`src/__testing__/fixtures/schemaConstructAliases.ts`](src/__testing__/fixtures/schemaConstructAliases.ts)
closes that by asserting every omitted/narrowed key still exists upstream, and is the source of truth
for which local types are bound to which construct and why each divergence is kept. Read it before
adding or widening one. It is compiled by a `tsc` guard, not by `jest` - see the `tsc`-over-a-fixture
note under "Repo state that looks broken but is pre-existing".

When the canonical is the wrong one, keep the narrower local shape, link a filed `meshery/schemas`
issue from the type's doc comment, and verify the claim against the actual server struct before
filing - open examples: [#1142](https://github.com/meshery/schemas/issues/1142) (catalog data),
[#1143](https://github.com/meshery/schemas/issues/1143), [#1144](https://github.com/meshery/schemas/issues/1144)
(share/revoke), [#1145](https://github.com/meshery/schemas/issues/1145).

Such a workaround needs an expiry date, not just an issue link, or it outlives its upstream fix in
silence. Pair it with an `// @ts-expect-error` + `RequiresKey<Canonical, 'theMissingKey'>` entry in
the fixture: the suppression goes unused the moment the canonical gains the key, and tsc reports
TS2578. `TeamHasNoTeamId`, `EventResultHasNoAvatarUrl` and the two `CatalogDataHasNo*` entries are
the worked examples.

A wire mismatch here is not loud. meshery-cloud decodes request bodies with a strict `json.Unmarshal`
into `omitempty` structs and still answers 200, so a stale outbound key name is a successful no-op -
which is how sistent's share modal granted nothing for three months after the Phase 4 camelCase flip.
Outbound payload shapes therefore get their own module and a test pinning the literal key names, as
[`src/custom/ShareModal/resourceAccessPayload.ts`](src/custom/ShareModal/resourceAccessPayload.ts) does.
Those modules are root-exported so hosts stop hand-rolling the body, which makes them public API: the
validation that keeps an unusable value off the wire belongs in the builder, not only in the caller
that happens to render the error. A component-level guard is defence in depth on top of it.

## `disabled` on a MUI `MenuItem` does not stop a click

MUI enforces `disabled` on non-`<button>` elements (a `MenuItem` renders `<li>`) purely with
`pointer-events: none` in the `Mui-disabled` class - the handlers stay attached. `PermissionShield`
blocks its children the same way (`pointerEvents: 'none'` on the wrapper). jsdom applies neither, so
`fireEvent.click` on a "disabled" item still fires `onClick`, and a test that only asserts the
disabled styling proves nothing. Anything that must be genuinely unreachable has to be made inert in
JS - see `useIsNavigationItemPermitted` and its callers in
[`src/custom/NavigationNavbar/navigationNavbar.tsx`](src/custom/NavigationNavbar/navigationNavbar.tsx),
which withhold both `onClick` and the expand toggle so an unpermitted section cannot navigate or
open its children.

## New public exports need an explicit root re-export

`rollup-plugin-dts` (used by tsup for the declaration bundle) silently drops symbols that reach
the root barrel only through a nested `export * from './custom'` (or `./base`, etc.) - the runtime
export in `dist/index.*js` survives, but the declaration is missing from `dist/index.d.ts`, so
`import { Foo, type FooProps } from '@sistent/sistent'` fails type-checking downstream. When you add
a new public component or type in a `src/<domain>/` subtree, also add an explicit
`export { Foo, type FooProps } from './<domain>/Foo';` to `src/index.tsx` (see the documented block
of examples there, e.g. `FeedbackButton`, `NavigationItem`). Verify by building and grepping
`dist/index.d.ts` for the symbol - a green `jest`/lint run will not catch this.

The explicit block is a stopgap, not the fix. Measure the real gap before assuming a symbol is
covered - it is large, and every uncovered symbol is one a consumer must shim locally:

```bash
npm run build
node -e 'const f=require("fs"),names=t=>{const s=new Set();
for(const b of t.matchAll(/export\s*\{([^{}]*)\}\s*;?/g))
  b[1].split(",").map(x=>x.trim()).filter(Boolean)
    .forEach(x=>s.add(x.replace(/^type\s+/,"").split(/\s+as\s+/).pop().trim()));
return s;};
const rt=names(f.readFileSync("dist/index.mjs","utf8"));
const dt=names(f.readFileSync("dist/index.d.ts","utf8"));
console.log([...rt].filter(n=>/^[A-Za-z_$][\w$]*$/.test(n)&&!dt.has(n)).sort().join("\n"))'
```

As of this change that reports 130 of 729 runtime exports absent from the declaration bundle -
`WorkspaceCard`, `TeamTable`, `UsersTable`, `CustomImage`, `ErrorBoundary` and most of
`src/custom/` among them. Adding 130 lines is not the answer; the durable fix is in how the
declaration bundle is produced. Until then, prefer extending this list over leaving a symbol
uncovered, and do not read its absence as "that component is intentionally private".

## Repo state that looks broken but is pre-existing

`prettier --check` fails on dozens of files and `tsc --noEmit` reports errors across `src/`
(including missing `@types/jest` wiring for `src/__testing__`). Neither is a CI gate - CI runs
`.github/workflows/node-checks.yml` (lint + build) and `jest`. Do not assume you caused these;
do not mass-reformat to "fix" them.

A type contract can still be gated, just not by a type-only assertion file: jest transforms with
`@swc/jest`, which strips types without checking them, so such a file passes no matter what it
asserts. Shell out to `tsc` over a scoped fixture, assert the fixture is in the compiled program
(`--listFiles`) before trusting an empty diagnostic list, then filter the diagnostics to that
fixture. [`src/__testing__/helpers/tscFixture.ts`](src/__testing__/helpers/tscFixture.ts) is that
harness, and documents each check that keeps the filter from turning the guard vacuous - call
`typeCheckFixture(fixture, project)` from a new guard rather than copying it, because a fix to one
copy silently leaves the other unguarded. `navigationItemTitleTypes.test.ts` and
`schemaConstructAliasTypes.test.ts` are the two worked callers; both assert "compiles the fixture"
before the emptiness assertions, and the ordering is load-bearing.

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
