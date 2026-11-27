import React from 'react';
import {
  CodeIcon,
  EmojiEventsIcon,
  FolderRoundedIcon,
  GetAppIcon,
  GithubIcon,
  LockIcon,
  OutlinedScreenshotIcon
} from '../../icons';

/** One entry on the wizard's step rail. */
export interface GitHubWizardStepDefinition {
  /** Stable identifier, used as the React key. */
  id: string;
  /** First label line, e.g. "Enable Snapshots". */
  label: string;
  /** Optional second label line, e.g. "(Configure Secrets)". */
  secondaryLabel?: string;
  /**
   * Glyph inside the step badge. Draw it with `currentColor` so it follows the
   * badge through the idle, active, completed, and dark-mode states.
   */
  icon?: React.ReactNode;
  /** Optional steps get a dashed badge ring (Cloud's `optionalSteps`). */
  optional?: boolean;
}

/**
 * The seven steps of Meshery Cloud's GitHub connect / import wizard, in Cloud's
 * order and wording (`ui/components/connect/stepper/constants.tsx`: `steps` and
 * `optionalSteps`). The three "Enable Snapshots" steps are optional.
 *
 * Hosts that run a shorter flow (Kanvas imports without snapshots) pass their
 * own subset: `GITHUB_IMPORT_CONNECT_WIZARD_STEPS.filter(...)`. Hosts with
 * branded glyphs map over it to swap `icon`.
 */
export const GITHUB_IMPORT_CONNECT_WIZARD_STEPS: readonly GitHubWizardStepDefinition[] = [
  {
    id: 'connect-app',
    label: 'Connect GitHub App',
    icon: <GithubIcon fill="currentColor" />
  },
  {
    id: 'select-repositories',
    label: 'Select Repositories',
    icon: <FolderRoundedIcon fill="currentColor" />
  },
  {
    id: 'import-designs',
    label: 'Import Designs',
    icon: <GetAppIcon fill="currentColor" />
  },
  {
    id: 'snapshot-select-designs',
    label: 'Enable Snapshots',
    secondaryLabel: '(Select Designs)',
    optional: true,
    icon: <OutlinedScreenshotIcon fill="currentColor" />
  },
  {
    id: 'snapshot-configure-secrets',
    label: 'Enable Snapshots',
    secondaryLabel: '(Configure Secrets)',
    optional: true,
    icon: <LockIcon fill="currentColor" />
  },
  {
    id: 'snapshot-add-workflows',
    label: 'Enable Snapshots',
    secondaryLabel: '(Add Workflows)',
    optional: true,
    icon: <CodeIcon fill="currentColor" />
  },
  {
    id: 'finish',
    label: 'Finish',
    icon: <EmojiEventsIcon fill="currentColor" />
  }
];
