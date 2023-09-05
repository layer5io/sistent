import { Slide as MuiSlide, type SlideProps } from '@mui/material';
import React from 'react';

export function Slide(props: SlideProps): JSX.Element {
  return <MuiSlide {...props} />;
}
