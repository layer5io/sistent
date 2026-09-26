import MuiFormHelperText, {
  FormHelperTextProps as MuiFormHelperTextProps,
  FormHelperTextTypeMap
} from '@mui/material/FormHelperText';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import React from 'react';

export type SistentFormHelperTextProps<
  D extends React.ElementType = FormHelperTextTypeMap['defaultComponent'],
  P = {}
> = MuiFormHelperTextProps<D, P>;

export const FormHelperText: OverridableComponent<FormHelperTextTypeMap> = React.forwardRef(
  ({ children, ...props }: SistentFormHelperTextProps, ref: React.Ref<Element>) => {
    return (
      <MuiFormHelperText ref={ref as any} {...props}>
        {children}
      </MuiFormHelperText>
    );
  }
) as OverridableComponent<FormHelperTextTypeMap>;

FormHelperText.displayName = 'FormHelperText';

export default FormHelperText;
