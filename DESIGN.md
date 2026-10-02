---
version: alpha
name: Sistent
description: Open-source dashboard and component-system visual identity with a neutral application shell, teal brand actions, saffron CTAs, and a first-class dark mode.
target_framework: '@mui/material + React + TypeScript'
package_source_of_truth: package.json
colors:
  primary: '#00B39F'
  on-primary: '#FDFDFD'
  primary-hover: '#41CCB3'
  primary-pressed: '#93E6D1'
  secondary: '#3C494F'
  on-secondary: '#FDFDFD'
  accent: '#EBC017'
  on-accent: '#000D12'
  accent-hover: '#FFEB6B'
  navigation-light: '#252E31'
  on-navigation-light: '#FDFDFD'
  navigation-dark: '#000D12'
  on-navigation-dark: '#FDFDFD'
  surface-light-app: '#FDFDFD'
  surface-light-card: '#FDFDFD'
  surface-light-muted: '#F6F8F8'
  surface-light-tabs: '#F6F8F8'
  on-surface-light: '#000D12'
  surface-dark-app: '#000D12'
  surface-dark-card: '#212121'
  surface-dark-muted: '#15272F'
  surface-dark-tabs: '#1A1A1A'
  on-surface-dark: '#FDFDFD'
  on-ribbon: '#FDFDFD'
  ribbon-community: '#7A848E'
  ribbon-official: '#EBC017'
  ribbon-verified: '#00B39F'
typography:
  textH1Bold:
    fontFamily: 'Qanelas Soft Regular, Roboto, Helvetica, Arial, sans-serif'
    fontSize: 3.25rem
    fontWeight: 700
    lineHeight: 4rem
    letterSpacing: -0.02em
  textH2Medium:
    fontFamily: 'Qanelas Soft Regular, Roboto, Helvetica, Arial, sans-serif'
    fontSize: 2rem
    fontWeight: 500
    lineHeight: 2.5rem
  textH3Medium:
    fontFamily: 'Qanelas Soft Regular, Roboto, Helvetica, Arial, sans-serif'
    fontSize: 1.5rem
    fontWeight: 500
    lineHeight: 2.25rem
  textB1Regular:
    fontFamily: 'Qanelas Soft Regular, Open Sans, sans-serif'
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.75rem
  textB2SemiBold:
    fontFamily: 'Qanelas Soft Regular, Open Sans, sans-serif'
    fontSize: 1rem
    fontWeight: 600
    lineHeight: 1.75rem
  textB3Regular:
    fontFamily: 'Open Sans, sans-serif'
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5rem
  textL1Bold:
    fontFamily: 'Qanelas Soft Regular, Open Sans, sans-serif'
    fontSize: 0.75rem
    fontWeight: 700
    lineHeight: 1rem
    letterSpacing: 0.02em
  textL2Regular:
    fontFamily: 'Open Sans, sans-serif'
    fontSize: 0.75rem
    fontWeight: 400
    lineHeight: 1.5rem
  textC1Regular:
    fontFamily: 'Consolas, monospace'
    fontSize: 0.75rem
    fontWeight: 400
    lineHeight: 1.5rem
  textC2Regular:
    fontFamily: 'Consolas, monospace'
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.75rem
rounded:
  xs: 2px
  sm: 4px
  md: 5px
  lg: 8px
  xl: 15px
  xxl: 16px
  full: 9999px
spacing:
  base: 8px
  xxs: 2px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 20px
  xxl: 24px
  xxxl: 32px
strokes:
  light-default: '#EAEDEE'
  light-strong: '#28353A'
  light-normal: '#8C999E'
  dark-default: '#15272F'
  dark-strong: '#8D9FA7'
  dark-normal: '#3D4F57'
status-colors:
  info: '#2196F3'
  success: '#206D24'
  warning: '#F0A303'
  error: '#F91313'
icons:
  light-primary: '#15272F'
  dark-primary: '#D2D8DA'
motion:
  duration-fast: 150ms
  duration-short: 200ms
  duration-medium: 600ms
  duration-long: 800ms
  duration-xlong: 900ms
  easing-standard: ease-out
  easing-emphasized: cubic-bezier(0.2, 0.8, 0.2, 1)
shadows:
  card-accent: '2px 2px 3px 0px #00B39F'
  hover-sm: '0 3px 10px 0px rgba(0, 0, 0, 0.08)'
  floating-panel-light: '0 4px 16px rgba(234, 237, 238, 0.5)'
  floating-panel-dark: '0 4px 16px rgba(0, 13, 18, 0.5)'
  tooltip-light: '0 10px 30px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)'
  tooltip-dark: '0 10px 30px rgba(0, 179, 159, 0.28), 0 2px 8px rgba(0, 179, 159, 0.20), 0 0 1px rgba(0, 179, 159, 0.32)'
elevation:
  flat: none
  raised-sm: '0 3px 10px 0px rgba(0, 0, 0, 0.08)'
  raised-accent: '2px 2px 3px 0px #00B39F'
  floating-panel-light: '0 4px 16px rgba(234, 237, 238, 0.5)'
  floating-panel-dark: '0 4px 16px rgba(0, 13, 18, 0.5)'
  tooltip-light: '0 10px 30px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)'
  tooltip-dark: '0 10px 30px rgba(0, 179, 159, 0.28), 0 2px 8px rgba(0, 179, 159, 0.20), 0 0 1px rgba(0, 179, 159, 0.32)'
gradients:
  tint-light: 'linear-gradient(90deg, #477E96 0%, #455A64 100%)'
  tint-dark: 'linear-gradient(90deg, #28353A 0%, #3D4F57 100%)'
  panel-header-light: 'linear-gradient(90deg, #3B687B 0%, #507D90 100%)'
  panel-header-dark: 'linear-gradient(90deg, #28353A 0%, #3D4F57 100%)'
