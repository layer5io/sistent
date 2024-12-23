import { Container as MuiContainer, ContainerProps as MuiContainerProps } from '@mui/material';
import React from 'react';

const Container = React.forwardRef<HTMLDivElement, MuiContainerProps>((props, ref) => {
  return <MuiContainer {...props} ref={ref} />;
});

export default Container;
