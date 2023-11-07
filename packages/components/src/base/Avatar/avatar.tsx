import { Avatar as MuiAvatar, type AvatarProps } from '@mui/material';

export function Avatar(props: AvatarProps): JSX.Element {
  return <MuiAvatar {...props} />;
}
