'use client';

import { darkModePalette, lightModePalette } from '@/pages/themes-explorer/palette';
import {
  Alert,
  Box,
  Container,
  Snackbar,
  Tooltip,
  Typography,
  Paper
} from '@mui/material';
import * as React from 'react';

import { ThemeContext } from '@/lib/context/AppThemeContext';
import { useContext } from 'react';

export default function Navigation() {
  const { mode } = useContext(ThemeContext);


  const palette = mode === 'dark' ? darkModePalette : lightModePalette;
  const navColors = palette.navigation;

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [copiedText, setCopiedText] = React.useState('');

  const handleCopy = (value) => {
    navigator.clipboard.writeText(value);
    setCopiedText(value);
    setSnackbarOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="100%" sx={{ marginTop: '2rem' }}>
      <Box
        sx={{
          border: `1px solid ${palette.border.default}`, 
          padding: '20px',
          borderRadius: '10px',
          boxShadow:
            mode === 'dark'
              ? '0px 4px 20px rgba(0,0,0,0.4)'
              : '0px 4px 20px rgba(0,0,0,0.1)',
          backgroundColor: palette.background.card 
        }}
      >
        <Typography sx={{ fontSize: '1.3rem', fontWeight: '700', color: palette.text.default }}>
          Navigation Tokens
        </Typography>
        <Typography sx={{ color: palette.text.secondary, fontSize: '0.8rem' }}>
          Colors for navigation bars, menu items, and navigation states
        </Typography>


        <Container
          maxWidth="xl"
          sx={{
            mt: 4,
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 4
          }}
        >
          {Object.entries(navColors).map(([name, value]) => (
            <Box
              key={name}
              sx={{
                width: '200px',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '20px',
                border: `1px solid ${palette.border.normal}`, 
                paddingY: '10px',
                alignItems: 'center',
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: palette.background.surface 
              }}
              onClick={() => handleCopy(value)}
            >
              <Tooltip title="Click to copy" arrow>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    background: value,
                    borderRadius: 2,
                    boxShadow: 1,
                    mb: 1,
                    border: `1px solid ${palette.border.subtle}` 
                  }}
                />
              </Tooltip>

              <Typography sx={{ fontWeight: '600', color: palette.text.default }} variant="subtitle2">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>

              <Typography sx={{ color: palette.text.secondary, fontSize: '0.75rem', mb: 0.5 }}>
                {name === 'primary'
                  ? 'Main nav background'
                  : name === 'secondary'
                  ? 'Secondary nav bg'
                  : name === 'active'
                  ? 'Active nav item'
                  : name === 'hover'
                  ? 'Nav item hover'
                  : ''}
              </Typography>

              <Typography
                sx={{
                  fontSize: '0.75rem',
                  color: palette.text.muted, 
                  fontFamily: 'monospace'
                }}
              >
                {value}
              </Typography>
            </Box>
          ))}
        </Container>


        <Paper
          sx={{
            mt: 4,
            p: 2,
            border: `1px solid ${palette.border.default}`,
            borderRadius: '10px',
            background: palette.background.surface
          }}
        >
          <Typography sx={{ fontWeight: '600', mb: 2, color: palette.text.default }}>
            Navigation Demo
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 1.5,
                borderRadius: 2,
                background: navColors.primary,
                color: palette.text.onPrimary, 
                fontWeight: 600
              }}
            >
              • Primary Navigation
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 1.5,
                borderRadius: 2,
                background: navColors.secondary,
                color: palette.text.onSecondary,
                fontWeight: 600
              }}
            >
              • Secondary Navigation
            </Box>
          </Box>
        </Paper>
      </Box>


      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{
            width: '100%',
            backgroundColor: palette.background.secondary,
            color: palette.text.default
          }}
        >
          Copied: {copiedText}
        </Alert>
      </Snackbar>
    </Container>
  );
}
