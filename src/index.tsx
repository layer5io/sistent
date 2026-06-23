export * from './actors';
export * from './base';
export * from './colors';
export * from './custom';
export * from './hooks';
export * from './icons';
export * from './redux-persist';
export * from './schemas';
export * from './theme';
export * from './utils';

// FeedbackButton's type is dropped from the bundled d.ts when it reaches the
// entry only through `export * from './custom'`: rollup-plugin-dts (used by
// tsup for the declaration bundle) fails to propagate certain re-exports
// through nested barrels, so `import { FeedbackButton } from "@sistent/sistent"`
// fails type-checking even though the runtime export exists. An explicit
// re-export forces the declaration into the published bundle. The same quirk
// affects other custom components (see consumers' local d.ts augmentations);
// add them here as they are needed.
export { FeedbackButton, type FeedbackComponentProps } from './custom/Feedback';
