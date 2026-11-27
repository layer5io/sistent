import React from 'react';
import { Button, CircularProgress, Typography } from '../../base';
import { CheckCircleIcon, ErrorIcon, GithubIcon } from '../../icons';
import { useTheme } from '../../theme';
import { StatusIdentity, StatusPill, StatusRoot, StatusRow, VisuallyHidden } from './style';

/**
 * Lifecycle of a GitHub App connection as a host can observe it:
 *
 * - `not-connected` - no installation yet (Cloud: the integrations card offers CONNECT).
 * - `verifying` - the host is checking the installation after GitHub hands the
 *   user back (Cloud: "Verifying your Github Installation...").
 * - `connected` - the installation is usable.
 * - `error` - the installation is unusable: revoked, suspended, or verification
 *   failed. Offer a reconnect.
 */
export type GitHubConnectionStatusValue = 'not-connected' | 'verifying' | 'connected' | 'error';

export interface GitHubConnectionStatusProps {
  status: GitHubConnectionStatusValue;
  /** GitHub account or organization the app is installed on, e.g. `octo-org`. Defaults to "GitHub". */
  account?: string;
  /** Supporting detail under the status, e.g. why the connection failed. */
  message?: React.ReactNode;
  /** Renders a "Reconnect" action while `status` is `error`. */
  onReconnect?: () => void;
  /** Overrides the "Reconnect" label. */
  reconnectLabel?: string;
  /** The reconnect handoff is in flight: disables the action and shows progress. */
  reconnecting?: boolean;
}

const STATUS_LABELS: Readonly<Record<GitHubConnectionStatusValue, string>> = {
  'not-connected': 'Not connected',
  verifying: 'Verifying',
  connected: 'Connected',
  error: 'Connection error'
};

/**
 * Connection state of a GitHub App installation, generalized from Meshery
 * Cloud's connection status chip (`workspaces/integrations/common.tsx`), its
 * verify screen (`connect/verify/`), and the reconnect path its wizard lacks.
 */
export function GitHubConnectionStatus({
  status,
  account,
  message,
  onReconnect,
  reconnectLabel = 'Reconnect',
  reconnecting = false
}: GitHubConnectionStatusProps): JSX.Element {
  const theme = useTheme();
  const accent = {
    'not-connected': theme.palette.icon.secondary,
    verifying: theme.palette.status.info,
    connected: theme.palette.background.success?.default ?? theme.palette.status.success,
    error: theme.palette.status.error
  }[status];

  const indicator =
    status === 'verifying' ? (
      <CircularProgress color="inherit" size={12} thickness={5} aria-hidden />
    ) : status === 'connected' ? (
      <CheckCircleIcon width={16} height={16} fill="currentColor" aria-hidden />
    ) : status === 'error' ? (
      <ErrorIcon width={16} height={16} fill="currentColor" aria-hidden />
    ) : null;

  return (
    <StatusRoot data-testid="github-connection-status" data-status={status}>
      <StatusRow>
        <StatusIdentity>
          <GithubIcon width={18} height={18} fill="currentColor" />
          <span>{account ?? 'GitHub'}</span>
        </StatusIdentity>
        {/* The live region holds only the status text: a live region must not
            contain the interactive Reconnect action that sits beside it. */}
        <StatusPill accent={accent} role="status" aria-live="polite">
          {indicator && <span className="github-status-indicator">{indicator}</span>}
          <VisuallyHidden>GitHub connection: </VisuallyHidden>
          {STATUS_LABELS[status]}
        </StatusPill>
        {status === 'error' && onReconnect && (
          <Button
            variant="outlined"
            size="small"
            onClick={onReconnect}
            disabled={reconnecting}
            aria-busy={reconnecting || undefined}
            startIcon={
              reconnecting ? <CircularProgress color="inherit" size={14} aria-hidden /> : undefined
            }
          >
            {reconnectLabel}
          </Button>
        )}
      </StatusRow>
      {message && (
        <Typography
          variant="textB3Regular"
          component="div"
          sx={{
            color: status === 'error' ? theme.palette.text.error : theme.palette.text.secondary
          }}
        >
          {message}
        </Typography>
      )}
    </StatusRoot>
  );
}

export default GitHubConnectionStatus;
