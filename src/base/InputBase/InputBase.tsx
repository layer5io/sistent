import { InputBase as MuiInputBase, InputBaseProps as MuiInputBaseProps } from '@mui/material';
import React from 'react';

export const InputBase = React.forwardRef<HTMLInputElement, MuiInputBaseProps>((props, ref) => (
  <MuiInputBase {...props} ref={ref} />
));

export default InputBase;
