import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material';

export function Link(props: MuiLinkProps): JSX.Element {
  return <MuiLink {...props} />;
}
