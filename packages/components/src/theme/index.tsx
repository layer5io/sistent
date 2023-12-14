import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline, PaletteMode, Theme, ThemeProvider } from '@mui/material';
import React from 'react';
import createEmotionCache from './createEmotionCache';
import { createCustomTheme } from './theme';

const clientSideEmotionCache = createEmotionCache();

interface SistentProviderProps {
  children: React.ReactNode;
  emotionCache?: EmotionCache;
}

function SistentProvider({
  children,
  emotionCache = clientSideEmotionCache
}: SistentProviderProps): JSX.Element {
  const initialMode = 'light';
  const [mode] = React.useState<PaletteMode>(initialMode);

  const theme = React.useMemo<Theme>(() => createCustomTheme(mode), [mode]);

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}

export default SistentProvider;

export { SistentProvider };