effects:
  card-wash: 'radial-gradient(circle 3000px at 50% 50%, rgba(30, 33, 23, 0) 0%, rgba(30, 33, 23, 0.05) 10%, rgba(30, 33, 23, 0.1) 100%)'
  panel-blur-light: 'rgba(234, 237, 238, 0.5)'
  panel-blur-dark: 'rgba(0, 13, 18, 0.5)'
components:
  app-shell-light:
    backgroundColor: '{colors.surface-light-app}'
    textColor: '{colors.on-surface-light}'
    typography: '{typography.textB1Regular}'
    padding: '{spacing.xxl}'
  app-shell-dark:
    backgroundColor: '{colors.surface-dark-app}'
    textColor: '{colors.on-surface-dark}'
    typography: '{typography.textB1Regular}'
    padding: '{spacing.xxl}'
  navigation-bar-light:
    backgroundColor: '{colors.navigation-light}'
    textColor: '{colors.on-navigation-light}'
    typography: '{typography.textB2SemiBold}'
    padding: '{spacing.lg}'
  navigation-bar-dark:
    backgroundColor: '{colors.navigation-dark}'
    textColor: '{colors.on-navigation-dark}'
    typography: '{typography.textB2SemiBold}'
    padding: '{spacing.lg}'
  button-primary:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.on-primary}'
    typography: '{typography.textB2SemiBold}'
    rounded: '{rounded.sm}'
    padding: 6px 16px
  button-primary-hover:
    backgroundColor: '{colors.primary-hover}'
    textColor: '{colors.on-primary}'
    typography: '{typography.textB2SemiBold}'
    rounded: '{rounded.sm}'
    padding: 6px 16px
  button-primary-pressed:
    backgroundColor: '{colors.primary-pressed}'
    textColor: '{colors.on-surface-light}'
    typography: '{typography.textB2SemiBold}'
    rounded: '{rounded.sm}'
    padding: 6px 16px
  button-secondary:
    backgroundColor: '{colors.secondary}'
    textColor: '{colors.on-secondary}'
    typography: '{typography.textB2SemiBold}'
    rounded: '{rounded.sm}'
    padding: 6px 16px
  button-cta:
    backgroundColor: '{colors.accent}'
    textColor: '{colors.on-accent}'
    typography: '{typography.textB2SemiBold}'
    rounded: '{rounded.sm}'
    padding: 6px 16px
  button-cta-hover:
    backgroundColor: '{colors.accent-hover}'
    textColor: '{colors.on-accent}'
    typography: '{typography.textB2SemiBold}'
    rounded: '{rounded.sm}'
    padding: 6px 16px
  card-standard-light:
    backgroundColor: '{colors.surface-light-card}'
    textColor: '{colors.on-surface-light}'
    rounded: '{rounded.sm}'
    padding: '{spacing.lg}'
  card-standard-dark:
    backgroundColor: '{colors.surface-dark-card}'
    textColor: '{colors.on-surface-dark}'
    rounded: '{rounded.sm}'
    padding: '{spacing.lg}'
  tab-selected-light:
    backgroundColor: '{colors.surface-light-tabs}'
    textColor: '{colors.on-surface-light}'
    typography: '{typography.textB2SemiBold}'
    rounded: '{rounded.sm}'
    padding: 12px 16px
  tab-selected-dark:
    backgroundColor: '{colors.surface-dark-tabs}'
    textColor: '{colors.on-surface-dark}'
    typography: '{typography.textB2SemiBold}'
    rounded: '{rounded.sm}'
    padding: 12px 16px
  input-field-light:
    backgroundColor: transparent
    textColor: '{colors.on-surface-light}'
    typography: '{typography.textB1Regular}'
    rounded: '{rounded.sm}'
    padding: 16px 14px
  input-field-dark:
    backgroundColor: transparent
    textColor: '{colors.on-surface-dark}'
    typography: '{typography.textB1Regular}'
    rounded: '{rounded.sm}'
    padding: 16px 14px
  checkbox:
    backgroundColor: transparent
    textColor: '{colors.on-surface-light}'
    rounded: '{rounded.xs}'
    size: 20px
  modal-header-light:
    backgroundColor: 'linear-gradient(90deg, #477E96 0%, #455A64 100%)'
    textColor: '{colors.on-primary}'
    typography: '{typography.textB1Regular}'
    rounded: '{rounded.md}'
    height: 52px
    padding: 11px 16px
  modal-header-dark:
    backgroundColor: 'linear-gradient(90deg, #28353A 0%, #3D4F57 100%)'
    textColor: '{colors.on-surface-dark}'
    typography: '{typography.textB1Regular}'
    rounded: '{rounded.md}'
    height: 52px
    padding: 11px 16px
  panel-floating-light:
    backgroundColor: 'rgba(234, 237, 238, 0.5)'
    textColor: '{colors.on-surface-light}'
    rounded: '{rounded.lg}'
    padding: '{spacing.xl}'
  panel-floating-dark:
    backgroundColor: 'rgba(0, 13, 18, 0.5)'
    textColor: '{colors.on-surface-dark}'
    rounded: '{rounded.lg}'
    padding: '{spacing.xl}'
  table-header-light:
    backgroundColor: '{colors.surface-light-muted}'
    textColor: '{colors.on-surface-light}'
    typography: '{typography.textB2SemiBold}'
    padding: '{spacing.lg}'
  table-header-dark:
    backgroundColor: '{colors.surface-dark-muted}'
    textColor: '{colors.on-surface-dark}'
    typography: '{typography.textB2SemiBold}'
    padding: '{spacing.lg}'
  badge-community:
    backgroundColor: '{colors.ribbon-community}'
    textColor: '{colors.on-ribbon}'
    typography: '{typography.textL1Bold}'
    rounded: '{rounded.full}'
    padding: 4px 8px
  badge-official:
    backgroundColor: '{colors.ribbon-official}'
    textColor: '{colors.on-accent}'
    typography: '{typography.textL1Bold}'
    rounded: '{rounded.full}'
    padding: 4px 8px
  badge-verified:
    backgroundColor: '{colors.ribbon-verified}'
    textColor: '{colors.on-ribbon}'
    typography: '{typography.textL1Bold}'
    rounded: '{rounded.full}'
    padding: 4px 8px
