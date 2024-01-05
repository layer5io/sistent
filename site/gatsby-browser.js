import React from 'react';

import { ThemeProvider } from './src/components/Theme';
import './src/styles/global.css';
import { BrowserRouter } from 'react-router-dom';

export const wrapRootElement = ({ element }) => (
  <BrowserRouter>
    <ThemeProvider>{element}</ThemeProvider>
  </BrowserRouter>
);
