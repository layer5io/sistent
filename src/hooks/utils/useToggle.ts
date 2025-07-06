import { useCallback, useState } from 'react';

/**
 * Custom hook for managing boolean toggle state
 * @param initialValue - The initial boolean value
 * @returns A tuple of [value, toggleValue, setValue]
 */
export function useToggle(
  initialValue: boolean = false
): [boolean, () => void, (value: boolean) => void] {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggleValue = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  return [value, toggleValue, setValue];
}
