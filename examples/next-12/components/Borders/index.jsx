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

export default function BorderDemo() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const flattenColors = (obj, prefix = "lightMode") => {
    let colors = [];
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
  const allColors = flattenColors(lightModePalette.border);
  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Border Interactive
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle>Light Mode Border Interactive Palette</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            {allColors.map(({ token, color }) => (
              <Grid item xs={12} sm={6} md={4} key={token}>
                <Tooltip title={`Click to copy ${color}`} arrow>
                  <Box
                    sx={{
                      border: `4px solid ${color}`, // border color
                      borderRadius: 2,
                      height: 80,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "crosshair", // dropper-like cursor
                      transition: "background-color 0.2s",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                    }}
                    onClick={() => navigator.clipboard.writeText(color)}
                  >
                    <Typography sx={{ fontWeight: 700 }}>
                      {token.split(".").pop()?.toUpperCase()}
                    </Typography>
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
    </div>
  );
}
