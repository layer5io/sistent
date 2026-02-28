import { useMediaQuery, useTheme } from '@mui/material';
import React from 'react';

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface HiddenProps {
  children?: React.ReactNode;
  only?: Breakpoint | Breakpoint[];
  xsUp?: boolean;
  smUp?: boolean;
  mdUp?: boolean;
  lgUp?: boolean;
  xlUp?: boolean;
  xsDown?: boolean;
  smDown?: boolean;
  mdDown?: boolean;
  lgDown?: boolean;
  xlDown?: boolean;
  implementation?: 'js' | 'css';
}

export const Hidden = ({
  children,
  only,
  xsUp = false,
  smUp = false,
  mdUp = false,
  lgUp = false,
  xlUp = false,
  xsDown = false,
  smDown = false,
  mdDown = false,
  lgDown = false,
  xlDown = false
}: HiddenProps) => {
  const theme = useTheme();
  const onlyValues = Array.isArray(only) ? only : only ? [only] : [];

  const xsOnly = useMediaQuery(theme.breakpoints.only('xs'));
  const smOnly = useMediaQuery(theme.breakpoints.only('sm'));
  const mdOnly = useMediaQuery(theme.breakpoints.only('md'));
  const lgOnly = useMediaQuery(theme.breakpoints.only('lg'));
  const xlOnly = useMediaQuery(theme.breakpoints.only('xl'));

  const xsUpMatch = useMediaQuery(theme.breakpoints.up('xs'));
  const smUpMatch = useMediaQuery(theme.breakpoints.up('sm'));
  const mdUpMatch = useMediaQuery(theme.breakpoints.up('md'));
  const lgUpMatch = useMediaQuery(theme.breakpoints.up('lg'));
  const xlUpMatch = useMediaQuery(theme.breakpoints.up('xl'));

  const xsDownMatch = useMediaQuery(theme.breakpoints.down('xs'));
  const smDownMatch = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDownMatch = useMediaQuery(theme.breakpoints.down('md'));
  const lgDownMatch = useMediaQuery(theme.breakpoints.down('lg'));
  const xlDownMatch = useMediaQuery(theme.breakpoints.down('xl'));

  const onlyMatches =
    (onlyValues.includes('xs') && xsOnly) ||
    (onlyValues.includes('sm') && smOnly) ||
    (onlyValues.includes('md') && mdOnly) ||
    (onlyValues.includes('lg') && lgOnly) ||
    (onlyValues.includes('xl') && xlOnly);

  const upMatches =
    (xsUp && xsUpMatch) ||
    (smUp && smUpMatch) ||
    (mdUp && mdUpMatch) ||
    (lgUp && lgUpMatch) ||
    (xlUp && xlUpMatch);

  const downMatches =
    (xsDown && xsDownMatch) ||
    (smDown && smDownMatch) ||
    (mdDown && mdDownMatch) ||
    (lgDown && lgDownMatch) ||
    (xlDown && xlDownMatch);

  if (onlyMatches || upMatches || downMatches) {
    return null;
  }

  return <>{children}</>;
};

export default Hidden;