---

## 1. Overview & Architectural Boundaries

Sistent is the design system and UI component library for Layer5 products and open-source applications (such as Meshery). It provides a calm, technical visual identity built around:

- A cool, restrained neutral application shell.
- Vivid brand teal (`#00B39F`) for primary actions, navigation indicators, and active cues.
- Saffron (`#EBC017`) as an intentional CTA and badge accent.
- A first-class dark mode treated as a peer surface system rather than a naive color inversion.

### Document Scope & Separation of Concerns

To avoid contradictory guidance across the repository, documentation responsibilities are strictly separated:

- **`DESIGN.md` (UI & Design Contract)**:
  - **Owns**: Visual philosophy, semantic design tokens (frontmatter), verified token-to-code bridges, component conventions, interaction states, responsive layouts, evidence-backed accessibility guidance, and UI-specific AI guardrails.
  - **Strict Non-Goals**: Build tooling, rollup/dts configurations, npm releases, package dependency categorization, multi-repo schema definitions, and git commit signing (DCO).
- **`AGENTS.md` (Repository & Engineering Contract)**:
  - **Owns**: Contributor engineering runbooks, build/test gates, declaration bundling troubleshooting, optional peer rules, schema derivation contracts, and DCO requirements.
  - **Strict Non-Goals**: Visual styling choices, typography variants, component color palettes, and UI layout rules.
- **`package.json`**:
  - **Sole Authority** for installed framework and library versions (e.g. `@mui/material`, `react`, `typescript`).

---

## 2. Design System Architecture: The Five Implementation Layers

To make `DESIGN.md` an accurate, maintainable UI and design contract for humans and AI agents, the design vocabulary is kept distinct from runtime library APIs. Sistent recognizes five explicit architectural categories:

1. **Formal Design Tokens**:
   Abstract, platform-agnostic design concepts defined in the YAML frontmatter and design specifications (e.g., `colors.primary`, `spacing.lg`, `rounded.sm`, `typography.textH3Medium`, `strokes.light-default`). These represent the design system's legitimate semantic vocabulary and visual relationships across tools and specs.
   > **Integrity Rule**: Legitimate semantic design tokens must not be renamed, flattened, or erased solely because a runtime implementation library (MUI) exposes a different programmatic API.
2. **Canonical Theme Paths**:
   Official, typed Material UI theme properties defined in Sistent's theme architecture (`src/theme/palette.ts`, `src/theme/typography.ts`, `src/theme/theme.ts`) designed for application-level consumer code (e.g., `theme.palette.interactive.primary`, `theme.palette.surface.primary`, `theme.palette.border.default`, `theme.shape.borderRadius`, `theme.spacing(factor)`).
   > **Bridge Rule**: Runtime theme paths are documented as **implementation mappings** for formal design tokens, not as token replacements.
3. **Active Component Conventions**:
   Styling patterns and internal palette bindings actively implemented inside Sistent's component modifiers (`src/theme/components/*.modifier.ts`) or custom composite components (e.g., contained buttons binding `theme.palette.background.brand?.default`, tab bars binding `theme.palette.background.tabs`, cards binding `theme.palette.background.card`).
4. **Legacy / Compatibility Paths**:
   Historical theme properties maintained strictly to ensure backward compatibility with older components or downstream consumer applications like Meshery (e.g., `theme.palette.background.default` as the MUI fallback canvas, `theme.palette.primary.main`, `theme.palette.text.brand`).
5. **Observed Implementation Literals**:
   Concrete pixel, rem, or color literals currently hardcoded in source component styles because no formal theme path is bound to them (e.g., `0.5rem` / `8px` dialog Paper radius, `20px` checkbox size, `rgba(0, 0, 0, 0.5)` un-focused input border).
   > **Boundary Rule**: **The five architectural categories must not be conflated.** An observed implementation literal must never become a formal design token merely because it exists in source code, nor should it be promoted to a canonical design rule without evidence of shared design-system intent.

---

## 3. Explicit Design-Token-to-Implementation Mappings

Each table below establishes the explicit bridge from the **Formal Design Token** to its **Implementation Mapping**, classifying the layer and citing verified repository source evidence.

> **Multiple Consumers of One Design Token**:
> A formal design token may have multiple distinct semantic consumers. Those consumers are related by the shared design value, but are not interchangeable runtime APIs.
>
> For example:
>
> - `colors.accent` → primitive/design value → `background.cta.default` and `catalogStatus.official`
> - `colors.secondary` → primitive/design value → `text.secondary` and `icon.secondary`
>
> An AI agent must not infer that the semantic consumer paths themselves are interchangeable.

### A. Colors & Surface Semantics

> **Surface Semantics Rule**: Do not assume `theme.palette.background.card` is the universal token for all surfaces. Sistent distinguishes between application canvases, cards, modal bodies, panels, and data surfaces based on their structural role.

