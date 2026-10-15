import React, { useState } from 'react';
import { Box, Button, FormControlLabel, Paper, Switch, Typography } from '../../base';
import { SistentThemeProvider } from '../../theme';
import { GitHubConnectButton } from './GitHubConnectButton';
import { GitHubConnectionNotice } from './GitHubConnectionNotice';
import { GitHubConnectionStatus } from './GitHubConnectionStatus';
import { GitHubFileTree, type GitHubFileTreeNode } from './GitHubFileTree';
import { GitHubFinishSummary, type GitHubFinishRepository } from './GitHubFinishSummary';
import { GitHubImportConnectWizard } from './GitHubImportConnectWizard';
import { GitHubRepositoryPicker } from './GitHubRepositoryPicker';
import { GitHubRepositorySection } from './GitHubRepositorySection';
import { GitHubWizardInfo } from './GitHubWizardInfo';
import { GitHubWizardStep } from './GitHubWizardStep';
import { GITHUB_IMPORT_CONNECT_WIZARD_STEPS } from './steps';

/**
 * Sistent does not yet ship a Storybook runner, so these stories are authored
 * in standard CSF3 (a default `meta` export plus named story exports), like
 * `DangerConfirmationModal.stories.tsx`, and can be dropped into a Storybook
 * once one is configured. Each story takes the theme mode so it can be checked
 * in light and dark. The states are exercised headlessly in
 * `src/__testing__/GitHubConnection.test.tsx`.
 *
 * Copy and flow follow Meshery Cloud's wizard (`ui/components/connect/stepper/`)
 * so the stories double as the visual reference for hosts adopting these
 * primitives.
 */
const meta = {
  title: 'Custom/GitHubConnection',
  component: GitHubImportConnectWizard
};

export default meta;

type Mode = 'light' | 'dark';
type Story = { name?: string; render: (args: { mode?: Mode }) => React.ReactElement };

const INSTALL_URL = 'https://github.com/apps/example-app/installations/new';

const Frame = ({
  mode = 'light',
  children
}: {
  mode?: Mode;
  children: React.ReactNode;
}): React.ReactElement => (
  <SistentThemeProvider initialMode={mode}>
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: 'background.default', minHeight: '100%' }}>
      {children}
    </Box>
  </SistentThemeProvider>
);

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 2, flexWrap: 'wrap' }}>
    <Typography variant="textL2Regular" sx={{ width: 140, color: 'text.secondary' }}>
      {label}
    </Typography>
    {children}
  </Box>
);

/** CONNECT call to action: idle, existing connection, and in-flight handoff. */
export const ConnectButtonStates: Story = {
  name: 'Connect button states',
  render: ({ mode }) => (
    <Frame mode={mode}>
      <Row label="Idle">
        <GitHubConnectButton onClick={() => undefined} />
      </Row>
      <Row label="Connected">
        <GitHubConnectButton connected onClick={() => undefined} />
      </Row>
      <Row label="Loading">
        <GitHubConnectButton loading />
      </Row>
      <Row label="Disabled">
        <GitHubConnectButton disabled />
      </Row>
    </Frame>
  )
};

/** Connection status: every lifecycle state, with the reconnect path on error. */
export const ConnectionStatusStates: Story = {
  name: 'Connection status states',
  render: ({ mode }) => (
    <Frame mode={mode}>
      <Row label="Not connected">
        <GitHubConnectionStatus status="not-connected" />
      </Row>
      <Row label="Verifying">
        <GitHubConnectionStatus status="verifying" account="octo-org" />
      </Row>
      <Row label="Connected">
        <GitHubConnectionStatus status="connected" account="octo-org" />
      </Row>
      <Row label="Error">
        <GitHubConnectionStatus
          status="error"
          account="octo-org"
          message="The GitHub App installation was removed from this account."
          onReconnect={() => undefined}
        />
      </Row>
      <Row label="Reconnecting">
        <GitHubConnectionStatus
          status="error"
          account="octo-org"
          onReconnect={() => undefined}
          reconnecting
        />
      </Row>
    </Frame>
  )
};

