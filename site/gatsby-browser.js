import React from "react";
import { ThemeProvider } from './src/components/Theme';
import './src/styles/global.css';
import React from "react";

export const wrapRootElement = ({ element }) => <ThemeProvider>{element}</ThemeProvider>;
