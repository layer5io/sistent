# Project Directory Structure

## Overview of `/src` Directory

### actors

### assets

- Assets are the files that are used in the project. These files can be images, videos, logos or fonts etc. The assets directory is used to store all the assets that are used in the project.

### base

- Base directory contains all the basic components that are used in the project. These components are the building blocks of the project. The base directory contains the following subdirectories like `Buttons`, `Forms`, `Typography` etc.

### constants

- Constants directory contains all the constants that are used in the project. These constants can be colors, fonts, breakpoints etc.

### custom

- Custom directory contains all the custom components using the theme colors.

### icons

- Icons directory contains all the icons that are used in the project or can be used in any of other projects.

### theme

- Theme directory contains all the theme related files. The theme directory contains the following subdirectories like
  `Colors`- contains all the colors that are used in the project or theme components.
  `components` - contains all the theme components like `Button`, `Typography` with brand colors.
  `typography.ts` - contains all the typography related files like `font-size`, `font-family` etc.
  `palette.ts` - contains all the tokens that are used in the project and used in components.

Through the theme directory, we export the SistentThemeProvider which is used to provide the theme to the project.
