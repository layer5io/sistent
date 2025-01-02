import { Accordion as MuiAccordion, type AccordionProps as MuiAccordionProps } from '@mui/material';
import React from 'react';

const Accordion = React.forwardRef<HTMLDivElement, MuiAccordionProps>((props, ref) => {
  return <MuiAccordion {...props} ref={ref} />;
});

export default Accordion;
