import type * as React from 'react';

declare global {
  // Some tooling setups (notably .d.ts generation) may not automatically include
  // React's global JSX namespace even with `jsx: react-jsx`. Provide a minimal
  // bridge so `JSX.Element` return types remain valid.
  namespace JSX {
    type Element = React.JSX.Element;
  }
}

export {};

