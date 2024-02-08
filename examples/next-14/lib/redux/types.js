/**
 * Represents the state of Kubernetes configuration.
 * @typedef {Object} K8sConfigState
 * @property {string[]} k8sConfig - Array of Kubernetes configurations.
 */

/**
 * Represents the state of the current page.
 * @typedef {Object} PageState
 * @property {string} path - The path of the current page.
 * @property {string} title - The title of the current page.
 * @property {boolean} isBeta - Indicates if the page is in beta.
 */

/**
 * Represents the state of progress.
 * @typedef {Object} ProgressState
 * @property {boolean} showProgress - Indicates whether progress is shown.
 */

/**
 * Represents the state of the application theme.
 * @typedef {Object} ThemeState
 * @property {boolean} darkTheme - Indicates if the dark theme is enabled.
 */

/**
 * Represents the state of the navigator.
 * @typedef {Object} NavigatorState
 * @property {boolean} isOpen - Indicates if the navigator is open.
 */

/**
 * Represents the state of the user.
 * @typedef {Object} UserState
 * @property {Object|null} user - User information.
 * @property {boolean} [loading] - Indicates if the user is loading.
 * @property {string} [error] - Error message.
 */

/**
 * Represents the state of the providers.
 * @typedef {Object} ProvidersState
 * @property {Record<string, any>|undefined} providers - Provider information.
 * @property {"idle"|"loading"|"succeeded"|"failed"} status - Status of the provider.
 * @property {string|null} error - Error message.
 * @property {string} selectedProvider - Selected provider.
 */

/**
 * Represents the state of the session.
 * @typedef {Object} SessionState
 * @property {number} countdown - Countdown timer.
 * @property {string|null} sessionData - Session data.
 */

/**
 * Represents the root application state.
 * @typedef {Object} RootAppState
 * @property {ThemeState} theme - Theme state.
 * @property {NavigatorState} drawer - Drawer state.
 * @property {UserState} user - User state.
 * @property {ProvidersState} providers - Providers state.
 * @property {SessionState} session - Session state.
 * @property {ProgressState} progress - Progress state.
 * @property {PageState} page - Page state.
 * @property {K8sConfigState} k8sConfig - Kubernetes configuration state.
 */

/**
 * Represents a new instance of the application store.
 * @typedef {Function} NewAppStore
 * @returns {RootAppState} - The root application state.
 */

/**
 * Represents a new instance of the application state.
 * @typedef {RootAppState} NewAppState
 */

/**
 * Represents an asynchronous action creator.
 * @typedef {Function} AppThunk
 * @param {...*} [ReturnType] - Return type of the thunk.
 * @returns {ThunkAction<ReturnType, NewAppState, unknown, Action>} - Thunk action.
 */

/**
 * The store factory function.
 * @type {NewAppStore}
 */
// export type NewAppStore = ReturnType<typeof newStore>;

/**
 * The application state type.
 * @type {NewAppState}
 */
// export type NewAppState = ReturnType<NewAppStore["getState"]>;

/**
 * Represents a thunk action creator.
 * @type {AppThunk}
 */
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, NewAppState, unknown, Action>;
