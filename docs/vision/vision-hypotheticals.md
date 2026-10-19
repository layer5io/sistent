# Sistent Vision Hypotheticals and Calibration Record

This document records the ten stress-test hypotheticals used to calibrate `VISION.md`, containing the verbatim verdicts, author reasoning, and the changelog mapping each decision to the text of the vision.

---

## Hypothetical 1: Built-in Data Fetching in Table Components

* **Proposal**: Add built-in REST and GraphQL data fetching directly into Sistent's `DataTable` component so consumers only need to pass an API URL string rather than managing fetch state.
* **Tested Principle**: Principle 3 (Components remain composable primitives) & Scope.
* **Steelman Analysis**:
  * *For*: Drastically simplifies boilerplate in Meshery UI and Layer5 Cloud for standard resource tables.
  * *Against*: Binds Sistent to specific HTTP clients, authentication headers, error handlers, and caching strategies, bloating the component library and violating the UI-only boundary.
* **Verdict**: **RESIST**
* **Author Reasoning (Verbatim)**:
  > "Sistent is a design system and UI component library, not a data layer. The moment components start managing network lifecycles, auth refresh tokens, and cache invalidation, Sistent ceases to be portable. Data fetching belongs in the host application."
* **Changelog Impact**: Clarified in Principle 3 that Sistent treats complex views as configurable layouts and explicitly named data-fetching layers under Scope non-goals.

---

## Hypothetical 2: Application-Specific Color Tokens for Special Features

* **Proposal**: Introduce dedicated color tokens in Sistent's palette for Kanvas-specific features (e.g. `kanvasNodeHighlight`, `kanvasEdgeSelected`) to maintain a single token registry.
* **Tested Principle**: Principle 1 (Token parity governs presentation).
* **Steelman Analysis**:
  * *For*: Prevents Kanvas developers from defining out-of-band colors and keeps all ecosystem color constants in one package.
  * *Against*: Pollutes the shared design system with domain-specific naming that has no semantic meaning for other consumers like Meshery UI or docs.
* **Verdict**: **RESIST**
* **Author Reasoning (Verbatim)**:
  > "Design tokens in Sistent must remain semantic and universal across all Layer5 properties. Domain-specific applications should map Sistent's semantic tokens (such as `palette.secondary.main` or `palette.border.focused`) to their internal concepts, not pollute the root theme."
* **Changelog Impact**: Added requirement in Principle 1 that colors must resolve through universal semantic color variables rather than domain-specific token forks.

---

## Hypothetical 3: Headless Permission Hooks vs Direct Auth API Calls

* **Proposal**: Allow `useAccessibleOrgs` to directly call Layer5 Cloud authentication endpoints if no caller-injected trigger function is provided.
* **Tested Principle**: Principle 2 (Interface contracts follow schemas).
* **Steelman Analysis**:
  * *For*: Reduces setup overhead for simple Layer5 Cloud extensions that use standard auth endpoints.
  * *Against*: Couples Sistent to specific cloud endpoints and breaks usage in air-gapped or standalone Meshery deployments where cloud endpoints are unreachable.
* **Verdict**: **RESIST**
* **Author Reasoning (Verbatim)**:
  > "Permission evaluation must be isolated from the physical transport. By requiring trigger injection, Sistent components work equally well in standalone Meshery Server, multi-tenant Layer5 Cloud, and local mock testing."
* **Changelog Impact**: Explicitly stated in Principle 2 that permission hooks isolate evaluation from raw network calls via caller-injected trigger parameters.

---

## Hypothetical 4: CamelCase on the Wire vs Flexible Prop Transformation

* **Proposal**: Permit Sistent components to accept either `snake_case` or `camelCase` props and automatically normalize them at runtime.
* **Tested Principle**: Principle 2 (Interface contracts follow schemas).
* **Steelman Analysis**:
  * *For*: Forgiving developer experience for contributors accustomed to backend Go struct conventions.
  * *Against*: Encourages sloppy schema consumption, adds runtime normalization overhead, and conflicts with the official `meshery/schemas` camelCase-on-the-wire contract.
* **Verdict**: **RESIST**
* **Author Reasoning (Verbatim)**:
  > "The ecosystem contract is unambiguous: camelCase on the wire. Sistent components must strictly uphold this standard rather than adding polyfills that hide upstream schema divergence."
* **Changelog Impact**: Reinforced strict adherence to `meshery/schemas` identifier conventions in Principle 2.

---

## Hypothetical 5: Inline Style Overrides for Fast UI Experiments

* **Proposal**: Allow components in Meshery UI to use inline `style={{ ... }}` props with hardcoded hex colors during rapid prototyping phases.
* **Tested Principle**: Principle 1 (Token parity governs presentation).
* **Steelman Analysis**:
  * *For*: Enables rapid iteration on new feature prototypes before formal design token review.
  * *Against*: Hardcoded inline styles inevitably leak into production, breaking theme switching (Dark/Light mode) and high-contrast accessibility.
