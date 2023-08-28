import { useEffect, useRef } from 'react';

export function useDebounced<T extends (...args: any[]) => void>(func: T, timeout = 500) {
  const timerRef = useRef<number>();

  useEffect(() => {
    const cleanup = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };

    return cleanup;
  }, []);

  const debouncedFunction = (...args: Parameters<T>) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(() => {
      func(...args);
    }, timeout);
  };

  return debouncedFunction;
}
