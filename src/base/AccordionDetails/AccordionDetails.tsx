import {
  AccordionDetails as MuiAccordionDetails,
  type AccordionDetailsProps as MuiAccordionDetailsProps
} from '@mui/material';

export function AccordionDetails(props: MuiAccordionDetailsProps): JSX.Element {
  return <MuiAccordionDetails {...props} />;
}

export default AccordionDetails;
