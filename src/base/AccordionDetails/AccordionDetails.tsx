import {
  AccordionDetails as MuiAccordionDetails,
  type AccordionDetailsProps as MuiAccordionDetailsProps
} from '@mui/material';

import React from 'react';

const AccordionDetails = React.forwardRef<HTMLDivElement, MuiAccordionDetailsProps>(
  (props, ref) => {
    return <MuiAccordionDetails {...props} ref={ref} />;
  }
);

export default AccordionDetails;
