import { store } from '@/lib/redux';
import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter';
import { SistentThemeProvider } from '@layer5/sistent';
import { Provider } from 'react-redux';

export default function App({ ...props }) {
  const { Component, pageProps } = props;

  return (
    <Provider store={store()}>
      <AppCacheProvider {...props}>
        <SistentThemeProvider>
          <Component {...pageProps} />
        </SistentThemeProvider>
      </AppCacheProvider>
    </Provider>
  );
}
