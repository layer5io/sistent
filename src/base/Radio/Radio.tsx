import { Radio as MuiRadio, RadioProps as MuiRadioProps } from '@mui/material';
import React from 'react';

export const Radio = React.forwardRef<HTMLButtonElement, MuiRadioProps>((props, ref) => {
  return <MuiRadio ref={ref} {...props} />;
});

export default Radio;
