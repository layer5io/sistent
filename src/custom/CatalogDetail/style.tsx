import { Link, ListItemButton, Paper, Typography } from '../../base';
import { styled } from '../../theme';
import { Theme } from './types';

export const StyledActionWrapper = styled(Paper)(() => ({
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
  justifyContent: 'center',
  width: '100%',
  margin: '0',
  marginTop: '1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  padding: '0.6rem',
  alignItems: 'center'
}));

interface ActionButtonProps {
  disabled?: boolean;
  theme?: Theme;
}

export const ActionButton = styled('div')<ActionButtonProps>(({ disabled = false, theme }) => ({
  cursor: disabled ? 'not-allowed' : 'pointer',
  opacity: disabled ? '0.5' : '1',
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '0.5rem',
  backgroundColor: theme.palette.background.brand?.default,
  padding: '0.5rem',
  color: theme.palette.text.inverse,
  gap: '0.625rem',
  flex: '1'
}));

export const UnpublishAction = styled('div')<ActionButtonProps>(({ disabled = false, theme }) => ({
  cursor: disabled ? 'not-allowed' : 'pointer',
  opacity: disabled ? '0.5' : '1',
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '0.5rem',
  backgroundColor: 'transparent',
  border: `1px solid ${theme.palette.border.normal}`,
  padding: '0.5rem',
  color: theme.palette.text.default,
  gap: '0.625rem',
  flex: '1'
}));

export const ContentDetailsText = styled(Typography)(({ theme, style }) => ({
  fontFamily: 'inherit',
  fontSize: '1rem',
  color: theme.palette.text.default,
  ['@media (min-width:1200px)']: {
    fontSize: '1'
  },
  ...style
}));

export const ContentHeading = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  marginBottom: '1rem'
}));

export const CaveatsContainer = styled('div')(({ theme }) => ({
  width: '100%',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
  backgroundColor: theme.palette.background.default,
  textAlign: 'left',
  justifyContent: 'start',
  alignItems: 'start',
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'column',
  padding: '1.5rem',
  marginTop: '1.5rem',
  borderRadius: '0.4rem',
  overflowWrap: 'anywhere'
}));

interface LabelDivProps {
  clickable?: boolean;
}

export const LabelDiv = styled('div')<LabelDivProps>(({ theme, clickable }) => ({
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
  padding: '0.5rem 1.5rem',
  width: '100%',
  borderBottom: `1px solid ${theme.palette.border.default}`,
  [' @media (min-width: 600px) and (max-width: 800px)']: {
    padding: '0.5rem'
  },
  ...(clickable && {
    '&:hover': {
      backgroundColor: theme.palette.background.hover
    },
    cursor: 'pointer'
  })
}));

export const SideContainer = styled('div')(({ theme }) => ({
  width: '100%',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
  backgroundColor: theme.palette.background.default,
  justifyContent: 'start',
  alignItems: 'start',
  display: 'flex',
  flexDirection: 'column',
  padding: '0.5rem',
  borderRadius: '0.4rem'
}));

export const SideTitleButton = styled(ListItemButton)(({ theme }) => ({
  backgroundColor: theme.palette.background.surfaces,
  borderRadius: '0.5rem',
  marginTop: 2,
  width: '100%',
  [' @media (min-width: 600px) and (max-width: 800px)']: {
    padding: '0.5rem'
  }
}));

export const ContentDetailsPoints = styled(Typography)(() => ({
  fontSize: '.9rem',
  fontWeight: 'bold',
  lineHeight: '1.5rem',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '1rem',
  fontFamily: 'inherit'
}));

export const MetricsSection = styled('div')(() => ({
  padding: '1.1rem',
  marginTop: '0.5rem',
  display: 'flex',
  borderTop: '0.5px solid #3C494F',
  justifyContent: 'center',
  gap: '1.7rem',
  flexWrap: 'wrap',
  ['@media (max-width:1200px)']: {
    justifyContent: 'flex-start'
  }
}));

export const MetricsContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  [' @media (min-width: 280px) and (max-width: 700px)']: {
    flexBasis: '35%'
  },
  [' @media (max-width: 280px)']: {
    flexBasis: '10%'
  }
}));
export const MetricsType = styled('div')(({ theme }) => ({
  display: 'flex',
  fontSize: '16px',
  fontWeight: '400',
  letterSpacing: '0.15px',
  lineHeight: '1.5',
  textTransform: 'lowercase',
  color: theme.palette.icon.secondary,
  [' @media (max-width: 285px)']: {
    fontSize: '0.86rem'
  }
}));
export const MetricsData = styled('div')(({ theme }) => ({
  color: theme.palette.icon.secondary,
  fontSize: '1.2rem',
  fontWeight: 'bold',
  lineHeight: '1.5'
}));

export const OverviewContainer = styled('div')(({ theme }) => ({
  width: '100%',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
  backgroundColor: theme.palette.background.default,
  textAlign: 'left',
  justifyContent: 'start',
  alignItems: 'start',
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'column',
  padding: '1.5rem',
  borderRadius: '0.4rem'
}));

export const DesignHeading = styled('h1')(({ theme }) => ({
  textAlign: 'left',
  margin: '0rem 0rem 2rem 0rem',
  color: theme.palette.text.default,
  textTransform: 'capitalize',
  fontWeight: '300',
  flex: '1'
}));

export const ContentRow = styled('div')(() => ({
  padding: '0.5rem 0',
  overflowWrap: 'anywhere',
  fontFamily: 'inherit'
}));

export const ShowToggleBtn = styled('span')(({ theme }) => ({
  color: theme.palette.background.brand?.default,
  cursor: 'pointer',
  fontSize: '1rem',
  fontWeight: 'normal',
  marginLeft: '0.25rem'
}));

export const AdditionalContainer = styled('div')(({ theme }) => ({
  width: '100%',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
  backgroundColor: theme.palette.background.default,
  textAlign: 'left',
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'column',
  padding: '1.5rem',
  paddingBottom: '2rem',
  marginTop: '1.5rem',
  borderRadius: '0.4rem'
}));

export const DesignCardContainer = styled('div')(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  flex: '0 0 75%',
  gap: '2rem',
  justifyContent: 'space-around',
  height: 'fit-content'
}));

export const CopyShareIconWrapper = styled(ContentHeading)(() => ({
  justifyContent: 'flex-end',
  gap: '1rem',
  width: 'fit-content'
}));

export const VisibilityChip = styled('div')(() => ({
  borderRadius: '0.5rem',
  border: '1px solid gray',
  padding: '0.2rem 0.5rem',
  textTransform: 'capitalize',
  color: '#1a1a1acc',
  width: 'fit-content'
}));

export const RedirectLink = styled(Link)(({ theme }) => ({
  color: theme.palette.background.brand?.default,
  textDecoration: 'none',
  cursor: 'pointer'
}));