| Formal Design Token                 | Design Value (Light / Dark) | Semantic Role                   | Implementation Mapping                  | Implementation Layer            | Consumer Guidance & Source Evidence                                                                                                                                                                                                                                                                                                                                                                               |
| :---------------------------------- | :-------------------------- | :------------------------------ | :-------------------------------------- | :------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `colors.primary`                    | `#00B39F` / `#00B39F`       | Interactive Primary (Primitive) | `theme.palette.interactive.primary`     | Canonical Theme Path            | **Primary controls & active cues** (`src/theme/palette.ts`)                                                                                                                                                                                                                                                                                                                                                       |
| `colors.primary-hover`              | `#41CCB3` / `#41CCB3`       | Interactive Hover (Primitive)   | `theme.palette.interactive.hover`       | Canonical Theme Path            | **Hover state for primary controls** (`src/theme/palette.ts`)                                                                                                                                                                                                                                                                                                                                                     |
| `colors.primary-pressed`            | `#93E6D1` / `#93E6D1`       | Interactive Pressed (Primitive) | `theme.palette.interactive.pressed`     | Canonical Theme Path            | **Active & pressed states** (`src/theme/palette.ts`)                                                                                                                                                                                                                                                                                                                                                              |
| `colors.secondary`                  | `#3C494F` / `#B1B9BC`       | Secondary Neutral (Primitive)   | `Colors.CHARCOAL` (`#3C494F`)           | Formal Design Token             | Primitive neutral value (`src/theme/colors/colors.ts`); consumed via distinct semantic paths below                                                                                                                                                                                                                                                                                                                |
| ↳ _(semantic text consumer)_        | `#3C494F` / `#B1B9BC`       | Secondary Text / Captions       | `theme.palette.text.secondary`          | Canonical Theme Path            | Secondary body copy, hints, metadata (`src/theme/palette.ts`)                                                                                                                                                                                                                                                                                                                                                     |
| ↳ _(semantic icon consumer)_        | `#3C494F` / `#B1B9BC`       | Secondary Icon Fill             | `theme.palette.icon.secondary`          | Canonical Theme Path            | Passive / secondary icon elements (`src/theme/palette.ts`)                                                                                                                                                                                                                                                                                                                                                        |
| `colors.accent`                     | `#EBC017` / `#EBC017`       | Saffron Accent (Primitive)      | `Colors.SAFFRON` (`#EBC017`)            | Formal Design Token             | Primitive saffron value (`src/theme/colors/colors.ts`); consumed via distinct semantic paths below                                                                                                                                                                                                                                                                                                                |
| ↳ _(semantic CTA consumer)_         | `#EBC017` / `#EBC017`       | Call-to-Action Surface          | `theme.palette.background.cta?.default` | Active Component Convention     | High-visibility CTA button fills (`src/theme/palette.ts`)                                                                                                                                                                                                                                                                                                                                                         |
| ↳ _(semantic catalog consumer)_     | `#EBC017` / `#EBC017`       | Official Catalog Status Badge   | `theme.palette.catalogStatus.official`  | Canonical Theme Path            | Official status ribbons and badges (`src/theme/palette.ts`)                                                                                                                                                                                                                                                                                                                                                       |
| `colors.accent-hover`               | `#FFEB6B` / `#FFEB6B`       | CTA Hover Accent (Primitive)    | `#FFEB6B`                               | Formal Design Token             | Primitive CTA hover value; consumed via distinct semantic path below                                                                                                                                                                                                                                                                                                                                              |
| ↳ _(semantic CTA hover consumer)_   | `#FFEB6B` / `#FFEB6B`       | Call-to-Action Hover            | `theme.palette.background.cta?.hover`   | Active Component Convention     | Hover state for CTA buttons (`src/theme/palette.ts`)                                                                                                                                                                                                                                                                                                                                                              |
| `colors.navigation-light / dark`    | `#252E31` / `#000D12`       | Navigation Bar                  | `theme.palette.navigation.primary`      | Canonical Theme Path            | Application shell navigation bars and side drawers (`src/theme/palette.ts`)                                                                                                                                                                                                                                                                                                                                       |
| `colors.surface-light / dark-app`   | `#FDFDFD` / `#000D12`       | Surface Canvas (App)            | `theme.palette.surface.primary`         | Canonical Theme Path            | Application screen canvases and modal containers (`src/theme/palette.ts`)                                                                                                                                                                                                                                                                                                                                         |
| `colors.surface-light / dark-card`  | `#FDFDFD` / `#212121`       | Card / Table Container Binding  | `theme.palette.background.card`         | Active Component Binding        | Canonical token binding for card widgets, tables, and container surfaces (`src/custom/DataTableToolbar/DataTableToolbar.tsx`, `src/custom/DashboardWidgets/RecentDesignWidget.tsx`, `src/theme/components/table.modifier.ts`). Card backgrounds map strictly to `theme.palette.background.card` to maintain visual consistency across light and dark modes.                                                       |
| `colors.surface-light / dark-muted` | `#F6F8F8` / `#15272F`       | Panel / Data Surface            | `theme.palette.background.surfaces`     | Active Component Convention     | Panel bodies (`src/custom/Panel/style.tsx`), table headers (`src/theme/components/table.modifier.ts`, `src/theme/palette.ts`)                                                                                                                                                                                                                                                                                     |
| `colors.surface-light / dark-tabs`  | `#F6F8F8` / `#1A1A1A`       | Tabs Background                 | `theme.palette.background.tabs`         | Active Component Convention     | Segmented tab container bars (`src/theme/components/tab.modifier.ts`, `src/theme/palette.ts`)                                                                                                                                                                                                                                                                                                                     |
| `strokes.light / dark-default`      | `#EAEDEE` / `#15272F`       | Border Default                  | `theme.palette.border.default`          | Canonical Theme Path            | Standard card borders and dividers (`src/theme/palette.ts`)                                                                                                                                                                                                                                                                                                                                                       |
| `strokes.light / dark-strong`       | `#28353A` / `#8D9FA7`       | Border Strong                   | `theme.palette.border.strong`           | Canonical Theme Path            | Emphasized outlines and active boundaries (`src/theme/palette.ts`)                                                                                                                                                                                                                                                                                                                                                |
| `strokes.light / dark-normal`       | `#8C999E` / `#3D4F57`       | Border Normal                   | `theme.palette.border.normal`           | Canonical Theme Path            | Intermediate divider contrast (`src/theme/palette.ts`)                                                                                                                                                                                                                                                                                                                                                            |
| `icons.light / dark-primary`        | `#15272F` / `#D2D8DA`       | Primary Icon Fill               | `theme.palette.icon.default`            | Canonical Theme Path            | Standard icon fill (`src/theme/palette.ts`)                                                                                                                                                                                                                                                                                                                                                                       |
| `status-colors.info`                | `#2196F3` / `#2196F3`       | System Info                     | `theme.palette.status.info`             | Canonical Theme Path            | Informative alerts and chips (`src/theme/palette.ts`)                                                                                                                                                                                                                                                                                                                                                             |
| `status-colors.success`             | `#206D24` / `#206D24`       | System Success                  | `theme.palette.status.success`          | Canonical Theme Path            | Confirmation badges and success alerts (`src/theme/palette.ts`)                                                                                                                                                                                                                                                                                                                                                   |
| `status-colors.warning`             | `#F0A303` / `#F0A303`       | System Warning                  | `theme.palette.status.warning`          | Canonical Theme Path            | Caution alerts and warnings (`src/theme/palette.ts`)                                                                                                                                                                                                                                                                                                                                                              |
| `status-colors.error`               | `#F91313` / `#F91313`       | System Error                    | `theme.palette.status.error`            | Canonical Theme Path            | Error alerts and destructive actions (`src/theme/palette.ts`)                                                                                                                                                                                                                                                                                                                                                     |
| `gradients.tint-light / dark`       | Gradient                    | Header Tint Gradient            | `theme.palette.surface.tint`            | Canonical Theme Path            | Modal headers and drawer banners (`src/theme/palette.ts`)                                                                                                                                                                                                                                                                                                                                                         |
| —                                   | —                           | App Canvas (MUI default)        | `theme.palette.background.default`      | Legacy / Compatibility          | Baseline MUI fallback canvas (`src/theme/palette.ts`; prefer `surface.primary` in new code)                                                                                                                                                                                                                                                                                                                       |
| —                                   | `#FFFFFF` / `#3C494F`       | Elevated Surface (Semantic)     | `theme.palette.surface.elevated`        | Canonical Theme Path            | Semantic palette definition for elevated surfaces (`src/theme/palette.ts`, `src/theme/theme.ts`). Dark value resolves to `Colors.charcoal[40]` (`#3C494F`). Note: standard card widgets in Sistent map to `theme.palette.background.card` (`#212121` in dark mode); base `Card` (`src/base/Card/Card.tsx`) wraps MUI Card with default Paper elevation and radial wash (`src/theme/components/card.modifier.ts`). |
| —                                   | —                           | MUI Primary Main                | `theme.palette.primary.main`            | Legacy / Compatibility          | Baseline MUI primary (`src/theme/theme.ts`; prefer Sistent components or `interactive.primary`)                                                                                                                                                                                                                                                                                                                   |
| —                                   | —                           | Brand Text                      | `theme.palette.text.brand`              | Legacy / Compatibility          | Older text brand property; prefer `theme.palette.interactive.primary` in new code (`src/theme/palette.ts`)                                                                                                                                                                                                                                                                                                        |
| —                                   | `rgba(0, 0, 0, 0.5)`        | Un-focused Input Outline        | `rgba(0, 0, 0, 0.5)`                    | Observed Implementation Literal | Hardcoded in `src/theme/components/outlinedinput.modifier.ts` and `src/theme/components/input.modifier.ts`                                                                                                                                                                                                                                                                                                        |