/** Empty, error, popup-blocked, and same-tab fallback presentation. */
export const ConnectionNotices: Story = {
  name: 'Empty, error, popup-blocked, and same-tab fallback',
  render: ({ mode }) => (
    <Frame mode={mode}>
      <Box sx={{ display: 'grid', gap: 3, maxWidth: 640 }}>
        <GitHubConnectionNotice
          kind="popup-blocked"
          onRetry={() => undefined}
          fallbackHref={INSTALL_URL}
        />
        <GitHubConnectionNotice kind="redirecting" fallbackHref={INSTALL_URL} />
        <GitHubConnectionNotice
          kind="error"
          message="GitHub App installation URL is not configured for this environment, so we can't start the GitHub connection. Please contact support."
          onRetry={() => undefined}
        />
        <Paper variant="outlined">
          <GitHubConnectionNotice
            kind="empty"
            action={
              <Button variant="outlined" size="small">
                Add repository
              </Button>
            }
          />
        </Paper>
      </Box>
    </Frame>
  )
};

const STEP_INFO = [
  {
    title: 'Setting up your GitHub integration',
    subtitle:
      'Connect one or more of your GitHub repositories in order to discover and import existing infrastructure as code (supporting Helm Charts, Kubernetes Manifests, and Docker Compose).',
    description:
      'This integration accesses your repositories to import and manage your infrastructure designs.',
    tips: 'Enable Snapshots to get screenshots of your infrastructure directly in your Pull Requests. See changes PR-to-PR.'
  },
  {
    title: 'Select Repositories',
    subtitle: 'Choose which GitHub repositories you want to connect.',
    description:
      'You can select multiple repositories to discover and import designs from. These repositories will be scanned for compatible files.',
    additionalInfo:
      'Only repositories with the Layer5 GitHub App installed will appear in this list.',
    tips: "If you do not see your repository, make sure to re-configure it using 'Add Repository' button."
  },
  {
    title: 'Import Designs',
    subtitle:
      'Import your existing Helm charts, Kubernetes manifests, Docker compose apps, or Meshery designs from one or more of your GitHub repositories.',
    tips: "You can select 'Show all types of files' to view non-standard file types that might be importable."
  },
  {
    title: 'Select Imported Design For Snapshot',
    subtitle:
      'Select at most one design from each repository if you want to configure Kanvas Snapshot for that design.'
  },
  {
    title: 'Configure GitHub Secrets',
    subtitle:
      'Kanvas Snapshots run as a GitHub workflow. The workflow uses an API token to authenticate.\n\nAdd the generated token as a GitHub secret available to workflows in your selected repositories.'
  },
  {
    title: 'Configure GitHub Workflows',
    subtitle: 'Add/update the Kanvas Snapshot workflow to each selected GitHub repository.'
  },
  {
    title: 'Finished Setting Up',
    subtitle: 'Congratulations! You have completed the initial setup of your GitHub integration.'
  }
];

const REPOSITORIES = ['octo-org/sample-repo', 'octo-org/other-repo', 'octo-org/helm-charts'];

const DESIGN_EXTENSIONS = ['.yaml', '.yml', '.tar.gz', '.tgz', '.tar'];

const scannedFiles = (repository: string): GitHubFileTreeNode[] => [
  {
    id: `${repository}/deploy`,
    label: 'deploy',
    type: 'dir',
    children: [
      {
        id: `${repository}/deploy/kubernetes`,
        label: 'kubernetes',
        type: 'dir',
        children: [
          { id: `${repository}/deploy/kubernetes/app.yaml`, label: 'app.yaml', type: 'file' },
          {
            id: `${repository}/deploy/kubernetes/service.yaml`,
            label: 'service.yaml',
            type: 'file'
          }
        ]
      },
      { id: `${repository}/deploy/compose.yml`, label: 'compose.yml', type: 'file' }
    ]
  },
  { id: `${repository}/charts.tgz`, label: 'charts.tgz', type: 'file' },
  { id: `${repository}/README.md`, label: 'README.md', type: 'file' }
];

