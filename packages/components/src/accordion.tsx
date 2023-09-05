import { Accordion as MuiAccordion, type AccordionProps } from '@mui/material';
import React from 'react';

export function Accordion(props: AccordionProps): JSX.Element {
  return <MuiAccordion {...props} />;
}
