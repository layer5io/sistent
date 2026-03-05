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

  const conditions: string[] = [];

  const extractCondition = (mediaQuery: string) =>
    mediaQuery.replace(/^@media\s*/i, '');

  if (onlyValues.includes('xs')) {
    conditions.push(extractCondition(theme.breakpoints.only('xs')));
  }
  if (onlyValues.includes('sm')) {
    conditions.push(extractCondition(theme.breakpoints.only('sm')));
  }
  if (onlyValues.includes('md')) {
    conditions.push(extractCondition(theme.breakpoints.only('md')));
  }
  if (onlyValues.includes('lg')) {
    conditions.push(extractCondition(theme.breakpoints.only('lg')));
  }
  if (onlyValues.includes('xl')) {
    conditions.push(extractCondition(theme.breakpoints.only('xl')));
  }

  if (xsUp) {
    conditions.push(extractCondition(theme.breakpoints.up('xs')));
  }
  if (smUp) {
    conditions.push(extractCondition(theme.breakpoints.up('sm')));
  }
  if (mdUp) {
    conditions.push(extractCondition(theme.breakpoints.up('md')));
  }
  if (lgUp) {
    conditions.push(extractCondition(theme.breakpoints.up('lg')));
  }
  if (xlUp) {
    conditions.push(extractCondition(theme.breakpoints.up('xl')));
  }

  if (xsDown) {
    conditions.push(extractCondition(theme.breakpoints.down('xs')));
  }
  if (smDown) {
    conditions.push(extractCondition(theme.breakpoints.down('sm')));
  }
  if (mdDown) {
    conditions.push(extractCondition(theme.breakpoints.down('md')));
  }
  if (lgDown) {
    conditions.push(extractCondition(theme.breakpoints.down('lg')));
  }
  if (xlDown) {
    conditions.push(extractCondition(theme.breakpoints.down('xl')));
  }

  const mediaQuery =
    conditions.length > 0 ? `@media ${conditions.join(', ')}` : '@media not all';

  const matches = useMediaQuery(mediaQuery);

  if (matches) {
    return null;
  }

  return <>{children}</>;
};

export default Hidden;
