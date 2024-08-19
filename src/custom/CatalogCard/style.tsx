import { styled, Typography } from '@mui/material';

type DesignCardProps = {
  outerStyles: React.CSSProperties;
};
type StyledInnerClassWrapperProps = {
  catalogClassName: string;
};
export const StyledClassWrapper = styled('div')(() => ({
  width: '85px',
  height: '88px',
  overflow: 'hidden',
  position: 'absolute',
  top: '-3px',
  left: '-3px'
}));

export const StyledInnerClassWrapper = styled('div')<StyledInnerClassWrapperProps>(({
  catalogClassName
}) => {
  const mapToColor: Record<string, string> = {
    community: 'rgba(122,132,142,.8)',
    official: '#EBC017',
    verified: '#00B39F'
  };
  return {
    font: 'bold 10px sans-serif',
    WebkitTransform: 'rotate(-45deg)',
    textAlign: 'center',
    transform: 'rotate(-45deg)',
    position: 'relative',
    padding: '4px 0',
    top: '15px',
    left: '-30px',
    width: '120px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: mapToColor[catalogClassName],
    color: '#fff'
  };
});

export const DesignCard = styled('div')<DesignCardProps>(({ outerStyles }) => ({
  position: 'relative',
  borderRadius: '1rem',
  textAlign: 'center',
  transformStyle: 'preserve-3d',
  transition: 'all .9s ease-out',
  marginBottom: '1.25rem',
  display: 'inline-flex',
  perspective: '1000px',
  '&:hover': {
    cursor: 'pointer',
    transform: 'translateY(-2%)'
  },
  ['@media (max-width:1200px)']: {
    height: '18.75rem'
  },
  ...outerStyles
}));
export const DesignInnerCard = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  textAlign: 'center',
  transition: 'transform 0.6s',
  background: theme.palette.background.default,
  boxShadow: `2px 2px 3px 0px ${theme.palette.background.brand?.default}`,
  borderRadius: '0.9375rem'
}));
export const DesignType = styled('span')(({ theme }) => ({
  position: 'absolute',
  top: '0',
  right: '0',
  minWidth: '3rem',
  padding: '0 0.75rem',
  fontSize: '0.875rem',
  textTransform: 'capitalize',
  background: theme.palette.background.brand?.default,
  color: theme.palette.text.inverse,
  borderRadius: '0 1rem 0 2rem'
}));
export const MetricsCount = styled('p')(({ theme }) => ({
  fontSize: '1rem',
  textTransform: 'capitalize',
  margin: '0rem',
  lineHeight: '1.5',
  textAlign: 'center',
  color: theme.palette.text.secondary,
  fontWeight: '600'
}));
export const DesignName = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  textTransform: 'capitalize',
  color: theme.palette.text.default,
  fontSize: '1.125rem',
  marginTop: '2rem',
  padding: '0rem 1rem', // "0rem 1.5rem"
  position: 'relative',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  textAlign: 'center',
  width: '100%'
}));
export const MetricsContainerFront = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  // borderTop: "0.851px solid #C9DBE3",
  fontSize: '0.2rem',
  color: theme.palette.text.secondary,
  // margin: "-0.8rem 0.7rem 0",
  padding: '0.9rem 0.1rem',
  background: theme.palette.background.secondary,
  position: 'absolute',
  bottom: '0px',
  marginTop: '1.2rem',
  borderRadius: '0 0 0.9375rem 0.9375rem',
  width: '100%'
}));
export const MetricsDiv = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: '0.2rem',
  color: 'rgba(26, 26, 26, .8)',
  margin: '0rem',
  padding: '0.1rem'
}));
export const DesignDetailsDiv = styled('div')(() => ({
  height: 'max-content',
  display: 'flex',
  marginTop: '-1rem',
  flexDirection: 'column',
  padding: '0rem 1rem',
  justifyContent: 'start',
  alignItems: 'start',
  ['@media (max-width:1200px)']: {
    height: 'max-content'
  }
}));

export const ImageWrapper = styled('div')(({ theme }) => ({
  background: theme.palette.mode === 'light' ? 'rgba(231, 239, 243, 0.40)' : '#212121',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.5rem',
  width: '100%',
  borderRadius: '0.5rem'
}));
