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
| `GitHubRepositoryPicker`             | `stepper-content.tsx` (`SelectRepository`: the multi-select of `owner/name` with a checkbox per row, paged in on menu scroll)                    |
| `GitHubFileTree`                     | `components/general/file-explorer.tsx` (`FileExplorer`: folder tree, folder-selects-files, extension filter, imported/error marks)               |
| `GitHubRepositorySection`            | `stepper-content.tsx` (`AddApplicationPaths` and `Finish`: per-repository accordion with selected / imported / failed badges)                    |
| `GitHubFinishSummary`                | `stepper-content.tsx` (`Finish`, `WorkflowStatus`, `ImportedDesigns`: workflow outcome with retry, created designs, failed files)                |

What stays in the host: `api/github.ts`, `store/slices/connection.ts`, the route orchestration in
`components/connect/index.tsx` and `pages/connect/[...connection].tsx`, the GitHub App URL and
`startGithubAppInstall`, and every request behind the step bodies: paging repositories and
scanned files, importing, token generation, and workflow install. The host feeds the results to
the pick lists and the Finish summary, which render inside `GitHubWizardStep` as `children`, and
it owns policy such as pre-selecting a lone repository or the repositories already on a
connection being reconfigured.

## Primitives

### `GitHubImportConnectWizard`

The shell: a step rail over a two-pane body. Fully controlled.

| Prop           | Type                                    | Notes                                                                                                                                 |
| :------------- | :-------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `activeStep`   | `number`                                | Earlier steps render completed, later steps upcoming.                                                                                 |
| `steps`        | `readonly GitHubWizardStepDefinition[]` | Defaults to Cloud's seven steps. Pass a subset for a shorter flow.                                                                    |
| `skippedSteps` | `readonly number[]`                     | Steps the user skipped (Cloud's SKIP on snapshots). Those before `activeStep` are drawn skipped, not completed; the rest are ignored. |
| `info`         | `ReactNode`                             | Explanatory pane, normally `GitHubWizardInfo`. Hidden below `md`; omit for one pane.                                                  |
| `children`     | `ReactNode`                             | The active step, normally `GitHubWizardStep`.                                                                                         |

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

### `GitHubRepositoryPicker`

The "Select Repositories" pick list. Controlled: `repositories` and `selected` are `owner/name`
strings, and `onChange` receives the new selection. For paging, pass `hasMore`, `loading`, and
`onLoadMore`; scrolling the menu to its end calls `onLoadMore`, and so does opening a menu too
short to scroll, once per repository count, so a failed page is not re-requested on its own. It is never called while `loading` or once `hasMore` is false, so set `loading`
for the duration of each fetch. When the installation sees nothing, render `GitHubConnectionNotice kind="empty"`
instead.

### `GitHubFileTree`

The design file picker. `items` are `GitHubFileTreeNode`s:
`{ id, label, type: 'file' | 'dir', children?, status?: 'imported' | 'error', statusMessage? }`.
`selected` holds **file ids only**, and `onSelectionChange` receives the new list; a folder's
checkbox selects or clears every visible file under it and shows a mixed state when only some are
selected. `supportedExtensions` hides other files and the folders left empty (`null` shows every
file, Cloud's "Show all file types"); `singleSelect` allows one file and no folder selection (the
snapshot design picker). Paging works as on the picker: `hasMore`, `loading`, `onLoadMore`; a tree that does not fill
`maxHeight`, such as a page the filter emptied, asks for the next page without a scroll, once per item count.
`emptyMessage`, `defaultExpanded`, `maxHeight`, and `aria-label` tune the rest.

### `GitHubRepositorySection`

One repository's collapsible section: `repository`, `counts` (`selected`, `imported`, `failed`),
and `children`, normally a `GitHubFileTree`. While `selected` is non-zero it is the only badge,
as in Cloud. Expansion is controlled through `expanded` and `onChange`, or left to the section.

### `GitHubFinishSummary`

The Finish body: one `GitHubRepositorySection` per entry of `repositories`, each a
`GitHubFinishRepository` of `{ name, importedDesigns, failedImports?, workflow? }`. `workflow` is
`{ status: 'configured' | 'failed' | 'not-configured', message?, onRetry?, retrying? }`; omit it in
a flow without snapshots. `onViewDesign(design, repository)` adds a View action per created design.
One section is open at a time. Put the total in the `GitHubWizardStep` subtitle, as Cloud does.

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
- **The pick lists stay out of each other's state.** Cloud's `FileExplorer` kept its own
  selection and reported it through a ref; `GitHubFileTree` is controlled and its selection is
  file ids only. Cloud's loading row inside the repository menu could be clicked into the
  selection as `undefined`; here it is an inert, disabled row.
- **Folders expand from a button.** Each folder has a labelled disclosure button with
  `aria-expanded`, and folder checkboxes say which folder they select.
- **Repository sections and count badges use surface tokens** instead of `text.disabled` fills
  and white-on-brand chips, so they read in dark mode.

## Not covered yet

- The extraction leaves two steppers in Sistent: this wizard's rail and `CustomizedStepper`
  (used across Meshery UI). Unifying them is a design decision for a follow-up, not a side effect
  of this pattern.