---

### B. Spacing: Semantic Tokens vs Implementation Mapping

Spacing follows an **8px base grid rhythm**. In design specifications and frontmatter contracts, spacing is expressed via semantic design tokens (`spacing.*`). At runtime, Material UI implements this grid through the functional invocation `theme.spacing(factor)`, where `factor = pixelValue / 8`.

> **Mapping Rule**: `spacing.lg → 16px → theme.spacing(2)`.
> Designers and architects specify spacing using semantic tokens. Code authors and AI agents write the canonical runtime invocation `theme.spacing(factor)` rather than looking for phantom object properties like `theme.spacing.lg`.

| Formal Design Token           | Design Value (Spec) | Implementation Mapping | Grid Multiplier | Usage / Context                                                                    |
| :---------------------------- | :------------------ | :--------------------- | :-------------- | :--------------------------------------------------------------------------------- |
| `spacing.xxs`                 | `2px`               | `theme.spacing(0.25)`  | 0.25×           | Micro gaps, sub-pixel alignments (`2px` CSS literal approved strictly for borders) |
| `spacing.xs`                  | `4px`               | `theme.spacing(0.5)`   | 0.5×            | Tight chip/tag padding, inner gaps                                                 |
| `spacing.sm` / `spacing.base` | `8px`               | `theme.spacing(1)`     | 1.0×            | Base element separation (grid anchor)                                              |
| `spacing.md`                  | `12px`              | `theme.spacing(1.5)`   | 1.5×            | Compact card gutters, internal control padding                                     |
| `spacing.lg`                  | `16px`              | `theme.spacing(2)`     | 2.0×            | Standard container padding, button horizontal padding                              |
| `spacing.xl`                  | `20px`              | `theme.spacing(2.5)`   | 2.5×            | Modal and panel padding                                                            |
| `spacing.xxl`                 | `24px`              | `theme.spacing(3)`     | 3.0×            | Section separation                                                                 |
| `spacing.xxxl`                | `32px`              | `theme.spacing(4)`     | 4.0×            | Major layout gutters                                                               |

---

### C. Border Radii (Shapes): Semantic Tokens vs Implementation Mapping

Sistent defines a cohesive scale of border radii for controls and containers. In the runtime MUI theme, a single formal shape property is exposed: `theme.shape.borderRadius` (`4px`). Other radii in the design scale are implemented via component modifiers, composite wrappers, or explicit CSS literals.

> **Mapping Rule**: `rounded.sm → 4px → theme.shape.borderRadius`.
> An observed literal (e.g. `8px` on dialog containers) is documented as an implementation literal or component convention, not as a replacement for the design token `rounded.lg`.

