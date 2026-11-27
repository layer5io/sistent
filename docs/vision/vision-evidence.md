# Sistent Vision Evidence Sheet

This document provides claim-by-claim traceability for every line in `VISION.md` to concrete evidence in the `layer5io/sistent` repository, downstream projects (`meshery/meshery`, `layer5io/layer5`), ecosystem contracts (`meshery/schemas`), and published project references (`https://layer5.io/projects/sistent`).

---

## Identity & Purpose

* **Claim**: "Sistent exists so that engineers and designers can build coherent, accessible, and high-performance user interfaces across the Layer5 cloud native management ecosystem."
  * **Evidence**: `README.md` (lines 1-4); Layer5 projects page (`https://layer5.io/projects/sistent`); package identity in `package.json` (`@sistent/sistent`).
* **Claim**: "It serves contributors and teams delivering Meshery UI, Layer5 Cloud, Kanvas, and ecosystem extensions, turning design tokens and schema constructs into reusable, accessible React primitives."
  * **Evidence**: Downstream consumers in `meshery/meshery/ui/package.json` (dependency on `@sistent/sistent`); `src/theme/index.ts` token definitions; `src/actors/` and `src/custom/` primitives.
* **Claim**: "It owns exactly one thing: the shared design system component and token contract across all Layer5 web applications."
  * **Evidence**: `src/index.tsx` top-level exports; `src/theme/` (palette, typography, shadows, shapes); `src/components/` and `src/custom/`.

---

## Principle 1: Token parity governs presentation

* **Claim**: "Sistent derives visual styling from centralized design tokens synchronized with Figma rather than hardcoded styles."
  * **Evidence**: `src/theme/palette.ts`, `src/colors/`, Figma token synchronization tooling in `src/theme/tokens.ts`.
* **Claim**: "Every component renders consistently across both Dark and Light themes through Sistent's ThemeProvider."
  * **Evidence**: `src/theme/theme.ts` (`ThemeProvider`, `useTheme`, `darkTheme`, `lightTheme`); PR #1797; Storybook theme addon configs.
* **Claim**: "Sistent uses theme-driven palettes and semantic color variables instead of hardcoded hex codes or arbitrary CSS overrides."
  * **Evidence**: `src/colors/colors.ts`; `src/theme/palette.ts`; ESLint and style rules prohibiting raw hex literals in component stylesheets.
