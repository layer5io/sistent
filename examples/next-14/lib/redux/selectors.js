import { RootAppState } from './types';

/**
 * Selector function to determine if the drawer is open.
 * @param {RootAppState} state - The root app state.
 * @returns {boolean} - True if the drawer is open, otherwise false.
 */
export const isDrawerOpenSelector = (state) => state.drawer.isOpen;

/**
 * Selector function to retrieve the providers from the state.
 * @param {RootAppState} state - The root app state.
 * @returns {Record<string, any> | undefined} - The providers or undefined if not available.
 */
export const selectProviders = (state) => state.providers;

/**
 * Selector function to retrieve the countdown value from the state.
 * @param {RootAppState} state - The root app state.
 * @returns {number} - The countdown value.
 */
export const selectCountdown = (state) => state.session.countdown;

/**
 * Selector function to determine if progress is being shown.
 * @param {RootAppState} state - The root app state.
 * @returns {boolean} - True if progress is being shown, otherwise false.
 */
export const selectShowProgress = (state) => state.progress.showProgress;
