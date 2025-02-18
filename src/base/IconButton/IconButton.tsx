import {
  IconButton as MuiIconButton,
  type IconButtonProps as MuiIconButtonProps
} from '@mui/material';
import React from 'react';

export type IconButtonProps = MuiIconButtonProps;

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => (
  <MuiIconButton ref={ref} {...props} />
));

IconButton.displayName = 'IconButton';

export default IconButton;
