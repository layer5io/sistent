import { CardHeader as MuiCardHeader, CardHeaderProps as MuiCardHeaderProps } from '@mui/material';

export function CardHeader(props: MuiCardHeaderProps): JSX.Element {
  return <MuiCardHeader {...props} />;
}

export default CardHeader;
