import React, { ComponentType, ReactNode } from 'react';
import { FallbackProps, ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { Button } from '../../base/Button';

interface FallbackComponentProps extends FallbackProps {
  resetErrorBoundary: () => void;
}

function Fallback({ error, resetErrorBoundary }: FallbackComponentProps): JSX.Element {
  return (
    <div role="alert">
      <h2>Uh-oh!😔 Please pardon the mesh.</h2>
      <div
        style={{
          backgroundColor: '#1E2117',
          color: '#FFFFFF',
          padding: '.85rem',
          borderRadius: '.2rem',
          marginBlock: '.5rem'
        }}
      >
        <code>{(error as Error).message}</code>
      </div>
      <Button color="primary" variant="contained" onClick={resetErrorBoundary}>
        Try again
      </Button>
    </div>
  );
}

const reportError = (error: Error, info: { componentStack: string }): void => {
  // This is where you'd send the error to Sentry, etc
  console.log('Error Caught Inside Boundary --reportError', error, 'Info', info);
};

interface ErrorBoundaryProps {
  children: ReactNode;
}

export const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  return (
    <ReactErrorBoundary FallbackComponent={Fallback} onError={reportError}>
      {children}
    </ReactErrorBoundary>
  );
};

interface WithErrorBoundaryProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: ComponentType<any>;
  errorHandlingProps?: ErrorBoundaryProps;
}

export const WithErrorBoundary: React.FC<WithErrorBoundaryProps> = ({
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
  Component: ComponentType<any>;
}

export const withSuppressedErrorBoundary: React.FC<WithSuppressedErrorBoundaryProps> = ({
  Component
}: WithSuppressedErrorBoundaryProps): JSX.Element => {
  return (
    <ReactErrorBoundary FallbackComponent={Fallback} onError={reportError}>
      <Component />
    </ReactErrorBoundary>
  );
};
