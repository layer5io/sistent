import MuiFormHelperText, {
  FormHelperTextProps as MuiFormHelperTextProps,
  FormHelperTextTypeMap
} from '@mui/material/FormHelperText';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import React from 'react';

export type SistentFormHelperTextProps<
  D extends React.ElementType = FormHelperTextTypeMap['defaultComponent'],
  P extends object = object
> = MuiFormHelperTextProps<D, P>;

type FormHelperTextComponent = OverridableComponent<FormHelperTextTypeMap> & {
  displayName?: string;
};

export const FormHelperText: FormHelperTextComponent = React.forwardRef(
  ({ children, ...props }: SistentFormHelperTextProps, ref: React.Ref<any>) => {
    return (
      <MuiFormHelperText ref={ref} {...props}>
        {children}
      </MuiFormHelperText>
    );
  }
) as FormHelperTextComponent;

FormHelperText.displayName = 'FormHelperText';

export default FormHelperText;
