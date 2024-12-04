import { styled, Typography } from '@mui/material';
import { accentGrey, DARK_PRIMARY_COLOR, GRAY97, slateGray, WHITESMOKE } from '../../theme';
import { charcoal, DARK_TEAL, SNOW_WHITE } from '../../theme/colors/colors';

type DesignCardProps = {
  outerStyles: React.CSSProperties;
  shouldFlip?: boolean;
  isDetailed?: boolean;
};
type DesignCardDivProps = {
  shouldFlip?: boolean;
  isDetailed?: boolean;
};
type MetricsProps = {
  isDetailed?: boolean;
};
type CatalogProps = {
  isCatalog?: boolean;
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

export const TechnologyText = styled('div')(() => ({
  color: '#eee',
  fontSize: '0.875rem',
  lineHeight: '1.5',
  fontWeight: '600',
  borderBottom: '1px solid rgba(231, 239, 243, 0.40)'
}));

export const NoTechnologyText = styled('div')(() => ({
  color: '#eee',
  overflow: 'hidden',
  fontSize: '14px',
  lineHeight: '24px',
  fontWeight: '400',
  marginTop: '.8rem'
}));

export const StyledInnerClassWrapper = styled('div')<StyledInnerClassWrapperProps>(({
  catalogClassName,
  theme
}) => {
  const mapToColor: Record<string, string> = {
    community: slateGray.main,
    official: theme.palette.background.cta?.default || '#EBC017',
    verified: theme.palette.background.brand?.default || '#00B39F'
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
    color: catalogClassName === 'official' ? theme.palette.common.black : theme.palette.common.white
  };
});

export const DesignCard = styled('div')<DesignCardProps>(
  ({ shouldFlip, isDetailed, outerStyles, theme }) => ({
    position: 'relative',
    borderRadius: '1rem',
    textAlign: 'center',
    transformStyle: 'preserve-3d',
    display: 'block',
    perspective: '1000px',
    transition: 'all .9s ease-out',
    ...(shouldFlip && {
      '&:hover': {
        cursor: 'pointer',
        '& .innerCard': {
          transform: 'rotateY(180deg)'
        }
      }
    }),
    ...(isDetailed && {
      [theme.breakpoints.down('lg')]: {
        height: '18.75rem'
      }
    }),
    ...outerStyles
  })
);

export const DesignInnerCard = styled('div')<DesignCardDivProps>(({ shouldFlip, isDetailed }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  textAlign: 'center',
  transition: 'transform 0.6s',
  ...(shouldFlip && {
    transformOrigin: '50% 50%',
    transformStyle: 'preserve-3d'
  }),
  ...(isDetailed && {
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    borderRadius: '0.9375rem'
  })
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
  color: theme.palette.background.constant?.white,
  borderRadius: '0 1rem 0 2rem'
}));
export const MetricsCount = styled('p')(({ theme }) => ({
  fontSize: '1rem',
  textTransform: 'capitalize',
  margin: '0rem',
  lineHeight: '1.5',
  textAlign: 'center',
  color: theme.palette.mode === 'light' ? DARK_TEAL : SNOW_WHITE,
  fontWeight: '600'
}));
export const DesignName = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  textTransform: 'capitalize',
  color: theme.palette.text.default,
  fontSize: '1.125rem',
  marginTop: '2rem',
  padding: '0rem 1rem',
  position: 'relative',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  textAlign: 'center',
  width: '100%',
  margin: '3rem 0 1.59rem 0',
  fontFamily: 'inherit'
}));

export const MetricsContainerFront = styled('div')<MetricsProps>(({ isDetailed, theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  fontSize: '0.2rem',
  color: theme.palette.mode === 'light' ? 'rgba(26, 26, 26, .8)' : theme.palette.text.default,
  padding: '0.9rem 0.1rem',
  background: theme.palette.mode === 'light' ? '#E7EFF3' : DARK_TEAL,
  ...(isDetailed && {
    position: 'absolute',
    bottom: '0px'
  }),
  ...(!isDetailed && {
    marginTop: '1.2rem'
  }),
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
  background: theme.palette.background.surfaces,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.5rem',
  width: '100%',
  borderRadius: '0.5rem'
}));

export const VersionTag = styled('div')(({ theme }) => ({
  display: 'inline-block',
  backgroundColor: theme.palette.background.supplementary,
  color: theme.palette.text.constant?.white,
  borderRadius: '4px',
  fontSize: '0.75rem',
  fontWeight: 'bold',
  margin: '5px 0',
  padding: '2px 5px',
  maxWidth: 'fit-content'
}));

export const VersionDiv = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: '0.75',
  color: theme.palette.text.constant?.white,
  position: 'absolute',
  bottom: '16px',
  left: '16px',
  borderRadius: '4px',
  background: theme.palette.background.supplementary,
  justifyContent: 'center'
}));

export const VersionText = styled('p')(({ theme }) => ({
  fontSize: '0.75rem',
  margin: '0',
  padding: '0.25rem .5rem',
  lineHeight: '1.5',
  textTransform: 'lowercase',
  fontWeight: '600',
  borderRadius: '4.05px',
  color: theme.palette.text.constant?.white
}));

export const FlipCard = styled('div')(() => ({
  perspective: '1000px',
  '&:hover .flipper': {
    transform: 'rotateY(-180deg)'
  }
}));

export const Flipper = styled('div')(() => ({
  transition: '0.6s',
  transformStyle: 'preserve-3d',
  position: 'relative'
}));

