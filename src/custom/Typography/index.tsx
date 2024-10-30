import { PaletteMode } from '@mui/material';
import { styled, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { common } from '../../theme/colors';

export const TextH1Bold = styled(Typography)(({ theme }) => ({
  fontFamily: ['Qanelas Soft Regular'].join(','),
  fontSize: '3rem',
  lineHeight: '3.5rem',
  fontWeight: 700,
  display: 'block',
  [theme.breakpoints.down('sm')]: {
    fontSize: '2.5rem',
    lineHeight: '3rem'
  }
}));

export const TextH2Medium = styled(Typography)(({ theme }) => ({
  fontFamily: ['Qanelas Soft Regular'].join(','),
  fontSize: '2.25rem',
  lineHeight: '2.75rem',
  fontWeight: 500,
  display: 'block',
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
    lineHeight: '2.5rem'
  }
}));

export const TextH3Medium = styled(Typography)(({ theme }) => ({
  fontFamily: ['Qanelas Soft Regular'].join(','),
  fontSize: '1.5rem',
  lineHeight: '2.25rem',
  fontWeight: 500,
  display: 'block',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
    lineHeight: '1.75rem',
    fontWeight: 700
  }
}));

export const TextB1Regular = styled(Typography)<{
  mode?: 'light' | 'dark' | PaletteMode;
}>(({ theme, mode = 'light' }) => ({
  fontFamily: ['"Open Sans"', 'sans-serif'].join(','),
  color: mode === 'light' ? common.black : common.white,
  fontSize: '1rem',
  fontWeight: 400,
  lineHeight: '1.75rem',
  display: 'block',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
    lineHeight: '1.75rem'
  }
}));

export const TextB2SemiBold = styled(Typography)<{
  mode?: 'light' | 'dark' | PaletteMode;
}>(({ theme, mode = 'light' }) => ({
  fontFamily: ['"Open Sans"', 'sans-serif'].join(','),
  color: mode === 'light' ? common.black : common.white,
  fontSize: '1rem',
  fontWeight: 600,
  lineHeight: '1.75rem',
  textTransform: 'capitalize',
  display: 'block',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
    lineHeight: '1.75rem'
  }
}));

export const TextB3Regular = styled(Typography)(() => ({
  fontFamily: ['"Open Sans"', 'sans-serif'].join(','),
  fontSize: '0.875rem',
  fontWeight: 400,
  lineHeight: '1.25rem',
  display: 'block'
}));

export const TextL1Bold = styled(Typography)(() => ({
  fontFamily: ['"Qanelas Soft Regular"'].join(','),
  fontSize: '0.75rem',
  fontWeight: 700,
  lineHeight: '1rem',
  display: 'block'
}));

export const TextL2Regular = styled(Typography)(() => ({
  fontFamily: ['"Open Sans"', 'sans-serif'].join(','),
  fontSize: '0.75rem',
  fontWeight: 400,
  lineHeight: '1.5rem',
  display: 'block'
}));

export const TextC1Regular = styled(Typography)(() => ({
  fontFamily: ['Consolas', 'monospace'].join(','),
  fontSize: '0.75rem',
  fontWeight: 400,
  lineHeight: '1.5rem',
  display: 'block'
}));

export const TextC2Regular = styled(Typography)(() => ({
  fontFamily: ['Consolas', 'monospace'].join(','),
  fontSize: '1rem',
  fontWeight: 400,
  lineHeight: '1.75rem',
  display: 'block'
}));

const commonTypographyStyles = (theme: Theme) => ({
  fontFamily: theme.typography.fontFamily,
  color: theme.palette.text.primary
});

export const CardTitle = styled(TextH3Medium)(({ theme }) => ({
  ...commonTypographyStyles(theme),
  marginLeft: '1rem'
}));

export const CardLowerTitle = styled(TextB2SemiBold)(({ theme }) => ({
  ...commonTypographyStyles(theme),
  marginTop: 'auto',
  marginBottom: 'auto',
  marginLeft: '8%'
}));

export const HeroTextTypography = styled(TextH2Medium)(({ theme }) => ({
  ...commonTypographyStyles(theme),
  margin: '1.5rem'
}));

export const ContentDetailsPoints = styled(TextB3Regular)(({ theme }) => ({
  ...commonTypographyStyles(theme)
}));

export const ContentDetailsText = styled(TextB1Regular)(({ theme }) => ({
  ...commonTypographyStyles(theme),
  ['@media (min-width:1200px)']: {
    fontSize: '1'
  }
}));

export const SectionTitle = styled(TextH2Medium)(({ theme }) => ({
  ...commonTypographyStyles(theme),
  margin: '3rem auto 1rem',
  textTransform: 'uppercase'
}));

