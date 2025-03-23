import {
  Breadcrumbs as MuiBreadcrumbs,
  type BreadcrumbsProps as MuiBreadcrumbsProps
} from '@mui/material';
import React from 'react';

const Breadcrumbs = React.forwardRef<HTMLDivElement, MuiBreadcrumbsProps>((props, ref) => {
  return <MuiBreadcrumbs {...props} ref={ref} />;
});

export default Breadcrumbs;
