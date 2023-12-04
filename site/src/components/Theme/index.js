import React, { useEffect, useState } from 'react';

const defaultState = {
  dark: false,
  toggleDark: () => {}
};

const ThemeContext = React.createContext(defaultState);

// const supportsDarkMode = () =>
//   window.matchMedia("(prefers-color-scheme: dark)").matches === true;

function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false);

  const toggleDark = () => {
    const newDark = !dark;
    localStorage.setItem('dark', JSON.stringify(newDark));
    setDark(newDark);
  };

  useEffect(() => {
    // Getting dark mode value from localStorage!
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
export { ThemeProvider };
