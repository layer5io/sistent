import { Hidden as MuiHidden, HiddenProps as MuiHiddenProps } from '@mui/material';
import React from 'react';

export const Hidden: React.FC<MuiHiddenProps> = (props) => {
  return <MuiHidden {...props} />;
};

export default Hidden;
