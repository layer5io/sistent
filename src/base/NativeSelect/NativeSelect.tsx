import {
  NativeSelect as MuiNativeSelect,
  NativeSelectProps as MuiNativeSelectProps
} from '@mui/material';
import React from 'react';

export const NativeSelect = React.forwardRef<HTMLSelectElement, MuiNativeSelectProps>(
  (props, ref) => <MuiNativeSelect {...props} ref={ref} />
);

export default NativeSelect;