| Formal Design Token | Design Value (Spec) | Implementation Mapping         | Implementation Layer            | Component Context / Evidence                                                                                                |
| :------------------ | :------------------ | :----------------------------- | :------------------------------ | :-------------------------------------------------------------------------------------------------------------------------- |
| `rounded.xs`        | `2px`               | CSS literal (`2px`)            | Observed Implementation Literal | Micro controls (`src/icons/Checkbox/CheckboxIcon.tsx:28`)                                                                   |
| `rounded.sm`        | `4px`               | `theme.shape.borderRadius`     | Canonical Theme Path            | Standard controls: Buttons, TextFields, base Cards (MUI default; not overridden in `src/theme/theme.ts`)                    |
| `rounded.md`        | `5px`               | CSS literal (`5px`)            | Observed Implementation Literal | Modal card headers & wrappers (`src/custom/ModalCard/style.tsx`, `src/custom/Dialog/style.tsx`)                             |
| `rounded.lg`        | `8px`               | CSS literal (`8px` / `0.5rem`) | Observed Implementation Literal | Modal dialog Paper (`src/custom/Modal/index.tsx`), floating panels (`src/custom/Panel/style.tsx`)                           |
| `rounded.xl`        | `15px`              | CSS literal (`15px`)           | Observed Implementation Literal | Featured card variants & image wells (`src/custom/CustomImage/CustomImage.tsx`)                                             |
| `rounded.xxl`       | `16px`              | CSS literal (`16px`)           | Active Component Convention     | Catalog showcase cards (`src/custom/CustomCatalog/CustomCard.tsx`, `src/custom/DashboardWidgets/styles.tsx`)                |
| `rounded.full`      | `9999px`            | CSS literal (`9999px` / `50%`) | Active Component Convention     | Avatars (`src/custom/CollaboratorAvatarGroup/CollaboratorAvatarGroup.tsx`), pills, badges (`src/custom/Carousel/style.tsx`) |

---

### D. Typography System

All 10 custom typography variants are registered in `MuiTypography` via `src/theme/typography.ts`. Consumer code must use these named variants rather than declaring arbitrary font styles:

| Formal Design Token         | Typography Spec                       | Canonical Runtime Usage                 | Responsive Behavior (`down('sm')`) | Primary Role                     |
| :-------------------------- | :------------------------------------ | :-------------------------------------- | :--------------------------------- | :------------------------------- |
| `typography.textH1Bold`     | `3.25rem` / `4rem`, 700               | `<Typography variant="textH1Bold">`     | Scales to `2rem` / `2.5rem`        | Top-level screen headers         |
| `typography.textH2Medium`   | `2rem` / `2.5rem`, 500                | `<Typography variant="textH2Medium">`   | Scales to `1.5rem` / `2.25rem`     | Primary section headers          |
| `typography.textH3Medium`   | `1.5rem` / `2.25rem`, 500             | `<Typography variant="textH3Medium">`   | Scales to `1rem` / `1.75rem` (700) | Card & modal titles              |
| `typography.textB1Regular`  | `1rem` / `1.75rem`, 400               | `<Typography variant="textB1Regular">`  | Preserves `1rem` / `1.75rem`       | Primary UI & body copy           |
| `typography.textB2SemiBold` | `1rem` / `1.75rem`, 600, `capitalize` | `<Typography variant="textB2SemiBold">` | Preserves `1rem` / `1.75rem`       | Action labels, active tab titles |
| `typography.textB3Regular`  | `0.875rem` / `1.5rem`, 400            | `<Typography variant="textB3Regular">`  | Fixed                              | Supporting labels, hints         |
| `typography.textL1Bold`     | `0.75rem` / `1rem`, 700               | `<Typography variant="textL1Bold">`     | Fixed                              | Ribbon badges, small chips       |
| `typography.textL2Regular`  | `0.75rem` / `1.5rem`, 400             | `<Typography variant="textL2Regular">`  | Fixed                              | Secondary metadata, captions     |
| `typography.textC1Regular`  | `0.75rem` / `1.5rem`, 400             | `<Typography variant="textC1Regular">`  | Fixed                              | Compact code blocks, UUIDs       |
| `typography.textC2Regular`  | `1rem` / `1.75rem`, 400               | `<Typography variant="textC2Regular">`  | Fixed                              | Standard monospace text          |

---

### E. Shadows, Elevation & Depth

- **Tooltip Elevation**: Encapsulated in `src/theme/components/tooltip.modifier.ts`. Automatically renders neutral shadow in light mode and a dual-tone teal luminescent glow in dark mode.
- **Card Surface Depth**: Encapsulated via the subtle radial wash in `src/theme/components/card.modifier.ts`.
- **Floating Panels**: Composed using backdrop blur: `boxShadow: 0 4px 16px ${theme.palette.background.blur?.light}` (`src/custom/Panel/style.tsx`).
- **Showcase Cards**: Accent shadow: `boxShadow: 2px 2px 3px 0px ${theme.palette.background.brand?.default}` (`src/custom/CatalogCard/style.tsx`).
- **Negative Constraint**: `theme.shadows` is a standard MUI 25-element tuple. Named keys like `theme.shadows['card-accent']` or `theme.elevation` do not exist.

---

## 4. Component Usage & Import Conventions

### Import Precedence Rule

> **"Prefer `@sistent/sistent` when a Sistent abstraction exists. Use `@mui/material` when no equivalent exists or when implementing Sistent itself."**

- **Base Controls**: Always import from `@sistent/sistent`:
  `Button`, `Card`, `CardContent`, `CardHeader`, `CardMedia`, `Checkbox`, `Dialog`, `IconButton`, `Select`, `Tab`, `Tabs`, `TextField`, `Tooltip`, `Typography`.
- **Custom Components**: Always import from `@sistent/sistent`:
  `ActionButton`, `CustomTooltip`, `DangerConfirmationModal`, `Modal`, `ModalBody`, `ModalFooter`, `Panel`, `ResponsiveDataTable`, `SearchBar`, `UniversalFilter`.
- **Dialog Abstraction Hierarchy**:
  - `Modal` (with `ModalBody`, `ModalFooter`) is Sistent's primary high-level dialog abstraction featuring the brand gradient header (`surface.tint`), action buttons, and responsive fullscreen handling.
  - Base `Dialog`, `DialogTitle`, `DialogContent`, and `DialogActions` (re-exported from `@sistent/sistent`) provide foundational primitives when custom or lower-level dialog composition is required.
