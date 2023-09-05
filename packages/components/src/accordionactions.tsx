import { AccordionActions as MuiAccordionActions, type AccordionActionsProps } from '@mui/material';
import React from 'react';

export function AccordionActions(props: AccordionActionsProps): JSX.Element {
  return <MuiAccordionActions {...props} />;
}
