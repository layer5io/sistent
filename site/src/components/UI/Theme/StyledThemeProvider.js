//uses dark state to choose styled-component theme (in themeStyles.js)
//and use ThemeProvider to allow all styled components access to values via props.theme

import React, { useContext } from 'react';
import { ThemeProvider } from 'styled-components';
import ThemeContext from './ThemeManager';

export const StyledThemeProvider = (props) => {
  const { children, darkTheme, lightTheme } = props;
  const themeCtx = useContext(ThemeContext);
  const dark = themeCtx.dark;
  const currentTheme = dark ? darkTheme : lightTheme;
  const theme = currentTheme;

  return (
    <ThemeProvider theme={theme}>
      <>{children}</>
    </ThemeProvider>
  );
};
