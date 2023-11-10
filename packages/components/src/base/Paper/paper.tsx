import { Paper as MuiPaper, type PaperProps } from '@mui/material';

export function Paper(props: PaperProps): JSX.Element {
  return <MuiPaper {...props}>{props.children}</MuiPaper>;
}
