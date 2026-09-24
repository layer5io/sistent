import { TextFieldProps } from '@mui/material/TextField';
import React from 'react';
import { TextField } from '../../base/TextField';

export type TypingFilterInputProps = {
  variant?: string;
} & TextFieldProps;

export const TypingFilterInput = React.forwardRef<HTMLInputElement, TypingFilterInputProps>(
  function TypingFilterInput(props, ref): JSX.Element {
    return <TextField inputRef={ref} {...props} />;
  }
);

export default TypingFilterInput;
