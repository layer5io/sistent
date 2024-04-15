import { Box, IconProps, Stack, Step, StepConnector, StepLabel, Stepper } from '@mui/material';
import { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import { styled } from '@mui/system';
import React, { useState } from 'react';

interface ColorlibStepIconPropsI extends StepIconProps {
  icons: React.ComponentType<IconProps>[];
}

interface StepI {
  label: string;
  component: React.ComponentType<CustomizedStepperPropsI>;
  icon: React.ComponentType<IconProps>;
}

interface UseStepperOptionsI {
  steps: StepI[];
}

// type SharedData = unknown;

interface CustomizedStepperPropsI {
  steps: StepI[];
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  handleNext: () => void;
  goBack: () => void;
  goToStep: (step: number) => void;
  canGoBack: boolean;
  canGoForward: boolean;
  // sharedData: SharedData;
  // setSharedData: React.Dispatch<React.SetStateAction<null>>;
}

const ColorlibConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: '#00B39F',
      transition: 'all 1s ease-in'
    }
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: '#00B39F',
      transition: 'all 1s ease-in'
    }
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    background: '#00B39F',
    borderRadius: 1,
    transition: 'all 0.5s ease-out '
  }
}));

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    background: theme.palette.background.default,
    color: '#3C494E',
    border: '.2rem solid #00B39F',
    transition: 'all 0.5s ease-in'
  }),
  ...(ownerState.completed && {
    border: '.2rem solid #00B39F',
    background: '#00B39F',
    transition: 'all 0.5s ease-in'
  })
}));

const StepContentWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(2)
}));

function ColorlibStepIcon(props: ColorlibStepIconPropsI) {
  const { active, completed, className, icons } = props;

  const Icon = icons[Number(props.icon) - 1];
  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {Icon ? <Icon /> : null}
    </ColorlibStepIconRoot>
  );
}

const CustomizedStepper: React.FC<CustomizedStepperPropsI> = ({
  steps,
  activeStep,
  ...otherProps
}) => {
  const icons = steps.map((step) => step.icon);
  const ActiveComponent = steps[activeStep].component;

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="center">
        <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
          {steps.map((step) => (
            <Step key={step.label}>
              <StepLabel
                StepIconComponent={(props) => <ColorlibStepIcon {...props} icons={icons} />}
              >
                {step.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Stack>
      <StepContentWrapper>
        <ActiveComponent activeStep={activeStep} {...otherProps} steps={steps} />
      </StepContentWrapper>
    </Stack>
  );
};

export const useStepper = ({ steps }: UseStepperOptionsI): CustomizedStepperPropsI => {
  const [activeStep, setActiveStep] = useState(0);
  // const [sharedData, setSharedData] = useState({});

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

  return {
    activeStep,
    setActiveStep,
    // sharedData,
    // setSharedData,
    handleNext,
    goBack,
    goToStep,
    steps,
    canGoBack,
    canGoForward
  };
};

export { ColorlibConnector, CustomizedStepper };
