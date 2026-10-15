import type { StepIconProps } from '@mui/material';
import React from 'react';
import { Step, StepLabel, Stepper } from '../../base';
import { GITHUB_IMPORT_CONNECT_WIZARD_STEPS, type GitHubWizardStepDefinition } from './steps';
import {
  ActionPane,
  InfoPane,
  StepBadge,
  StepLabelPrimary,
  StepLabelSecondary,
  StepRail,
  VisuallyHidden,
  WizardBody,
  WizardRoot,
  WizardStepConnector
} from './style';

export interface GitHubImportConnectWizardProps {
  /** Index of the step being shown. Steps before it render completed unless skipped. */
  activeStep: number;
  /** The step rail. Defaults to Cloud's seven steps, `GITHUB_IMPORT_CONNECT_WIZARD_STEPS`. */
  steps?: readonly GitHubWizardStepDefinition[];
  /**
   * Indices of steps the user skipped (Cloud's SKIP on "Enable Snapshots"
   * jumps to Finish). They precede `activeStep` but render not completed.
   */
  skippedSteps?: readonly number[];
  /**
   * Content of the explanatory pane beside the active step, normally a
   * `GitHubWizardInfo`. Omit it for a single-pane layout. The pane is hidden
   * below the `md` breakpoint, as in Cloud, so the step must stand on its own.
   */
  info?: React.ReactNode;
  /** The active step, normally a `GitHubWizardStep`. */
  children: React.ReactNode;
  /** Accessible name of the wizard region. Defaults to "GitHub connection wizard". */
  'aria-label'?: string;
}

interface WizardStepIconProps extends StepIconProps {
  optional?: boolean;
}

function WizardStepIcon({ active, completed, icon, optional, className }: WizardStepIconProps) {
  return (
    <StepBadge
      className={className}
      ownerState={{
        active: Boolean(active),
        completed: Boolean(completed),
        optional: Boolean(optional)
      }}
      aria-hidden
    >
      {icon}
    </StepBadge>
  );
}

const stepLabelSlots = { stepIcon: WizardStepIcon };

/**
 * The GitHub connect / import wizard shell, extracted from Meshery Cloud's
 * connect stepper (`ui/components/connect/stepper/stepper.tsx` and
 * `ui/components/connect/styles.tsx`): a step rail over a two-pane body, the
 * explanatory `info` pane on the left and the active step on the right.
 *
 * Fully controlled and data-free. The host owns `activeStep`, the step bodies,
 * every request, and persistence; compose `GitHubWizardStep`,
 * `GitHubWizardInfo`, `GitHubConnectButton`, and `GitHubConnectionNotice`
 * inside it.
 */
export function GitHubImportConnectWizard({
  activeStep,
  steps = GITHUB_IMPORT_CONNECT_WIZARD_STEPS,
  skippedSteps,
  info,
  children,
  'aria-label': ariaLabel = 'GitHub connection wizard'
}: GitHubImportConnectWizardProps): JSX.Element {
  const hasInfo = info !== undefined && info !== null && info !== false;
  const railRef = React.useRef<HTMLDivElement>(null);

  // On a narrow host the rail scrolls; keep the active step in view as the
  // wizard advances. Only the rail scrolls, never the page.
  React.useEffect(() => {
    const rail = railRef.current;
    const current = rail?.querySelector<HTMLElement>('[aria-current="step"]');
    if (!rail || !current || rail.scrollWidth <= rail.clientWidth) return;
    rail.scrollLeft = current.offsetLeft - (rail.clientWidth - current.offsetWidth) / 2;
  }, [activeStep, steps]);

  return (
    <WizardRoot role="region" aria-label={ariaLabel} data-testid="github-import-connect-wizard">
      <StepRail ref={railRef}>
        <Stepper alternativeLabel activeStep={activeStep} connector={<WizardStepConnector />}>
          {steps.map((step, index) => {
            const skipped = skippedSteps?.includes(index) ?? false;
            const state =
              index === activeStep
                ? 'active'
                : skipped
                  ? 'skipped'
                  : index < activeStep
                    ? 'completed'
                    : 'upcoming';
            return (
              <Step
                key={step.id}
                completed={skipped ? false : undefined}
                aria-current={index === activeStep ? 'step' : undefined}
                data-testid={`github-wizard-step-${step.id}`}
                data-state={state}
              >
                <StepLabel
                  icon={step.icon ?? <span>{index + 1}</span>}
                  slots={stepLabelSlots}
                  slotProps={{
                    stepIcon: { optional: step.optional } as Partial<WizardStepIconProps>
                  }}
                >
                  <StepLabelPrimary>{step.label}</StepLabelPrimary>
                  {step.secondaryLabel && (
                    <StepLabelSecondary>{step.secondaryLabel}</StepLabelSecondary>
                  )}
                  {/* The badge is decorative, so its state is spoken here instead. */}
                  {(state === 'completed' || state === 'skipped' || step.optional) && (
                    <VisuallyHidden>
                      {`, ${[
                        state === 'completed' && 'completed',
                        state === 'skipped' && 'skipped',
                        step.optional && 'optional'
                      ]
                        .filter(Boolean)
                        .join(', ')}`}
                    </VisuallyHidden>
                  )}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </StepRail>
      <WizardBody hasInfo={hasInfo}>
        {hasInfo && <InfoPane data-testid="github-wizard-info-pane">{info}</InfoPane>}
        <ActionPane>{children}</ActionPane>
      </WizardBody>
    </WizardRoot>
  );
}

export default GitHubImportConnectWizard;