export const Face = styled('div')(() => ({
  backfaceVisibility: 'hidden',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%'
}));

export const FrontFace = styled(Face)(() => ({
  zIndex: 2,
  transform: 'rotateY(0deg)'
}));

export const BackFace = styled('div')(() => ({
  transform: 'rotateY(-180deg)',
  color: '#fff',
  display: 'inline-flex',
  flexDirection: 'column',
  padding: '16px',
  height: '100%',
  width: '100%',
  position: 'relative',
  bottom: 0,
  left: 0,
  backfaceVisibility: 'hidden'
}));

export const BackFaceContent = styled('div')(({ theme }) => ({
  position: 'absolute',
  background: `linear-gradient(to bottom right, black 40%, ${theme.palette.background.brand?.default})`,
  width: '100%',
  top: 0,
  left: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'left',
  padding: '16px',
  boxShadow: `2px 2px 3px 0px black`,
  borderRadius: '1rem'
}));

export const ProfileSection = styled('div')({
  height: 'max-content',
  display: 'flex',
  marginTop: '1.2rem',
  flexDirection: 'row',
  padding: '0rem 1rem',
  justifyContent: 'flex-start',
  alignItems: 'center',
  ['@media (max-width:1200px)']: {
    height: 'max-content'
  }
});

export const TechnologiesSection = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '100%',
  gap: '1rem',
  alignItems: 'flex-start',
  background: 'rgba(231, 239, 243, 0.40)',
  borderRadius: '0.25rem',
  padding: '0.5rem 1rem',
  alignSelf: 'stretch'
}));

export const UpdatedSection = styled('div')({
  display: 'flex',
  alignItems: 'center',
  color: '#fff',
  margin: '20px 0'
});

export const CardBack = styled('div')<CatalogProps>(({ isCatalog }) => ({
  boxShadow: `2px 2px 3px 0px rgba(26, 26, 26, 1)`,
  position: 'absolute',
  width: '100%',
  height: '100%',
  WebkitBackfaceVisibility: 'hidden',
  borderRadius: '0.9375rem',
  backfaceVisibility: 'hidden',
  color: 'white',
  transform: 'rotateY(180deg)',
  ...(isCatalog && {
    background:
      'linear-gradient(335deg, rgba(0, 179, 159, 0.80) -13.6%, rgba(0, 0, 0, 0.68) 66.8%), radial-gradient(3970.04% 147.22% at 47.5% 100%, #000 0%, #395357 100%)'
  }),
  ...(!isCatalog && {
    background: 'linear-gradient(250deg, #477e96 0%, #00b39f 35%, rgb(60, 73, 79) 100%)'
  })
}));

export const getCatalogCardBackground = (isLightMode: boolean) => {
  const lightGradient = `linear-gradient(to left bottom, ${WHITESMOKE}, ${GRAY97},white, white, white, white, white, white, white, white, ${WHITESMOKE}, ${GRAY97})`;
  const darkGradient = `linear-gradient(to right top, ${DARK_PRIMARY_COLOR}, ${accentGrey[30]}, ${accentGrey[20]}, ${accentGrey[10]}, ${accentGrey[10]}, ${accentGrey[10]}, ${accentGrey[10]}, ${accentGrey[10]}, ${accentGrey[10]}, ${charcoal[20]}, ${charcoal[10]}, black)`;

  return isLightMode ? lightGradient : darkGradient;
};

export const CardFront = styled('div')<DesignCardDivProps>(({ shouldFlip, isDetailed, theme }) => {
  const isLightMode = theme.palette.mode === 'light';
  const background = getCatalogCardBackground(isLightMode);
  const boxShadow = `2px 2px 3px 0px ${theme.palette.background.brand?.default}`;

  return {
    ...(shouldFlip && {
      position: 'absolute',
      boxShadow,
      background
    }),
    ...(isDetailed && {
      boxShadow,
      background
    }),
    width: '100%',
    height: '100%',
    WebkitBackfaceVisibility: 'hidden',
    borderRadius: '0.9375rem',
    backfaceVisibility: 'hidden'
  };
});

export const DateText = styled('div')(() => ({
  fontSize: '0.875rem',
  textTransform: 'capitalize',
  color: '#eee',
  margin: '0rem',
  padding: '0.1rem',
  fontWeight: '400',
  lineHeight: '1.5'
}));

export const DateType = styled('p')(() => ({
  fontSize: '0.876rem',
  margin: '0rem',
  lineHeight: '1.5',
  fontWeight: '400',
  color: '#eee'
}));

export const DesignAuthorName = styled('div')(() => ({
  height: 'max-content',
  display: 'flex',
  margin: '0',
  flexDirection: 'column',
  padding: '0rem 1rem',
  justifyContent: 'start',
  alignItems: 'start',
  fontWeight: '400',
  textAlign: 'right',
  color: '#E7EFF3',
  textTransform: 'capitalize',
  ['@media (max-width:1200px)']: {
    height: 'max-content'
  }
}));

export const CatalogEmptyStateDiv = styled('div')(({ theme }) => {
  const isLightMode = theme.palette.mode === 'light';
  const background = getCatalogCardBackground(isLightMode);
  const boxShadow = `2px 2px 3px 0px ${theme.palette.background.brand?.default}`;

  return {
    background: background,
    boxShadow: boxShadow,
    textAlign: 'center',
    borderRadius: '1rem',
    width: '15rem',
    height: '18rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('lg')]: {
      height: '18.75rem'
    }
  };
});
