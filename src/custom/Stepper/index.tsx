import { Box, Stack, Step, StepConnector, StepLabel, Stepper } from '@mui/material';
import { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import { styled } from '@mui/system';
import React, { useMemo, useState } from 'react';
import { IconProps } from '../../icons/types';
import { useTheme } from '../../theme';

interface ColorlibStepIconPropsI extends StepIconProps {
  icons: React.ComponentType<IconProps>[];
}

interface StepI {
  label: string;
  component: React.ComponentType;
  icon: React.ComponentType<IconProps>;
}

interface UseStepperOptionsI {
  steps: StepI[];
}

interface CustomizedStepperPropsI {
  activeStep: number;
  stepLabels: string[];
  children: React.ReactNode;
  icons: React.ComponentType<IconProps>[];
  ContentWrapper?: React.ComponentType<{ children: React.ReactNode }>;
}

interface UseStepperI {
  steps: StepI[];
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  handleNext: () => void;
  goBack: () => void;
  goToStep: (step: number) => void;
  canGoBack: boolean;
  canGoForward: boolean;
  stepLabels: string[];
  icons: React.ComponentType<IconProps>[];
  activeStepComponent: React.ComponentType;
}

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: theme.palette.background.brand?.default,
      transition: 'all 1s ease-in'
    }
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: theme.palette.background.brand?.default,
      transition: 'all 1s ease-in'
    }
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    background: theme.palette.background.tertiary,
    borderRadius: 1,
    transition: 'all 0.5s ease-out '
  }
}));

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  background: theme.palette.background.tertiary,
  zIndex: 1,
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    border: `.2rem solid ${theme.palette.background.brand?.default}`,
    transition: 'all 0.5s ease-in'
  }),
  ...(ownerState.completed && {
    background: theme.palette.background.secondary,
    border: `.2rem solid ${theme.palette.background.brand?.default}`,
    transition: 'all 0.5s ease-in'
  })
}));

const StepContentWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2)
}));

const StyledStepLabel = styled(StepLabel)(({ theme }) => ({
  '& .MuiStepLabel-labelContainer': {
    color: theme.palette.text.tertiary
  }
}));

function ColorlibStepIcon(props: ColorlibStepIconPropsI) {
  const { active, completed, className, icons } = props;

  const Icon = icons[Number(props.icon) - 1];
  const theme = useTheme();
  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {Icon ? <Icon fill={theme.palette.icon.secondary} /> : null}
    </ColorlibStepIconRoot>
  );
}

const CustomizedStepper: React.FC<CustomizedStepperPropsI> = ({
  stepLabels,
  activeStep,
  children,
  icons,
  ContentWrapper = StepContentWrapper
}) => {
  const theme = useTheme();

  return (
    <Stack>
      <Stack
        direction="row"
        justifyContent="center"
        style={{ paddingBlock: '1rem', backgroundColor: theme.palette.background.blur?.heavy }}
      >
        <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
          {stepLabels.map((label) => (
            <Step key={label}>
              <StyledStepLabel
                StepIconComponent={(props) => <ColorlibStepIcon {...props} icons={icons} />}
              >
                {label}
              </StyledStepLabel>
            </Step>
          ))}
        </Stepper>
      </Stack>
      <ContentWrapper>{children}</ContentWrapper>
    </Stack>
  );
};

export const useStepper = ({ steps }: UseStepperOptionsI): UseStepperI => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const goBack = () => {
    if (activeStep === 0) {
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const goToStep = (step: number) => {
    if (step < 0 || step > steps.length - 1) {
      throw new Error('Invalid step');
    }

    setActiveStep(step);
  };

  const canGoBack = activeStep > 0;
  const canGoForward = activeStep < steps.length - 1;

  const icons = useMemo(() => steps.map((step) => step.icon), [steps]);
  const stepLabels = useMemo(() => steps.map((step) => step.label), [steps]);

  const activeStepComponent = steps[activeStep].component;

  return {
    activeStep,
    setActiveStep,
    handleNext,
    goBack,
    goToStep,
    steps,
    canGoBack,
    stepLabels,
    icons,
    canGoForward,
    activeStepComponent
  };
};

export { ColorlibConnector, CustomizedStepper };
