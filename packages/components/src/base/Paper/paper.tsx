import { Paper as MuiPaper, type PaperProps } from '@mui/material';

export function Paper(props: PaperProps) {
  return <MuiPaper {...props}>{props.children}</MuiPaper>;
}
