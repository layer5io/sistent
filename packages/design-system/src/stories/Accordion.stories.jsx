import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography
} from '@layer5/sistent-components/src';
import { AddIcon } from '@layer5/sistent-svg/src'; //can anyone suggest a diff icon here?

export default {
  title: 'Example/Accordion',
  component: Accordion,
  tags: ['autodocs']
};

export function Basic() {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<AddIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header">
        <Typography>Accordion 1</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
          sit amet blandit leo lobortis eget.
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}

export function Disabled() {
  return (
    <Accordion disabled>
      <AccordionSummary
        expandIcon={<AddIcon />}
        aria-controls="panel3a-content"
        id="panel3a-header">
        <Typography>Disabled Accordion</Typography>
      </AccordionSummary>
    </Accordion>
  );
}
