import { Toolbar as MuiToolbar, type ToolbarProps as MuiToolbarProps } from '@mui/material';

export function Toolbar(props: MuiToolbarProps): JSX.Element {
  return <MuiToolbar {...props} />;
}

export default Toolbar;
