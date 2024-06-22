import React, { useEffect, useState } from 'react';

const defaultState = {
  dark: false,
  toggleDark: () => {}
};

const ThemeContext = React.createContext(defaultState);

function ThemeManagerProvider({ children }) {
  const [dark, setDark] = useState(false);

  const toggleDark = () => {
    const newDark = !dark;
    localStorage.setItem('dark', JSON.stringify(newDark));
    setDark(newDark);
  };

  useEffect(() => {
    const isDark = JSON.parse(localStorage.getItem('dark'));
    if (isDark) {
      setDark(isDark);
    }
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        dark,
        toggleDark
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
export { ThemeManagerProvider };
