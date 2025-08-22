import React from 'react';

import ColorsExplorer from '../../components/BorderAndIcons';
import Footer from '../../components/Footer';
import Interactive from '../../components/Interactive';
import Navigation from '../../components/Navigation';
import SemanticColors from '../../components/Semantic';
import Surface from '../../components/Surface';
import TabMenu from '../../components/Tabs';
import TextColors from '../../components/Text';
import { ColorLens } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import ModeToggleButton from '../../components/ModeToggleButton';

export default function ThemeFunction() {
  const [value, setValue] = React.useState(0);

  return (
    <React.Fragment>
      <ModeToggleButton/>
      <Box sx={{ padding: '20px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ColorLens />
          <Typography variant="h4" fontWeight="bold">
            Design System Palette
          </Typography>
        </Box>
        <Typography marginTop="10px" variant="body1" fontWeight="medium" color="#818675ff">
          Comprehensive color system with surface navigation and semantic tokens
        </Typography>
        <TabMenu value={value} setValue={setValue} />

        {value === 0 && <Surface />}
        {value === 1 && <Interactive />}
        {value === 2 && <Navigation />}
        {value === 3 && <SemanticColors />}
        {value === 4 && <TextColors />}
        {value === 5 && <ColorsExplorer />}

        <Footer />
      </Box>
    </React.Fragment>
  );
}
