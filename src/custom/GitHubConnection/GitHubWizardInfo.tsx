import React from 'react';
import { Divider, Typography } from '../../base';
import { TipsCallout } from './style';

export interface GitHubWizardInfoProps {
  /** Heading of the explanatory pane, e.g. "Select Repositories". */
  title: React.ReactNode;
  /** Lead paragraph. Newlines are preserved, so multi-paragraph copy can be a plain string. */
  subtitle?: React.ReactNode;
  /** What this step does. */
  description?: React.ReactNode;
  /** Requirements and caveats, e.g. "Only repositories with the GitHub App installed appear here." */
  additionalInfo?: React.ReactNode;
  /** A highlighted tip at the end of the pane. */
  tips?: React.ReactNode;
}

/**
 * Explanatory copy for the active wizard step, rendered inside the
 * `info` pane of `GitHubImportConnectWizard`. Mirrors the `stepInfo` blocks of
 * Meshery Cloud's `stepper/info-panel.tsx`: title, divider, subtitle,
 * description, additional info, and a tip.
 */
export function GitHubWizardInfo({
  title,
  subtitle,
  description,
  additionalInfo,
  tips
}: GitHubWizardInfoProps): JSX.Element {
  const paragraph = { color: 'inherit', mb: 3 } as const;

  return (
    <div data-testid="github-wizard-info">
      <Typography variant="textH3Medium" component="h3" sx={{ color: 'inherit', mb: 2 }}>
        {title}
      </Typography>
      <Divider sx={{ mb: 3, borderColor: 'currentColor', opacity: 0.3 }} />
      {subtitle && (
        <Typography
          variant="textB1Regular"
          component="div"
          sx={{ ...paragraph, whiteSpace: 'pre-line' }}
        >
          {subtitle}
        </Typography>
      )}
      {description && (
        <Typography variant="textB1Regular" component="div" sx={paragraph}>
          {description}
        </Typography>
      )}
      {additionalInfo && (
        <Typography variant="textB1Regular" component="div" sx={paragraph}>
          {additionalInfo}
        </Typography>
      )}
      {tips && (
        <TipsCallout>
          <Typography variant="textB1Regular" component="div" sx={{ color: 'inherit' }}>
            {tips}
          </Typography>
        </TipsCallout>
      )}
    </div>
  );
}

export default GitHubWizardInfo;