/**
 * Cloud's "Import Designs" body: a section per selected repository holding its
 * file tree, with the "Show all file types" switch that lifts the extension
 * filter.
 */
const ImportDesignsBody = ({
  repositories,
  imported
}: {
  repositories: readonly string[];
  imported: boolean;
}): React.ReactElement => {
  const [picked, setPicked] = useState<Record<string, string[]>>({});
  const [showAll, setShowAll] = useState(false);
  const [open, setOpen] = useState(0);

  return (
    <Box sx={{ display: 'grid', gap: 1 }}>
      <FormControlLabel
        control={<Switch checked={showAll} onChange={() => setShowAll((value) => !value)} />}
        label="Show all file types"
      />
      {repositories.map((repository, index) => {
        const files = scannedFiles(repository).map((node) =>
          imported && node.id.endsWith('charts.tgz')
            ? { ...node, status: 'imported' as const, statusMessage: 'File is imported' }
            : node
        );
        return (
          <GitHubRepositorySection
            key={repository}
            repository={repository}
            counts={{ selected: picked[repository]?.length ?? 0, imported: imported ? 1 : 0 }}
            expanded={open === index}
            onChange={(isExpanded) => setOpen(isExpanded ? index : -1)}
          >
            <GitHubFileTree
              aria-label={`${repository} files`}
              items={files}
              selected={picked[repository] ?? []}
              onSelectionChange={(ids) => setPicked((all) => ({ ...all, [repository]: ids }))}
              supportedExtensions={showAll ? null : DESIGN_EXTENSIONS}
              defaultExpanded={[`${repository}/deploy`]}
            />
          </GitHubRepositorySection>
        );
      })}
    </Box>
  );
};

const FINISH_OUTCOMES: GitHubFinishRepository[] = [
  {
    name: 'octo-org/sample-repo',
    importedDesigns: [{ id: 'design-1', name: 'kubernetes.yaml' }],
    failedImports: [
      {
        id: 'octo-org/sample-repo/deploy/broken.yaml',
        name: 'deploy/broken.yaml',
        message: 'The file is not a valid Kubernetes manifest.'
      }
    ],
    workflow: { status: 'configured' }
  },
  {
    name: 'octo-org/helm-charts',
    importedDesigns: [],
    workflow: {
      status: 'failed',
      message: 'GitHub refused to create the workflow file.',
      onRetry: () => undefined
    }
  }
];

type Handoff = 'idle' | 'connecting' | 'popup-blocked';

interface WizardDemoProps {
  mode?: Mode;
  initialStep?: number;
  initialHandoff?: Handoff;
  repositories?: string[];
}

/**
 * Cloud's flow end to end. CONNECT simulates the host's handoff: the first
 * attempt is "blocked" to show the popup-blocked recovery, the retry succeeds.
 */
