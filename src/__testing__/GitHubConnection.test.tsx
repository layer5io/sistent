import { Key } from '@meshery/schemas/permissions';
import { fireEvent, render, screen, within } from '@testing-library/react';
import React, { useState } from 'react';
import {
  GITHUB_IMPORT_CONNECT_WIZARD_STEPS,
  GitHubConnectButton,
  GitHubConnectionNotice,
  GitHubConnectionStatus,
  GitHubFileTree,
  GitHubFinishSummary,
  GitHubImportConnectWizard,
  GitHubRefPicker,
  GitHubRepositoryPicker,
  GitHubRepositorySection,
  GitHubWizardInfo,
  GitHubWizardStep,
  type GitHubConnectionNoticeProps,
  type GitHubConnectionStatusProps,
  type GitHubFileTreeNode,
  type GitHubFileTreeProps,
  type GitHubFinishRepository,
  type GitHubRefPickerProps,
  type GitHubWizardStepProps
} from '../custom/GitHubConnection';
import { PermissionProvider } from '../custom/PermissionProvider';
import { SistentThemeProvider } from '../theme';

const withTheme = (ui: React.ReactElement) =>
  render(<SistentThemeProvider>{ui}</SistentThemeProvider>);

const button = (name: RegExp | string) => screen.getByRole('button', { name });

/**
 * jsdom lays nothing out, so every element reports zero size. Stub the scroll
 * geometry of every element to model a container that overflows (or not).
 */
const stubScrollGeometry = (
  geometry: Partial<
    Record<'scrollHeight' | 'clientHeight' | 'scrollTop' | 'scrollWidth' | 'clientWidth', number>
  >
) => {
  for (const [key, value] of Object.entries(geometry)) {
    jest
      .spyOn(Element.prototype, key as 'scrollHeight', 'get')
      .mockImplementation(() => value as number);
  }
};

afterEach(() => jest.restoreAllMocks());

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

  it('error: the default copy promises nothing the host may not have done', () => {
    renderNotice({ kind: 'error', onRetry: jest.fn() });
    const text = screen.getByRole('alert').textContent ?? '';
    expect(text).toMatch(/Something went wrong while connecting to GitHub\. Try again\./);
    expect(text).not.toMatch(/saved/i);
  });

  it.each(['popup-blocked', 'redirecting', 'error', 'empty'] as const)(
    '%s: the same-tab fallback link carries no new-window glyph',
    (kind) => {
      renderNotice({ kind, fallbackHref: 'https://github.com/apps/x' });
      const fallback = screen.getByTestId('github-connection-notice-fallback');
      expect(fallback.getAttribute('target')).toBeNull();
      expect(fallback.querySelector('svg')).toBeNull();
    }
  );

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

  it('ignores skipped indices at or after the active step, so stepping back shows them upcoming', () => {
    withTheme(
      <GitHubImportConnectWizard activeStep={3} skippedSteps={[3, 4, 5]}>
        <p>snapshots</p>
      </GitHubImportConnectWizard>
    );

    expect(stepState('snapshot-select-designs')).toBe('active');
    expect(stepState('snapshot-configure-secrets')).toBe('upcoming');
    expect(stepState('snapshot-add-workflows')).toBe('upcoming');
    expect(screen.getByTestId('github-wizard-step-snapshot-add-workflows').textContent).not.toMatch(
      /skipped/
    );
  });

  it('keeps a hand-scrolled rail where it is when the host passes an equal new steps array', () => {
    stubScrollGeometry({ scrollWidth: 1000, clientWidth: 300 });
    const steps = () => GITHUB_IMPORT_CONNECT_WIZARD_STEPS.filter(() => true);
    const wizard = (activeStep: number) => (
      <SistentThemeProvider>
        <GitHubImportConnectWizard activeStep={activeStep} steps={steps()}>
          <p>body</p>
        </GitHubImportConnectWizard>
      </SistentThemeProvider>
    );
    const { rerender } = render(wizard(2));
    const rail = screen.getByTestId('github-import-connect-wizard')
      .firstElementChild as HTMLElement;

    rail.scrollLeft = 42;
    rerender(wizard(2));
    expect(rail.scrollLeft).toBe(42);

    rerender(wizard(3));
    expect(rail.scrollLeft).not.toBe(42);
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

describe('GitHubRepositoryPicker', () => {
  const REPOS = ['octo-org/one', 'octo-org/two'];

  function PickerHarness(props: { onLoadMore?: () => void; loading?: boolean; hasMore?: boolean }) {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <>
        <GitHubRepositoryPicker
          repositories={REPOS}
          selected={selected}
          onChange={setSelected}
          {...props}
        />
        <p data-testid="picked">{JSON.stringify(selected)}</p>
      </>
    );
  }

  const open = () => fireEvent.mouseDown(screen.getByRole('combobox'));
  const picked = () => JSON.parse(screen.getByTestId('picked').textContent ?? '[]');

  it('selects and deselects repositories through the host', () => {
    withTheme(<PickerHarness />);
    open();
    fireEvent.click(screen.getByRole('option', { name: 'octo-org/two' }));
    expect(picked()).toEqual(['octo-org/two']);
    fireEvent.click(screen.getByRole('option', { name: 'octo-org/one' }));
    expect(picked()).toEqual(['octo-org/two', 'octo-org/one']);
    fireEvent.click(screen.getByRole('option', { name: 'octo-org/two' }));
    expect(picked()).toEqual(['octo-org/one']);
  });

  it('asks for the next page when an overflowing menu is scrolled to its end', () => {
    stubScrollGeometry({ scrollHeight: 500, clientHeight: 224, scrollTop: 0 });
    const onLoadMore = jest.fn();
    withTheme(<PickerHarness hasMore onLoadMore={onLoadMore} />);
    open();
    const paper = screen.getByRole('listbox').closest('.MuiPaper-root') as HTMLElement;
    fireEvent.scroll(paper);
    expect(onLoadMore).not.toHaveBeenCalled();

    stubScrollGeometry({ scrollHeight: 500, clientHeight: 224, scrollTop: 276 });
    fireEvent.scroll(paper);
    expect(onLoadMore).toHaveBeenCalledTimes(1);
  });

  it('re-arms the short-menu auto-request when the host refetches the list in place', () => {
    stubScrollGeometry({ scrollHeight: 120, clientHeight: 120 });
    const onLoadMore = jest.fn();
    function RefetchedPicker() {
      const [list, setList] = useState({ repositories: REPOS, hasMore: true });
      return (
        <>
          <GitHubRepositoryPicker
            repositories={list.repositories}
            selected={[]}
            onChange={() => undefined}
            hasMore={list.hasMore}
            onLoadMore={onLoadMore}
          />
          <button
            type="button"
            onClick={() => setList({ repositories: [...REPOS, 'octo-org/three'], hasMore: false })}
          >
            last page
          </button>
          <button type="button" onClick={() => setList({ repositories: REPOS, hasMore: true })}>
            refetch
          </button>
        </>
      );
    }

    withTheme(<RefetchedPicker />);
    open();
    expect(onLoadMore).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText('last page', { selector: 'button' }));
    expect(onLoadMore).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText('refetch', { selector: 'button' }));
    expect(onLoadMore).toHaveBeenCalledTimes(2);
  });

  it('asks for the next page when the menu opens too short to scroll', () => {
    stubScrollGeometry({ scrollHeight: 120, clientHeight: 120 });
    const onLoadMore = jest.fn();
    withTheme(<PickerHarness hasMore onLoadMore={onLoadMore} />);
    expect(onLoadMore).not.toHaveBeenCalled();
    open();
    expect(onLoadMore).toHaveBeenCalledTimes(1);
  });

  it('does not page while a page is loading or once the list is exhausted', () => {
    const onLoadMore = jest.fn();
    const { unmount } = withTheme(<PickerHarness hasMore loading onLoadMore={onLoadMore} />);
    open();
    fireEvent.scroll(screen.getByRole('listbox').closest('.MuiPaper-root') as HTMLElement);
    unmount();

    withTheme(<PickerHarness hasMore={false} onLoadMore={onLoadMore} />);
    open();
    fireEvent.scroll(screen.getByRole('listbox').closest('.MuiPaper-root') as HTMLElement);
    expect(onLoadMore).not.toHaveBeenCalled();
  });

  it('keeps the loading row out of the selection', () => {
    withTheme(<PickerHarness hasMore loading />);
    open();
    const loadingRow = screen.getByRole('option', { name: /loading more repositories/i });
    expect(loadingRow.getAttribute('aria-disabled')).toBe('true');
    fireEvent.click(loadingRow);
    expect(picked()).toEqual([]);
  });
});

