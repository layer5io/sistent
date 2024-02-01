import {
  AccordionActions as MuiAccordionActions,
  type AccordionActionsProps as MuiAccordionActionsProps
} from '@mui/material';

export function AccordionActions(props: MuiAccordionActionsProps): JSX.Element {
  return <MuiAccordionActions {...props} />;
}

export default AccordionActions;
