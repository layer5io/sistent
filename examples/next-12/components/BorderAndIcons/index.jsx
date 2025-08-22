'use client';

import { Box, Container, Typography, Paper, Grid, Snackbar, Alert } from '@mui/material';
import React, { useState, useContext } from 'react';
import { ThemeContext } from '../../lib/context/AppThemeContext';
import { darkModePalette, lightModePalette } from '../../pages/themes-explorer/palette';
import { Palette, RemoveRedEye, WbSunny, Send, Star } from '@mui/icons-material';


export default function BorderAndIconColors() {
  const { mode } = useContext(ThemeContext);
  const palette = mode === 'dark' ? darkModePalette : lightModePalette;
  const borderColors = palette.border;
  const iconColors = palette.icon;

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [copiedText, setCopiedText] = useState('');

  const handleCopy = (value) => {
    navigator.clipboard.writeText(value);
    setCopiedText(value);
    setSnackbarOpen(true);
  };

  const handleClose = () => setSnackbarOpen(false);

  const borderSwatches = [
    { key: 'default', label: 'Default', desc: 'Standard borders' },
    { key: 'strong', label: 'Strong', desc: 'Emphasized borders' },
    { key: 'brand', label: 'Brand', desc: 'Brand borders' },
    { key: 'normal', label: 'Normal', desc: 'Normal borders' },
    { key: 'neutral.default', label: 'Neutral Default', desc: 'Neutral borders' },
    { key: 'neutral.alt', label: 'Neutral Alt', desc: 'Alternate neutral borders' },
  ];

  const iconSwatches = [
    { key: 'default', label: 'Default', desc: 'Standard icons' },
    { key: 'secondary', label: 'Secondary', desc: 'Secondary icons' },
    { key: 'brand', label: 'Brand', desc: 'Brand icons' },
    { key: 'inverse', label: 'Inverse', desc: 'Inverse icons' },
    { key: 'weather', label: 'Weather', desc: 'Weather icons' },
    { key: 'disabled', label: 'Disabled', desc: 'Disabled icons' },
    { key: 'dualTone', label: 'Dual Tone', desc: 'Two-tone icons' },
    { key: 'dualToneInverse', label: 'Dual Tone Inverse', desc: 'Inverse dual-tone icons' },
    { key: 'neutral.default', label: 'Neutral Default', desc: 'Neutral icons' },
    { key: 'neutral.alt', label: 'Neutral Alt', desc: 'Alt neutral icons' },
  ];

  const getColor = (obj, path) =>
    path.split('.').reduce((acc, part) => acc && acc[part], obj);

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>

      <Paper
        sx={{
          p: 3,
          border: `1px solid ${palette.border.default}`,
          borderRadius: '12px',
          mb: 4,
          backgroundColor: palette.surface?.elevated ?? palette.background.elevatedComponents,
        }}
      >
        <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: palette.text.default }}>
          Border Colors
        </Typography>
        <Typography sx={{ fontSize: '0.85rem', color: palette.text.secondary, mb: 3 }}>
          Border colors for different emphasis levels
        </Typography>

        <Grid container spacing={3}>
          {borderSwatches.map(({ key, label, desc }) => (
            <Grid item xs={12} sm={6} md={3} key={key}>
              <Paper
                elevation={1}
                sx={{
                  p: 2,
                  borderRadius: '12px',
                  border: `1px solid ${palette.border.default}`,
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1,
                  backgroundColor: palette.surface?.primary,
                }}
              >
                <Box
                  onClick={() => handleCopy(getColor(borderColors, key))}
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '8px',
                    border: `4px solid ${getColor(borderColors, key)}`,
                    cursor: 'pointer',
                    '&:hover': { boxShadow: `0 0 0 3px ${palette.border.default}33` },
                  }}
                />
                <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', color: palette.text.default }}>
                  {label}
                </Typography>
                <Typography sx={{ fontSize: '0.75rem', color: palette.text.secondary }}>{desc}</Typography>
                <Typography
                  sx={{
                    fontSize: '0.75rem',
                    backgroundColor: palette.surface?.elevated,
                    borderRadius: '6px',
                    px: 1,
                    py: 0.3,
                    mt: 0.5,
                    fontFamily: 'monospace',
                    color: palette.text.tertiary,
                  }}
                >
                  {getColor(borderColors, key)}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

 
        <Box
          sx={{
            mt: 4,
            p: 2,
            border: `1px solid ${palette.border.default}`,
            borderRadius: '10px',
            backgroundColor: palette.surface?.elevated,
          }}
        >
          <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, mb: 1, color: palette.text.default }}>
            Border Examples
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {borderSwatches.slice(0, 4).map(({ key, label }) => (
              <Box
                key={key}
                sx={{
                  border: `2px solid ${getColor(borderColors, key)}`,
                  borderRadius: '8px',
                  px: 2,
                  py: 1,
                  minWidth: 120,
                  textAlign: 'center',
                  color: palette.text.default,
                }}
              >
                {label} Border
              </Box>
            ))}
          </Box>
        </Box>
      </Paper>

      <Paper
        sx={{
          p: 3,
          border: `1px solid ${palette.border.default}`,
          borderRadius: '12px',
          backgroundColor: palette.surface?.elevated ?? palette.background.elevatedComponents,
        }}
      >
        <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: palette.text.default }}>
          Icon Colors
        </Typography>
        <Typography sx={{ fontSize: '0.85rem', color: palette.text.secondary, mb: 3 }}>
          Icon colors for different contexts and states
        </Typography>

        <Grid container spacing={3}>
          {iconSwatches.map(({ key, label, desc }) => (
            <Grid item xs={12} sm={6} md={2} key={key}>
              <Paper
                elevation={1}
                sx={{
                  p: 2,
                  borderRadius: '12px',
                  border: `1px solid ${palette.border.default}`,
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1,
                  backgroundColor: palette.surface?.primary,
                }}
              >
                <Box
                  onClick={() => handleCopy(getColor(iconColors, key))}
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '8px',
                    backgroundColor: getColor(iconColors, key),
                    cursor: 'pointer',
                    border: `2px solid ${palette.border.normal}`,
                    '&:hover': { boxShadow: `0 0 0 3px ${palette.border.default}33` },
                  }}
                />
                <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', color: palette.text.default }}>
                  {label}
                </Typography>
                <Typography sx={{ fontSize: '0.75rem', color: palette.text.secondary }}>{desc}</Typography>
                <Typography
                  sx={{
                    fontSize: '0.75rem',
                    backgroundColor: palette.surface?.elevated,
                    borderRadius: '6px',
                    px: 1,
                    py: 0.3,
                    mt: 0.5,
                    fontFamily: 'monospace',
                    color: palette.text.tertiary,
                  }}
                >
                  {getColor(iconColors, key)}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>


        <Box sx={{ mt: 4, p: 2, border: `1px solid ${palette.border.default}`, borderRadius: '10px' }}>
          <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, mb: 1, color: palette.text.default }}>
            Icon Examples
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Palette size={22} color={iconColors.default} />
            <RemoveRedEye size={22} color={iconColors.secondary} />
            <WbSunny size={22} color={iconColors.brand} />
            <Send size={22} color={iconColors.weather} />
            <Star size={22} color={iconColors.dualTone} />
          </Box>
        </Box>
      </Paper>

      
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
