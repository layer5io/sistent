import {
  OutlinedInput as MuiOutlinedInput,
  OutlinedInputProps as MuiOutlinedInputProps
} from '@mui/material';
import React from 'react';

const OutlinedInput = React.forwardRef<HTMLDivElement, MuiOutlinedInputProps>((props, ref) => {
  return <MuiOutlinedInput {...props} ref={ref} />;
});

export { OutlinedInput };
