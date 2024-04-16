import { Box, IconProps, Stack, Step, StepConnector, StepLabel, Stepper } from '@mui/material';
import { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import { styled } from '@mui/system';
import React, { useMemo, useState } from 'react';

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
  stepLabels,
  activeStep,
  children,
  icons
}) => {
  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="center">
        <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
          {stepLabels.map((label) => (
            <Step key={label}>
              <StepLabel
                StepIconComponent={(props) => <ColorlibStepIcon {...props} icons={icons} />}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Stack>
      <StepContentWrapper>{children}</StepContentWrapper>
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
