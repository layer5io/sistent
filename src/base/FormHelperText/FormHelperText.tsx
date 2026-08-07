import MuiFormHelperText, {
  FormHelperTextProps as MuiFormHelperTextProps
} from '@mui/material/FormHelperText';
import React from 'react';

export interface SistentFormHelperTextProps extends MuiFormHelperTextProps {
  // Custom props for future extension of the Sistent wrapper
}

export const FormHelperText = React.forwardRef<HTMLParagraphElement, SistentFormHelperTextProps>(
  ({ children, ...props }, ref) => {
    return (
      <MuiFormHelperText ref={ref} {...props}>
        {children}
      </MuiFormHelperText>
    );
  }
);
FormHelperText.displayName = 'FormHelperText';

export default FormHelperText;
