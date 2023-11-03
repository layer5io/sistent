import { Card as MuiCard, type CardProps } from '@mui/material';

export function Card(props: CardProps): JSX.Element {
  return <MuiCard {...props} />;
}
