import { CardActions as MuiCardActions, type CardActionsProps } from '@mui/material';

export function CardActions(props: CardActionsProps): JSX.Element {
  return <MuiCardActions {...props} />;
}
