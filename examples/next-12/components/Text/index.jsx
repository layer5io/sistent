'use client';

import { Box, Container, Typography, Paper, Snackbar, Alert } from '@mui/material';
import React, { useState } from 'react';
import { ThemeContext } from '@/lib/context/AppThemeContext';
import { darkModePalette, lightModePalette } from '@/pages/themes-explorer/palette';
import {useContext} from 'react'

export default function TextColors() {
  const {mode} = useContext(ThemeContext)
  const textColors = mode==="dark"?lightModePalette.text:darkModePalette.text;
  // State for snackbar feedback
  const [copiedColor, setCopiedColor] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleCopy = (color) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setSnackbarOpen(true);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Paper
        sx={{
          p: 2,
          border: '1px solid oklch(0.922 0 0)',
          borderRadius: '10px',
        }}
      >
        <Typography sx={{ fontSize: '1rem', fontWeight: 700 }}>
          Text Colors
        </Typography>

        <Typography sx={{ fontSize: '0.85rem', color: '#555', mb: 2 }}>
          Typography colors for different content hierarchy and semantic meaning
        </Typography>

        {/* Swatches grid */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
            mb: 3,
            width: '100%',
            justifyContent: 'space-around',
          }}
        >
          {[
            { key: 'default', label: 'Primary text' },
            { key: 'secondary', label: 'Secondary text' },
            { key: 'tertiary', label: 'Tertiary text' },
            { key: 'disabled', label: 'Disabled text' },
            { key: 'inverse', label: 'Inverse text' },
            { key: 'brand', label: 'Brand text' },
          ].map(({ key, label }) => (
            <Box
              key={key}
              onClick={() => handleCopy(textColors[key])}
              sx={{
                width: 120,
                p: 1.5,
                textAlign: 'center',
                borderRadius: '10px',
                boxShadow: '0px 2px 8px rgba(0,0,0,0.12)',
                cursor: 'pointer',
              
                

                  // boxShadow: '0px 4px 12px rgba(0,0,0,0.18)',

              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: 70,
                  borderRadius: '8px',
                  background: textColors[key],
                  border: '1px solid #ddd',
                  mb: 1,
                }}
              />
              <Typography sx={{ fontSize: '0.85rem', fontWeight: 600 }}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Typography>
              <Typography sx={{ fontSize: '0.75rem', color: '#555' }}>
                {label}
              </Typography>
              <Typography sx={{ fontSize: '0.7rem', color: '#888' }}>
                {textColors[key]}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Semantic & hierarchy section */}
        <Box
          sx={{
            display: 'flex',
            gap: 8,
            width: '100%',
            justifyContent: 'space-around',
          }}
        >
          <Box>
            <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, mb: 1 }}>
              Semantic Text Colors
            </Typography>
            <Typography sx={{ color: textColors.info }} fontSize={"13px"}>Info text color</Typography>
            <Typography sx={{ color: textColors.success }} fontSize={"13px"}>Success text color</Typography>
            <Typography sx={{ color: textColors.warning }} fontSize={"13px"}>Warning text color</Typography>
            <Typography sx={{ color: textColors.error }} fontSize={"13px"}>Error text color</Typography>
          </Box>

          <Box>
            <Typography  sx={{ fontSize: '0.9rem', fontWeight: 600, mb: 1 }}>
              Text Hierarchy
            </Typography>
            <Typography  sx={{ fontSize: '1rem', fontWeight: 700, fontSize: '1.1rem' }}>
              Primary Heading
            </Typography>
            <Typography  sx={{fontSize: '1rem', fontWeight: 500 }}>Secondary Heading</Typography>
            <Typography sx={{ fontSize: '1rem',color: textColors.tertiary }}>
              Tertiary body text
            </Typography>
            <Typography  sx={{fontSize: '1rem', color: textColors.disabled }}>Disabled text</Typography>
          </Box>
        </Box>
      </Paper>

      {/* Snackbar for copy feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ fontSize: '0.85rem' }}>
          Copied {copiedColor} to clipboard!
        </Alert>
      </Snackbar>
    </Container>
  );
}
