import { useEffect } from 'react';

/**
 * Custom hook to prevent user from leaving the page when there are unsaved changes
 * @param when - Boolean indicating whether to prevent page leave
 * @param message - Optional message to show in the confirmation dialog
 */
export function usePreventPageLeave(when: boolean, message?: string): void {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (when) {
        event.preventDefault();
        event.returnValue = message || 'You have unsaved changes. Are you sure you want to leave?';
        return message || 'You have unsaved changes. Are you sure you want to leave?';
      }
    };

    if (when) {
      window.addEventListener('beforeunload', handleBeforeUnload);
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [when, message]);
}