describe('GitHubRepositoryPicker singleSelect', () => {
  const REPOS = ['octo-org/one', 'octo-org/two'];

  function SinglePicker({ initial = [] as string[] }) {
    const [selected, setSelected] = useState<string[]>(initial);
    return (
      <>
        <GitHubRepositoryPicker
          singleSelect
          repositories={REPOS}
          selected={selected}
          onChange={setSelected}
        />
        <p data-testid="picked">{JSON.stringify(selected)}</p>
      </>
    );
  }

  const open = () => fireEvent.mouseDown(screen.getByRole('combobox'));
  const picked = () => JSON.parse(screen.getByTestId('picked').textContent ?? '[]');

  it('replaces the selection with the one repository picked', () => {
    withTheme(<SinglePicker />);
    open();
    fireEvent.click(screen.getByRole('option', { name: 'octo-org/two' }));
    expect(picked()).toEqual(['octo-org/two']);
    open();
    fireEvent.click(screen.getByRole('option', { name: 'octo-org/one' }));
    expect(picked()).toEqual(['octo-org/one']);
  });

  it('renders a single-value list without checkboxes', () => {
    withTheme(<SinglePicker initial={['octo-org/one']} />);
    expect(screen.getByRole('combobox').textContent).toBe('octo-org/one');
    open();
    expect(screen.getByRole('listbox').getAttribute('aria-multiselectable')).not.toBe('true');
    expect(screen.queryAllByRole('checkbox')).toHaveLength(0);
    expect(screen.getByRole('option', { name: 'octo-org/one' }).getAttribute('aria-selected')).toBe(
      'true'
    );
  });

  it('lists a bound repository that is not on a fetched page yet', () => {
    withTheme(<SinglePicker initial={['octo-org/later']} />);
    expect(screen.getByRole('combobox').textContent).toBe('octo-org/later');
    open();
    const options = screen.getAllByRole('option').map((option) => option.textContent);
    expect(options).toEqual(['octo-org/later', 'octo-org/one', 'octo-org/two']);
  });
});

