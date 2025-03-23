import {
  AlertTitle as MuiAlertTitle,
  type AlertTitleProps as MuiAlertTitleProps
} from '@mui/material';

export function AlertTitle(props: MuiAlertTitleProps): JSX.Element {
  return <MuiAlertTitle {...props} />;
}

export default AlertTitle;