- **MUI Fallbacks**: Permitted only when building internal Sistent primitives or when no Sistent wrapper exists.

---

## 5. Interaction States Matrix

Every documented interaction rule is grounded in source evidence and follows the verification chain:
$$\text{Source Evidence} \longrightarrow \text{Observed Behavior} \longrightarrow \text{Classification} \longrightarrow \text{Documented Rule}$$

Component-specific behaviors are never promoted to Canonical Design Rules without evidence of intentional, shared design-system usage.

| State / Trigger                                         | Source Evidence                                  | Observed Behavior                                                                                                            | Classification                  | Documented Rule                                                                                                            |
| :------------------------------------------------------ | :----------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------- | :------------------------------ | :------------------------------------------------------------------------------------------------------------------------- |
| **Contained Button Default**                            | `src/theme/components/button.modifier.ts`        | Sets `backgroundColor: brand?.default` (`#00B39F`), `color: constant?.white`                                                 | Active Component Convention     | Primary contained buttons fill with brand teal and white text.                                                             |
| **Contained Button Hover**                              | `src/theme/components/button.modifier.ts`        | Sets `backgroundColor: brand?.hover` (`#41CCB3`) on `&:hover`                                                                | Active Component Convention     | Contained buttons transition to brand hover fill (`#41CCB3`) on mouseover.                                                 |
| **Interactive Pressed / Active**                        | `src/theme/palette.ts` (`interactive.pressed`)   | Resolves to `Colors.keppel[60]` (`#93E6D1`); button modifiers rely on standard MUI ripple rather than an active pseudo-class | Canonical Theme Path            | Available in theme palette as the canonical pressed token; button components rely on native MUI ripple for click feedback. |
| **Outlined Button Default**                             | `src/theme/components/button.modifier.ts`        | Sets `border: 1px solid ${neutral?.default}`, background transparent                                                         | Active Component Convention     | Outlined buttons use neutral border with no fill.                                                                          |
| **Outlined Button Hover**                               | `src/theme/components/button.modifier.ts`        | Sets `backgroundColor: hover`, `color: TextNeutral?.default`                                                                 | Active Component Convention     | Outlined buttons receive subtle neutral hover tint on mouseover.                                                           |
| **Input Focus**                                         | `src/theme/components/outlinedinput.modifier.ts` | Sets `.MuiOutlinedInput-notchedOutline` border to `brand?.default` (`#00B39F`)                                               | Active Component Convention     | Text fields highlight the active border with brand teal (`#00B39F`).                                                       |
| **Input Un-focused**                                    | `src/theme/components/outlinedinput.modifier.ts` | Sets `borderColor: 'rgba(0, 0, 0, 0.5)'`                                                                                     | Observed Implementation Literal | Standard input outlines use semi-transparent neutral border when idle.                                                     |
| **Contained Button Disabled**                           | `src/theme/components/button.modifier.ts`        | Sets `backgroundColor: brand?.disabled`, `color: disabled`                                                                   | Active Component Convention     | Disabled contained buttons mute to brand-disabled background and disabled text.                                            |
| **Selected Tab**                                        | `src/theme/components/tab.modifier.ts`           | Sets `backgroundColor: background.tabs`, `color: defaultText`                                                                | Active Component Convention     | Selected tabs render dedicated tab background rather than pill fills.                                                      |
| **Semantic Color Actions (Error/Success/Warning/Info)** | `src/theme/components/button.modifier.ts`        | Respects semantic `color` prop, applying `error?.default`, etc., and computing contrast text with `getContrastText()`        | Active Component Convention     | Contained buttons with semantic color props apply status fills and accessible contrast labels.                             |

---

## 6. Authorization & Permissions

### Permission Rule

> **"When an action is authorization-controlled, use the existing Sistent permission mechanism and provide the appropriate `permissionKey`. Do not invent local permission logic."**

- Built-in native support exists on: `Button`, `IconButton`, `MenuItem`, `ListItem`, and `ListItemButton`.
- If unauthorized, the component automatically disables itself and shows a badge tooltip (`permissionAction="showShield"`, default) or renders nothing (`permissionAction="hide"`).
- **Applicability Scope**: Actions that are not authorization-controlled and standard informational triggers do **not** require `permissionKey`. The optional `permissionKey` prop is strictly for protected operations.
- Arbitrary custom triggers must be wrapped in `<PermissionShield permissionKey={key}>`.

---

## 7. Responsive Behavior & Accessibility (a11y) Guidance

- **Breakpoints**: Standard MUI breakpoints (`xs: 0`, `sm: 600px`, `md: 900px`, `lg: 1200px`, `xl: 1536px`).
- **Header Auto-Scaling**: `textH1Bold`, `textH2Medium`, and `textH3Medium` automatically scale down below the `sm` breakpoint via `src/theme/typography.ts`.
- **Dynamic Contrast & Readability**:
  - **Mechanism**: Use `readableTextColor(bg)` from `src/theme/theme.ts` when placing text over dynamic brand/custom background fills to automatically select high-contrast ink (`charcoal[10]` vs `charcoal[100]`).
  - **Design Guidance**: Aim for 4.5:1 contrast on standard text and 3:1 on large text/icons against their immediate surface.
  - **Enforcement Status**: Contrast is guided by theme tokens and helper utilities (`readableTextColor`), but is not enforced by a global automated linting/test suite across every component.
- **Label Capitalization**: Action labels use `textTransform: 'capitalize'` built into `textB2SemiBold`.
- **Semantic ARIA**: Icon-only buttons must supply descriptive `aria-label` and `Tooltip`.
- **Modal Dialog Accessibility (`aria-labelledby`)**: Sistent's `Modal` component (`src/custom/Modal/index.tsx`) hardcodes `aria-labelledby="alert-dialog-slide-title"` and `aria-describedby="alert-dialog-slide-description"` on the underlying dialog, while its internal title element does not currently forward an `id`. To avoid duplicate-ID collisions across multiple dialog instances in the DOM, adding per-instance `titleId` / `descriptionId` prop forwarding (e.g. via `useId`) is not yet tracked as a dedicated issue.

