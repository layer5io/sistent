import { toggleTheme } from '@/lib/redux/theme/themeSlice';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

function DynamicIcon({ mode }) {
  if (mode === 'dark') {
    return <DarkModeIcon />;
  }

  return <LightModeIcon />;
}

function ModeToggleButton() {
  const dispatch = useDispatch(); // Initialize the useDispatch function

  // Use useSelector to get the darkTheme state from your Redux store
  const mode = useSelector((state) => (state.theme.darkTheme ? 'dark' : 'light'));

  const toggleMode = () => {
    // Dispatch the toggleTheme action when the button is clicked
    dispatch(toggleTheme());
  };

  return (
    <IconButton onClick={toggleMode} sx={{ width: 40, height: 40 }}>
      <DynamicIcon mode={mode} />
    </IconButton>
  );
}

export default ModeToggleButton;
