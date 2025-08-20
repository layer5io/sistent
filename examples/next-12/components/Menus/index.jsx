"use client";

import * as React from "react";
import { Box, Button, Tooltip } from "@mui/material";
import { lightModePalette } from "@/pages/themes-explorer/palette";

const navItems = ["Home", "About", "Services", "Contact"];

export default function NavigationMenu() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <Box
      sx={{
        width:"95vw",
        display: "flex",
        gap: 2,
        bgcolor: lightModePalette.navigation.primary,
        p: 1,
      }}
    >
      {navItems.map((item, index) => (
        <Tooltip key={item} title={`Nav item: ${item}`} arrow>
          <Button
            onClick={() => setActiveIndex(index)}
            sx={{
              color: index === activeIndex ? lightModePalette.navigation.active : "white",
              backgroundColor:
                index === activeIndex
                  ? lightModePalette.navigation.secondary
                  : "transparent",
              textTransform: "none",
              "&:hover": {
                backgroundColor: lightModePalette.navigation.hover,
              },
            }}
          >
            {item}
          </Button>
        </Tooltip>
      ))}
    </Box>
  );
}
