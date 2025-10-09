'use client';

import { Alert, Box, Chip, Container, Paper, Snackbar, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { ThemeContext } from '../../lib/context/AppThemeContext';
import { darkModePalette, lightModePalette } from '../../lib/palette';

// Helper function to flatten nested objects and get all color values
const flattenColors = (obj, prefix = '', seen = new Set()) => {
  let colors = [];

  Object.entries(obj).forEach(([key, value]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'string') {
      if (!seen.has(fullKey)) {
        colors.push({
          token: fullKey,
          color: value,
          category: prefix || 'root'
        });
        seen.add(fullKey);
      }
    } else if (typeof value === 'object' && value !== null) {
      colors = colors.concat(flattenColors(value, fullKey, seen));
    }
  });

  return colors;
};

export default function AllColors() {
  const { mode } = useContext(ThemeContext);
  const palette = mode === 'dark' ? darkModePalette : lightModePalette;

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [copiedText, setCopiedText] = useState('');

  const handleCopy = (value) => {
    navigator.clipboard.writeText(value);
    setCopiedText(value);
    setSnackbarOpen(true);
  };

  const handleClose = () => setSnackbarOpen(false);

  // Get all colors from the palette
  const allColors = flattenColors(palette);

  // Group colors by category
  const groupedColors = allColors.reduce((acc, color) => {
    const category = color.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(color);
    return acc;
  }, {});

  const categoryNames = {
    root: 'Primary Colors',
    surface: 'Surface Colors',
    interactive: 'Interactive Colors',
    navigation: 'Navigation Colors',
    background: 'Background Colors',
    text: 'Text Colors',
    border: 'Border Colors',
    icon: 'Icon Colors',
    primary: 'Primary Palette',
    secondary: 'Secondary Palette'
  };

  const getCategoryDescription = (category) => {
    const descriptions = {
      root: 'Main palette colors',
      surface: 'Background surfaces with proper contrast',
      interactive: 'Colors for buttons, links, and interactive elements',
      navigation: 'Navigation bar and menu colors',
      background: 'Extended background color options',
      text: 'Text color variations',
      border: 'Border and divider colors',
      icon: 'Icon color variations',
      primary: 'Primary color palette',
      secondary: 'Secondary color palette'
    };
    return descriptions[category] || 'Color variations';
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
        <Typography sx={{ fontSize: '1.3rem', fontWeight: '700', color: palette.text.default }}>
          All Colors Tokens
        </Typography>
        <Typography sx={{ color: palette.text.secondary, fontSize: '0.8rem' }}>
          Complete color palette explorer with all color tokens from the {mode} mode -{' '}
          {allColors.length} total colors
        </Typography>

        {Object.entries(groupedColors).map(([category, colors]) => (
          <Box key={category} sx={{ mb: 4 }}>
            <Typography
              sx={{
                fontSize: '1.1rem',
                fontWeight: 600,
                color: palette.text.default,
                mb: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              {categoryNames[category] || category.charAt(0).toUpperCase() + category.slice(1)}
              <Chip
                label={colors.length}
                size="small"
                sx={{
                  backgroundColor: palette.background.secondary,
                  color: palette.text.secondary
                }}
              />
            </Typography>
            <Typography
              sx={{
                color: palette.text.secondary,
                fontSize: '0.8rem',
                mb: 2,
                maxWidth: '100%',
                wordBreak: 'break-word'
              }}
            >
              {getCategoryDescription(category)}
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
              {colors.map(({ token, color }) => (
                <Box
                  key={token}
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
                  onClick={() => handleCopy(color)}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      background: color,
                      borderRadius: 2,
                      boxShadow: 1,
                      mb: 1,
                      border: `1px solid ${palette.border.subtle}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {color.includes('gradient') && (
                      <Typography
                        sx={{
                          fontSize: '0.7rem',
                          color: palette.text.inverse,
                          fontWeight: 600,
                          textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                        }}
                      >
                        GRADIENT
                      </Typography>
                    )}
                  </Box>

                  <Typography
                    sx={{
                      fontWeight: '600',
                      color: palette.text.default,
                      fontSize: '0.7rem',
                      textAlign: 'center',
                      wordBreak: 'break-word',
                      maxWidth: '180px'
                    }}
                    variant="subtitle2"
                  >
                    {token}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: '0.65rem',
                      color: palette.text.muted,
                      fontFamily: 'monospace',
                      textAlign: 'center',
                      wordBreak: 'break-all',
                      maxWidth: '180px',
                      lineHeight: 1.2
                    }}
                  >
                    {color}
                  </Typography>
                </Box>
              ))}
            </Container>
          </Box>
        ))}

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
            Palette Summary
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 1.5,
                borderRadius: 2,
                background: palette.primary.main,
                color: palette.text.inverse,
                fontWeight: 600,
                fontSize: '0.8rem',
                wordBreak: 'break-word',
                flexWrap: 'wrap'
              }}
            >
              • Total Colors: {allColors.length} | Categories: {Object.keys(groupedColors).length} |
              Mode: {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 1.5,
                borderRadius: 2,
                background: palette.surface.primary,
                color: palette.text.default,
                fontWeight: 600,
                fontSize: '0.8rem',
                wordBreak: 'break-word',
                flexWrap: 'wrap'
              }}
            >
              • Primary: {palette.primary?.main || 'N/A'} | Surface:{' '}
              {palette.surface?.primary || 'N/A'} | Text: {palette.text?.default || 'N/A'}
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
