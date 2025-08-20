"use client";

import * as React from "react";
import { Container, Box, Typography, Tooltip, Snackbar, Alert } from "@mui/material";
import { useContext } from "react";
import { lightModePalette, darkModePalette } from "@/pages/themes-explorer/palette";
import { ThemeContext } from "@/lib/context/AppThemeContext";

export default function Surface() {
  const { mode } = useContext(ThemeContext);

  // ✅ pick correct palette
  const palette = mode === "dark" ? darkModePalette : lightModePalette;
  const surfaceColors = palette.surface;

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [copiedText, setCopiedText] = React.useState("");

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedText(value);
    setSnackbarOpen(true);
  };

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  // ✅ descriptions for tokens
  const descriptions: Record<string, string> = {
    primary: "Main page background",
    secondary: "Slightly darker background",
    tertiary: "Even darker background",
    elevated: "Floating elements",
    overlay: "Modal backdrops",
    inverse: "High contrast alt",
    gradient: "Highlight surfaces",
  };

  return (
    <Container maxWidth="100%" sx={{ marginTop: "2rem" }}>
      <Box
        sx={{
          border: `1px solid ${palette.border.default}`,
          padding: "20px",
          borderRadius: "10px",
          boxShadow:
            mode === "dark"
              ? "0px 4px 20px rgba(0,0,0,0.4)"
              : "0px 4px 20px rgba(0,0,0,0.1)",
          backgroundColor: palette.background.card,
        }}
      >
        {/* Title */}
        <Typography
          sx={{
            fontSize: "1.3rem",
            fontWeight: 700,
            color: palette.text.default,
          }}
        >
          Surface Tokens
        </Typography>
        <Typography
          sx={{ color: palette.text.secondary, fontSize: "0.8rem" }}
        >
          Background surfaces with proper contrast for text and interactive elements
        </Typography>

        {/* Token Grid */}
        <Container
          maxWidth="xl"
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 4,
          }}
        >
          {Object.entries(surfaceColors).map(([name, value]) => {
            const isGradient = typeof value === "string" && value.includes("gradient");
            const displayValue = isGradient ? "Gradient" : value;

            return (
              <Box
                key={name}
                sx={{
                  width: 140,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  cursor: "pointer",
                }}
                onClick={() => handleCopy(displayValue)}
              >
                {/* Color preview box */}
                <Tooltip title="Click to copy" arrow>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      background: value,
                      borderRadius: 2,
                      boxShadow: 1,
                      mb: 1,
                      border: `1px solid ${palette.border.normal}`, // ✅ theme border
                    }}
                  />
                </Tooltip>

                {/* Token Name */}
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 600,
                    color: palette.text.default,
                  }}
                >
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Typography>

                {/* Token Description */}
                <Typography
                  sx={{
                    color: palette.text.secondary,
                    fontSize: "0.75rem",
                    mb: 0.5,
                  }}
                >
                  {descriptions[name] || ""}
                </Typography>

                {/* Token Value (hash or Gradient) */}
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    color: palette.text.secondary,
                    fontFamily: "monospace",
                  }}
                >
                  {displayValue}
                </Typography>
              </Box>
            );
          })}
        </Container>
      </Box>

      {/* Snackbar for copy feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{
            width: "100%",
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
