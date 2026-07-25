import { alpha, styled } from '@mui/material';
import { Box } from '../../base';

/**
 * Error-tinted container for the warning/description body. Uses the canonical
 * `status.error` token (not a hard-coded red) so it tracks light/dark themes.
 */
export const DangerBody = styled(Box)(({ theme }) => ({
  borderRadius: '0.25rem',
  borderLeft: `3px solid ${theme.palette.status.error}`,
  backgroundColor: alpha(theme.palette.status.error, 0.08),
  padding: '0.75rem 1rem',
  overflowWrap: 'anywhere'
}));

/**
 * Info-tinted "recommended alternative" callout (e.g. transfer ownership
 * instead of deleting). Lays out an icon alongside caller-supplied content.
 */
export const RecommendedCallout = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '0.75rem',
  marginTop: '1rem',
  borderRadius: '0.25rem',
  border: `1px solid ${alpha(theme.palette.status.info, 0.4)}`,
  backgroundColor: alpha(theme.palette.status.info, 0.08),
  padding: '0.75rem 1rem'
}));

export const RecommendedCalloutBody = styled(Box)(() => ({
  flex: 1,
  minWidth: 0
}));

export const ConfirmField = styled(Box)(() => ({
  marginTop: '1rem'
}));

/**
 * Real `<label>` element so `htmlFor` associates it with the type-to-confirm
 * input for assistive technology.
 */
export const ConfirmFieldLabel = styled('label')(({ theme }) => ({
  display: 'block',
  marginBottom: '0.5rem',
  fontSize: '0.875rem',
  color: theme.palette.text.secondary
}));

export const CheckboxSection = styled(Box)(() => ({
  marginTop: '1rem'
}));

export const Actions = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
  width: '100%',
  gap: '0.75rem'
}));
