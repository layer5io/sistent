import { alpha, Theme } from '@mui/material';
import { Box, Chip, Grid, IconButton, Typography } from '../../base';
import { charcoal, KEPPEL, styled } from '../../theme';

interface StyledProps {
  noPadding?: boolean;
  openSection?: boolean;
  display?: string;
  theme?: Theme;
}

export const FlexContainer = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 24
});

export const FlexItem = styled(Box)({
  flex: '1 1 calc(50% - 12px)',
  minWidth: '300px'
});

export const FullWidthItem = styled(Box)({
  flex: '1 1 100%'
});

export const StyledPaper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: '#202020',
  color: theme.palette.text.primary
}));

export const StyledArrayUl = styled('ol')(() => ({
  listStyleType: 'none',
  paddingInline: '0rem',
  display: 'flex',
  flexDirection: 'column',
  margin: '0.5rem'
}));

export const StyledPortsUl = styled('ul')({
  listStyleType: 'none',
  marginBlock: '0.25rem',
  paddingInline: '0.5rem',
  display: 'flex',
  flexDirection: 'column'
});

export const Title = styled('span')({
  fontSize: '0.5rem',
  fontWeight: 'bold',
  fontFamily: 'Qanelas Soft, sans-serif'
});

export const ElementData = styled('span')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingLeft: '0'
});

export const Wrap = styled('div')(() => ({
  width: '100%',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
}));

export const VariableSubfield = styled('div')(({ theme }) => ({
  color: 'rgb(134, 183, 235)',
  letterSpacing: '1px',
  fontSize: '.85rem',
  fontFamily: theme.typography.fontFamily
}));

export const LongWrap = styled('div')<StyledProps>(({ display }) => ({
  width: '100%',
  textOverflow: 'ellipsis',
  wordWrap: 'break-word',
  overflowWrap: 'break-word',
  wordBreak: 'break-all',
  display: display || 'block',
  gap: display === 'flex' ? '0.5rem' : '0'
}));

export const KeyValField = styled('span')(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? charcoal[60] : charcoal[20],
  fontWeight: 'bold'
}));

export const State = styled('span')(() => ({
  verticalAlign: 'middle',
  paddingRight: '8px',
  display: 'flex'
}));

export const Heading = styled('div')({
  display: 'flex',
  alignItems: 'center',
  paddingInline: '1rem',
  margin: '1.5rem auto'
});

export const ElementDataWrap = styled('span')({
  paddingLeft: '0',
  width: '100%',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
});

export const Details = styled('div', {
  shouldForwardProp: (prop): prop is keyof StyledProps => prop !== 'noPadding'
})<StyledProps>(({ noPadding }) => ({
  fontSize: '1rem',
  paddingLeft: noPadding ? '' : '1rem',
  width: 'fit-content'
}));

export const StyledTitle = styled(Typography)({
  cursor: 'pointer',
  padding: '0.25rem',
  width: '100%',
  paddingLeft: '0'
});

export const CollapsibleSectionContainer = styled(Box)({
  borderRadius: '0.25rem',
  marginBottom: '0.5rem',
  overflow: 'hidden'
});

export const CollapsibleSectionTitle = styled('div', {
  shouldForwardProp: (prop): prop is keyof StyledProps => prop !== 'openSection'
})<StyledProps>(({ theme, openSection }) => ({
  display: 'flex',
  cursor: 'pointer',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0rem',
  fontWeight: 'regular',
  borderBottom: openSection ? `1px solid ${KEPPEL}` : `1px solid ${theme?.palette.divider}`,
  backgroundColor: openSection ? alpha(KEPPEL, 0.1) : 'transparent',
  marginBlock: '0.25rem'
}));

export const CollapsibleSectionContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  padding: '0.2rem',
  backgroundColor: 'transparent'
});

export const StyledEnvironmentVariablesCode = styled('code')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#e9eff1' : '#253137',
  color: theme.palette.text.primary,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem'
}));

export const StyledEnvironmentVariablesPre = styled('pre')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#e9eff1' : '#253137',
  color: theme.palette.text.primary,
  padding: '0.5rem',
  margin: '0',
  width: '100%'
}));

export const EnvironmentVariablesContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
});

export const EnvironmentVariableValue = styled('span')({
  maxWidth: '50px',
  whiteSpace: 'pre-wrap'
});

export const CodeFormatterPre = styled('pre')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#e9eff1' : '#212121',
  color: theme.palette.text.primary,
  width: '100%',
  wordWrap: 'break-word',
  overflowWrap: 'break-word',
  wordBreak: 'break-all',
  margin: 0,
  padding: '0.5rem'
}));

export const CodeFormatterCode = styled('code')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#e9eff1' : '#212121',
  color: theme.palette.text.primary,
  fontFamily: theme.typography.fontFamily
}));

export const NumberStateContainer = styled('div')({
  textAlign: 'center'
});

export const NumberStateTitle = styled(Typography)({
  paddingRight: '1vh',
  marginTop: '0.35rem',
  marginBottom: '0'
});

export const NumberStateValueContainer = styled('div')({
  display: 'inline-flex',
  alignItems: 'center',
  paddingRight: '1vh'
});

export const NumberStateValue = styled(Typography)(({ theme }) => ({
  marginRight: '0.25rem',
  marginBottom: '0',
  whiteSpace: 'nowrap',
  color: theme.palette.mode === 'dark' ? charcoal[60] : charcoal[20]
}));

export const NumberStateQuantity = styled(Typography)({
  fontSize: '1rem',
  marginTop: '1.5rem'
});

export const StyledNumberBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: '1.5rem'
});

export const StyledChip = styled(Chip)({
  borderRadius: '0.25rem',
  minHeight: '1.5rem',
  height: 'auto',
  '& .MuiChip-label': {
    display: 'block',
    whiteSpace: 'normal'
  }
});

export const ResourceProgressContainer = styled(Box)({
  marginTop: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flexWrap: 'wrap'
});

export const FlexResourceContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  flexWrap: 'wrap'
});

export const SecretContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 1
});

export const SecretItemContainer = styled(Box)({
  display: 'flex',
  gap: 4,
  alignItems: 'center'
});

export const SecretValueContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 1
});

export const SecretIconButton = styled(IconButton)({
  padding: '4px'
});

export const OperatorDataContainer = styled('div')({
  border: '1px solid gray',
  padding: '1rem',
  borderRadius: '0.5rem',
  marginTop: '1rem'
});

export const KeyValueGrid = styled(Grid)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  paddingBlock: '0.5rem'
}));

export const KeyValueGridTitle = styled(Typography)({
  fontWeight: 'bold',
  textTransform: 'capitalize'
});

export const KeyValueGridCell = styled(Grid)({
  placeSelf: 'center',
  alignItems: 'center'
});
