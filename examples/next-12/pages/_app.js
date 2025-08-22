import { AppThemeContext } from './../lib/context/AppThemeContext';
import { Provider } from 'react-redux';
import store from './../lib/redux/store';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AppThemeContext>
        <Component {...pageProps} />
      </AppThemeContext>
    </Provider>
  );
}
