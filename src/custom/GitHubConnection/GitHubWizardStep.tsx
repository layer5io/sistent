import React from 'react';
import { Button, CircularProgress, Divider, Typography } from '../../base';
import { FooterGroup, NeutralButton, StepBody, StepFooter, StepFrame, TipsCallout } from './style';

/** A footer action of a wizard step. */
export interface GitHubWizardAction {
  label: string;
  onClick: () => void;
  /** Blocks the action, e.g. NEXT until a repository is selected. */
  disabled?: boolean;
  /** The action's work is in flight: disables it and shows progress beside the label. */
  loading?: boolean;
}

export interface GitHubWizardStepProps {
  /** Step heading, drawn above a divider. Cloud only titles the CONNECT step; the rest rely on the info pane. */
  title?: React.ReactNode;
  /** Lead paragraph. Newlines are preserved. */
  subtitle?: React.ReactNode;
  /** The step's working surface: a repository pick list, a file tree, a token field, a summary. */
  children?: React.ReactNode;
  /** Supporting tip under the body. */
  tips?: React.ReactNode;
  /**
   * Right-most action: NEXT, FINISH. Pass an element instead of an action to
   * place a ready-made control there, such as `<GitHubConnectButton />` on the
   * CONNECT step.
   */
  primaryAction?: GitHubWizardAction | React.ReactElement;
  /** Action left of the primary one: IMPORT, SKIP, ADD REPOSITORY. */
  secondaryAction?: GitHubWizardAction & {
    /** Defaults to `outlined`; Cloud draws IMPORT `contained`. */
    variant?: 'contained' | 'outlined';
  };
  /** Renders BACK at the start of the footer. */
  onBack?: () => void;
  /** Renders CANCEL at the start of the footer. */
  onCancel?: () => void;
  backLabel?: string;
  cancelLabel?: string;
}

const progressIcon = <CircularProgress color="inherit" size={16} aria-hidden />;

/**
 * The action pane of one wizard step, extracted from the `StepperContent`
 * frame in Meshery Cloud's `stepper/stepper-content.tsx`: heading, body, tip,
 * and a footer with CANCEL / BACK on the left and the secondary and primary
 * actions on the right.
 *
 * Unlike Cloud, a loading action keeps its label (the spinner sits beside it),
 * so the footer does not jump while work is in flight.
 */
export function GitHubWizardStep({
  title,
  subtitle,
  children,
  tips,
  primaryAction,
  secondaryAction,
  onBack,
  onCancel,
  backLabel = 'Back',
  cancelLabel = 'Cancel'
}: GitHubWizardStepProps): JSX.Element {
  const hasLeading = Boolean(onCancel || onBack);
  const hasTrailing = Boolean(primaryAction || secondaryAction);

  return (
    <StepFrame data-testid="github-wizard-step">
      {title && (
        <>
          <Typography variant="textH3Medium" component="h2">
            {title}
          </Typography>
          <Divider sx={{ mt: 2, mb: 3 }} />
        </>
      )}
      {subtitle && (
        <Typography
          variant="textB1Regular"
          component="div"
          sx={{ mb: 4, whiteSpace: 'pre-line', color: 'text.default' }}
        >
          {subtitle}
        </Typography>
      )}
      <StepBody>{children}</StepBody>
      {tips && (
        <TipsCallout>
          <Typography variant="textB1Regular" component="div" sx={{ color: 'text.default' }}>
            {tips}
          </Typography>
        </TipsCallout>
      )}
      {(hasLeading || hasTrailing) && (
        <StepFooter sx={{ justifyContent: hasLeading ? 'space-between' : 'flex-end' }}>
          {hasLeading && (
            <FooterGroup>
              {onCancel && (
                <NeutralButton
                  variant="contained"
                  onClick={onCancel}
                  data-testid="github-wizard-cancel"
                >
                  {cancelLabel}
                </NeutralButton>
              )}
              {onBack && (
                <NeutralButton
                  variant="contained"
                  onClick={onBack}
                  data-testid="github-wizard-back"
                >
                  {backLabel}
                </NeutralButton>
              )}
            </FooterGroup>
          )}
          {hasTrailing && (
            <FooterGroup>
              {secondaryAction && (
                <Button
                  variant={secondaryAction.variant ?? 'outlined'}
                  onClick={secondaryAction.onClick}
                  disabled={secondaryAction.disabled || secondaryAction.loading}
                  aria-busy={secondaryAction.loading || undefined}
                  startIcon={secondaryAction.loading ? progressIcon : undefined}
                  data-testid="github-wizard-secondary"
                >
                  {secondaryAction.label}
                </Button>
              )}
              {React.isValidElement(primaryAction)
                ? primaryAction
                : primaryAction && (
                    <Button
                      variant="contained"
                      onClick={primaryAction.onClick}
                      disabled={primaryAction.disabled || primaryAction.loading}
                      aria-busy={primaryAction.loading || undefined}
                      startIcon={primaryAction.loading ? progressIcon : undefined}
                      data-testid="github-wizard-primary"
                    >
                      {primaryAction.label}
                    </Button>
                  )}
            </FooterGroup>
          )}
        </StepFooter>
      )}
    </StepFrame>
  );
}

export default GitHubWizardStep;
