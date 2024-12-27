import {
  FormControlLabel as MuiFormControlLabel,
  FormControlLabelProps as MuiFormControlLabelProps
} from '@mui/material';
import React from 'react';

const FormControlLabel = React.forwardRef<HTMLDivElement, MuiFormControlLabelProps>(
  (props, ref) => {
    return <MuiFormControlLabel {...props} ref={ref} />;
  }
);

export { FormControlLabel };
