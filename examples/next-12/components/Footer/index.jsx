"use client";

import * as React from "react";
import { Container, Box, Typography } from "@mui/material";
import { ThemeContext } from "../../lib/context/AppThemeContext";
import { lightModePalette, darkModePalette } from "../../pages/themes-explorer/palette";

export default function Footer() {
  const { mode } = React.useContext(ThemeContext);

  
  const palette = mode === "dark" ? darkModePalette : lightModePalette;

  return (
    <Container maxWidth="100%" sx={{ marginTop: "2rem" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          border: `1px solid ${palette.border.default}`, 
          padding: "16px 24px",
          borderRadius: "12px",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
          backgroundColor: palette.background.card, 
        }}
      >
        <Box>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              color: palette.text.default, 
            }}
          >
            Design System Palette
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: palette.text.secondary }} 
          >
            Comprehensive color system with {mode} mode active
          </Typography>
        </Box>

        <Box
          sx={{
            padding: "0.4rem 0.8rem",
            borderRadius: "10px",
            border: `2px solid ${palette.border.strong}`, 
            color: palette.text.default, 
            backgroundColor: palette.background.secondary, 
            textTransform: "none",
            fontSize: "0.75rem",
            fontWeight: 600,
          }}
        >
          9 Color Categories
        </Box>
      </Box>
    </Container>
  );
}