export const PrivacyContentDescTitle = styled(TextH3Medium)(({ theme }) => ({
  ...commonTypographyStyles(theme),
  marginTop: '0.8rem',
  marginBottom: '0.8rem'
}));

export const PrivacyPara = styled(TextB1Regular)(({ theme }) => ({
  ...commonTypographyStyles(theme),
  ...(theme.palette.text?.primary && {
    color: theme.palette.text.primary
  })
}));

export const TOSContentDescTitle = styled(TextH3Medium)(({ theme }) => ({
  ...commonTypographyStyles(theme),
  marginTop: '0.8rem',
  marginBottom: '0.8rem'
}));

export const TOSPara = styled(TextB1Regular)(({ theme }) => ({
  ...commonTypographyStyles(theme),
  color: theme.palette.text.secondary
}));

export const UserSignupRequestTitle = styled(TextH2Medium)(({ theme }) => ({
  ...commonTypographyStyles(theme),
  margin: '3rem auto 1rem',
  textTransform: 'uppercase'
}));

export const Caption = styled(TextL2Regular)(({ theme }) => ({
  ...commonTypographyStyles(theme)
}));

export const ProfileTitle = styled(TextH3Medium)(({ theme }) => ({
  ...commonTypographyStyles(theme),
  padding: '2rem 1rem 0 1rem',
  margin: 'auto'
}));

export const ModalTitle = styled(TextH3Medium)(({ theme }) => ({
  ...commonTypographyStyles(theme),
  flexGrow: 1,
  textAlign: 'left'
}));

export const AccordionTitle = styled(TextB2SemiBold)(({ theme }) => ({
  ...commonTypographyStyles(theme),
  display: 'flex',
  alignItems: 'center'
}));

export const CenterContainer = styled(Typography)(({ theme }) => ({
  ...commonTypographyStyles(theme),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}));

export const DesignName = styled(TextB2SemiBold)(({ theme }) => ({
  ...commonTypographyStyles(theme),
  textTransform: 'capitalize',
  marginTop: '4rem',
  padding: '0rem 1.5rem',
  position: 'relative',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  textAlign: 'center',
  '& :after': {
    content: "''",
    textAlign: 'right',
    position: 'absolute',
    bottom: '0',
    right: '0',
    width: '70%',
    background: 'linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 50%)'
  }
}));

export const LogoContainer = styled(Typography)(({ theme }) => ({
  ...commonTypographyStyles(theme),
  cursor: 'pointer'
}));

export const PageTitle = styled(TextH2Medium)(({ theme }) => ({
  ...commonTypographyStyles(theme),
  color: theme.palette.common.white,
  alignSelf: 'center',
  minWidth: '4rem',
  ['@media (max-width: 700px)']: {
    padding: '0.625rem 0',
    fontSize: '1.875rem'
  }
}));

export const ListHeading = styled(TextB1Regular)(({ theme }) => ({
  ...commonTypographyStyles(theme),
  paddingBottom: '15px',
  color: theme.palette.text.secondary,
  textAlign: 'center',
  letterSpacing: '0.15px'
}));

export const TokensTitle = styled(TextH3Medium)(({ theme }) => ({
  ...commonTypographyStyles(theme),
  padding: '2rem 1rem'
}));

export const SupportTitle = styled(TextH1Bold)(({ theme }) => ({
  ...commonTypographyStyles(theme),
  textAlign: 'center'
}));

export const Statistic = styled(TextH3Medium)(({ theme }) => ({
  ...commonTypographyStyles(theme),
  display: 'flex',
  justifyContent: 'center',
  paddingX: '5px',
  textAlign: 'center'
}));

export const StatisticName = styled(TextB1Regular)(({ theme }) => ({
  ...commonTypographyStyles(theme),
  display: 'flex',
  justifyContent: 'center',
  paddingX: '5px',
  textAlign: 'center'
}));

export const OrganizationName = styled(TextB3Regular)(({ theme }) => ({
  ...commonTypographyStyles(theme),
  display: 'flex',
  alignItems: 'end',
  padding: '0 5px',
  '&:hover': {
    cursor: 'default'
  }
}));

export const DateLabel = styled(TextL2Regular)(({ theme }) => ({
  ...commonTypographyStyles(theme),
  fontStyle: 'italic',
  '&:hover': {
    cursor: 'default'
  }
}));

export const EmptyDescription = styled(TextB3Regular)(({ theme }) => ({
  ...commonTypographyStyles(theme),
  textAlign: 'left',
  fontStyle: 'italic',
  color: theme.palette.text.disabled
}));
