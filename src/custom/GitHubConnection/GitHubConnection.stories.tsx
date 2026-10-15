import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Typography
} from '../../base';
import { SistentThemeProvider } from '../../theme';
import { GitHubConnectButton } from './GitHubConnectButton';
import { GitHubConnectionNotice } from './GitHubConnectionNotice';
import { GitHubConnectionStatus } from './GitHubConnectionStatus';
import { GitHubImportConnectWizard } from './GitHubImportConnectWizard';
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
              <FormControl fullWidth>
                <InputLabel id="github-story-repositories">Select a repository</InputLabel>
                <Select
                  multiple
                  labelId="github-story-repositories"
                  label="Select a repository"
                  value={selected}
                  onChange={(event) => {
                    const value = event.target.value;
                    setSelected(typeof value === 'string' ? value.split(',') : (value as string[]));
                  }}
                  renderValue={(value) => (value as string[]).join(', ')}
                >
                  {repositories.map((repository) => (
                    <MenuItem key={repository} value={repository}>
                      <Checkbox checked={selected.includes(repository)} />
                      <ListItemText primary={repository} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
            <Paper variant="outlined" sx={{ p: 2, overflowWrap: 'anywhere' }}>
              {selected.map((repository) => (
                <FormControlLabel
                  key={repository}
                  sx={{ display: 'flex' }}
                  control={<Checkbox defaultChecked />}
                  label={`${repository}/deploy/kubernetes.yaml`}
                />
              ))}
            </Paper>
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
            <GitHubConnectionStatus status="connected" account="octo-org" />
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