---

## 8. Canonical Code Recipes

All code recipes below are verified against Sistent's public component exports (`@sistent/sistent`), actual source props, and canonical token mappings:

### Recipe 1: Container Card Surface with Light/Dark Support

_Verified export_: `Card`, `CardContent`, `Typography`, `Box` from `@sistent/sistent` (`src/base/Card/Card.tsx`, `src/base/CardContent/CardContent.tsx`).

The exported Sistent `Card` abstraction encapsulates container surface styling, default border radius (`theme.shape.borderRadius` / 4px), and the subtle radial wash from `src/theme/components/card.modifier.ts`. Similarly, `CardContent` provides default container padding. AI agents and application developers should use the clean Sistent abstraction directly rather than manually restyling properties the component already owns.

```tsx
import React from 'react';
import { Card, CardContent, Typography, Box } from '@sistent/sistent';

export const ContentCard: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children
}) => (
  <Card>
    <CardContent>
      <Typography variant="textH3Medium" component="h3">
        {title}
      </Typography>
      <Box sx={{ mt: 1.5 }}>{children}</Box>
    </CardContent>
  </Card>
);
```

> **Deliberate Customization Note**: When building a specialized variant (such as an outlined card with a visible stroke or custom padding), apply explicit styling via standard MUI `sx` object notation (e.g. `<Card variant="outlined" sx={{ borderColor: 'border.default' }}>`). Do not manually recreate base card styles when the standard Sistent abstraction suffices.

### Recipe 2: Authorization-Controlled Action Button

_Verified export_: `Button` from `@sistent/sistent` (`src/base/Button/Button.tsx`).

> **Note**: This pattern applies strictly to actions that are authorization-controlled and require an explicit permission gate. Standard actions and informational triggers should omit `permissionKey`.

```tsx
import React from 'react';
import { Button } from '@sistent/sistent';
import type { Key } from '@meshery/schemas/permissions';

interface ProtectedActionProps {
  label: string;
  onClick: () => void;
  permissionKey: Key;
}

export const ProtectedActionButton: React.FC<ProtectedActionProps> = ({
  label,
  onClick,
  permissionKey
}) => (
  <Button
    variant="contained"
    color="primary"
    onClick={onClick}
    permissionKey={permissionKey}
    permissionAction="showShield"
  >
    {label}
  </Button>
);
```

---

## 9. AI Coding Guardrails (UI & Styling Specific)

1. **Design Tokens ≠ Runtime Theme API**:
   > Translate semantic tokens into canonical runtime calls (`spacing.lg` → `theme.spacing(2)`, `rounded.sm` → `theme.shape.borderRadius`). Never write phantom paths like `theme.spacing.lg` or `theme.rounded.sm`.
2. **Color Literal Rule**:
   > Consumer/UI code must not introduce new raw color literals when an existing semantic Sistent token applies. Theme source and token definitions are exempt.
3. **Spacing & Shape Token Rule**:
   > Consumer/UI code must use `theme.spacing(factor)` for element layout and gutters. Do not invent arbitrary inline pixel offsets when an 8px grid factor satisfies the requirement.
4. **Component Import Rule**:
   > Prefer `@sistent/sistent` when a Sistent abstraction exists. Use `@mui/material` when no equivalent exists or when implementing Sistent itself.
5. **Permission Rule**:
   > When an action is authorization-controlled, use the existing Sistent permission mechanism and provide the appropriate `permissionKey`. Do not invent local permission logic.
6. **No Manual Dark-Mode Forking**:
   > Avoid manual conditionals like `theme.palette.mode === 'dark' ? '#212121' : '#fff'`. Use semantic tokens that resolve automatically (`theme.palette.background.card` for card containers, `theme.palette.surface.primary` for application canvases, `theme.palette.text.default` for typography).
7. **Preserve Typography Variants**:
   > Use `<Typography variant="textH1Bold">` through `<Typography variant="textC2Regular">` rather than ad-hoc inline font declarations.

---

## 10. Documentation / Implementation Drift Protocol

When `DESIGN.md` and repository source code disagree:

1. **Do not silently change the design contract.**
2. **Determine discrepancy classification**:
   - **Documentation Drift**: The source implementation was updated intentionally, but `DESIGN.md` was not updated to match (e.g. `surface-dark-card` frontmatter was `#121212` vs code `#212121`).
   - **Implementation Drift**: A component diverges from established design tokens due to an accidental or ad-hoc local override.
   - **Intentional Legacy / Compatibility Behavior**: An older token path maintained to avoid breaking consumer downstream imports (e.g. `background.default`).
   - **Intentional Exception**: A component has a specialized visual requirement that intentionally diverges from the standard token.
3. **Open a tracking issue to document the discrepancy for design-system maintainer review.**
4. **Only change the design contract when there is an explicit design-system decision to do so.**
5. **Do not make unrelated design changes during AI-context work.**

---

## 11. Do's and Don'ts

- **Do** keep teal (`#00B39F`) as the default primary interaction color.
- **Do** reserve gradients (`surface.tint`) for modal headers, drawer banners, and structural framing.
- **Do** prefer tonal layering, border contrast, and subtle surface depth before adding large shadows.
- **Do** treat dark mode as a fully supported surface system, not a simple color inversion.
- **Do** use `theme.spacing(factor)` for all layout margins and paddings (`spacing.lg` → `theme.spacing(2)`).
- **Don't** flood content areas with saturated fills.
- **Don't** overuse large radii on utilitarian controls; reserve `16px` for showcase cards.
- **Don't** replace neutral text with accent colors unless the content is genuinely interactive or status-bearing.
- **Don't** write phantom theme paths like `theme.spacing.lg` or `theme.rounded.sm`.
