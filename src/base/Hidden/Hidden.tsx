import { useMediaQuery, useTheme } from '@mui/material';
import React, { useMemo } from 'react';

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
}

const BREAKPOINTS: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const extractCondition = (mediaQuery: string) =>
  mediaQuery.replace(/^@media\s*/i, '');

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

  const mediaQuery = useMemo(() => {
    const onlyValues = Array.isArray(only) ? only : only ? [only] : [];
    const upProps: Record<Breakpoint, boolean> = { xs: xsUp, sm: smUp, md: mdUp, lg: lgUp, xl: xlUp };
    const downProps: Record<Breakpoint, boolean> = { xs: xsDown, sm: smDown, md: mdDown, lg: lgDown, xl: xlDown };
    const conditions: string[] = [];

    for (const bp of BREAKPOINTS) {
      if (onlyValues.includes(bp)) {
        conditions.push(extractCondition(theme.breakpoints.only(bp)));
      }
      if (upProps[bp]) {
        conditions.push(extractCondition(theme.breakpoints.up(bp)));
      }
      if (downProps[bp]) {
        conditions.push(extractCondition(theme.breakpoints.down(bp)));
      }
    }

    return conditions.length > 0 ? `@media ${conditions.join(', ')}` : '@media not all';
  }, [only, xsUp, smUp, mdUp, lgUp, xlUp, xsDown, smDown, mdDown, lgDown, xlDown, theme.breakpoints]);

  const matches = useMediaQuery(mediaQuery);

  if (matches) {
    return null;
  }

  return <>{children}</>;
};

export default Hidden;
