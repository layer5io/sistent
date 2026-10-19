import React from 'react';
import { Button, CircularProgress, Typography } from '../../base';
import { GitHubRepositorySection } from './GitHubRepositorySection';
import { FinishList, NoticeCallout, NoticeContent } from './style';

/** A design created by the import. */
export interface GitHubImportedDesign {
  id: string;
  name: string;
}

/** A file the import could not turn into a design. */
export interface GitHubFailedImport {
  id: string;
  /** Usually the file path. */
  name: string;
  /** The reason, when the host has one. */
  message?: React.ReactNode;
}

/** State of the snapshot workflow on one repository. */
export interface GitHubFinishWorkflow {
  status: 'configured' | 'failed' | 'not-configured';
  /** What the host was told, e.g. GitHub's response to the workflow install. */
  message?: React.ReactNode;
  /** Re-runs the workflow install. Offered only when `status` is `failed`. */
  onRetry?: () => void;
  retrying?: boolean;
}

/** Outcome of the wizard for one repository. */
export interface GitHubFinishRepository {
  /** Repository as `owner/name`. */
  name: string;
  importedDesigns: readonly GitHubImportedDesign[];
  failedImports?: readonly GitHubFailedImport[];
  /** Omit for flows without snapshots: the workflow section is then not drawn. */
  workflow?: GitHubFinishWorkflow;
}

export interface GitHubFinishSummaryProps {
  repositories: readonly GitHubFinishRepository[];
  /** Opens a created design. Renders a View action on each one. */
  onViewDesign?: (design: GitHubImportedDesign, repository: string) => void;
  viewLabel?: string;
}

const WORKFLOW_TEXT: Record<GitHubFinishWorkflow['status'], string> = {
  configured: 'The snapshot workflow is configured.',
  failed: 'The snapshot workflow could not be configured.',
  'not-configured': 'The snapshot workflow is not configured.'
};

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <Typography
    variant="textB2SemiBold"
    component="h3"
    sx={{
      color: 'text.default',
      textTransform: 'none',
      mt: 2,
      mb: 1,
      '&:first-of-type': { mt: 0 }
    }}
  >
    {children}
  </Typography>
);

/**
 * The body of the Finish step, extracted from `Finish`, `WorkflowStatus`, and
 * `ImportedDesigns` in Meshery Cloud's `stepper/stepper-content.tsx`: one
 * collapsible section per repository, with its snapshot workflow outcome
 * (and a retry when it failed), the designs created, and the files that
 * failed to import.
 *
 * Render it inside a `GitHubWizardStep` whose subtitle carries the total.
 * The host supplies the outcomes and the navigation behind View and Retry.
 */
export function GitHubFinishSummary({
  repositories,
  onViewDesign,
  viewLabel = 'View'
}: GitHubFinishSummaryProps): JSX.Element {
  const [expanded, setExpanded] = React.useState(0);

  return (
    <FinishList data-testid="github-finish-summary">
      {repositories.map((repository, index) => {
        const failed = repository.failedImports ?? [];
        const { workflow } = repository;
        return (
          <GitHubRepositorySection
            key={repository.name}
            repository={repository.name}
            counts={{ imported: repository.importedDesigns.length, failed: failed.length }}
            expanded={expanded === index}
            onChange={(isExpanded) => setExpanded(isExpanded ? index : -1)}
          >
            {workflow && (
              <>
                <SectionHeading>Workflow</SectionHeading>
                <NoticeCallout
                  tone={workflow.status === 'configured' ? 'success' : 'warning'}
                  data-testid="github-finish-workflow"
                >
                  <NoticeContent>
                    <Typography variant="textB3Regular" component="div">
                      {workflow.message ?? WORKFLOW_TEXT[workflow.status]}
                    </Typography>
                  </NoticeContent>
                  {workflow.status === 'failed' && workflow.onRetry && (
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={workflow.onRetry}
                      disabled={workflow.retrying}
                      aria-busy={workflow.retrying || undefined}
                      startIcon={
                        workflow.retrying ? (
                          <CircularProgress color="inherit" size={14} aria-hidden />
                        ) : undefined
                      }
                    >
                      Retry
                    </Button>
                  )}
                </NoticeCallout>
              </>
            )}

            <SectionHeading>{`Imported designs (${repository.importedDesigns.length})`}</SectionHeading>
            {repository.importedDesigns.length === 0 ? (
              <Typography variant="textB3Regular" sx={{ color: 'text.secondary' }}>
                No designs imported.
              </Typography>
            ) : (
              <ul className="outcomes">
                {repository.importedDesigns.map((design) => (
                  <li key={design.id}>
                    <NoticeCallout tone="success">
                      <NoticeContent>
                        <Typography
                          variant="textB2SemiBold"
                          component="div"
                          sx={{ textTransform: 'none' }}
                        >
                          {design.name}
                        </Typography>
                        <Typography variant="textB3Regular" component="div">
                          {`Design '${design.name}' created.`}
                        </Typography>
                      </NoticeContent>
                      {onViewDesign && (
                        <Button
                          variant="text"
                          size="small"
                          onClick={() => onViewDesign(design, repository.name)}
                          aria-label={`${viewLabel} ${design.name}`}
                        >
                          {viewLabel}
                        </Button>
                      )}
                    </NoticeCallout>
                  </li>
                ))}
              </ul>
            )}

            {failed.length > 0 && (
              <>
                <SectionHeading>{`Could not import (${failed.length})`}</SectionHeading>
                <ul className="outcomes">
                  {failed.map((file) => (
                    <li key={file.id}>
                      <NoticeCallout tone="error">
                        <NoticeContent>
                          <Typography
                            variant="textB2SemiBold"
                            component="div"
                            sx={{ textTransform: 'none' }}
                          >
                            {file.name}
                          </Typography>
                          <Typography variant="textB3Regular" component="div">
                            {file.message ?? `Not able to import '${file.name}'.`}
                          </Typography>
                        </NoticeContent>
                      </NoticeCallout>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </GitHubRepositorySection>
        );
      })}
    </FinishList>
  );
}

export default GitHubFinishSummary;
