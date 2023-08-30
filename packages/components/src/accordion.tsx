import { AccordionProps, Accordion as MuiAccordion } from '@mui/material';
import React from 'react';

export function Accordion(props: AccordionProps) {
  return <MuiAccordion {...props} />;
}
