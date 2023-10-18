import React, { type FC } from 'react';
import {
  ErrorBoundaryProps,
  FallbackProps,
  ErrorBoundary as ReactErrorBoundary
} from 'react-error-boundary';
import { Button } from '../base/Button';

const Fallback: React.ComponentType<FallbackProps> = ({ error, resetErrorBoundary }) => {
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
};

const reportError = (error: Error, info: React.ErrorInfo) => {
  // This is where you'd send the error to Sentry,etc
  console.log('Error Caught Inside Boundary --reportError', error, 'Info', info);
};

export const ErrorBoundary: FC<ErrorBoundaryProps> = ({ children, ...props }) => {
  return (
    <ReactErrorBoundary
      FallbackComponent={Fallback}
      onError={reportError}
      fallbackRender={({ error, resetErrorBoundary }: FallbackProps) => {
        // Define your custom error handling UI here
        // You can use the 'error' and 'resetErrorBoundary' props to customize the UI.
        return (
          <div role="alert">
            <h2>Custom Error Message</h2>
            <p>Something went wrong. Please try again.</p>
            <Button color="primary" variant="contained" onClick={resetErrorBoundary}>
              Try again
            </Button>
          </div>
        );
      }}
      {...props}
    >
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
    <ErrorBoundary {...(errorHandlingProps ? errorHandlingProps : {})}>
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
