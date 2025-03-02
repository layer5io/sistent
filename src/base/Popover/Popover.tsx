import { Popover as MuiPopover, PopoverProps as MuiPopoverProps } from '@mui/material';
import React from 'react';

const Popover = React.forwardRef<HTMLDivElement, MuiPopoverProps>((props, ref) => {
  return <MuiPopover {...props} ref={ref} />;
});

export { Popover };
