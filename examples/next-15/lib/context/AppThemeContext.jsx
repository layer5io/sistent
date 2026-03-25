'use client';
import { CacheProvider } from '@emotion/react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { createContext, useMemo, useState } from 'react';
import createEmotionCache from '../../styles/createEmotionCache';
import { darkTheme, lightTheme } from '../../styles/themes/theme';
import { darkModePalette, lightModePalette } from '../palette';

const clientSideEmotionCache = createEmotionCache();

export const ThemeContext = createContext({
  mode: 'light',
  setMode: () => {}
});
export function AppThemeContext({ children, emotionCache = clientSideEmotionCache }) {
  const router = useRouter();
  const [mode, setMode] = useState('light'); // light or dark

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main:
              router.pathname === '/themes-explorer'
                ? mode === 'light'
                  ? lightModePalette.surface.primary // just a color string
                  : darkModePalette.surface.primary
                : mode === 'light'
                  ? lightTheme.palette.primary.main
                  : darkTheme.palette.primary.main
          },

          secondary: {
            main: '#EE5351'
          },
          background: {
            ...(mode === 'light' ? lightTheme.palette.background : darkTheme.palette.background)
          },
          text: {
            ...(mode === 'light' ? lightTheme.palette.text : darkTheme.palette.text)
          }
        }
      }),
    [mode]
  );

  return (
    <CacheProvider value={emotionCache}>
      <ThemeContext.Provider value={{ mode, setMode }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ThemeContext.Provider>
    </CacheProvider>
  );
}
