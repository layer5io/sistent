import { ReactNode } from 'react';
import { Box, Button, Card, CardActions, CardContent, Typography } from '../../../base';
import { styled, useTheme } from '../../../theme';
import { PrecentageLabel, SliderDiv } from '../styles';

interface ActionButtonCardProps {
  title: string;
  description: ReactNode;
  icon: ReactNode;
  customComponent?: ReactNode;
  href?: string;
  target?: string;
  onClick?: () => void;
  btnTitle: string;
  disabled?: boolean;
  showProgress?: boolean;
  actionButton?: boolean;
  maxDescriptionWidth?: string;
  completedSteps?: string[];
  totalSteps: number;
  playgroundCardBackgroundImgSrc?: string;
}

const BoxContainer = styled(Card)<{ playgroundCardBackgroundImgSrc?: string }>(
  ({ theme, playgroundCardBackgroundImgSrc }) => ({
    backgroundImage: playgroundCardBackgroundImgSrc
      ? `url(${playgroundCardBackgroundImgSrc})`
      : 'none',
    backgroundPosition: 'right bottom',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minWidth: 285,
    height: '100%',
    position: 'relative',
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.background.card : theme.palette.common.white
  })
);

const StyledCard = styled(Card)(({ theme }) => ({
  minWidth: 275,
  height: '100%',
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.background.card : theme.palette.common.white
}));

const IconTitleWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem'
});

const ContentWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column'
});

const DescriptionTypography = styled(Typography)<{ maxWidth?: string }>(({ theme, maxWidth }) => ({
  marginLeft: theme.spacing(1),
  marginBottom: theme.spacing(1),
  minHeight: '4.5rem',
  [theme.breakpoints.between('sm', 'lg')]: {
    maxWidth: maxWidth || '100%'
  }
}));

const StandardDescriptionTypography = styled(Typography)({
  marginLeft: 8,
  marginBottom: 8,
  minHeight: '3rem'
});

const ProgressWrapper = styled(Typography)({
  marginLeft: 8,
  marginBottom: 8
});

const CustomComponentWrapper = styled(Box)({
  display: 'flex',
  marginLeft: 8
});

const ActionButtonCard = ({
  title,
  description,
  icon,
  customComponent,
  href,
  onClick,
  btnTitle,
  disabled = false,
  showProgress = false,
  actionButton = true,
  maxDescriptionWidth = '100%',
  completedSteps,
  totalSteps,
  playgroundCardBackgroundImgSrc
}: ActionButtonCardProps) => {
  const completed = completedSteps ? completedSteps.length : 0;
  const theme = useTheme();

  const completedPercentage = (): number => {
    return Math.round((100 / totalSteps) * completed);
  };

  const percentage = completedPercentage();

  if (title === 'CLOUD NATIVE PLAYGROUND') {
    return (
      <BoxContainer playgroundCardBackgroundImgSrc={playgroundCardBackgroundImgSrc}>
        <CardContent
          style={{
            zIndex: 2,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}
        >
          <IconTitleWrapper>
            {icon}
            <Typography variant="h6" fontWeight="700">
              {title}
            </Typography>
          </IconTitleWrapper>
          <ContentWrapper>
            <DescriptionTypography maxWidth={maxDescriptionWidth}>
              {description}
            </DescriptionTypography>
            {showProgress && (
              <ProgressWrapper>
                <SliderDiv
                  value={percentage}
                  size="small"
                  aria-label="Default"
                  valueLabelDisplay="auto"
                />
                <PrecentageLabel size="small" completedPercentage={percentage} theme={theme}>
                  {`${percentage}%`}
                </PrecentageLabel>
              </ProgressWrapper>
            )}
            <CustomComponentWrapper>{customComponent}</CustomComponentWrapper>
            {actionButton && (
              <CardActions>
                <Button disabled={disabled} variant="contained" href={href} onClick={onClick}>
                  {btnTitle}
                </Button>
              </CardActions>
            )}
          </ContentWrapper>
        </CardContent>
      </BoxContainer>
    );
  }

  return (
    <StyledCard>
      <CardContent
        style={{
          zIndex: 2,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}
      >
        <IconTitleWrapper>
          {icon}
          <Typography variant="h6" fontWeight="700" component="div" sx={{ mx: 1 }}>
            {typeof title === 'string' ? title?.toUpperCase() : title}
          </Typography>
        </IconTitleWrapper>
        <ContentWrapper>
          <StandardDescriptionTypography>{description}</StandardDescriptionTypography>
          {showProgress && (
            <ProgressWrapper>
              <SliderDiv
                value={percentage}
                size="small"
                aria-label="Default"
                valueLabelDisplay="auto"
              />
              <PrecentageLabel size="small" completedPercentage={percentage} theme={theme}>
                {`${percentage}%`}
              </PrecentageLabel>
            </ProgressWrapper>
          )}
          <CustomComponentWrapper>{customComponent}</CustomComponentWrapper>
          {actionButton && (
            <CardActions>
              <Button disabled={disabled} variant="contained" href={href} onClick={onClick}>
                {showProgress ? (percentage === 100 ? 'Revisit' : btnTitle) : btnTitle}
              </Button>
            </CardActions>
          )}
        </ContentWrapper>
      </CardContent>
    </StyledCard>
  );
};

export default ActionButtonCard;
