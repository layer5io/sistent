"use client";

import * as React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Grid,
  Tooltip,
} from "@mui/material";
import { lightModePalette } from "@/pages/themes-explorer/palette";

export default function InteractivePaletteDemo() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Render component based on the token
  const renderComponent = (token, color) => {
    const interactiveTokens = ["cta", "brand", "success", "error", "warning", "info"];

    for (const itoken of interactiveTokens) {
      if (token.includes(itoken) && lightModePalette.background[itoken]) {
        const states = lightModePalette.background[itoken];
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="caption" sx={{ textTransform: "capitalize" }}>
              {itoken} Variants
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {Object.keys(states).map((key) => (
                <Button
                  key={key}
                  variant="contained"
                  sx={{
                    backgroundColor: states[key],
                    "&:hover": { backgroundColor: states[key] },
                    "&:active": { backgroundColor: states[key] },
                    cursor: "crosshair",
                    textTransform: "none",
                  }}
                >
                  {key}
                </Button>
              ))}
            </Box>
          </Box>
        );
      }
    }

    
    return (
      <Box
        sx={{
          bgcolor: color,
          height: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 1,
          color: "#fff",
          textAlign: "center",
          px: 1,
          cursor: "crosshair", 
        }}
        onClick={() => navigator.clipboard.writeText(color)}
      >
        {token.split(".").pop()}
      </Box>
    );
  };


  const flattenColors = (obj, prefix = "lightMode") => {
    let colors= [];
    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      if (typeof value === "string") {
        colors.push({ token: `${prefix}.${key}`, color: value });
      } else if (typeof value === "object") {
        colors = colors.concat(flattenColors(value, `${prefix}.${key}`));
      }
    });
    return colors;
  };

  const allColors = flattenColors(lightModePalette.background);

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Open Interactive Palette
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle>Light Mode Background Color Interactive Palette</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            {allColors.map(({ token, color }) => (
              <Grid item xs={12} sm={6} md={4} key={token}>
                <Tooltip title={token} arrow>
                  {renderComponent(token, color)}
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
    </div>
  );
}
