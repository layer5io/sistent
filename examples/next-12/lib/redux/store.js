import { configureStore } from '@reduxjs/toolkit';
import theme from './theme/themeSlice';

export default configureStore({
  reducer: {
    theme
  }
});
