import { Paper as MuiPaper, type PaperProps as MuiPaperProps } from '@mui/material';

export function Paper(props: MuiPaperProps): JSX.Element {
  return <MuiPaper {...props}>{props.children}</MuiPaper>;
}

export default Paper;
