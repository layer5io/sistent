import React from 'react';
import { AccordionDetails, AccordionSummary, Typography } from '../../base';
import { ExpandMoreIcon } from '../../icons';
import { CountBadge, RepositorySectionRoot, RepositorySectionTitle } from './style';

/** Per-repository tallies shown in the section header. */
export interface GitHubRepositoryCounts {
  /** Files picked and not yet imported. While non-zero, it is the only badge shown. */
  selected?: number;
  imported?: number;
  failed?: number;
}

export interface GitHubRepositorySectionProps {
  /** Repository as `owner/name`. */
  repository: string;
  counts?: GitHubRepositoryCounts;
  /** Controlled expansion. Omit both `expanded` and `onChange` to let the section manage it. */
  expanded?: boolean;
  defaultExpanded?: boolean;
  onChange?: (expanded: boolean) => void;
  children?: React.ReactNode;
}

/**
 * One repository's collapsible section, as Meshery Cloud draws it on the
 * "Import Designs" step (`AddApplicationPaths`) and on Finish: the repository
 * name with selected / imported / failed badges, over a body that normally
 * holds a `GitHubFileTree` or an import summary.
 */
export function GitHubRepositorySection({
  repository,
  counts,
  expanded,
  defaultExpanded,
  onChange,
  children
}: GitHubRepositorySectionProps): JSX.Element {
  const selected = counts?.selected ?? 0;
  const imported = counts?.imported ?? 0;
  const failed = counts?.failed ?? 0;
  const baseId = `github-repository-${React.useId()}`;

  return (
    <RepositorySectionRoot
      disableGutters
      expanded={expanded}
      defaultExpanded={defaultExpanded}
      onChange={onChange && ((_event, isExpanded) => onChange(isExpanded))}
      data-testid="github-repository-section"
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon width={24} height={24} fill="currentColor" />}
        aria-controls={`${baseId}-content`}
        id={`${baseId}-header`}
      >
        <RepositorySectionTitle>
          <Typography variant="textB1Regular" component="span" className="name">
            {repository}
          </Typography>
          <span className="badges">
            {selected > 0 ? (
              <CountBadge tone="neutral">{`${selected} selected`}</CountBadge>
            ) : (
              <>
                {imported > 0 && <CountBadge tone="success">{`${imported} imported`}</CountBadge>}
                {failed > 0 && <CountBadge tone="error">{`${failed} failed`}</CountBadge>}
              </>
            )}
          </span>
        </RepositorySectionTitle>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </RepositorySectionRoot>
  );
}

export default GitHubRepositorySection;
