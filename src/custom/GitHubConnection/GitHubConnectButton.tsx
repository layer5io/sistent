import { Button, CircularProgress } from '../../base';
import type { ButtonProps } from '../../base/Button/Button';
import { GithubIcon } from '../../icons';

export interface GitHubConnectButtonProps extends Omit<
  ButtonProps,
  'children' | 'label' | 'variant' | 'startIcon'
> {
  /**
   * The host already holds a GitHub connection. Flips the default label from
   * "Connect" to "Reconfigure", matching the integrations card in Meshery Cloud.
   */
  connected?: boolean;
  /**
   * The GitHub handoff is in flight. Set it synchronously in the click handler,
   * before navigating or opening a window, so the button never sits idle while
   * nothing visibly happens (meshery-cloud#6116). While loading, the button is
   * disabled, so a second click cannot start a second handoff.
   */
  loading?: boolean;
  /** Overrides the idle label ("Connect" / "Reconfigure"). */
  label?: string;
  /** Label shown while `loading`. Defaults to "Connecting". */
  loadingLabel?: string;
  /** Show the GitHub mark before the label. Defaults to `true`. */
  showIcon?: boolean;
}

/**
 * The CONNECT call to action for a GitHub App connection, extracted from Meshery
 * Cloud's `ConnectApp` wizard step and the CONNECT / RECONFIGURE button on its
 * integrations card.
 *
 * Purely presentational: the host owns the GitHub App URL and the handoff. It
 * sets `loading` the moment the click starts the handoff, and clears it (then
 * renders a `GitHubConnectionNotice`) when the handoff fails or is blocked.
 * Accepts every Sistent `Button` prop, including `permissionKey`.
 */
export function GitHubConnectButton({
  connected = false,
  loading = false,
  label,
  loadingLabel = 'Connecting',
  showIcon = true,
  disabled,
  ...buttonProps
}: GitHubConnectButtonProps): JSX.Element {
  const idleLabel = label ?? (connected ? 'Reconfigure' : 'Connect');
  const startIcon = loading ? (
    <CircularProgress color="inherit" size={16} aria-hidden />
  ) : showIcon ? (
    <GithubIcon width={18} height={18} fill="currentColor" />
  ) : undefined;

  return (
    <Button
      variant="contained"
      data-testid="github-connect-button"
      {...buttonProps}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      startIcon={startIcon}
    >
      {loading ? loadingLabel : idleLabel}
    </Button>
  );
}

export default GitHubConnectButton;
