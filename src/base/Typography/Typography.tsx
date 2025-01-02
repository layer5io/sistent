import {
  Typography as MuiTypography,
  type TypographyProps as MuiTypographyProps
} from '@mui/material';
import React from 'react';

const Typography = React.forwardRef<HTMLDivElement, MuiTypographyProps>((props, ref) => {
  return <MuiTypography {...props} ref={ref} />;
});

export default Typography;
