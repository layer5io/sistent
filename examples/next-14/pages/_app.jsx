import { store } from '@/lib/redux';
import { SistentThemeProvider } from '@layer5/sistent';
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store()}>
      <SistentThemeProvider>
        <Component {...pageProps} />
      </SistentThemeProvider>
    </Provider>
  );
}
