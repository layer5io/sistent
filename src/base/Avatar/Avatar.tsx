import { Avatar as MuiAvatar, type AvatarProps as MuiAvatarProps } from '@mui/material';

export function Avatar(props: MuiAvatarProps): JSX.Element {
  return <MuiAvatar {...props} />;
}

export default Avatar;