describe('GitHubRefPicker', () => {
  const BRANCHES = ['develop', 'main', 'release-1.0'];

  function RefHarness({
    initial = '',
    onChangeSpy,
    ...props
  }: Partial<GitHubRefPickerProps> & { initial?: string; onChangeSpy?: (ref: string) => void }) {
    const [value, setValue] = useState(initial);
    return (
      <>
        <GitHubRefPicker
          branches={BRANCHES}
          defaultBranch="main"
          {...props}
          value={value}
          onChange={(ref) => {
            onChangeSpy?.(ref);
            setValue(ref);
          }}
        />
        <p data-testid="ref">{JSON.stringify(value)}</p>
      </>
    );
  }

  const input = () => screen.getByRole('combobox') as HTMLInputElement;
  const open = () => {
    fireEvent.focus(input());
    fireEvent.keyDown(input(), { key: 'ArrowDown' });
  };
  const currentRef = () => JSON.parse(screen.getByTestId('ref').textContent ?? '""');
  // An option's first node is the ref; the default branch carries a mark after it.
  const optionNames = () =>
    screen.getAllByRole('option').map((option) => option.firstChild?.textContent);

  it('shows the default branch by name when the value is the default', () => {
    withTheme(<RefHarness />);
    expect(input().value).toBe('main');
    expect(screen.getByLabelText('Branch')).toBe(input());
  });

  it('lists the default branch first and marks it', () => {
    withTheme(<RefHarness />);
    open();
    expect(optionNames()).toEqual(['main', 'develop', 'release-1.0']);
    expect(screen.getByRole('option', { name: 'main , default branch' })).toBeTruthy();
    expect(
      screen.getAllByRole('option').filter((o) => o.textContent?.includes('default'))
    ).toHaveLength(1);
  });

  it('reports a picked branch, and the default branch as an empty ref', () => {
    const onChangeSpy = jest.fn();
    withTheme(<RefHarness onChangeSpy={onChangeSpy} />);
    open();
    fireEvent.click(screen.getByRole('option', { name: 'release-1.0' }));
    expect(currentRef()).toBe('release-1.0');
    expect(input().value).toBe('release-1.0');

    open();
    fireEvent.click(screen.getByRole('option', { name: /main/ }));
    expect(currentRef()).toBe('');
    expect(onChangeSpy.mock.calls).toEqual([['release-1.0'], ['']]);
  });

  it('shows a placeholder while the default branch is unknown', () => {
    withTheme(<RefHarness defaultBranch={undefined} />);
    expect(input().value).toBe('');
    expect(input().getAttribute('placeholder')).toBe('Default branch');
  });

  it('lists a bound ref that is not on a fetched page yet', () => {
    withTheme(<RefHarness initial="feature/later" />);
    expect(input().value).toBe('feature/later');
    open();
    expect(optionNames()).toEqual(['main', 'develop', 'release-1.0', 'feature/later']);
  });

  it('does not accept free text unless custom refs are allowed', () => {
    const onChangeSpy = jest.fn();
    withTheme(<RefHarness onChangeSpy={onChangeSpy} />);
    fireEvent.change(input(), { target: { value: 'v1.2.0' } });
    fireEvent.keyDown(input(), { key: 'Enter' });
    fireEvent.blur(input());
    expect(onChangeSpy).not.toHaveBeenCalled();
    expect(input().value).toBe('main');
  });

  it('commits a typed tag on Enter and on blur, trimmed', () => {
    withTheme(<RefHarness allowCustomRef />);
    expect(screen.getByLabelText('Branch or tag')).toBe(input());
    fireEvent.change(input(), { target: { value: ' v1.2.0 ' } });
    fireEvent.keyDown(input(), { key: 'Enter' });
    expect(currentRef()).toBe('v1.2.0');

    fireEvent.change(input(), { target: { value: 'v2.0.0' } });
    fireEvent.blur(input());
    expect(currentRef()).toBe('v2.0.0');
  });

  it('treats a typed default branch, and an emptied field, as the default', () => {
    withTheme(<RefHarness allowCustomRef initial="v1.2.0" />);
    fireEvent.change(input(), { target: { value: 'main' } });
    fireEvent.keyDown(input(), { key: 'Enter' });
    expect(currentRef()).toBe('');

    fireEvent.change(input(), { target: { value: 'v1.2.0' } });
    fireEvent.blur(input());
    expect(currentRef()).toBe('v1.2.0');

    fireEvent.focus(input());
    fireEvent.change(input(), { target: { value: '' } });
    fireEvent.blur(input());
    expect(currentRef()).toBe('');
    expect(input().value).toBe('main');
  });

  it('clears a picked ref back to the default branch', () => {
    withTheme(<RefHarness initial="develop" />);
    // MUI hides the clear button (so it has no accessible name) until hover or focus.
    fireEvent.click(screen.getByTitle('Clear'));
    expect(currentRef()).toBe('');
    expect(input().value).toBe('main');
    expect(screen.queryByTitle('Clear')).toBeNull();
  });

  it('asks for the next page when an overflowing list is scrolled to its end', () => {
    stubScrollGeometry({ scrollHeight: 500, clientHeight: 224, scrollTop: 0 });
    const onLoadMore = jest.fn();
    withTheme(<RefHarness hasMore onLoadMore={onLoadMore} />);
    open();
    const listbox = screen.getByRole('listbox');
    fireEvent.scroll(listbox);
    expect(onLoadMore).not.toHaveBeenCalled();

    stubScrollGeometry({ scrollHeight: 500, clientHeight: 224, scrollTop: 276 });
    fireEvent.scroll(listbox);
    expect(onLoadMore).toHaveBeenCalledTimes(1);
  });

  it('asks for the next page when the list opens too short to scroll', () => {
    stubScrollGeometry({ scrollHeight: 120, clientHeight: 120 });
    const onLoadMore = jest.fn();
    withTheme(<RefHarness hasMore onLoadMore={onLoadMore} />);
    expect(onLoadMore).not.toHaveBeenCalled();
    open();
    expect(onLoadMore).toHaveBeenCalledTimes(1);
  });

  it('keeps the scroll position while a page loads and when it lands', () => {
    // scrollTop stays real so MUI's highlight sync can move it, as it does in a browser.
    stubScrollGeometry({ scrollHeight: 500, clientHeight: 224 });
    function PagedRefs() {
      const [branches, setBranches] = useState(BRANCHES);
      const [loading, setLoading] = useState(false);
      return (
        <>
          <GitHubRefPicker
            branches={branches}
            defaultBranch="main"
            value=""
            onChange={() => undefined}
            loading={loading}
            hasMore={branches.length < 5}
            onLoadMore={() => setLoading(true)}
          />
          <button
            type="button"
            onClick={() => {
              setBranches((current) => [...current, 'v1', 'v2']);
              setLoading(false);
            }}
          >
            page lands
          </button>
        </>
      );
    }

    withTheme(<PagedRefs />);
    open();
    const listbox = screen.getByRole('listbox');
    listbox.scrollTop = 276;
    fireEvent.scroll(listbox);
    expect(screen.getByRole('status', { name: /loading more branches/i })).toBeTruthy();
    expect(listbox.scrollTop).toBe(276);

    fireEvent.click(screen.getByText('page lands', { selector: 'button' }));
    expect(optionNames()).toHaveLength(5);
    expect(screen.getByRole('listbox').scrollTop).toBe(276);
  });

  it('keeps the keyboard highlight while pages are requested and land', () => {
    stubScrollGeometry({ scrollHeight: 500, clientHeight: 224 });
    function PagedRefs() {
      const [branches, setBranches] = useState(BRANCHES);
      const [loading, setLoading] = useState(false);
      return (
        <>
          <GitHubRefPicker
            // A fresh array on every render, as a host mapping API results inline passes.
            branches={[...branches]}
            defaultBranch="main"
            value=""
            onChange={() => undefined}
            loading={loading}
            hasMore={branches.length < 7}
            onLoadMore={() => setLoading(true)}
          />
          <button
            type="button"
            onClick={() => {
              setBranches((current) => [
                ...current,
                `v${current.length}`,
                `v${current.length + 1}`
              ]);
              setLoading(false);
            }}
          >
            page lands
          </button>
        </>
      );
    }
    const highlighted = () =>
      screen.getByRole('listbox').querySelector('.Mui-focused')?.firstChild?.textContent;
    const requestPage = () => {
      const listbox = screen.getByRole('listbox');
      listbox.scrollTop = 276;
      fireEvent.scroll(listbox);
    };

    withTheme(<PagedRefs />);
    open();
    expect(highlighted()).toBe('main');
    fireEvent.keyDown(input(), { key: 'ArrowDown' });
    fireEvent.keyDown(input(), { key: 'ArrowDown' });
    expect(highlighted()).toBe('release-1.0');

    requestPage();
    expect(highlighted()).toBe('release-1.0');
    fireEvent.click(screen.getByText('page lands', { selector: 'button' }));
    expect(highlighted()).toBe('release-1.0');

    // The request after a landed page is the render MUI used to re-highlight on.
    requestPage();
    expect(screen.getByRole('status', { name: /loading more branches/i })).toBeTruthy();
    expect(highlighted()).toBe('release-1.0');
    fireEvent.keyDown(input(), { key: 'ArrowDown' });
    expect(highlighted()).toBe('v3');
  });

  it('does not wrap the keyboard highlight to the top while more pages exist', () => {
    const { unmount } = withTheme(<RefHarness hasMore onLoadMore={() => undefined} />);
    open();
    for (let press = 0; press < 3; press++) fireEvent.keyDown(input(), { key: 'ArrowDown' });
    expect(screen.getByRole('listbox').querySelector('.Mui-focused')?.textContent).toBe(
      'release-1.0'
    );
    unmount();

    withTheme(<RefHarness />);
    open();
    for (let press = 0; press < 3; press++) fireEvent.keyDown(input(), { key: 'ArrowDown' });
    expect(screen.getByRole('listbox').querySelector('.Mui-focused')?.firstChild?.textContent).toBe(
      'main'
    );
  });

  it('does not page while a page is loading or once the list is exhausted', () => {
    stubScrollGeometry({ scrollHeight: 500, clientHeight: 224, scrollTop: 276 });
    const onLoadMore = jest.fn();
    const { unmount } = withTheme(<RefHarness hasMore loading onLoadMore={onLoadMore} />);
    open();
    fireEvent.scroll(screen.getByRole('listbox'));
    unmount();

    withTheme(<RefHarness hasMore={false} onLoadMore={onLoadMore} />);
    open();
    fireEvent.scroll(screen.getByRole('listbox'));
    expect(onLoadMore).not.toHaveBeenCalled();
  });

  it('shows a loading row outside the options while a further page loads', () => {
    withTheme(<RefHarness hasMore loading />);
    open();
    const status = screen.getByRole('status', { name: /loading more branches/i });
    expect(within(screen.getByRole('listbox')).queryByRole('status')).toBeNull();
    expect(status).toBeTruthy();
    expect(optionNames()).toHaveLength(3);
  });

  it('searches further pages when the filter matches no loaded branch', () => {
    function PagedRefs() {
      const [branches, setBranches] = useState(BRANCHES);
      const [loading, setLoading] = useState(false);
      const [requests, setRequests] = useState(0);
      return (
        <>
          <GitHubRefPicker
            branches={branches}
            defaultBranch="main"
            value=""
            onChange={() => undefined}
            loading={loading}
            hasMore={branches.length < 7}
            onLoadMore={() => {
              setRequests((count) => count + 1);
              setLoading(true);
            }}
          />
          <p data-testid="requests">{requests}</p>
          <button
            type="button"
            onClick={() => {
              setBranches((current) => [
                ...current,
                `v${current.length}`,
                `v${current.length + 1}`
              ]);
              setLoading(false);
            }}
          >
            page lands
          </button>
          <button type="button" onClick={() => setLoading(false)}>
            page fails
          </button>
        </>
      );
    }
    const requests = () => Number(screen.getByTestId('requests').textContent);

    stubScrollGeometry({ scrollHeight: 500, clientHeight: 224 });
    withTheme(<PagedRefs />);
    open();
    expect(requests()).toBe(0);
    fireEvent.change(input(), { target: { value: 'release-2' } });
    expect(requests()).toBe(1);
    expect(screen.getByText('Searching more branches...')).toBeTruthy();
    expect(screen.queryByText('No matching branch')).toBeNull();

    fireEvent.click(screen.getByText('page lands', { selector: 'button' }));
    expect(requests()).toBe(2);
    expect(screen.getByText('Searching more branches...')).toBeTruthy();

    // A failed page adds nothing and is not re-requested on its own; the reader can retry.
    fireEvent.click(screen.getByText('page fails', { selector: 'button' }));
    expect(requests()).toBe(2);
    expect(screen.queryByText('Searching more branches...')).toBeNull();
    expect(screen.getByText('No loaded branch matches')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Load more branches' }));
    expect(requests()).toBe(3);
    expect(screen.getByText('Searching more branches...')).toBeTruthy();
    expect(screen.queryByRole('button', { name: 'Load more branches' })).toBeNull();

    fireEvent.click(screen.getByText('page lands', { selector: 'button' }));
    expect(requests()).toBe(3);
    expect(screen.getByText('No matching branch')).toBeTruthy();
    expect(screen.queryByRole('button', { name: 'Load more branches' })).toBeNull();
  });

  it('searches again after the branches are replaced by a list of the same length', () => {
    function SwitchedRepository() {
      const [branches, setBranches] = useState(BRANCHES);
      const [loading, setLoading] = useState(false);
      const [requests, setRequests] = useState(0);
      return (
        <>
          <GitHubRefPicker
            branches={branches}
            defaultBranch="main"
            value=""
            onChange={() => undefined}
            loading={loading}
            hasMore
            onLoadMore={() => {
              setRequests((count) => count + 1);
              setLoading(true);
            }}
          />
          <p data-testid="requests">{requests}</p>
          <button type="button" onClick={() => setLoading(false)}>
            page fails
          </button>
          <button
            type="button"
            onClick={() => {
              setBranches([]);
              setLoading(true);
            }}
          >
            switch repository
          </button>
          <button
            type="button"
            onClick={() => {
              setBranches(['main', 'staging', 'hotfix']);
              setLoading(false);
            }}
          >
            first page lands
          </button>
        </>
      );
    }
    const requests = () => Number(screen.getByTestId('requests').textContent);

    stubScrollGeometry({ scrollHeight: 500, clientHeight: 224 });
    withTheme(<SwitchedRepository />);
    open();
    expect(requests()).toBe(0);
    fireEvent.change(input(), { target: { value: 'release-2' } });
    expect(requests()).toBe(1);
    fireEvent.click(screen.getByText('page fails', { selector: 'button' }));
    expect(requests()).toBe(1);

    fireEvent.click(screen.getByText('switch repository', { selector: 'button' }));
    fireEvent.click(screen.getByText('first page lands', { selector: 'button' }));
    expect(requests()).toBe(2);
    expect(screen.getByText('Searching more branches...')).toBeTruthy();
  });

  it('says no branch matches once every page is loaded', () => {
    const onLoadMore = jest.fn();
    withTheme(<RefHarness hasMore={false} onLoadMore={onLoadMore} />);
    open();
    fireEvent.change(input(), { target: { value: 'release-2' } });
    expect(screen.getByText('No matching branch')).toBeTruthy();
    expect(screen.queryByText('Searching more branches...')).toBeNull();
    expect(onLoadMore).not.toHaveBeenCalled();
  });

  it('says it is loading while the first page is fetched', () => {
    withTheme(<RefHarness branches={[]} defaultBranch={undefined} loading />);
    open();
    expect(screen.getByText('Loading branches...')).toBeTruthy();
  });

  it('cannot be opened or changed while disabled', () => {
    withTheme(<RefHarness disabled />);
    expect(input().disabled).toBe(true);
  });

  it('gives each instance its own ids, and honours a host id', () => {
    withTheme(
      <>
        <GitHubRefPicker branches={BRANCHES} value="" onChange={() => undefined} />
        <GitHubRefPicker branches={BRANCHES} value="" onChange={() => undefined} id="remap-ref" />
        <GitHubRefPicker branches={BRANCHES} value="" onChange={() => undefined} />
      </>
    );
    const ids = screen.getAllByRole('combobox').map((field) => field.id);
    expect(ids[1]).toBe('remap-ref');
    expect(new Set(ids).size).toBe(3);
  });
});

describe('GitHubFileTree', () => {
  const TREE: GitHubFileTreeNode[] = [
    {
      id: 'deploy',
      label: 'deploy',
      type: 'dir',
      children: [
        { id: 'deploy/app.yaml', label: 'app.yaml', type: 'file' },
        { id: 'deploy/svc.YML', label: 'svc.YML', type: 'file' },
        { id: 'deploy/notes.md', label: 'notes.md', type: 'file' }
      ]
    },
    {
      id: 'docs',
      label: 'docs',
      type: 'dir',
      children: [{ id: 'docs/readme.md', label: 'readme.md', type: 'file' }]
    },
    {
      id: 'chart.tgz',
      label: 'chart.tgz',
      type: 'file',
      status: 'error',
      statusMessage: 'Not a chart archive'
    }
  ];

  function TreeHarness(props: Partial<GitHubFileTreeProps>) {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <>
        <GitHubFileTree
          items={TREE}
          selected={selected}
          onSelectionChange={setSelected}
          defaultExpanded={['deploy', 'docs']}
          {...props}
        />
        <p data-testid="picked">{JSON.stringify(selected)}</p>
      </>
    );
  }

  const picked = () => JSON.parse(screen.getByTestId('picked').textContent ?? '[]');
  const fileBox = (name: string) => screen.getByRole('checkbox', { name: new RegExp(`^${name}`) });

  it('shows only supported files and the folders that hold one, matching case-insensitively', () => {
    withTheme(<TreeHarness supportedExtensions={['.yaml', '.yml', '.tgz']} />);
    expect(screen.getByText('app.yaml')).toBeTruthy();
    expect(screen.getByText('svc.YML')).toBeTruthy();
    expect(screen.queryByText('notes.md')).toBeNull();
    expect(screen.queryByText('docs')).toBeNull();
  });

  it('shows every file without a filter', () => {
    withTheme(<TreeHarness supportedExtensions={null} />);
    expect(screen.getByText('notes.md')).toBeTruthy();
    expect(screen.getByText('readme.md')).toBeTruthy();
  });

  it('selects every visible file under a folder, and reports a partial folder as mixed', () => {
    withTheme(<TreeHarness supportedExtensions={['.yaml', '.yml']} />);
    const folder = screen.getByRole('checkbox', { name: 'Select every file in deploy' });

    fireEvent.click(folder);
    expect(picked()).toEqual(['deploy/app.yaml', 'deploy/svc.YML']);
    expect((folder as HTMLInputElement).checked).toBe(true);

    fireEvent.click(fileBox('app.yaml'));
    expect(picked()).toEqual(['deploy/svc.YML']);
    expect(folder.getAttribute('data-indeterminate')).toBe('true');

    fireEvent.click(folder);
    expect(picked()).toEqual(['deploy/svc.YML', 'deploy/app.yaml']);
    fireEvent.click(folder);
    expect(picked()).toEqual([]);
  });

  it('picks one file in single-select mode, with no checkboxes and no folder selection', () => {
    withTheme(<TreeHarness singleSelect />);
    expect(screen.queryAllByRole('checkbox')).toHaveLength(0);
    const fileRadio = (name: string) => screen.getByRole('radio', { name: new RegExp(`^${name}`) });
    expect(screen.getAllByRole('radio')).toHaveLength(5);

    fireEvent.click(fileRadio('app.yaml'));
    expect(picked()).toEqual(['deploy/app.yaml']);
    fireEvent.click(fileRadio('notes.md'));
    expect(picked()).toEqual(['deploy/notes.md']);
    expect((fileRadio('notes.md') as HTMLInputElement).checked).toBe(true);
    expect((fileRadio('app.yaml') as HTMLInputElement).checked).toBe(false);

    // A single choice is replaced, never cleared, as on the repository picker.
    fireEvent.click(fileRadio('notes.md'));
    expect(picked()).toEqual(['deploy/notes.md']);
  });

  it('groups the single-select files under the tree name, one group per tree', () => {
    withTheme(
      <>
        <TreeHarness singleSelect aria-label="Files in octo-org/one" />
        <TreeHarness singleSelect aria-label="Files in octo-org/two" />
      </>
    );
    const [one, two] = screen.getAllByRole('radiogroup');
    expect(one.getAttribute('aria-label')).toBe('Files in octo-org/one');
    expect(two.getAttribute('aria-label')).toBe('Files in octo-org/two');
    const groupName = (group: HTMLElement) =>
      new Set(
        within(group)
          .getAllByRole('radio')
          .map((radio) => radio.getAttribute('name'))
      );
    expect(groupName(one).size).toBe(1);
    expect(groupName(two).size).toBe(1);
    expect([...groupName(one)][0]).not.toBe([...groupName(two)][0]);

    fireEvent.click(within(one).getByRole('radio', { name: /^app\.yaml/ }));
    fireEvent.click(within(two).getByRole('radio', { name: /^readme\.md/ }));
    expect(within(one).getByRole('radio', { name: /^app\.yaml/ })).toHaveProperty('checked', true);
  });

  it('wires every expanded folder to exactly one group, across trees and ids with spaces', () => {
    const tree: GitHubFileTreeNode[] = [
      {
        id: 'deploy',
        label: 'deploy',
        type: 'dir',
        children: [{ id: 'deploy/app.yaml', label: 'app.yaml', type: 'file' }]
      },
      {
        id: 'my designs',
        label: 'my designs',
        type: 'dir',
        children: [{ id: 'my designs/x.yaml', label: 'x.yaml', type: 'file' }]
      }
    ];
    const props = {
      items: tree,
      selected: [],
      onSelectionChange: () => undefined,
      defaultExpanded: ['deploy', 'my designs']
    };
    withTheme(
      <>
        <GitHubFileTree {...props} aria-label="one" />
        <GitHubFileTree {...props} aria-label="two" />
      </>
    );

    const disclosures = screen.getAllByRole('button', { name: /^Collapse / });
    expect(disclosures).toHaveLength(4);
    for (const disclosure of disclosures) {
      const controls = disclosure.getAttribute('aria-controls') ?? '';
      expect(controls.split(/\s+/)).toHaveLength(1);
      expect(
        Array.from(document.querySelectorAll('[id]')).filter((element) => element.id === controls)
      ).toHaveLength(1);
      expect(document.getElementById(controls)?.closest('li')).toBe(disclosure.closest('li'));
    }
  });

  it('collapses and expands a folder from its disclosure button', () => {
    withTheme(<TreeHarness />);
    const toggle = screen.getByRole('button', { name: 'Collapse deploy' });
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    fireEvent.click(toggle);
    expect(screen.queryByText('app.yaml')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Expand deploy' }));
    expect(screen.getByText('app.yaml')).toBeTruthy();
  });

  it('announces an earlier import outcome with the file', () => {
    withTheme(<TreeHarness />);
    expect(fileBox('chart.tgz')).toBeTruthy();
    expect(screen.getByTestId('github-file-tree-item-chart.tgz').textContent).toMatch(
      /Not a chart archive/
    );
  });

  it('explains an empty result, naming the filter that emptied it', () => {
    const { unmount } = withTheme(<TreeHarness supportedExtensions={['.json']} />);
    expect(screen.getByRole('status').textContent).toBe('No files with .json found.');
    unmount();

    withTheme(<TreeHarness items={[]} />);
    expect(screen.getByRole('status').textContent).toBe('No files found in this repository.');
  });

  it('pages in more files at the end of the tree, but not while a page is loading', () => {
    stubScrollGeometry({ scrollHeight: 600, clientHeight: 300, scrollTop: 0 });
    const onLoadMore = jest.fn();
    const { rerender } = withTheme(<TreeHarness hasMore onLoadMore={onLoadMore} />);
    fireEvent.scroll(screen.getByTestId('github-file-tree'));
    expect(onLoadMore).not.toHaveBeenCalled();

    stubScrollGeometry({ scrollHeight: 600, clientHeight: 300, scrollTop: 300 });
    fireEvent.scroll(screen.getByTestId('github-file-tree'));
    expect(onLoadMore).toHaveBeenCalledTimes(1);

    rerender(
      <SistentThemeProvider>
        <TreeHarness hasMore loading onLoadMore={onLoadMore} />
      </SistentThemeProvider>
    );
    fireEvent.scroll(screen.getByTestId('github-file-tree'));
    expect(onLoadMore).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('status', { name: /loading more files/i })).toBeTruthy();
  });
});

