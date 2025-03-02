import {
  Step as MuiStep,
  StepButton as MuiStepButton,
  StepButtonProps as MuiStepButtonProps,
  StepConnector as MuiStepConnector,
  StepConnectorProps as MuiStepConnectorProps,
  StepContent as MuiStepContent,
  StepContentProps as MuiStepContentProps,
  StepIcon as MuiStepIcon,
  StepIconProps as MuiStepIconProps,
  StepLabel as MuiStepLabel,
  StepLabelProps as MuiStepLabelProps,
  StepProps as MuiStepProps,
  Stepper as MuiStepper,
  StepperProps as MuiStepperProps
} from '@mui/material';
import React from 'react';

export const Step = React.forwardRef<HTMLDivElement, MuiStepProps>((props, ref) => {
  return <MuiStep {...props} ref={ref} />;
});

export const Stepper = React.forwardRef<HTMLDivElement, MuiStepperProps>((props, ref) => {
  return <MuiStepper {...props} ref={ref} />;
});

export const StepLabel = React.forwardRef<HTMLSpanElement, MuiStepLabelProps>((props, ref) => {
  return <MuiStepLabel {...props} ref={ref} />;
});

export const StepConnector = React.forwardRef<HTMLDivElement, MuiStepConnectorProps>(
  (props, ref) => {
    return <MuiStepConnector {...props} ref={ref} />;
  }
);

export const StepButton = React.forwardRef<HTMLButtonElement, MuiStepButtonProps>((props, ref) => {
  return <MuiStepButton {...props} ref={ref} />;
});

export const StepContent = React.forwardRef<HTMLDivElement, MuiStepContentProps>((props, ref) => {
  return <MuiStepContent {...props} ref={ref} />;
});

export const StepIcon = React.forwardRef<SVGSVGElement, MuiStepIconProps>((props, ref) => {
  return <MuiStepIcon {...props} ref={ref} />;
});
