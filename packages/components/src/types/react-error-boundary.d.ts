/*
import React from 'react';
import { ErrorBoundaryPropsWithComponent, FallbackRender } from 'react-error-boundary';

// Define the custom error boundary component
declare module 'react-error-boundary' {
  export interface ErrorBoundaryProps {
    children: React.ReactNode;
    FallbackComponent?: React.ComponentType<FallbackProps>;
    onError?: (error: Error, info: React.ErrorInfo) => void;
  }

  export interface FallbackProps {
    error: Error;
    resetErrorBoundary: () => void;
  }

  export const ErrorBoundary: React.FC<ErrorBoundaryProps>;
}

// Define the custom fallback component
declare module 'react-error-boundary/dist/react-error-boundary.production.min.js' {
  export const Fallback: FallbackRender;
}

// Define the withErrorBoundary HOC
declare module 'react-error-boundary' {
  export function withErrorBoundary<T>(
    Component: React.ComponentType<T>,
    errorHandlingProps: ErrorBoundaryPropsWithComponent | null
  ): React.FC<T>;
}

// Define the withSuppressedErrorBoundary HOC
declare module 'react-error-boundary' {
  export function withSuppressedErrorBoundary<T>(Component: React.ComponentType<T>): React.FC<T>;
}
*/