describe('GitHubFileTree paging without overflow', () => {
  function PagedTree({ pages }: { pages: GitHubFileTreeNode[][] }) {
    const [loaded, setLoaded] = useState(1);
    const [loading, setLoading] = useState(false);
    return (
      <GitHubFileTree
        items={pages.slice(0, loaded).flat()}
        selected={[]}
        onSelectionChange={() => undefined}
        supportedExtensions={['.yaml']}
        hasMore={loaded < pages.length}
        loading={loading}
        onLoadMore={() => {
          setLoading(true);
          setLoaded((count) => count + 1);
          setLoading(false);
        }}
      />
    );
  }

  it('keeps paging past a first page the extension filter empties', () => {
    withTheme(
      <PagedTree
        pages={[
          [{ id: 'README.md', label: 'README.md', type: 'file' }],
          [{ id: 'LICENSE', label: 'LICENSE', type: 'file' }],
          [{ id: 'app.yaml', label: 'app.yaml', type: 'file' }]
        ]}
      />
    );
    expect(screen.getByText('app.yaml')).toBeTruthy();
  });

  it('does not re-request a failed page on later renders', () => {
    const onLoadMore = jest.fn();
    function FailingTree() {
      const [loading, setLoading] = useState(false);
      const [, setTick] = useState(0);
      return (
        <>
          <GitHubFileTree
            items={[{ id: 'README.md', label: 'README.md', type: 'file' }]}
            selected={[]}
            onSelectionChange={() => undefined}
            supportedExtensions={['.yaml']}
            hasMore
            loading={loading}
            onLoadMore={() => {
              onLoadMore();
              setLoading(true);
            }}
          />
          <button type="button" onClick={() => setLoading(false)}>
            fail page
          </button>
          <button type="button" onClick={() => setTick((tick) => tick + 1)}>
            rerender
          </button>
        </>
      );
    }

    withTheme(<FailingTree />);
    expect(onLoadMore).toHaveBeenCalledTimes(1);

    fireEvent.click(button('fail page'));
    fireEvent.click(button('rerender'));
    fireEvent.click(button('rerender'));
    expect(onLoadMore).toHaveBeenCalledTimes(1);
  });

  it('auto-requests again when the content resets to an earlier count after growing', () => {
    const onLoadMore = jest.fn();
    const page = (count: number): GitHubFileTreeNode[] =>
      Array.from({ length: count }, (_, n) => ({
        id: `notes-${n}.md`,
        label: `notes-${n}.md`,
        type: 'file' as const
      }));
    function RescannedTree() {
      const [scan, setScan] = useState({ count: 2, hasMore: true });
      return (
        <>
          <GitHubFileTree
            items={page(scan.count)}
            selected={[]}
            onSelectionChange={() => undefined}
            supportedExtensions={['.yaml']}
            hasMore={scan.hasMore}
            onLoadMore={onLoadMore}
          />
          <button type="button" onClick={() => setScan({ count: 3, hasMore: false })}>
            last page
          </button>
          <button type="button" onClick={() => setScan({ count: 2, hasMore: true })}>
            rescan
          </button>
        </>
      );
    }

    withTheme(<RescannedTree />);
    expect(onLoadMore).toHaveBeenCalledTimes(1);

    fireEvent.click(button('last page'));
    expect(onLoadMore).toHaveBeenCalledTimes(1);

    fireEvent.click(button('rescan'));
    expect(onLoadMore).toHaveBeenCalledTimes(2);
  });

  it('requests a page once on mount, not once per trigger', () => {
    const onLoadMore = jest.fn();
    withTheme(
      <GitHubFileTree
        items={[]}
        selected={[]}
        onSelectionChange={() => undefined}
        hasMore
        onLoadMore={onLoadMore}
      />
    );
    expect(onLoadMore).toHaveBeenCalledTimes(1);
  });
});

