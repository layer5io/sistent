import { TextField } from '../../base/TextField';
import { styled } from '@mui/material/styles';
import type { TextFieldProps } from '../../base/TextField';

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.background.paper,
    '& fieldset': {
      borderColor: 'theme.palette.background.brand.default',
      borderWidth: 1,
    },
    '&:hover fieldset': {
      borderColor: 'theme.palette.background.brand.default',
      borderWidth: 2,
    },
    '&.Mui-focused fieldset': {
      borderColor: 'theme.palette.background.brand.default',
      borderWidth: 2,
      borderLeftWidth: 4,
      padding: '4px',
    },
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.text.secondary,
    '&.Mui-focused': {
      color: 'theme.palette.background.brand.default',
    },
  },
  '& .MuiInputLabel-asterisk': {
    display: 'none',
  },
  '& .MuiInputBase-input': {
    color: theme.palette.common.black,
  },
}));

interface CustomTextFieldProps extends Omit<TextFieldProps, 'variant' | 'size'> {
  minWidth?: number;
  variant?: 'outlined' | 'filled' | 'standard';
  size?: 'small' | 'medium';
}

export const CustomTextField = ({
  minWidth = 150,
  variant = 'outlined',
  size = 'small',
  ...props
}: CustomTextFieldProps): JSX.Element => {
  return (
    <StyledTextField
      variant={variant}
      size={size}
      sx={{ minWidth }}
      {...props}
    />
  );
};