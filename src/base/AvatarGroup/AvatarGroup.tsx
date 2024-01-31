import {
  AvatarGroup as MuiAvatarGroup,
  type AvatarGroupProps as MuiAvatarGroupProps
} from '@mui/material';

export function AvatarGroup(props: MuiAvatarGroupProps): JSX.Element {
  return <MuiAvatarGroup {...props} />;
}

export default AvatarGroup;
