import { EmotionCache } from '@emotion/react';
import { ThemeProvider } from '@mui/material';
import { ReactNode, createContext, useContext } from 'react';
import { DEFAULT_THEME } from './defaultTheme';
import { SistentTheme, SistentThemeOverride } from './types/SistentTheme';
import { mergeThemeWithFn } from './utils/mergeTheme';

interface SistentProviderContextType {
  theme: SistentTheme;
  emotionCache?: EmotionCache;
}

const SistentProviderContext = createContext<SistentProviderContextType>({
  theme: DEFAULT_THEME
});

export function useSistentTheme() {
  return useContext(SistentProviderContext)?.theme || DEFAULT_THEME;
}

export function useSistentProviderStyles(component: string | string[]) {
  const theme = useSistentTheme();

  const getStyles = (name: string) => ({});

  if (Array.isArray(component)) {
    return component.map(getStyles);
  }

  return [getStyles(component)];
}

export function useSistentEmotionCache() {
  return useContext(SistentProviderContext)?.emotionCache;
}

export interface SistentProviderProps {
  theme?: SistentThemeOverride;
  emotionCache?: EmotionCache;
  children: ReactNode;
  inherit?: boolean;
}

export function SistentProvider({
  theme,
  emotionCache,
  children,
  inherit = false
}: SistentProviderProps) {
  const ctx = useContext(SistentProviderContext);

  const mergedTheme = mergeThemeWithFn(DEFAULT_THEME, inherit ? { ...ctx.theme, ...theme } : theme);

  return (
    <ThemeProvider theme={mergedTheme}>
      <SistentProviderContext.Provider value={{ theme: mergedTheme, emotionCache }}>
        {children}
      </SistentProviderContext.Provider>
    </ThemeProvider>
  );
}
