import React from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (newValue: T) => void] {
  const [value, setValue] = React.useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : initialValue;
  });

  const setLocalStorageValue = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, setLocalStorageValue];
}
