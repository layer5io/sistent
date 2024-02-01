import {
  CardActions as MuiCardActions,
  CardActionsProps as MuiCardActionsProps
} from '@mui/material';

export function CardActions(props: MuiCardActionsProps): JSX.Element {
  return <MuiCardActions {...props} />;
}

export default CardActions;
