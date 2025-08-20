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
  const{mode} = useContext(ThemeContext)
  const navColors = mode==="dark"?lightModePalette.navigation:darkModePalette.navigation;
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
          border: '1px solid oklch(0.922 0 0)',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0px 4px 20px rgba(0,0,0,0.1)'
        }}
      >
        <Typography sx={{ fontSize: '1.3rem', fontWeight: '700' }}>
          Navigation Tokens
        </Typography>
        <Typography sx={{ color: '#737373', fontSize: '0.8rem' }}>
          Colors for navigation bars, menu items, and navigation states
        </Typography>

        {/* Token Grid */}
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
                border: '1px solid oklch(0.922 0 0)',
                paddingY: '10px',
                alignItems: 'center',
                textAlign: 'center',
                cursor: 'pointer'
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
                    mb: 1
                  }}
                />
              </Tooltip>

              <Typography
                sx={{ fontWeight: '600', color: '#111' }}
                variant="subtitle2"
              >
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>

              <Typography
                sx={{ color: '#737373', fontSize: '0.75rem', mb: 0.5 }}
              >
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
                  color: '#000',
                  fontFamily: 'monospace'
                }}
              >
                {value}
              </Typography>
            </Box>
          ))}
        </Container>

        {/* Navigation Demo */}
        <Paper
          sx={{
            mt: 4,
            p: 2,
            border: '1px solid oklch(0.922 0 0)',
            borderRadius: '10px',
            background: '#fafafa'
          }}
        >
          <Typography sx={{ fontWeight: '600', mb: 2 }}>Navigation Demo</Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 1.5,
                borderRadius: 2,
                background: navColors.primary,
                color: '#fff',
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
                color: '#fff',
                fontWeight: 600
              }}
            >
              • Secondary Navigation
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Copied: {copiedText}
        </Alert>
      </Snackbar>
    </Container>
  );
}
