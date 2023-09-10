import { List as MuiList, type ListProps } from '@mui/material';
import React from 'react';

export const List = (props: ListProps) => {
  return <MuiList {...props} />;
};
