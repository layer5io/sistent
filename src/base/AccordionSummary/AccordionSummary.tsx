import {
  AccordionSummary as MuiAccordionSummary,
  type AccordionSummaryProps as MuiAccordionSummaryProps
} from '@mui/material';
import React from 'react';

const AccordionSummary = React.forwardRef<HTMLDivElement, MuiAccordionSummaryProps>(
  (props, ref) => {
    return <MuiAccordionSummary {...props} ref={ref} />;
  }
);

export default AccordionSummary;
