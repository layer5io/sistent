import { toggleTheme } from '@/lib/redux/theme/themeSlice';
import { IconButton } from '@mui/material';
import { useContext } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { AppThemeContext, ThemeContext } from '@/lib/context/AppThemeContext';

function DynamicIcon({ mode }) {
  if (mode === 'dark') {
    return <DarkModeIcon />;
  }

  return <LightModeIcon />;
}

function ModeToggleButton() {
 const {setMode,mode} = useContext(ThemeContext)
 const toggleMode= ()=>{
  setMode((prev)=>prev==="dark"?"light":"dark")
 }
 

  return (
    <IconButton onClick={toggleMode} sx={{ width: 40, height: 40 }}>
      <DynamicIcon mode={mode} />
    </IconButton>
  );
}

export default ModeToggleButton;
