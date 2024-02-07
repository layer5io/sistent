import { TextFieldProps } from '@mui/material/TextField';
import React from 'react';
import { TextField } from '../../base/TextField';

export type TypingFilterInputProps = {
  variant?: string;
} & TextFieldProps;

export const TypingFilterInput = React.forwardRef(function TypingFilterInput(
  props: TypingFilterInputProps,
  ref: React.ForwardedRef<HTMLDivElement>
): JSX.Element {
  return <TextField ref={ref} {...props} />;
});

export default TypingFilterInput;
