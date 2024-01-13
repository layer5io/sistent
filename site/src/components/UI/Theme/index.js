import React from 'react';
import { StyledThemeProvider } from './StyledThemeProvider';
import { ThemeManagerProvider } from './ThemeManager';
import lighttheme, { darktheme } from './themeStyles';

export const ThemeWrapper = ({ children }) => {
  return (
    <ThemeManagerProvider>
      <StyledThemeProvider lightTheme={lighttheme} darkTheme={darktheme}>
        {children}
      </StyledThemeProvider>
    </ThemeManagerProvider>
  );
};
