/*
import {
  ErrorBoundaryProps,
  FallbackProps,
  ErrorBoundary as ReactErrorBoundary
} from 'react-error-boundary';
import { Button } from '../../base/Button';
import React from 'react';

function Fallback({ error, resetErrorBoundary }: FallbackProps): JSX.Element {
  if (error instanceof Error) {
    // Check if error is an instance of Error
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
          <code>{error.message}</code>
        </div>
        <Button color="primary" variant="contained" onClick={resetErrorBoundary}>
          Try again
        </Button>
      </div>
    );
  } else {
    // Handle the case where error is not an instance of Error
    return (
      <div role="alert">
        <h2>Uh-oh!😔 An unknown error occurred.</h2>
        <Button color="primary" variant="contained" onClick={resetErrorBoundary}>
          Try again
        </Button>
      </div>
    );
  }
}

function reportError(error: Error, info: React.ErrorInfo): void {
  // This is where you'd send the error to Sentry, etc.
  console.log('Error Caught Inside Boundary --reportError', error, 'Info', info);
}

function ErrorBoundary({ children, ...props }: ErrorBoundaryProps): JSX.Element {
  return (
    <ReactErrorBoundary FallbackComponent={Fallback} onError={reportError} {...props}>
      {children}
    </ReactErrorBoundary>
  );
}

function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorHandlingProps: ErrorBoundaryProps | null
): JSX.Element {
  const WrappedWithErrorBoundary = (props: P): JSX.Element => (
    <ErrorBoundary {...(errorHandlingProps ? errorHandlingProps : {})}>
      <Component {...props} />
    </ErrorBoundary>
  );

  return WrappedWithErrorBoundary;
}

interface Props {
  children: React.ReactNode;
}

function withSuppressedErrorBoundary<P extends object>(
  Component: React.ComponentType<P>
): JSX.Element {
  const WrappedWithErrorBoundary = (props: P & Props): JSX.Element => (
    <ErrorBoundary FallbackComponent={() => null}>
      <Component {...props} />
    </ErrorBoundary>
  );

  return WrappedWithErrorBoundary;
}

export { ErrorBoundary, withErrorBoundary, withSuppressedErrorBoundary };
*/
