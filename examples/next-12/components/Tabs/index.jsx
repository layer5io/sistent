import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import BackHandOutlinedIcon from '@mui/icons-material/BackHandOutlined';
import CropSquareOutlinedIcon from '@mui/icons-material/CropSquareOutlined';
import FormatColorTextOutlinedIcon from '@mui/icons-material/FormatColorTextOutlined';
import NavigationOutlinedIcon from '@mui/icons-material/NavigationOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { Tab, Tabs } from '@mui/material';
import { ThemeContext } from '@/lib/context/AppThemeContext';
import { useContext } from 'react';
import { lightModePalette, darkModePalette } from '@/pages/themes-explorer/palette';

export default function TabMenu({ value, setValue }) {
  const { mode } = useContext(ThemeContext);

  // pick palette based on mode
  const palette = mode === 'dark' ? darkModePalette : lightModePalette;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      variant="scrollable"
      scrollButtons="auto"
      aria-label="segment tabs"
      sx={{
        marginTop: '2rem',
        backgroundColor: palette.background.tabs, // 👈 dynamic background
        borderRadius: '20px',
      }}
    >
      {[
        { icon: <CropSquareOutlinedIcon sx={{ fontSize: 16 }} />, label: 'Surfaces' },
        { icon: <BackHandOutlinedIcon sx={{ fontSize: 16 }} />, label: 'Interactive' },
        { icon: <NavigationOutlinedIcon sx={{ fontSize: 16 }} />, label: 'Navigation' },
        { icon: <RemoveRedEyeOutlinedIcon sx={{ fontSize: 16 }} />, label: 'Semantic' },
        { icon: <FormatColorTextOutlinedIcon sx={{ fontSize: 16 }} />, label: 'Text' },
        { icon: <AddReactionOutlinedIcon sx={{ fontSize: 16 }} />, label: 'Borders & Icons' },
      ].map((tab, i) => (
        <Tab
          key={i}
          icon={tab.icon}
          label={tab.label}
          iconPosition="start"
          sx={{
            flex: 1,
            fontSize: '12px',
            fontWeight: 800,
            '&.Mui-selected': {
              color: palette.primary.main, // 👈 highlight color from theme
              backgroundColor: palette.background.secondary, // 👈 selected tab color
              borderRadius: '20px',
            },
          }}
        />
      ))}
    </Tabs>
  );
}
