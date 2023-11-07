import React, { useState, useEffect } from "react";

const defaultState = {
  dark: false,
  toggleDark: () => {},
};

const ThemeContext = React.createContext(defaultState);

const supportsDarkMode = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches === true;

function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false);

  const toggleDark = () => {
    const newDark = !dark;
    localStorage.setItem("dark", JSON.stringify(newDark));
    setDark(newDark);
  };

  useEffect(() => {
    // Getting dark mode value from localStorage!
    const lsDark = JSON.parse(localStorage.getItem("dark"));
    if (lsDark) {
      setDark(lsDark);
    } else if (supportsDarkMode()) {
      setDark(true);
    }
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        dark,
        toggleDark,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
export { ThemeProvider };
