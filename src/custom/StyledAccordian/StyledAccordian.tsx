import { styled } from '@mui/material/styles';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';

/**
 * StyledAccordion
 * A customized Accordion component with Meshery-specific styling (borders, margins).
 */
export const StyledAccordion = styled(MuiAccordion)<AccordionProps>(({ theme }) => ({
  border: `1px solid ${theme.palette.divider || 'rgba(0, 0, 0, .125)'}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
  '&.Mui-expanded': {
    margin: 'auto',
  },
}));

/**
 * StyledAccordionSummary
 * A customized AccordionSummary to match the StyledAccordion look.
 */
export const StyledAccordionSummary = styled(MuiAccordionSummary)<AccordionSummaryProps>(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
  borderBottom: `1px solid ${theme.palette.divider || 'rgba(0, 0, 0, .125)'}`,
  marginBottom: -1,
  minHeight: 56,
  '& .MuiAccordionSummary-content': {
    '&.Mui-expanded': {
      margin: '12px 0',
    },
  },
}));