* **Verdict**: **RESIST**
* **Author Reasoning (Verbatim)**:
  > "Every hardcoded hex color is a future dark-mode bug. If a color is needed, it must exist in the theme palette or be added through the token synchronization pipeline."
* **Changelog Impact**: Enforced strict prohibition of hardcoded color literals in component JSX in Principle 1.

---

## Hypothetical 6: Full Multi-Step Wizard Primitives

* **Proposal**: Add a complete `ClusterOnboardingWizard` component into Sistent containing multi-step form validation, state persistence, and navigation buttons.
* **Tested Principle**: Principle 3 (Components remain composable primitives).
* **Steelman Analysis**:
  * *For*: Provides a plug-and-play onboarding experience across Meshery and Layer5 Cloud.
  * *Against*: Multi-step wizards embed domain workflows and state machines, making the component rigid and difficult to customize for different application contexts.
* **Verdict**: **RESIST**
* **Author Reasoning (Verbatim)**:
  > "Sistent provides Stepper, Modal, and Form primitives. The choreography of a business workflow like cluster onboarding belongs in Meshery UI, assembled from Sistent building blocks."
* **Changelog Impact**: Added explicit statement in Principle 3 that Sistent provides flexible slots and primitives rather than monolithic application wizards.

---

## Hypothetical 7: Automated Downstream Integration Testing in CI

* **Proposal**: Run automated integration tests installing candidate Sistent builds into `meshery/meshery/ui` on every Sistent pull request before merging.
* **Tested Principle**: Principle 4 (Downstream verification proves stability).
* **Steelman Analysis**:
  * *For*: Catches breaking visual and prop contract regressions before packages are published to npm.
  * *Against*: Adds 3-5 minutes to PR CI duration and requires maintaining cross-repo CI workflows.
* **Verdict**: **ACCEPT**
* **Author Reasoning (Verbatim)**:
  > "The ultimate test of a design system is whether its primary consumer builds cleanly. Cross-repo verification is essential to maintain velocity without breaking Meshery UI."
* **Changelog Impact**: Codified downstream Meshery UI integration testing as a non-negotiable merge gate in Principle 4.

---

## Hypothetical 8: Optional Props Degradation vs Hard Crashes

* **Proposal**: Design components to render graceful fallbacks when optional metadata (like user avatar URLs or organization logos) is missing from API payloads.
* **Tested Principle**: Principle 2 (Interface contracts follow schemas) & Principle 3.
* **Steelman Analysis**:
  * *For*: Prevents entire dashboards from crashing when backend models omit non-essential fields.
  * *Against*: Masks missing data from developers during integration testing.
* **Verdict**: **ACCEPT**
* **Author Reasoning (Verbatim)**:
  > "Components must be resilient to partial data. A missing avatar should render a placeholder glyph, not crash the entire application layout."
* **Changelog Impact**: Added component resilience and backward-compatible degradation requirements into Principle 2.

---

## Hypothetical 9: Direct Material UI (MUI) Prop Leakage

* **Proposal**: Export raw MUI components directly from Sistent without custom token wrappers to give consumers maximum flexibility.
* **Tested Principle**: Principle 1 (Token parity governs presentation) & Principle 3.
* **Steelman Analysis**:
  * *For*: Zero maintenance overhead for standard UI widgets like Buttons and Tooltips.
  * *Against*: Bypasses Sistent's design tokens and makes it impossible to change the underlying UI engine in the future without breaking every downstream consumer.
* **Verdict**: **RESIST**
* **Author Reasoning (Verbatim)**:
  > "Sistent is our design contract, not a thin alias for MUI. Every exported component must be bound to our theme tokens and accessibility standards."
* **Changelog Impact**: Confirmed Sistent owns the component contract and theme bindings in Identity and Principle 1.

---

## Hypothetical 10: Deprecating Stale Props Across Minor Releases

* **Proposal**: When refactoring a component prop (e.g. `isCompact` -> `variant="compact"`), support both props with a runtime deprecation warning for at least one minor release cycle before removal.
* **Tested Principle**: Principle 3 (Components remain composable primitives) & Principle 4.
* **Steelman Analysis**:
  * *For*: Allows downstream consumers (Meshery UI, Layer5 Cloud, extensions) to upgrade Sistent versions without coordinated, lockstep PRs across multiple repositories.
  * *Against*: Slightly increases bundle size during the transition period.
* **Verdict**: **ACCEPT**
* **Author Reasoning (Verbatim)**:
  > "Breaking downstream consumers on minor bumps kills developer trust. We provide deprecation warnings and migration periods before deleting prop interfaces."
* **Changelog Impact**: Added backward-compatibility and graceful deprecation commitments into Principle 3.