const WizardDemo = ({
  mode,
  initialStep = 0,
  initialHandoff = 'idle',
  repositories = REPOSITORIES
}: WizardDemoProps): React.ReactElement => {
  const steps = GITHUB_IMPORT_CONNECT_WIZARD_STEPS;
  const [active, setActive] = useState(initialStep);
  const [skipped, setSkipped] = useState<number[]>([]);
  const [handoff, setHandoff] = useState<Handoff>(initialHandoff);
  const [attempts, setAttempts] = useState(0);
  const [selected, setSelected] = useState<string[]>(repositories.slice(0, 1));
  const [importing, setImporting] = useState(false);
  const [imported, setImported] = useState(false);

  const next = () => setActive((step) => Math.min(step + 1, steps.length - 1));
  const back = () => {
    if (active === steps.length - 1 && skipped.length > 0) {
      setActive(skipped[0]);
      setSkipped([]);
      return;
    }
    setActive((step) => Math.max(step - 1, 0));
  };

  const connect = () => {
    // Block only the very first attempt of a fresh run, so the retry succeeds.
    const willBlock = initialHandoff === 'idle' && attempts === 0;
    setHandoff('connecting');
    setAttempts((count) => count + 1);
    window.setTimeout(() => {
      if (willBlock) {
        setHandoff('popup-blocked');
        return;
      }
      setHandoff('idle');
      next();
    }, 900);
  };

  const info = <GitHubWizardInfo {...STEP_INFO[active]} />;

  const body = (() => {
    switch (steps[active].id) {
      case 'connect-app':
        return (
          <GitHubWizardStep
            title={STEP_INFO[0].title}
            subtitle={STEP_INFO[0].subtitle}
            tips={STEP_INFO[0].tips}
            onCancel={() => undefined}
            primaryAction={
              <GitHubConnectButton loading={handoff === 'connecting'} onClick={connect} />
            }
          >
            {handoff === 'popup-blocked' && (
              <GitHubConnectionNotice
                kind="popup-blocked"
                onRetry={connect}
                fallbackHref={INSTALL_URL}
                onFallbackClick={(event) => event.preventDefault()}
              />
            )}
          </GitHubWizardStep>
        );
      case 'select-repositories':
        return (
          <GitHubWizardStep
            onBack={back}
            primaryAction={{ label: 'Next', onClick: next, disabled: selected.length === 0 }}
          >
            {repositories.length === 0 ? (
              <GitHubConnectionNotice
                kind="empty"
                action={
                  <Button variant="outlined" size="small">
                    Add repository
                  </Button>
                }
              />
            ) : (
              <GitHubRepositoryPicker
                repositories={repositories}
                selected={selected}
                onChange={setSelected}
              />
            )}
          </GitHubWizardStep>
        );
      case 'import-designs':
        return (
          <GitHubWizardStep
            onBack={back}
            secondaryAction={{
              label: 'Import',
              variant: 'contained',
              loading: importing,
              onClick: () => {
                setImporting(true);
                window.setTimeout(() => {
                  setImporting(false);
                  setImported(true);
                }, 900);
              }
            }}
            primaryAction={{ label: 'Next', onClick: next, disabled: !imported }}
          >
            <ImportDesignsBody repositories={selected} imported={imported} />
          </GitHubWizardStep>
        );
      case 'snapshot-select-designs':
        return (
          <GitHubWizardStep
            onBack={back}
            secondaryAction={{
              label: 'Skip',
              onClick: () => {
                setSkipped([3, 4, 5]);
                setActive(steps.length - 1);
              }
            }}
            primaryAction={{ label: 'Next', onClick: next }}
          >
            <Typography variant="textB1Regular">
              Pick the design to snapshot in each repository.
            </Typography>
          </GitHubWizardStep>
        );
      case 'finish':
        return (
          <GitHubWizardStep
            subtitle={`${STEP_INFO[6].subtitle} 1 design has been imported.`}
            onBack={back}
            primaryAction={{ label: 'Finish', onClick: () => setActive(0) }}
          >
            <GitHubFinishSummary repositories={FINISH_OUTCOMES} onViewDesign={() => undefined} />
          </GitHubWizardStep>
        );
      default:
        return (
          <GitHubWizardStep onBack={back} primaryAction={{ label: 'Next', onClick: next }}>
            <Typography variant="textB1Regular">{STEP_INFO[active].subtitle}</Typography>
          </GitHubWizardStep>
        );
    }
  })();

  return (
    <Frame mode={mode}>
      <Paper
        elevation={3}
        sx={{ p: { xs: 2, md: 4 }, borderRadius: 2, maxWidth: 1200, mx: 'auto' }}
      >
        <GitHubImportConnectWizard activeStep={active} skippedSteps={skipped} info={info}>
          {body}
        </GitHubImportConnectWizard>
      </Paper>
    </Frame>
  );
};

