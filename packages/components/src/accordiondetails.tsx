import { AccordionDetails as MuiAccordionDetails, type AccordionDetailsProps } from '@mui/material';
import React from 'react';

export function AccordionDetails(props: AccordionDetailsProps): JSX.Element {
  return <MuiAccordionDetails {...props} />;
}
