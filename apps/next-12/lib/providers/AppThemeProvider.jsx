import { useSelector, useDispatch } from "react-redux";
import createEmotionCache from "@/styles/createEmotionCache";
import { CacheProvider } from '@emotion/react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { darkTheme, lightTheme } from "@/styles/themes/theme";
import { useMemo } from "react";

const clientSideEmotionCache = createEmotionCache();

export function AppThemeProvider({ children, emotionCache = clientSideEmotionCache }) {
    // const dispatch = useDispatch();

    const mode = useSelector((state) => state.theme.darkTheme ? "dark" : "light")

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    primary: {
                        ...(mode === 'light' ? lightTheme.palette.primary : darkTheme.palette.primary),
                    },
                    secondary: {
                        main: '#EE5351',
                    },
                    background: {
                        ...(mode === 'light' ? lightTheme.palette.background : darkTheme.palette.background),
                    },
                    text: {
                        ...(mode === 'light' ? lightTheme.palette.text : darkTheme.palette.text),
                    },
                },
            }),
        [mode],
    );

    return (
        <CacheProvider value={emotionCache}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </CacheProvider>
    );
}