import React from 'react';
import { Button } from '@mui/material';
import { type FC } from 'react';
import {
  ErrorBoundary as ReactErrorBoundary,
  FallbackProps,
  ErrorBoundaryProps
} from 'react-error-boundary';

const Fallback: React.ComponentType<FallbackProps> = ({ error, resetErrorBoundary }) => {
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
        }}>
        <code>{error.message}</code>
      </div>
      <Button color="primary" variant="contained" onClick={resetErrorBoundary}>
        Try again
      </Button>
    </div>
  );
};

const reportError = (error: Error, info: React.ErrorInfo) => {
  // This is where you'd send the error to Sentry,etc
  console.log('Error Caught Inside Boundary --reportError', error, 'Info', info);
};

export const ErrorBoundary: FC<ErrorBoundaryProps> = ({ children, ...props }) => {
  return (
    <ReactErrorBoundary
      FallbackComponent={Fallback as unknown as any}
      onError={reportError}
      {...props}>
      {children}
    </ReactErrorBoundary>
  );
};
//
export const withErrorBoundary = (
  Component: FC<any>,
  errorHandlingProps: ErrorBoundaryProps | null
) => {
  const WrappedWithErrorBoundary = (props: any) => (
    <ErrorBoundary {...((errorHandlingProps ? errorHandlingProps : {}) as any)}>
      <Component {...props} />
    </ErrorBoundary>
  );

  return WrappedWithErrorBoundary;
};

export const withSuppressedErrorBoundary = (Component: React.ComponentType<any>) => {
  const WrappedWithErrorBoundary = (props: any) => (
    <ErrorBoundary FallbackComponent={() => null}>
      <Component {...props} />
    </ErrorBoundary>
  );

  return WrappedWithErrorBoundary;
};
