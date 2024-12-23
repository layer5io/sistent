import { Collapse as MuiCollapse, CollapseProps as MuiCollapseProps } from '@mui/material';
import React from 'react';

const Collapse = React.forwardRef<HTMLDivElement, MuiCollapseProps>((props, ref) => {
  return <MuiCollapse {...props} ref={ref} />;
});

export { Collapse };