* **Claim**: "Components declare their responsive breakpoints through the shared theme rather than ad-hoc media queries."
  * **Evidence**: `src/theme/breakpoints.ts`; responsive layout implementations in `src/custom/DashboardLayout/` (PR #1706, PR #1803).
* **Claim**: "Sistent prohibits hardcoded color values in component JSX, requiring every color to resolve through the theme contract."
  * **Evidence**: PR #1790 (`fix/data-table-toolbar-mobile-layout`), PR #1774, and theme audit commits replacing hardcoded styling with `theme.palette.*`.

---

## Principle 2: Interface contracts follow schemas

* **Claim**: "Sistent components that render API data strictly consume the camelCase-on-the-wire identifier contract defined in meshery/schemas."
  * **Evidence**: PR #1786 (`fm/schema-consumer-audit-sistent`); `README.md` (lines 5-8 referencing `meshery/schemas/docs/identifier-naming-contributor-guide.md`).
* **Claim**: "Components do not invent private prop shapes or custom object structures when a canonical ecosystem schema construct exists."
  * **Evidence**: `src/schemas/` component schemas; props in `src/custom/` mapping 1:1 to schema constructs in `github.com/meshery/schemas`.
* **Claim**: "Sistent integrates authorization and organization context through headless hooks like useAccessibleOrgs and the Shield component."
  * **Evidence**: `src/hooks/useAccessibleOrgs.ts` (PR #1793, PR #1815, PR #1819); `src/custom/Shield/` and `PermissionSessionContext` (PR #1774).
* **Claim**: "Sistent isolates permission evaluation from raw network calls by accepting caller-injected trigger parameters."
  * **Evidence**: `useAccessibleOrgs.ts` accepting `triggerGetKeys` parameter (PR #1796); cache invalidation on `permissionKey` change (PR #1793).
* **Claim**: "Sistent renders graceful fallback states and placeholder glyphs when optional metadata is absent from API payloads."
  * **Evidence**: Component fallback rendering in `src/custom/UserSearchField/` (UserChip avatar fallbacks), `src/custom/DataTableToolbar/` placeholder handling.
* **Claim**: "Sistent instruments data-driven components with test IDs and ARIA labels for automated testing and accessibility compliance."
  * **Evidence**: Test ID instrumentation and ARIA tags in `src/custom/DataTableToolbar/` (PR #1774 commit `c7868633`, PR #1790), `src/custom/SearchBar.tsx`, `src/custom/UniversalFilter.tsx`, `src/custom/CatalogDesignTable/`, and accessibility test coverage in `src/__testing__/`.

---

## Principle 3: Components remain composable primitives

* **Claim**: "Sistent builds headless and styled components as composable primitives with minimal runtime overhead and clean tree-shaking support."
  * **Evidence**: `package.json` build script (`NODE_ENV=production tsup`), `tsup.config.ts` ES module and CJS bundling, clean tree-shaking exports in `src/index.tsx`.
* **Claim**: "Components never embed application-specific business logic, routing state, or direct database mutations."
  * **Evidence**: Pure React component architecture in `src/base/`, `src/custom/`, and `src/actors/`; routing and state management delegated to host applications.
* **Claim**: "Sistent exposes flexible custom renderers and slot props rather than monolithic, multi-step application wizards."
  * **Evidence**: Component slots and custom render props in `DataTableToolbar`, `Modal`, `Menu`, and `Card` primitives.
* **Claim**: "Sistent treats complex views like DataTableToolbar and DashboardLayout as configurable layouts, delegating data fetching to the consuming application."
  * **Evidence**: `src/custom/DataTableToolbar/index.tsx` (PR #1774, PR #1790); `src/custom/DashboardLayout/index.tsx` (PR #1706).
* **Claim**: "Component props remain backward-compatible across minor versions, deprecating stale interfaces with clear upgrade paths rather than breaking consumers."
  * **Evidence**: Deprecation warnings and backward-compatibility wrappers in `src/custom/` across minor versions (`v0.21.x` -> `v0.22.x`).

---

## Principle 4: Downstream verification proves stability

* **Claim**: "Sistent tests its exports directly against Meshery UI in continuous integration before any release merges."
  * **Evidence**: `README.md` (lines 64-70); `.github/workflows/node-checks.yml` (integration test matrix running `meshery/meshery/ui` build with current Sistent bundle).
* **Claim**: "Sistent requires component accessibility audits (WCAG 2.1 AA) and unit tests for interactive behaviors."
  * **Evidence**: Jest testing suite (`package.json` test scripts, `@testing-library/react`, `@testing-library/dom`); automated accessibility PR reviews.
* **Claim**: "Sistent packages zero-dependency token exports so downstream consumers can build without dependency bloat."
  * **Evidence**: Exported token modules and light bundle footprint in `dist/`.
* **Claim**: "Sistent documents every component, prop type, and token mapping in interactive Storybook stories."
  * **Evidence**: Storybook configurations, `.storybook/`, and component story files (`*.stories.tsx`).

---

## Scope & Non-Goals

* **Claim**: "Sistent is not an application state manager or data-fetching layer."
  * **Evidence**: Absence of hardcoded Redux/RTK Query endpoints in UI primitives; hooks require caller-injected fetchers.
* **Claim**: "Sistent is not an authentication or identity provider."
  * **Evidence**: `PermissionSessionContext` and `Shield` consume externally resolved sessions rather than managing login endpoints.
* **Claim**: "Sistent is not a repository for one-off, page-specific layout hacks."
  * **Evidence**: Strict PR review requirements against application-specific styles; centralized theme enforcement.
* **Claim**: "Sistent is not a runtime configuration engine for backend infrastructure."
  * **Evidence**: Clean UI-only scope in `@sistent/sistent`.
* **Claim**: "Sistent does not bypass design token contracts in favor of arbitrary style injections."
  * **Evidence**: Hard rule enforced across all styled components in `src/theme/`.

---

## Alignment & Resistance Criteria

* **Claim**: "A change aligns when it strengthens design token fidelity, improves accessibility compliance, adheres to meshery/schemas data shapes, or enhances component composability across downstream applications."
  * **Evidence**: Core project contribution standards in `README.md` and `CONTRIBUTING.md`.
* **Claim**: "A change should be resisted when it embeds application-specific business logic, breaks theme token inheritance, introduces schema-divergent prop names, weakens accessibility gates, or breaks downstream Meshery UI integration."
  * **Evidence**: Boundary review rules enforced in PRs (#1786, #1790) and automated CI integration gates in `.github/workflows/node-checks.yml`.