describe('GitHubRepositorySection', () => {
  it('prefers the selection count while files are picked, else imported and failed', () => {
    const { rerender } = withTheme(
      <GitHubRepositorySection repository="octo-org/one" counts={{ selected: 2, imported: 3 }} />
    );
    const header = () => screen.getByRole('button', { name: /octo-org\/one/ }).textContent;
    expect(header()).toMatch(/2 selected/);
    expect(header()).not.toMatch(/imported/);

    rerender(
      <SistentThemeProvider>
        <GitHubRepositorySection repository="octo-org/one" counts={{ imported: 3, failed: 1 }} />
      </SistentThemeProvider>
    );
    expect(header()).toMatch(/3 imported/);
    expect(header()).toMatch(/1 failed/);
  });
});

describe('GitHubFinishSummary', () => {
  const OUTCOMES: GitHubFinishRepository[] = [
    {
      name: 'octo-org/one',
      importedDesigns: [{ id: 'd1', name: 'app.yaml' }],
      failedImports: [{ id: 'f1', name: 'deploy/bad.yaml' }],
      workflow: { status: 'failed', onRetry: jest.fn() }
    },
    { name: 'octo-org/two', importedDesigns: [] }
  ];

  it('summarises each repository and routes View and Retry to the host', () => {
    const onViewDesign = jest.fn();
    withTheme(<GitHubFinishSummary repositories={OUTCOMES} onViewDesign={onViewDesign} />);

    expect(screen.getByText('Imported designs (1)')).toBeTruthy();
    expect(screen.getByText("Not able to import 'deploy/bad.yaml'.")).toBeTruthy();

    fireEvent.click(button('View app.yaml'));
    expect(onViewDesign).toHaveBeenCalledWith({ id: 'd1', name: 'app.yaml' }, 'octo-org/one');

    fireEvent.click(button(/^retry$/i));
    expect(OUTCOMES[0].workflow?.onRetry).toHaveBeenCalledTimes(1);
  });

  it('omits the workflow for a flow without snapshots and opens one repository at a time', () => {
    withTheme(<GitHubFinishSummary repositories={OUTCOMES} />);
    const second = screen.getByRole('button', { name: /octo-org\/two/ });
    expect(second.getAttribute('aria-expanded')).toBe('false');

    fireEvent.click(second);
    expect(second.getAttribute('aria-expanded')).toBe('true');
    expect(
      screen.getByRole('button', { name: /octo-org\/one/ }).getAttribute('aria-expanded')
    ).toBe('false');
    expect(screen.getAllByTestId('github-finish-workflow')).toHaveLength(1);
    expect(screen.queryByRole('button', { name: /^view/i })).toBeNull();
  });

  it('offers a retry only for a failed workflow, and blocks it while in flight', () => {
    const onRetry = jest.fn();
    withTheme(
      <GitHubFinishSummary
        repositories={[
          {
            name: 'octo-org/one',
            importedDesigns: [],
            workflow: { status: 'failed', onRetry, retrying: true }
          },
          {
            name: 'octo-org/two',
            importedDesigns: [],
            workflow: { status: 'configured', onRetry }
          }
        ]}
      />
    );
    const retry = button(/^retry$/i) as HTMLButtonElement;
    expect(retry.disabled).toBe(true);
    fireEvent.click(screen.getByRole('button', { name: /octo-org\/two/ }));
    expect(screen.getAllByRole('button', { name: /^retry$/i, hidden: true })).toHaveLength(1);
  });
});
