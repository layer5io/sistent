'use client';

import { lightModePalette } from '@/lib/palette';
import InfoIcon from '@mui/icons-material/Info';
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Snackbar,
  Tooltip
} from '@mui/material';
import * as React from 'react';

export default function IconColorDemo() {
  const [open, setOpen] = React.useState(false);
  const [copied, setCopied] = React.useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCopy = (color) => {
    navigator.clipboard.writeText(color);
    setCopied(color);
  };

  const flattenColors = (obj, prefix = 'lightMode', seen = new Set()) => {
    let colors = [];
    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      if (typeof value === 'string') {
        const token = `${prefix}.${key}`;
        if (!seen.has(token)) {
          colors.push({ token, color: value });
          seen.add(token);
        }
      } else if (typeof value === 'object') {
        colors = colors.concat(flattenColors(value, `${prefix}.${key}`, seen));
      }
    });
    return colors;
  };

  const iconColors = flattenColors(lightModePalette.icon);
  const allColors = [...iconColors];

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Open Icon Color Palette
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle>Light Mode Icon Palette</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} alignItems="center">
            {allColors.map(({ token, color }) => (
              <Grid item xs={3} sm={2} md={1} key={token}>
                <Tooltip title={`${token} (${color})`} arrow>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <IconButton
                      onClick={() => handleCopy(color)}
                      sx={{
                        color: color,
                        fontSize: 32,
                        '&:hover': {
                          opacity: 0.8
                        }
                      }}
                    >
                      <InfoIcon fontSize="inherit" />
                    </IconButton>
                  </Box>
                </Tooltip>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={!!copied}
        autoHideDuration={1000}
        onClose={() => setCopied('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Copied {copied} to clipboard!
        </Alert>
      </Snackbar>
    </div>
  );
}
