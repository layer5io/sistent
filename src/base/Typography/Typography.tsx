import {
  Typography as MuiTypography,
  type TypographyProps as MuiTypographyProps
} from '@mui/material';
import React from 'react';

interface ExtendedTypographyProps extends MuiTypographyProps {
  'data-testid'?: string;
}

const Typography = React.forwardRef<HTMLDivElement, ExtendedTypographyProps>((props, ref) => {
  return <MuiTypography {...props} ref={ref} />;
});

export default Typography;
