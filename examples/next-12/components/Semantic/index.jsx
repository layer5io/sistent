'use client';

import { Box, Container, Typography, Paper, Snackbar, Alert, Grid } from '@mui/material';
import React from 'react';
import { useContext } from 'react';
import { ThemeContext } from '@/lib/context/AppThemeContext';
import { darkModePalette, lightModePalette } from '@/pages/themes-explorer/palette';

export default function SemanticColors() {
    const {mode} = useContext(ThemeContext)
  const semanticGroups = mode==="dark"?lightModePalette.background:darkModePalette.background;

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [copiedText, setCopiedText] = React.useState('');

  const handleCopy = (value) => {
    navigator.clipboard.writeText(value);
    setCopiedText(value);
    setSnackbarOpen(true);
  };

  const handleClose = () => setSnackbarOpen(false);

  // Descriptions for each group
  const descriptions = {
    brand: 'Primary brand color with all interaction states',
    cta: 'High-impact CTA elements with interaction states',
    info: 'Informational UI states',
    success: 'Positive feedback states',
    warning: 'Warning and caution states',
    error: 'Error and critical states',
  };

  // Define the layout explicitly
  const layout= [
    ['brand'],          // first row full width
    ['cta'],            // second row full width
    ['info', 'success'], // third row 2 columns
    ['warning', 'error'], // fourth row 2 columns
  ];

  return (
    <Container maxWidth="xl" sx={{ mt: 4, display: 'grid', gap: 3 }}>
      {layout.map((row, rowIndex) => (
        <Grid container spacing={3} key={rowIndex}>
          {row.map((groupName) => {
            const states = semanticGroups[groupName];
            if (!states) return null;

            return (
              <Grid
              item
              
                xs={12}
                md={row.length === 1 ? 12 : 6} // full width if single, half if pair
                key={groupName}
              >
                <Paper
                  sx={{
                    padding:"30px",
                    // p: 2,
                    border: '1px solid oklch(0.922 0 0)',
                    borderRadius: '10px',
                  }}
                >
                  {/* Main heading */}
                  <Typography sx={{ fontSize: '1rem', fontWeight: 700 }}>
                    {groupName.charAt(0).toUpperCase() + groupName.slice(1)} Colors
                  </Typography>

                  {/* Sub-description */}
                  <Typography sx={{ fontSize: '0.85rem', color: '#555', mb: 1 }}>
                    {descriptions[groupName]}
                  </Typography>

                  {/* Secondary heading */}
                  <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, mb: 1 }}>
                    {groupName.charAt(0).toUpperCase() + groupName.slice(1)} States
                  </Typography>

                  {/* Color chips */}
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
                          color: '#fff',
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
