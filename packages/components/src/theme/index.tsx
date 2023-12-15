import { EmotionCache } from '@emotion/react';
import { PaletteMode, Theme, ThemeProvider } from '@mui/material';
import React from 'react';
import { createCustomTheme } from './theme';

interface SistentProviderContextType {
  emotionCache?: EmotionCache;
}

export const SistentThemeProviderContext = React.createContext<SistentProviderContextType>({});

export interface SistentThemeProviderProps {
  children: React.ReactNode;
  emotionCache?: EmotionCache;
}

function SistentThemeProvider({ children, emotionCache }: SistentThemeProviderProps): JSX.Element {
  const initialMode = 'light';
  const [mode] = React.useState<PaletteMode>(initialMode);

  const theme = React.useMemo<Theme>(() => createCustomTheme(mode), [mode]);

  return (
    <SistentThemeProviderContext.Provider value={{ emotionCache }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </SistentThemeProviderContext.Provider>
  );
}

export default SistentThemeProvider;

export { SistentThemeProvider };