/** The full wizard, starting at CONNECT. */
export const ImportConnectWizard: Story = {
  name: 'Import / connect wizard',
  render: ({ mode }) => <WizardDemo mode={mode} />
};

/** CONNECT after the browser blocked the GitHub window. */
export const ImportConnectWizardPopupBlocked: Story = {
  name: 'Wizard: popup blocked on CONNECT',
  render: ({ mode }) => <WizardDemo mode={mode} initialHandoff="popup-blocked" />
};

/** Repository selection with an installation that can see no repositories. */
export const ImportConnectWizardNoRepositories: Story = {
  name: 'Wizard: no repositories',
  render: ({ mode }) => <WizardDemo mode={mode} initialStep={1} repositories={[]} />
};

/** Mid-flow, with completed and upcoming steps on the rail. */
export const ImportConnectWizardImport: Story = {
  name: 'Wizard: import designs',
  render: ({ mode }) => <WizardDemo mode={mode} initialStep={2} />
};

/** Repository pick list: idle, paging in more, and disabled. */
export const RepositoryPickerStates: Story = {
  name: 'Repository pick list',
  render: ({ mode }) => {
    const Demo = () => {
      const [selected, setSelected] = useState<string[]>(['octo-org/sample-repo']);
      const [repositories, setRepositories] = useState<string[]>(REPOSITORIES);
      const [loading, setLoading] = useState(false);
      const loadMore = () => {
        setLoading(true);
        window.setTimeout(() => {
          setRepositories((current) => [
            ...current,
            ...Array.from({ length: 5 }, (_, n) => `octo-org/service-${current.length + n}`)
          ]);
          setLoading(false);
        }, 900);
      };
      return (
        <Box sx={{ display: 'grid', gap: 3, maxWidth: 480 }}>
          <GitHubRepositoryPicker
            repositories={repositories}
            selected={selected}
            onChange={setSelected}
            loading={loading}
            hasMore={repositories.length < 30}
            onLoadMore={loadMore}
          />
          <GitHubRepositoryPicker
            repositories={[]}
            selected={[]}
            onChange={() => undefined}
            disabled
          />
        </Box>
      );
    };
    return (
      <Frame mode={mode}>
        <Demo />
      </Frame>
    );
  }
};

/** Design file tree: filtered, with import marks, and empty after filtering. */
export const FileTreeStates: Story = {
  name: 'Design file tree',
  render: ({ mode }) => {
    const Demo = () => {
      const [selected, setSelected] = useState<string[]>([]);
      const files = scannedFiles('octo-org/sample-repo').map((node) =>
        node.id.endsWith('charts.tgz')
          ? { ...node, status: 'error' as const, statusMessage: 'Not a Helm chart archive.' }
          : node
      );
      return (
        <Box sx={{ display: 'grid', gap: 3, maxWidth: 560 }}>
          <GitHubRepositorySection
            repository="octo-org/sample-repo"
            counts={{ selected: selected.length }}
            defaultExpanded
          >
            <GitHubFileTree
              items={files}
              selected={selected}
              onSelectionChange={setSelected}
              supportedExtensions={DESIGN_EXTENSIONS}
              defaultExpanded={['octo-org/sample-repo/deploy']}
            />
          </GitHubRepositorySection>
          <GitHubFileTree
            items={[{ id: 'notes.md', label: 'notes.md', type: 'file' }]}
            selected={[]}
            onSelectionChange={() => undefined}
            supportedExtensions={DESIGN_EXTENSIONS}
          />
        </Box>
      );
    };
    return (
      <Frame mode={mode}>
        <Demo />
      </Frame>
    );
  }
};

/** Finish: per-repository workflow outcome, created designs, and failed files. */
export const FinishSummary: Story = {
  name: 'Finish summary',
  render: ({ mode }) => (
    <Frame mode={mode}>
      <Box sx={{ maxWidth: 640 }}>
        <GitHubFinishSummary repositories={FINISH_OUTCOMES} onViewDesign={() => undefined} />
      </Box>
    </Frame>
  )
};
