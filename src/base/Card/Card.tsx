import { Card as MuiCard, type CardProps as MuiCardProps } from '@mui/material';

export function Card(props: MuiCardProps): JSX.Element {
  return <MuiCard {...props} />;
}

export default Card;
