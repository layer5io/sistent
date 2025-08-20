'use client';

import { ThemeContext } from '@/lib/context/AppThemeContext';
import { darkModePalette, lightModePalette } from '@/pages/themes-explorer/palette';
import {
  Alert,
  Box,
  Button,
  Container,
  Snackbar,
  Tooltip,
  Typography,
  Paper
} from '@mui/material';
import { useContext } from 'react';
import * as React from 'react';

export default function Interactive() {
  const { mode } = useContext(ThemeContext);

  
  const palette = mode === 'dark' ? darkModePalette : lightModePalette;
  const interactiveColors = palette.interactive;

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
        <Typography
          sx={{
            fontSize: '1.3rem',
            fontWeight: 700,
            color: palette.text.default 
          }}
        >
          Interactive Tokens
        </Typography>
        <Typography
          sx={{ color: palette.text.secondary, fontSize: '0.8rem' }}
        >
          Colors for buttons, links, and interactive elements with all states
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
          {Object.entries(interactiveColors).map(([name, value]) => {
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
                  cursor: 'pointer'
                }}
                onClick={() => handleCopy(displayValue)}
              >
                <Tooltip title="Click to copy" arrow>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      background: value,
                      borderRadius: 2,
                      boxShadow: 1,
                      mb: 1
                    }}
                  />
                </Tooltip>

                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 600,
                    color: palette.text.default 
                  }}
                >
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Typography>

                <Typography
                  sx={{
                    color: palette.text.secondary, 
                    fontSize: '0.75rem',
                    mb: 0.5
                  }}
                >
                  {isGradient
                    ? 'Highlight surfaces'
                    : name === 'primary'
                    ? 'Default interactive'
                    : name === 'hover'
                    ? 'Hover state'
                    : name === 'pressed'
                    ? 'Pressed state'
                    : name === 'secondary'
                    ? 'Secondary elements'
                    : name === 'tertiary'
                    ? 'Tertiary elements'
                    : name === 'disabled'
                    ? 'Disabled state'
                    : ''}
                </Typography>

                <Typography
                  sx={{
                    fontSize: '0.75rem',
                    color: palette.text.secondary, 
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
            backgroundColor: palette.background.card 
          }}
        >
          <Typography
            sx={{ fontWeight: 600, mb: 2, color: palette.text.default }}
          >
            Interactive Demo
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {Object.entries(interactiveColors).map(([name, value]) => (
              <Button
                key={name}
                variant="contained"
                disabled={name === 'disabled'}
                sx={{
                  backgroundColor: value,
                  color: name === 'disabled'
                    ? palette.text.secondary
                    : palette.text.inverse, 
                  textTransform: 'capitalize',
                  '&:hover': {
                    backgroundColor: value
                  }
                }}
              >
                {name}
              </Button>
            ))}
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
