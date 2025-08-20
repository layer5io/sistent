'use client';

import { Box, Container, Typography, Paper, Grid, Snackbar, Alert } from '@mui/material';
import React, { useState } from 'react';
import { lightModePalette } from '@/pages/themes-explorer/palette';
import { Palette, Eye, Sun, Send, Star } from 'lucide-react';

export default function BorderAndIconColors() {
  const borderColors = lightModePalette.border;
  const iconColors = lightModePalette.icon;

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

  // helper: safely get nested colors (e.g. border.neutral.default)
  const getColor = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      {/* BORDER COLORS */}
      <Paper sx={{ p: 3, border: '1px solid #eee', borderRadius: '12px', mb: 4 }}>
        <Typography sx={{ fontSize: '1rem', fontWeight: 700 }}>Border Colors</Typography>
        <Typography sx={{ fontSize: '0.85rem', color: '#555', mb: 3 }}>
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
                  border: '1px solid #eee',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1,
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
                    '&:hover': { boxShadow: '0 0 0 3px rgba(0,0,0,0.1)' },
                  }}
                />
                <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>{label}</Typography>
                <Typography sx={{ fontSize: '0.75rem', color: '#555' }}>{desc}</Typography>
                <Typography
                  sx={{
                    fontSize: '0.75rem',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '6px',
                    px: 1,
                    py: 0.3,
                    mt: 0.5,
                    fontFamily: 'monospace',
                  }}
                >
                  {getColor(borderColors, key)}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Border Examples */}
        <Box sx={{ mt: 4, p: 2, border: '1px solid #eee', borderRadius: '10px' }}>
          <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, mb: 1 }}>
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
                }}
              >
                {label} Border
              </Box>
            ))}
          </Box>
        </Box>
      </Paper>

      {/* ICON COLORS */}
      <Paper sx={{ p: 3, border: '1px solid #eee', borderRadius: '12px' }}>
        <Typography sx={{ fontSize: '1rem', fontWeight: 700 }}>Icon Colors</Typography>
        <Typography sx={{ fontSize: '0.85rem', color: '#555', mb: 3 }}>
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
                  border: '1px solid #eee',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1,
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
                    border: '2px solid #ddd',
                    '&:hover': { boxShadow: '0 0 0 3px rgba(0,0,0,0.1)' },
                  }}
                />
                <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>{label}</Typography>
                <Typography sx={{ fontSize: '0.75rem', color: '#555' }}>{desc}</Typography>
                <Typography
                  sx={{
                    fontSize: '0.75rem',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '6px',
                    px: 1,
                    py: 0.3,
                    mt: 0.5,
                    fontFamily: 'monospace',
                  }}
                >
                  {getColor(iconColors, key)}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Icon Examples */}
        <Box sx={{ mt: 4, p: 2, border: '1px solid #eee', borderRadius: '10px' }}>
          <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, mb: 1 }}>
            Icon Examples
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Palette size={22} color={iconColors.default} />
            <Eye size={22} color={iconColors.secondary} />
            <Sun size={22} color={iconColors.brand} />
            <Send size={22} color={iconColors.weather} />
            <Star size={22} color={iconColors.dualTone} />
          </Box>
        </Box>
      </Paper>

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
