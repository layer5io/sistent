import { AppThemeContext } from './../lib/context/AppThemeContext';

export default function App({ Component, pageProps }) {
  return (

      <AppThemeContext>
        <Component {...pageProps} />
      </AppThemeContext>

  );
}
