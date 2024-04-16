import { EmotionCache } from '@emotion/react';
import { CssBaseline, PaletteMode, Theme, ThemeProvider } from '@mui/material';
import React from 'react';
import { createCustomTheme } from './theme';

interface SistentProviderContextType {
  emotionCache?: EmotionCache;
}

export const SistentThemeProviderContext = React.createContext<SistentProviderContextType>({});

export interface SistentThemeProviderProps {
  children: React.ReactNode;
  emotionCache?: EmotionCache;
  initialMode?: PaletteMode;
}

function SistentThemeProvider({
  children,
  emotionCache,
  initialMode = 'light'
}: SistentThemeProviderProps): JSX.Element {
  const theme = React.useMemo<Theme>(() => createCustomTheme(initialMode), [initialMode]);

  return (
    <SistentThemeProviderContext.Provider value={{ emotionCache }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </SistentThemeProviderContext.Provider>
  );
}

export function SistentThemeProviderWithoutBaseLine({
  children,
  emotionCache,
  initialMode = 'light'
}: SistentThemeProviderProps): JSX.Element {
  console.log('SistentThemeProviderWithoutBaseLine');
  const theme = React.useMemo<Theme>(() => createCustomTheme(initialMode), [initialMode]);

  return (
    <SistentThemeProviderContext.Provider value={{ emotionCache }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </SistentThemeProviderContext.Provider>
  );
}

export default SistentThemeProvider;

export { SistentThemeProvider };
