# Vision

Sistent exists so that engineers and designers can build coherent, accessible, and high-performance user interfaces across the Layer5 cloud native management ecosystem.
It serves contributors and teams delivering Meshery UI, Layer5 Cloud, Kanvas, and ecosystem extensions, turning design tokens and schema constructs into reusable, accessible React primitives.
It owns exactly one thing: the shared design system component and token contract across all Layer5 web applications.

## Token parity governs presentation

Sistent derives visual styling from centralized design tokens synchronized with Figma rather than hardcoded styles.
Every component renders consistently across both Dark and Light themes through Sistent's ThemeProvider.
Sistent uses theme-driven palettes and semantic color variables instead of hardcoded hex codes or arbitrary CSS overrides.
Components declare their responsive breakpoints through the shared theme rather than ad-hoc media queries.
Sistent prohibits hardcoded color values in component JSX, requiring every color to resolve through the theme contract.

## Interface contracts follow schemas

Sistent components that render API data strictly consume the camelCase-on-the-wire identifier contract defined in meshery/schemas.
Components do not invent private prop shapes or custom object structures when a canonical ecosystem schema construct exists.
Sistent integrates authorization and organization context through headless hooks like useAccessibleOrgs and the Shield component.
Sistent isolates permission evaluation from raw network calls by accepting caller-injected trigger parameters.
Sistent renders graceful fallback states and placeholder glyphs when optional metadata is absent from API payloads.
Sistent instruments data-driven components with test IDs and ARIA labels for automated testing and accessibility compliance.

## Components remain composable primitives

Sistent builds headless and styled components as composable primitives with minimal runtime overhead and clean tree-shaking support.
Components never embed application-specific business logic, routing state, or direct database mutations.
Sistent exposes flexible custom renderers and slot props rather than monolithic, multi-step application wizards.
Sistent treats complex views like DataTableToolbar and DashboardLayout as configurable layouts, delegating data fetching to the consuming application.
Component props remain backward-compatible across minor versions, deprecating stale interfaces with clear upgrade paths rather than breaking consumers.

## Downstream verification proves stability

Sistent tests its exports directly against Meshery UI in continuous integration before any release merges.
Sistent requires component accessibility audits (WCAG 2.1 AA) and unit tests for interactive behaviors.
Sistent packages zero-dependency token exports so downstream consumers can build without dependency bloat.
Sistent documents every component, prop type, and token mapping in interactive Storybook stories.

## Scope

Sistent is not an application state manager or data-fetching layer.
Sistent is not an authentication or identity provider.
Sistent is not a repository for one-off, page-specific layout hacks.
Sistent is not a runtime configuration engine for backend infrastructure.
Sistent does not bypass design token contracts in favor of arbitrary style injections.

A change aligns when it strengthens design token fidelity, improves accessibility compliance, adheres to meshery/schemas data shapes, or enhances component composability across downstream applications.
A change should be resisted when it embeds application-specific business logic, breaks theme token inheritance, introduces schema-divergent prop names, weakens accessibility gates, or breaks downstream Meshery UI integration.
