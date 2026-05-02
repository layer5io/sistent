# Copilot instructions for Sistent

## Build, test, and lint commands

Use the Make targets when possible; CI runs these same entry points.

```sh
make setup         # npm install
make build         # npm run build
make build-watch   # npm run build:watch
make format-check  # prettier --check "**/*.{ts,tsx,md}"
make lint          # prettier --write "**/*.{ts,tsx,md}" && eslint .
make tests         # jest
```

Single-test examples:

```sh
npm test -- src/__testing__/routing.test.ts --runInBand
npm test -- -t "routing utilities" --runInBand
```

Current CI runs the main checks on Node 20 and 22. Pull requests also trigger a downstream integration workflow that packs this library and installs it into `meshery/meshery`'s `ui/` app before building and testing there.

Current local baseline on this checkout:

- `npm run build` fails on unresolved `@meshery/schemas/*` subpath imports used from `src/schemas/`.
- `npm test` currently fails before test execution with `TS5103: Invalid value for '--ignoreDeprecations'`.

## High-level architecture

- `tsup` builds a single package entrypoint, `src/index.tsx`, into CJS and ESM output in `dist/`.
- The public API is assembled through domain indexes: `actors`, `base`, `colors`, `custom`, `hooks`, `icons`, `redux-persist`, `schemas`, `theme`, and `utils`, then re-exported from `src/index.tsx`.
- `src/base/` is the low-level layer: thin wrappers around MUI primitives that preserve MUI naming and types while giving the package a consistent export surface.
- `src/custom/` is the higher-level component layer: product components such as tables, cards, filters, dialogs, and markdown/rendering helpers composed from `base/`, icons, utilities, and Sistent theme tokens.
- `src/theme/` is the styling backbone: `SistentThemeProvider`, primitive brand palettes, semantic palette mapping, typography, and MUI component override modifiers all live here.
- `src/schemas/` combines local RJSF form schemas (`schema.tsx` + `uiSchema.tsx`) with re-exports from `@meshery/schemas`, including OpenAPI schemas, RTK Query APIs, and shared API utilities.
- `src/actors/` provides XState-based infrastructure for Redux and RTK Query integration, validation flows, worker-backed actors, and event-bus helpers.

## Key conventions

- When adding a new public symbol, wire it through the full export chain: the feature-local `index.ts(x)`, the domain `index.ts(x)`, and the root `src/index.tsx`.
- Theme-aware UI should use Sistent exports from `src/theme` / package exports (`SistentThemeProvider`, `styled`, `useTheme`) and consume Sistent semantic palette tokens such as `theme.palette.background.card` and `theme.palette.icon.default` instead of relying on raw MUI defaults.
- Meshery and Layer5 API-facing identifiers must stay camelCase on the wire. Prefer the canonical camelCase schema exports (`EnvironmentDefinitionV1Beta3OpenApiSchema`, `WorkspaceDefinitionV1Beta3OpenApiSchema`, `ModelDefinitionV1Beta2OpenApiSchema`) over the deprecated v1beta1 exports kept for compatibility.
- Tests are centralized under `src/__testing__/` rather than colocated with components. Component tests commonly render through `SistentThemeProvider`, and heavy dependencies are often mocked inline to keep tests focused.
- New RJSF form assets belong in `src/schemas/<feature>/` with separate `schema.tsx` and `uiSchema.tsx` files, then must be re-exported from `src/schemas/index.tsx`.
- Keep TypeScript explicit. The repo is `strict`, and the few `@typescript-eslint/no-explicit-any` suppressions in actor and schema interop code are exceptions, not the default style.
- If a session prepares commits, follow Conventional Commits and include DCO signoff (`git commit -s`).
