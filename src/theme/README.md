# Sistent Theme Palette

This document provides an overview of the custom palette used for theme components.

## Palette Options

### Interactiveness

Defines the interaction color options used in the palette.

- `default`: Default interaction color.
- `hover`: Color on hover.
- `disabled`: Color when disabled (optional).
- `pressed`: Color when pressed.
- `secondary`: Secondary interaction color.
- `tertiary`: Tertiary interaction color.

### TypeBackground

Defines the extended background color options used in the palette.

- `secondary`: Secondary background color.
- `graphics`: Graphics background color.
- `tertiary`: Tertiary background color.
- `hover`: Hover background color.
- `blur`: Blur effect colors (heavy and light).
- `brand`: Brand interaction colors.
- `cta`: Call to action interaction colors.
- `info`: Information interaction colors.
- `success`: Success interaction colors.
- `warning`: Warning interaction colors.
- `error`: Error interaction colors.
- `code`: Code background color.

To add a new background color, add a new key to the `TypeBackground` type and update the `background` property in the `PaletteColor` type.

### TypeText

Defines the extended text color options used in the palette.

- `default`: Default text color.
- `secondary`: Secondary text color.
- `tertiary`: Tertiary text color.
- `inverse`: Inverse text color.
- `brand`: Brand text color.
- `info`: Information text color.
- `success`: Success text color.
- `warning`: Warning text color.
- `error`: Error text color.

To add a new text color, add a new key to the `TypeText` type and update the `text` property in the `PaletteColor` type.

### PaletteColor

Defines the color options for the palette.

### SimplePaletteColorOptions

Defines the simple palette color options.

## Palette Configuration

The palette configuration includes the following sections:

### lightModePalette

Defines the palette options for the light mode.

### darkModePalette

Defines the palette options for the dark mode.

## Color Definitions

The color definitions are imported from the `./colors` module and include various shades and hues used throughout the palette.
