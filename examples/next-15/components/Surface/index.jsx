'use client';

import { Alert, Box, Container, Paper, Snackbar, Typography } from '@mui/material';
import * as React from 'react';
import { useContext } from 'react';

import { ThemeContext } from '../../lib/context/AppThemeContext';
import { darkModePalette, lightModePalette } from '../../lib/palette';

export default function Surface() {
  const { mode } = useContext(ThemeContext);

  const palette = mode === 'dark' ? darkModePalette : lightModePalette;
  const surfaceColors = palette.surface;

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [copiedText, setCopiedText] = React.useState('');

  const handleCopy = (value) => {
    navigator.clipboard.writeText(value);
    setCopiedText(value);
    setSnackbarOpen(true);
  };

  const handleClose = (_event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  const descriptions = {
    primary: 'Main page background',
    secondary: 'Slightly darker background',
    tertiary: 'Even darker background',
    elevated: 'Floating elements',
    overlay: 'Modal backdrops',
    inverse: 'High contrast alt',
    gradient: 'Highlight surfaces'
  };

  return (
    <Container maxWidth="100%" sx={{ marginTop: '2rem' }}>
      <Box
        sx={{
          border: `1px solid ${palette.border.default}`,
          padding: '20px',
          borderRadius: '10px',
          boxShadow:
            mode === 'dark' ? '0px 4px 20px rgba(0,0,0,0.4)' : '0px 4px 20px rgba(0,0,0,0.1)',
          backgroundColor: palette.background.card
        }}
      >
        <Typography
          sx={{
            fontSize: '1.3rem',
            fontWeight: 700,
            color: palette.text.default
          }}
        >
          Surface Tokens
        </Typography>
        <Typography sx={{ color: palette.text.secondary, fontSize: '0.8rem' }}>
          Background surfaces with proper contrast for text and interactive elements
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
          {Object.entries(surfaceColors).map(([name, value]) => {
            const isGradient = typeof value === 'string' && value.includes('gradient');
            const displayValue = isGradient ? 'Gradient' : value;

            return (
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
                onClick={() => handleCopy(displayValue)}
              >
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

                <Typography
                  sx={{ fontWeight: '600', color: palette.text.default }}
                  variant="subtitle2"
                >
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Typography>

                <Typography sx={{ color: palette.text.secondary, fontSize: '0.75rem', mb: 0.5 }}>
                  {descriptions[name] || ''}
                </Typography>

                <Typography
                  sx={{
                    fontSize: '0.75rem',
                    color: palette.text.muted,
                    fontFamily: 'monospace'
                  }}
                >
                  {displayValue}
                </Typography>
              </Box>
            );
          })}
        </Container>

        <Paper
          sx={{
            mt: 4,
            p: 2,
            border: `1px solid ${palette.border.default}`,
            borderRadius: '10px',
            backgroundColor: palette.background.surface
          }}
        >
          <Typography sx={{ fontWeight: '600', mb: 2, color: palette.text.default }}>
            Surface Demo
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 1.5,
                borderRadius: 2,
                background: surfaceColors.primary,
                color: palette.text.default,
                fontWeight: 600
              }}
            >
              • Primary Surface
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 1.5,
                borderRadius: 2,
                background: surfaceColors.secondary,
                color: palette.text.default,
                fontWeight: 600
              }}
            >
              • Secondary Surface
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 1.5,
                borderRadius: 2,
                background: surfaceColors.elevated,
                color: palette.text.default,
                fontWeight: 600
              }}
            >
              • Elevated Surface
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
