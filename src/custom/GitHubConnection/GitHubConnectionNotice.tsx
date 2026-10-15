import React from 'react';
import { Button, CircularProgress, Link, Typography } from '../../base';
import { ErrorIcon, FolderRoundedIcon, OpenInNewIcon, WarningIcon } from '../../icons';
import { NoticeActions, NoticeCallout, NoticeContent, NoticeEmpty, type NoticeTone } from './style';

/**
 * The non-happy paths of a GitHub connection, each with its own recovery:
 *
 * - `empty` - nothing to list yet, e.g. the app is installed but can see no
 *   repositories (Cloud renders an empty, disabled pick list here). Pair it with
 *   an `action`, such as "Add repository".
 * - `error` - the handoff or a request failed. Offer `onRetry`.
 * - `popup-blocked` - the browser blocked the window GitHub needs. Offer
 *   `onRetry` and a same-tab `fallbackHref`.
 * - `redirecting` - the same-tab handoff has started; if the browser does not
 *   leave the page, `fallbackHref` lets the user follow the link by hand.
 */
export type GitHubConnectionNoticeKind = 'empty' | 'error' | 'popup-blocked' | 'redirecting';

export interface GitHubConnectionNoticeProps {
  kind: GitHubConnectionNoticeKind;
  /** Overrides the default heading for `kind`. */
  title?: React.ReactNode;
  /** Overrides the default explanation for `kind`, e.g. with the error the host received. */
  message?: React.ReactNode;
  /** Renders a retry action. Defaults to "Try again". */
  onRetry?: () => void;
  /** Overrides the retry label. */
  retryLabel?: string;
  /** The retry is in flight: disables the action and shows progress. */
  retrying?: boolean;
  /**
   * Same-tab fallback target, normally the GitHub App installation URL. It is
   * rendered as a real link, so following it is a user-initiated navigation
   * that no popup blocker can stop.
   */
  fallbackHref?: string;
  /** Overrides the fallback link label ("Continue in this tab" / "Open GitHub"). */
  fallbackLabel?: string;
  /** Observes fallback clicks (analytics, persisting wizard state). Does not prevent navigation. */
  onFallbackClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  /** Extra host action, e.g. an "Add repository" button on the `empty` notice. */
  action?: React.ReactNode;
}

interface KindPresentation {
  tone: NoticeTone;
  title: string;
  message: string;
  fallbackLabel: string;
  icon: React.ReactNode;
}

const PRESENTATION: Record<GitHubConnectionNoticeKind, KindPresentation> = {
  empty: {
    tone: 'neutral',
    title: 'No repositories found',
    message:
      'The GitHub App cannot see any repositories yet. Grant it access to a repository on GitHub, then come back.',
    fallbackLabel: 'Open GitHub',
    icon: <FolderRoundedIcon width={48} height={48} fill="currentColor" />
  },
  error: {
    tone: 'error',
    title: 'Could not connect to GitHub',
    message: 'Something went wrong while connecting to GitHub. Your progress is saved; try again.',
    fallbackLabel: 'Continue in this tab',
    icon: <ErrorIcon width={20} height={20} fill="currentColor" />
  },
  'popup-blocked': {
    tone: 'warning',
    title: 'Your browser blocked the GitHub window',
    message:
      'GitHub opens in a new window to finish connecting. Allow pop-ups for this site and try again, or continue in this tab.',
    fallbackLabel: 'Continue in this tab',
    icon: <WarningIcon width={20} height={20} fill="currentColor" />
  },
  redirecting: {
    tone: 'info',
    title: 'Taking you to GitHub',
    message: 'Finish installing the GitHub App there and you will be brought back here.',
    fallbackLabel: 'Open GitHub',
    icon: <CircularProgress color="inherit" size={20} aria-hidden />
  }
};

/**
 * Empty, error, popup-blocked, and same-tab fallback presentation for the
 * GitHub connection flow. Meshery Cloud's wizard had none of these: a failed
 * CONNECT was a silent no-op (meshery-cloud#6116) and an installation with no
 * repositories rendered an empty, disabled list.
 */
export function GitHubConnectionNotice({
  kind,
  title,
  message,
  onRetry,
  retryLabel = 'Try again',
  retrying = false,
  fallbackHref,
  fallbackLabel,
  onFallbackClick,
  action
}: GitHubConnectionNoticeProps): JSX.Element {
  const presentation = PRESENTATION[kind];
  const heading = title ?? presentation.title;
  const body = message ?? presentation.message;

  const retryButton = onRetry && (
    <Button
      variant="contained"
      size="small"
      onClick={onRetry}
      disabled={retrying}
      aria-busy={retrying || undefined}
      startIcon={retrying ? <CircularProgress color="inherit" size={14} aria-hidden /> : undefined}
      data-testid="github-connection-notice-retry"
    >
      {retryLabel}
    </Button>
  );

  const fallbackLink = fallbackHref && (
    <Link
      href={fallbackHref}
      onClick={onFallbackClick}
      underline="always"
      data-testid="github-connection-notice-fallback"
      variant="textB3Regular"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.5,
        color: 'text.default',
        fontWeight: 600
      }}
    >
      {fallbackLabel ?? presentation.fallbackLabel}
      <OpenInNewIcon width={16} height={16} fill="currentColor" aria-hidden />
    </Link>
  );

  const actions = (retryButton || fallbackLink || action) && (
    <NoticeActions>
      {retryButton}
      {action}
      {fallbackLink}
    </NoticeActions>
  );

  // Live regions hold only the text: an alert or status region must not
  // contain the interactive recovery actions rendered beside it.
  const liveRole = kind === 'error' || kind === 'popup-blocked' ? 'alert' : 'status';
  const text = (
    <div role={liveRole}>
      <Typography
        variant="textB2SemiBold"
        component="p"
        sx={{ color: 'text.default', textTransform: 'none' }}
      >
        {heading}
      </Typography>
      <Typography
        variant="textB3Regular"
        component="div"
        sx={{ color: 'text.secondary', maxWidth: kind === 'empty' ? 420 : undefined }}
      >
        {body}
      </Typography>
    </div>
  );

  if (kind === 'empty') {
    return (
      <NoticeEmpty data-testid="github-connection-notice" data-kind={kind}>
        {presentation.icon}
        {text}
        {actions}
      </NoticeEmpty>
    );
  }

  return (
    <NoticeCallout tone={presentation.tone} data-testid="github-connection-notice" data-kind={kind}>
      {presentation.icon}
      <NoticeContent>
        {text}
        {actions}
      </NoticeContent>
    </NoticeCallout>
  );
}

export default GitHubConnectionNotice;
