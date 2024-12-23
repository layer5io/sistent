import {
  AccordionActions as MuiAccordionActions,
  type AccordionActionsProps as MuiAccordionActionsProps
} from '@mui/material';

import React from 'react';

const AccordionActions = React.forwardRef<HTMLDivElement, MuiAccordionActionsProps>(
  (props, ref) => {
    return <MuiAccordionActions {...props} ref={ref} />;
  }
);

export default AccordionActions;
