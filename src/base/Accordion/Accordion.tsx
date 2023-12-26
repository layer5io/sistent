import { Accordion as MuiAccordion, type AccordionProps as MuiAccordionProps } from '@mui/material';

export function Accordion(props: MuiAccordionProps): JSX.Element {
  return <MuiAccordion {...props} />;
}

export default Accordion;
