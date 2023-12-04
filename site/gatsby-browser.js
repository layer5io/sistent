import { ThemeProvider } from './src/components/Theme';
import './src/styles/global.css';

export const wrapRootElement = ({ element }) => <ThemeProvider>{element}</ThemeProvider>;
