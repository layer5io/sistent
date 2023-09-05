import { Typography as MuiTypography, type TypographyProps } from '@mui/material';
import React from 'react';

export function Typography(props: TypographyProps): JSX.Element {
  return <MuiTypography {...props} />;
}
