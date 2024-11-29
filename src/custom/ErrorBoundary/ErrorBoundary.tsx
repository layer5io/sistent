import { styled } from '@mui/material';
import React from 'react';
import { FallbackProps, ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { Box } from '../../base/Box';
import { Link } from '../../base/Link';
import { Typography } from '../../base/Typography';

const ErrorMessage = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.default,
  fontWeight: 'normal',
  marginTop: '2px',
  marginBottom: '2px',
  fontSize: '1.15rem'
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.border.brand,
  textDecoration: 'underline',
  cursor: 'pointer'
}));

const CodeMessage = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.code,
  color: theme.palette.text.tertiary,
  padding: '.85rem',
  borderRadius: '.2rem',
  marginBlock: '.5rem'
}));

interface FallbackComponentProps extends FallbackProps {
  resetErrorBoundary: () => void;
  children?: React.ReactNode;
  pageUrl?: string;
  timestamp?: string;
  showPackageInfo?: boolean;
  version?: string;
}

export function Fallback({
  error,
  children,
  showPackageInfo,
  version
}: FallbackComponentProps): JSX.Element {
  return (
    <div role="alert">
      <h2>Uh-oh!😔 Please pardon the mesh.</h2>
      <CodeMessage>
        <code>
          <strong>Error: </strong>
          {(error as Error).message}
        </code>
        <br />
        {showPackageInfo && (
          <>
            <strong>Version:</strong> {version}
          </>
        )}
      </CodeMessage>
      <ErrorMessage>
        We apologize for the inconvenience. The issue may be on our end. If troubleshooting doesn't
        work, please check out our support channels{' '}
        <StyledLink href="https://discuss.layer5.io/" target="_blank" rel="noopener noreferrer">
          Discuss Forum
        </StyledLink>{' '}
        {' or '}
        <StyledLink href="https://slack.layer5.io/" target="_blank" rel="noopener noreferrer">
          Slack
        </StyledLink>
      </ErrorMessage>
      <Box>{children}</Box>
    </div>
  );
}

const reportError = (error: Error, info: React.ErrorInfo): void => {
  const pageUrl = window.location.href;
  const timestamp = new Date().toLocaleString();
  // This is where you'd send the error to Sentry, etc
  console.log(
    'Error Caught Inside Boundary --reportError',
    error,
    'Info',
    info,
    'Page URL:',
    pageUrl,
    'Timestamp:',
    timestamp
  );
};

interface ErrorBoundaryProps {
  customFallback?: React.ComponentType<FallbackProps>;
  children: React.ReactNode;
  onErrorCaught?: (error: string) => void;
}

export const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({
  customFallback,
  children,
  onErrorCaught
}) => {
  const pageUrl = window.location.href;
  const timestamp = new Date().toLocaleString();

  const handleError = (error: Error, info: React.ErrorInfo) => {
    // Pass error message to onErrorCaught
    onErrorCaught?.(error.message);
    reportError(error, info);
  };

  return (
    <ReactErrorBoundary
      FallbackComponent={
        customFallback
          ? customFallback
          : (props) => <Fallback {...props} pageUrl={pageUrl} timestamp={timestamp} />
      }
      onError={handleError}
    >
      {children}
    </ReactErrorBoundary>
  );
};

interface WithErrorBoundaryProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: React.ComponentType<any>;
  errorHandlingProps?: ErrorBoundaryProps;
}

export const withErrorBoundary: React.FC<WithErrorBoundaryProps> = ({
  Component,
  errorHandlingProps = { children: null }
}: WithErrorBoundaryProps): JSX.Element => {
  return (
    <ErrorBoundary {...errorHandlingProps}>
      <Component />
    </ErrorBoundary>
  );
};

interface WithSuppressedErrorBoundaryProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: React.ComponentType<any>;
}

export const withSuppressedErrorBoundary: React.FC<WithSuppressedErrorBoundaryProps> = ({
  Component
}: WithSuppressedErrorBoundaryProps): JSX.Element => {
  return (
    <ReactErrorBoundary FallbackComponent={() => null} onError={reportError}>
      <Component />
    </ReactErrorBoundary>
  );
};
