import { useEffect, useRef } from 'react';

/**
 * Custom hook for managing timeouts
 *
 * This hook provides a declarative way to handle timeouts in React components.
 * The callback is automatically updated without restarting the timeout, and
 * the timeout is automatically cleaned up when the component unmounts or delay changes.
 *
 * @param callback - The callback function to execute after the delay
 * @param delay - The delay in milliseconds, or null to disable the timeout
 */
export function useTimeout(callback: () => void, delay: number | null): void {
  const savedCallback = useRef<(() => void) | undefined>();

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the timeout
  useEffect(() => {
    function tick(): void {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }

    if (delay !== null) {
      const id: NodeJS.Timeout = setTimeout(tick, delay);
      return () => clearTimeout(id);
    }
  }, [delay]);
}

export default useTimeout;
