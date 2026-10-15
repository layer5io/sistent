import { Key } from '@meshery/schemas/permissions';
import { fireEvent, render, screen, within } from '@testing-library/react';
import React, { useState } from 'react';
import {
  GITHUB_IMPORT_CONNECT_WIZARD_STEPS,
  GitHubConnectButton,
  GitHubConnectionNotice,
  GitHubConnectionStatus,
  GitHubImportConnectWizard,
  GitHubWizardInfo,
  GitHubWizardStep,
  type GitHubConnectionNoticeProps,
  type GitHubConnectionStatusProps,
  type GitHubWizardStepProps
} from '../custom/GitHubConnection';
import { PermissionProvider } from '../custom/PermissionProvider';
import { SistentThemeProvider } from '../theme';

const withTheme = (ui: React.ReactElement) =>
  render(<SistentThemeProvider>{ui}</SistentThemeProvider>);

const button = (name: RegExp | string) => screen.getByRole('button', { name });

describe('GitHubConnectButton', () => {
  it('reads "Connect" by default and starts the handoff on click', () => {
    const onClick = jest.fn();
    withTheme(<GitHubConnectButton onClick={onClick} />);

    fireEvent.click(button(/^connect$/i));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('reads "Reconfigure" for an existing connection, as on the Cloud integrations card', () => {
    withTheme(<GitHubConnectButton connected onClick={jest.fn()} />);
    expect(button(/^reconfigure$/i)).toBeTruthy();
  });

  it('shows progress immediately while the handoff is in flight and refuses a second click', () => {
    const onClick = jest.fn();
    withTheme(<GitHubConnectButton loading onClick={onClick} />);

    const connecting = button(/^connecting$/i) as HTMLButtonElement;
    expect(connecting.disabled).toBe(true);
    expect(connecting.getAttribute('aria-busy')).toBe('true');
    expect(within(connecting).getByRole('progressbar', { hidden: true })).toBeTruthy();

    fireEvent.click(connecting);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('honours custom idle and loading labels', () => {
    const { rerender } = withTheme(
      <GitHubConnectButton label="Connect GitHub" loadingLabel="Opening GitHub" />
    );
    expect(button('Connect GitHub')).toBeTruthy();

    rerender(
      <SistentThemeProvider>
        <GitHubConnectButton label="Connect GitHub" loadingLabel="Opening GitHub" loading />
      </SistentThemeProvider>
    );
    expect(button('Opening GitHub')).toBeTruthy();
  });

  it('passes permission gating through to the Sistent Button', () => {
    const connectKey = {
      id: 'connect-github',
      function: 'Connect GitHub',
      category: 'Integrations',
      subcategory: 'Connections',
      description: 'Allows connecting GitHub.'
    } as Key;

    render(
      <SistentThemeProvider>
        <PermissionProvider userHasPermission={() => false}>
          <GitHubConnectButton permissionKey={connectKey} permissionAction="hide" />
        </PermissionProvider>
      </SistentThemeProvider>
    );
    expect(screen.queryByTestId('github-connect-button')).toBeNull();
  });
});

describe('GitHubConnectionStatus', () => {
  const renderStatus = (props: GitHubConnectionStatusProps) =>
    withTheme(<GitHubConnectionStatus {...props} />);

  it.each([
    ['not-connected', 'Not connected'],
    ['verifying', 'Verifying'],
    ['connected', 'Connected'],
    ['error', 'Connection error']
  ] as const)('announces the %s state as "%s"', (status, label) => {
    renderStatus({ status });

    const region = screen.getByRole('status');
    expect(region.textContent).toBe(`GitHub connection: ${label}`);
    expect(screen.getByTestId('github-connection-status').getAttribute('data-status')).toBe(status);
  });

  it('names the GitHub account the app is installed on, falling back to "GitHub"', () => {
    const { rerender } = renderStatus({ status: 'connected', account: 'octo-org' });
    expect(screen.getByText('octo-org')).toBeTruthy();

    rerender(
      <SistentThemeProvider>
        <GitHubConnectionStatus status="connected" />
      </SistentThemeProvider>
    );
    expect(screen.getByText('GitHub')).toBeTruthy();
  });

  it('offers a reconnect from the error state and keeps it out of the live region', () => {
    const onReconnect = jest.fn();
    renderStatus({
      status: 'error',
      message: 'The GitHub App installation was removed.',
      onReconnect
    });

    expect(screen.getByText('The GitHub App installation was removed.')).toBeTruthy();
    const reconnect = button(/^reconnect$/i);
    expect(within(screen.getByRole('status')).queryByRole('button')).toBeNull();

    fireEvent.click(reconnect);
    expect(onReconnect).toHaveBeenCalledTimes(1);
  });

  it('disables the reconnect while it is in flight', () => {
    const onReconnect = jest.fn();
    renderStatus({ status: 'error', onReconnect, reconnecting: true });

    const reconnect = button(/^reconnect$/i) as HTMLButtonElement;
    expect(reconnect.disabled).toBe(true);
    fireEvent.click(reconnect);
    expect(onReconnect).not.toHaveBeenCalled();
  });

  it('does not offer a reconnect outside the error state', () => {
    renderStatus({ status: 'connected', onReconnect: jest.fn() });
    expect(screen.queryByRole('button')).toBeNull();
  });
});

describe('GitHubConnectionNotice', () => {
  const renderNotice = (props: GitHubConnectionNoticeProps) =>
    withTheme(<GitHubConnectionNotice {...props} />);

  it('popup-blocked: alerts, then offers a retry and a same-tab link that is a real navigation', () => {
    const onRetry = jest.fn();
    const onFallbackClick = jest.fn();
    renderNotice({
      kind: 'popup-blocked',
      onRetry,
      fallbackHref: 'https://github.com/apps/meshery/installations/new',
      onFallbackClick
    });

    const alert = screen.getByRole('alert');
    expect(alert.textContent).toMatch(/blocked the GitHub window/);
    expect(within(alert).queryByRole('button')).toBeNull();

    fireEvent.click(button(/^try again$/i));
    expect(onRetry).toHaveBeenCalledTimes(1);

    const fallback = screen.getByRole('link', { name: /continue in this tab/i });
    expect(fallback.getAttribute('href')).toBe('https://github.com/apps/meshery/installations/new');
    // A plain anchor without target: following it navigates this tab.
    expect(fallback.getAttribute('target')).toBeNull();
    fireEvent.click(fallback);
    expect(onFallbackClick).toHaveBeenCalledTimes(1);
  });

  it('redirecting: reports progress politely with a manual "Open GitHub" link', () => {
    renderNotice({ kind: 'redirecting', fallbackHref: 'https://github.com/apps/x' });

    expect(screen.getByRole('status').textContent).toMatch(/Taking you to GitHub/);
    expect(screen.queryByRole('alert')).toBeNull();
    expect(screen.getByRole('link', { name: /open github/i })).toBeTruthy();
  });

  it('error: shows the host error verbatim and disables a retry that is in flight', () => {
    const onRetry = jest.fn();
    renderNotice({
      kind: 'error',
      message: 'GitHub App installation URL is not configured.',
      onRetry,
      retrying: true
    });

    expect(screen.getByRole('alert').textContent).toMatch(/installation URL is not configured/);
    const retry = button(/^try again$/i) as HTMLButtonElement;
    expect(retry.disabled).toBe(true);
    fireEvent.click(retry);
    expect(onRetry).not.toHaveBeenCalled();
  });

  it('empty: explains the empty list and renders the host action', () => {
    const onAdd = jest.fn();
    renderNotice({
      kind: 'empty',
      action: (
        <button type="button" onClick={onAdd}>
          Add repository
        </button>
      )
    });

    expect(screen.getByText('No repositories found')).toBeTruthy();
    fireEvent.click(button('Add repository'));
    expect(onAdd).toHaveBeenCalledTimes(1);
  });

  it('renders no action row when the host supplies no recovery', () => {
    renderNotice({ kind: 'error', title: 'Verification failed' });
    expect(screen.getByText('Verification failed')).toBeTruthy();
    expect(screen.queryByRole('button')).toBeNull();
    expect(screen.queryByRole('link')).toBeNull();
  });
});

describe('GitHubWizardStep', () => {
  const renderStep = (props: GitHubWizardStepProps) => withTheme(<GitHubWizardStep {...props} />);

  it('renders the title, subtitle, body, and tip', () => {
    renderStep({
      title: 'Setting up your GitHub integration',
      subtitle: 'Connect one or more repositories.',
      tips: 'Enable Snapshots to see changes PR-to-PR.',
      children: <p>step body</p>
    });

    expect(
      screen.getByRole('heading', { name: 'Setting up your GitHub integration' })
    ).toBeTruthy();
    expect(screen.getByText('Connect one or more repositories.')).toBeTruthy();
    expect(screen.getByText('step body')).toBeTruthy();
    expect(screen.getByText('Enable Snapshots to see changes PR-to-PR.')).toBeTruthy();
  });

  it('blocks a disabled primary action (Cloud: NEXT with no repository selected)', () => {
    const onNext = jest.fn();
    renderStep({ primaryAction: { label: 'Next', onClick: onNext, disabled: true } });

    const next = button(/^next$/i) as HTMLButtonElement;
    expect(next.disabled).toBe(true);
    fireEvent.click(next);
    expect(onNext).not.toHaveBeenCalled();
  });

  it('keeps a loading action labelled while blocking it', () => {
    const onImport = jest.fn();
    renderStep({
      primaryAction: { label: 'Next', onClick: jest.fn() },
      secondaryAction: { label: 'Import', onClick: onImport, loading: true, variant: 'contained' }
    });

    const importButton = button(/^import$/i) as HTMLButtonElement;
    expect(importButton.disabled).toBe(true);
    expect(importButton.getAttribute('aria-busy')).toBe('true');
    fireEvent.click(importButton);
    expect(onImport).not.toHaveBeenCalled();
  });

  it('renders Cancel and Back only when the host handles them', () => {
    const onBack = jest.fn();
    const onCancel = jest.fn();
    const { rerender } = renderStep({ primaryAction: { label: 'Next', onClick: jest.fn() } });
    expect(screen.queryByRole('button', { name: /^back$/i })).toBeNull();
    expect(screen.queryByRole('button', { name: /^cancel$/i })).toBeNull();

    rerender(
      <SistentThemeProvider>
        <GitHubWizardStep
          onBack={onBack}
          onCancel={onCancel}
          primaryAction={{ label: 'Next', onClick: jest.fn() }}
        />
      </SistentThemeProvider>
    );
    fireEvent.click(button(/^back$/i));
    fireEvent.click(button(/^cancel$/i));
    expect(onBack).toHaveBeenCalledTimes(1);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('accepts a ready-made control as the primary action', () => {
    renderStep({ primaryAction: <GitHubConnectButton loading /> });
    expect(screen.getByTestId('github-connect-button')).toBeTruthy();
    expect(screen.queryByTestId('github-wizard-primary')).toBeNull();
  });
});

describe('GitHubImportConnectWizard', () => {
  const stepState = (id: string) =>
    screen.getByTestId(`github-wizard-step-${id}`).getAttribute('data-state');

  it("lists every stage of Cloud's wizard, not just the active one", () => {
    withTheme(
      <GitHubImportConnectWizard activeStep={0}>
        <p>connect</p>
      </GitHubImportConnectWizard>
    );

    for (const label of ['Connect GitHub App', 'Select Repositories', 'Import Designs', 'Finish']) {
      expect(screen.getByText(label)).toBeTruthy();
    }
    expect(screen.getAllByText('Enable Snapshots')).toHaveLength(3);
    for (const secondary of ['(Select Designs)', '(Configure Secrets)', '(Add Workflows)']) {
      expect(screen.getByText(secondary)).toBeTruthy();
    }
  });

  it('marks earlier steps completed, the current step active, and later steps upcoming', () => {
    withTheme(
      <GitHubImportConnectWizard activeStep={2}>
        <p>import</p>
      </GitHubImportConnectWizard>
    );

    expect(stepState('connect-app')).toBe('completed');
    expect(stepState('select-repositories')).toBe('completed');
    expect(stepState('import-designs')).toBe('active');
    expect(stepState('finish')).toBe('upcoming');
    expect(
      screen.getByTestId('github-wizard-step-import-designs').getAttribute('aria-current')
    ).toBe('step');
    expect(screen.getByTestId('github-wizard-step-connect-app').textContent).toMatch(/completed/);
  });

  it('draws skipped steps as not completed and says so to assistive technology', () => {
    withTheme(
      <GitHubImportConnectWizard activeStep={6} skippedSteps={[3, 4, 5]}>
        <p>finish</p>
      </GitHubImportConnectWizard>
    );

    expect(stepState('import-designs')).toBe('completed');
    expect(stepState('snapshot-configure-secrets')).toBe('skipped');
    expect(screen.getByTestId('github-wizard-step-snapshot-configure-secrets').textContent).toMatch(
      /skipped, optional/
    );
    expect(
      screen
        .getByTestId('github-wizard-step-snapshot-configure-secrets')
        .classList.contains('Mui-completed')
    ).toBe(false);
  });

  it('renders the info pane only when the host supplies one', () => {
    const { rerender } = withTheme(
      <GitHubImportConnectWizard activeStep={1}>
        <p>repos</p>
      </GitHubImportConnectWizard>
    );
    expect(screen.queryByTestId('github-wizard-info-pane')).toBeNull();

    rerender(
      <SistentThemeProvider>
        <GitHubImportConnectWizard
          activeStep={1}
          info={<GitHubWizardInfo title="Select Repositories" tips="Missing a repository?" />}
        >
          <p>repos</p>
        </GitHubImportConnectWizard>
      </SistentThemeProvider>
    );
    const pane = screen.getByTestId('github-wizard-info-pane');
    expect(within(pane).getByRole('heading', { name: 'Select Repositories' })).toBeTruthy();
    expect(within(pane).getByText('Missing a repository?')).toBeTruthy();
  });

  it('accepts a shorter host flow', () => {
    const kanvasSteps = GITHUB_IMPORT_CONNECT_WIZARD_STEPS.filter(
      (step) => !step.id.startsWith('snapshot-')
    );
    withTheme(
      <GitHubImportConnectWizard activeStep={0} steps={kanvasSteps}>
        <p>connect</p>
      </GitHubImportConnectWizard>
    );
    expect(screen.queryByText('Enable Snapshots')).toBeNull();
    expect(screen.getByText('Finish')).toBeTruthy();
  });
});

/**
 * Cloud's navigation, driven through the public API: CONNECT advances once the
 * host's handoff returns, BACK steps back, SKIP on the snapshot step jumps to
 * Finish, and BACK from Finish returns to where the user skipped from.
 */
function WizardHarness() {
  const [active, setActive] = useState(0);
  const [skipped, setSkipped] = useState<number[]>([]);
  const steps = GITHUB_IMPORT_CONNECT_WIZARD_STEPS;

  const next = () => setActive((step) => step + 1);
  const back = () => {
    if (active === steps.length - 1 && skipped.length > 0) {
      setActive(skipped[0]);
      setSkipped([]);
      return;
    }
    setActive((step) => step - 1);
  };

  return (
    <GitHubImportConnectWizard activeStep={active} skippedSteps={skipped}>
      <GitHubWizardStep
        onBack={active > 0 ? back : undefined}
        primaryAction={
          active === 0 ? (
            <GitHubConnectButton onClick={next} />
          ) : (
            { label: active === steps.length - 1 ? 'Finish' : 'Next', onClick: next }
          )
        }
        secondaryAction={
          active === 3
            ? {
                label: 'Skip',
                onClick: () => {
                  setSkipped([3, 4, 5]);
                  setActive(steps.length - 1);
                }
              }
            : undefined
        }
      >
        <p data-testid="active-step">{steps[active].id}</p>
      </GitHubWizardStep>
    </GitHubImportConnectWizard>
  );
}

describe('GitHub wizard navigation', () => {
  it('connects, advances, skips snapshots, and returns from Finish to the skip point', () => {
    withTheme(<WizardHarness />);
    const activeStep = () => screen.getByTestId('active-step').textContent;

    expect(activeStep()).toBe('connect-app');
    expect(screen.queryByRole('button', { name: /^back$/i })).toBeNull();

    fireEvent.click(button(/^connect$/i));
    expect(activeStep()).toBe('select-repositories');

    fireEvent.click(button(/^back$/i));
    expect(activeStep()).toBe('connect-app');

    fireEvent.click(button(/^connect$/i));
    fireEvent.click(button(/^next$/i));
    fireEvent.click(button(/^next$/i));
    expect(activeStep()).toBe('snapshot-select-designs');

    fireEvent.click(button(/^skip$/i));
    expect(activeStep()).toBe('finish');
    expect(
      screen.getByTestId('github-wizard-step-snapshot-add-workflows').getAttribute('data-state')
    ).toBe('skipped');
    expect(button(/^finish$/i)).toBeTruthy();

    fireEvent.click(button(/^back$/i));
    expect(activeStep()).toBe('snapshot-select-designs');
    expect(
      screen.getByTestId('github-wizard-step-snapshot-add-workflows').getAttribute('data-state')
    ).toBe('upcoming');
  });
});
