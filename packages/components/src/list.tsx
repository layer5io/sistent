import { ListProps, List as MuiList } from '@mui/material';
import React from 'react';

export const List = (props: ListProps) => {
  return <MuiList {...props} />;
};
