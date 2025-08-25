import { useCallback, useEffect, useRef } from 'react';

/**
 * Custom hook for debouncing function calls
 *
 * This hook returns a debounced version of the provided callback function.
 * The debounced function will only execute after the specified delay has
 * passed since the last time it was called.
 *
 * @template T - The type of the callback function parameters
 * @param callback - The function to debounce
 * @param delay - The debounce delay in milliseconds (default: 300)
 * @returns A debounced version of the callback function
 *
 */
export function useDebouncedCallback<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number = 300
): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedFunction = useCallback(
    (...args: Parameters<T>) => {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set a new timeout to call the callback
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedFunction;
}

export default useDebouncedCallback;
