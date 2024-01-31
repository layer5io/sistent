import {
  CardContent as MuiCardContent,
  CardContentProps as MuiCardContentProps
} from '@mui/material';

export function CardContent(props: MuiCardContentProps): JSX.Element {
  return <MuiCardContent {...props} />;
}

export default CardContent;
