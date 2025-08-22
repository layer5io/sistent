'use client';

import { Box, Container, Typography, Paper, Snackbar, Alert, Grid } from '@mui/material';
import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../lib/context/AppThemeContext';
import { darkModePalette, lightModePalette } from '../../pages/themes-explorer/palette';

export default function SemanticColors() {
  const { mode } = useContext(ThemeContext);

  const palette = mode === 'dark' ? darkModePalette : lightModePalette;
  const semanticGroups = palette.background; 


  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [copiedText, setCopiedText] = useState('');

  const handleCopy = (value) => {
    navigator.clipboard.writeText(value);
    setCopiedText(value);
    setSnackbarOpen(true);
  };

  const handleClose = () => setSnackbarOpen(false);


  const descriptions = {
    brand: 'Primary brand color with all interaction states',
    cta: 'High-impact CTA elements with interaction states',
    info: 'Informational UI states',
    success: 'Positive feedback states',
    warning: 'Warning and caution states',
    error: 'Error and critical states',
  };

  
  const layout = [
    ['brand'], 
    ['cta'], 
    ['info', 'success'], 
    ['warning', 'error'], 
  ];

  return (
    <Container maxWidth="xl" sx={{ mt: 4, display: 'grid', gap: 3 }}>
      {layout.map((row, rowIndex) => (
        <Grid container spacing={3} key={rowIndex}>
          {row.map((groupName) => {
            const states = semanticGroups[groupName];
            if (!states) return null;

            return (
              <Grid item xs={12} md={row.length === 1 ? 12 : 6} key={groupName}>
                <Paper
                  sx={{
                    p: 3,
                    border: `1px solid ${palette.border.default}`, 
                    borderRadius: '10px',
                    backgroundColor: palette.background.surface, 
                  }}
                >

                  <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: palette.text.default }}>
                    {groupName.charAt(0).toUpperCase() + groupName.slice(1)} Colors
                  </Typography>

                  
                  <Typography sx={{ fontSize: '0.85rem', color: palette.text.secondary, mb: 1 }}>
                    {descriptions[groupName]}
                  </Typography>

                  
                  <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, mb: 1, color: palette.text.default }}>
                    {groupName.charAt(0).toUpperCase() + groupName.slice(1)} States
                  </Typography>

                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {Object.entries(states).map(([state, value]) => (
                      <Box
                        key={state}
                        onClick={() => handleCopy(value)}
                        sx={{
                          px: 2,
                          py: 1,
                          borderRadius: '6px',
                          background: value,
                          color: palette.text.onPrimary, 
                          fontWeight: 600,
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          boxShadow: 1,
                          userSelect: 'none',
                        }}
                      >
                        {state.charAt(0).toUpperCase() + state.slice(1)}
                      </Box>
                    ))}
                  </Box>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      ))}


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
            color: palette.text.default,
          }}
        >
          Copied: {copiedText}
        </Alert>
      </Snackbar>
    </Container>
  );
}
