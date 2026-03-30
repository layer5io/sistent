import { IconButton } from '@mui/material';
import { useContext } from 'react';

import { ThemeContext } from '../lib/context/AppThemeContext';

/** Inline SVGs — avoid @mui/icons-material here: Next + MUI interop can yield module objects instead of components. */
function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden>
      <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden>
      <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2v-2H2v2zm18 0h2v-2h-2v2zM11 2v2h2V2h-2zm0 18v2h2v-2h-2zM4.93 4.93l1.41 1.41 1.41-1.41-1.41-1.41-1.41 1.41zm12.73 12.73l1.41 1.41 1.41-1.41-1.41-1.41-1.41 1.41zM19.07 4.93l-1.41 1.41 1.41 1.41 1.41-1.41-1.41-1.41-1.41 1.41zM6.34 17.66l-1.41 1.41 1.41 1.41 1.41-1.41-1.41-1.41-1.41 1.41z" />
    </svg>
  );
}

function DynamicIcon({ mode }) {
  return mode === 'dark' ? <MoonIcon /> : <SunIcon />;
}

function ModeToggleButton() {
  const SafeIconButton = IconButton?.default || IconButton;
  const { setMode, mode } = useContext(ThemeContext);
  const toggleMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <SafeIconButton onClick={toggleMode} sx={{ width: 40, height: 40 }}>
      <DynamicIcon mode={mode} />
    </SafeIconButton>
  );
}

export default ModeToggleButton;
