import {
  Typography as MuiTypography,
  type TypographyProps as MuiTypographyProps
} from '@mui/material';

export function Typography(props: MuiTypographyProps): JSX.Element {
  return <MuiTypography {...props} />;
}

export default Typography;
