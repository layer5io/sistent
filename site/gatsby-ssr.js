import React from 'react';

import { ThemeWrapper } from './src/components/reuse/Theme';
import './src/styles/global.css';

export const wrapRootElement = ({ element }) => <ThemeWrapper>{element}</ThemeWrapper>;
