# [Sistent](https://design.layer5.io) UX Design System: GitHub Connection Pattern

## Overview

Connecting a GitHub App, picking repositories, and importing designs from them is one experience
that several Layer5 products offer: Meshery Cloud owns it today, and Kanvas needs the same flow.
Sistent ships the presentational primitives for it, so every host renders the same wizard instead
of forking Cloud's UI. Hosts keep everything that is theirs: the GitHub App URL, the handoff to
GitHub, every request, and persistence.

The primitives live in `src/custom/GitHubConnection/` and are exported from `@sistent/sistent`.
Their states are demonstrated in `GitHubConnection.stories.tsx` (CSF3) and tested in
`src/__testing__/GitHubConnection.test.tsx`.

## Extract, publish, consume

The flow these primitives exist to enforce
([layer5io/sistent#1847](https://github.com/layer5io/sistent/issues/1847)):

1. **Extract from Cloud.** Meshery Cloud's wizard is the source of truth for behavior and UX. A
   presentational pattern moves into Sistent only after it exists in Cloud, generalized so that
   no Cloud data, routes, or API calls come with it. A change to the look of the flow is made
   here, not in a host.
2. **Publish.** The primitives ship in `@sistent/sistent` like any other component.
3. **Cloud and Kanvas consume.** Both hosts compose the same exports and supply data and
   callbacks. Neither re-implements the connect button, status, notices, or wizard chrome, so a
   fix lands once and reaches both.

### Where each primitive comes from

| Sistent export                       | Extracted from (meshery-cloud `ui/`)                                                                                                             |
| :----------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| `GitHubImportConnectWizard`          | `components/connect/stepper/stepper.tsx` (rail and two-pane layout), `components/connect/styles.tsx` (connector, step badge, panes)              |
| `GITHUB_IMPORT_CONNECT_WIZARD_STEPS` | `components/connect/stepper/constants.tsx` (`steps`, `optionalSteps`)                                                                            |
| `GitHubWizardStep`                   | `components/connect/stepper/stepper-content.tsx` (`StepperContent`: heading, body, tips, Cancel/Back and secondary/primary footer)               |
| `GitHubWizardInfo`                   | `components/connect/stepper/info-panel.tsx` (`StepInfoPanel`, `StepInfo`)                                                                        |
| `GitHubConnectButton`                | `stepper-content.tsx` (`ConnectApp` CONNECT action) and `workspaces/integrations/connection-card.tsx` (CONNECT / RECONFIGURE)                    |
| `GitHubConnectionStatus`             | `workspaces/integrations/common.tsx` (connection status chip), `components/connect/verify/` (verifying), plus the missing reconnect path         |
| `GitHubConnectionNotice`             | New: the recovery states Cloud lacked when CONNECT failed silently ([meshery-cloud#6116](https://github.com/layer5io/meshery-cloud/issues/6116)) |

What stays in the host: `api/github.ts`, `store/slices/connection.ts`, the route orchestration in
`components/connect/index.tsx` and `pages/connect/[...connection].tsx`, the GitHub App URL and
`startGithubAppInstall`, and the step bodies that fetch data (repository list, file tree, token
generation, workflow install). Those bodies render inside `GitHubWizardStep` as `children`.

## Primitives

### `GitHubImportConnectWizard`

The shell: a step rail over a two-pane body. Fully controlled.

| Prop           | Type                                    | Notes                                                                                        |
| :------------- | :-------------------------------------- | :------------------------------------------------------------------------------------------- |
| `activeStep`   | `number`                                | Earlier steps render completed, later steps upcoming.                                        |
| `steps`        | `readonly GitHubWizardStepDefinition[]` | Defaults to Cloud's seven steps. Pass a subset for a shorter flow.                           |
| `skippedSteps` | `readonly number[]`                     | Steps before `activeStep` the user skipped; drawn not completed (Cloud's SKIP on snapshots). |
| `info`         | `ReactNode`                             | Explanatory pane, normally `GitHubWizardInfo`. Hidden below `md`; omit for one pane.         |
| `children`     | `ReactNode`                             | The active step, normally `GitHubWizardStep`.                                                |

A `GitHubWizardStepDefinition` is `{ id, label, secondaryLabel?, icon?, optional? }`. Optional
steps get a dashed badge ring. Draw step icons with `currentColor`.

### `GitHubWizardStep`

The action pane of one step: `title`, `subtitle`, `children`, `tips`, and a footer.
`primaryAction` and `secondaryAction` take `{ label, onClick, disabled?, loading? }`
(`secondaryAction` also takes `variant`); `primaryAction` also accepts an element, such as
`<GitHubConnectButton />` on the CONNECT step. `onBack` and `onCancel` render BACK and CANCEL.

### `GitHubWizardInfo`

Copy for the info pane: `title`, `subtitle`, `description`, `additionalInfo`, `tips`.

### `GitHubConnectButton`

The CONNECT call to action. `connected` flips the label to "Reconfigure"; `loading` shows
progress and blocks a second click; `label` and `loadingLabel` override the text. It accepts every
Sistent `Button` prop, including `permissionKey`.

### `GitHubConnectionStatus`

`status` is `'not-connected' | 'verifying' | 'connected' | 'error'`, with `account`, `message`,
and, in the error state, `onReconnect` (plus `reconnectLabel`, `reconnecting`).

### `GitHubConnectionNotice`

`kind` is one of:

- `empty`: nothing to list yet, such as an installation that can see no repositories. Pair it
  with an `action`, for example "Add repository".
- `error`: the handoff or a request failed. Offer `onRetry`.
- `popup-blocked`: the browser blocked the GitHub window. Offer `onRetry` and a same-tab
  `fallbackHref`.
- `redirecting`: a same-tab handoff is under way; `fallbackHref` lets the user follow it by hand.

`title` and `message` override the defaults; `retryLabel`, `retrying`, `fallbackLabel`, and
`onFallbackClick` tune the actions.

## Host responsibilities

- **Never leave CONNECT silent.** Set `loading` on `GitHubConnectButton` synchronously in the
  click handler, before navigating or opening a window. Clear it when the handoff fails and show
  a `GitHubConnectionNotice` (`error` or `popup-blocked`) instead.
- **Detect a blocked popup.** `window.open` returns `null` (or a window that closes immediately)
  when a popup blocker intervenes. Show `popup-blocked` with the installation URL as
  `fallbackHref`: it renders as a real link, so following it is a user-initiated navigation that
  no blocker can stop.
- **Time out the handoff.** If GitHub never hands the user back, return the wizard to a state the
  user can retry from, and keep what they already chose; the wizard holds no state of its own.
- **Gate actions with permissions** where the host requires them, through `permissionKey`.

## Composition

```tsx
import {
  GITHUB_IMPORT_CONNECT_WIZARD_STEPS,
  GitHubConnectButton,
  GitHubConnectionNotice,
  GitHubImportConnectWizard,
  GitHubWizardInfo,
  GitHubWizardStep
} from '@sistent/sistent';

<GitHubImportConnectWizard
  activeStep={0}
  steps={GITHUB_IMPORT_CONNECT_WIZARD_STEPS}
  info={<GitHubWizardInfo title="Setting up your GitHub integration" subtitle={intro} />}
>
  <GitHubWizardStep
    title="Setting up your GitHub integration"
    subtitle={intro}
    onCancel={leaveWizard}
    primaryAction={<GitHubConnectButton loading={handoff === 'connecting'} onClick={connect} />}
  >
    {handoff === 'popup-blocked' && (
      <GitHubConnectionNotice kind="popup-blocked" onRetry={connect} fallbackHref={installUrl} />
    )}
  </GitHubWizardStep>
</GitHubImportConnectWizard>;
```

## Deliberate departures from Cloud

These are fixes made while extracting, so adopting the primitives changes Cloud's look slightly:

- **Dark mode works.** Cloud's info pane gradient ends in `text.default`, which turns near-white
  in dark mode and hides the white copy on top of it; the pane now ends in a constant ink. Step
  badges, rings, and the connector use theme tokens instead of light-only values (`#d7d7d9`
  rings, always-white badges), and BACK / CANCEL use the neutral button fill instead of
  `text.secondary` repurposed as a background, which put white text on light gray in dark mode.
- **Action labels follow the design system.** Labels are capitalized ("Connect"), as Sistent
  buttons are, rather than Cloud's forced upper case ("CONNECT").
- **Loading keeps its label.** A loading action shows a spinner beside its label instead of
  replacing it, so the footer does not jump and the action stays named for assistive technology.
- **State is announced.** The active step carries `aria-current="step"`; completed, skipped, and
  optional steps say so to screen readers; status and notices use live regions that exclude
  their actions.
- **Step glyphs share one size.** Cloud draws the GitHub badge at 48px and the rest at 24px; all
  badges now use 24px glyphs. The default glyphs come from Sistent's icon set.
- **The rail scrolls on narrow hosts** and keeps the active step in view, instead of squeezing
  seven steps into a phone-width panel.

## Not covered yet

- A repository pick list and a design file tree are still host step bodies. Cloud's
  `SelectRepository` and `FileExplorer` are the candidates to extract next.
- The extraction leaves two steppers in Sistent: this wizard's rail and `CustomizedStepper`
  (used across Meshery UI). Unifying them is a design decision for a follow-up, not a side effect
  of this pattern.
