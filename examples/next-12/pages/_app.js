import { AppThemeProvider } from '@/lib/providers/AppThemeProvider';
import { ReduxProvider } from '@/lib/providers/ReduxProvider';

export default function App({ Component, pageProps }) {
  return (
    <ReduxProvider>
      <AppThemeProvider>
        <Component {...pageProps} />
      </AppThemeProvider>
    </ReduxProvider>
  );
}
