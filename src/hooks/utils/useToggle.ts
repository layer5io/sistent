import { useCallback, useState } from 'react';

/**
 * Custom hook for managing boolean toggle state
 *
 * This hook provides a convenient way to manage boolean state with toggle functionality.
 * It returns the current boolean value, a toggle function, and a setter function.
 *
 * @param initialValue - The initial boolean value (defaults to false)
 * @returns A tuple of [value, toggleValue, setValue]
 */
function useToggle(
  initialValue: boolean = false
): [boolean, () => void, (value: boolean | ((prev: boolean) => boolean)) => void] {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggleValue = useCallback((): void => {
    setValue((prev: boolean) => !prev);
  }, []);

  return [value, toggleValue, setValue];
}

export default useToggle;
