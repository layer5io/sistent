import { Slide as MuiSlide, type SlideProps as MuiSlideProps } from '@mui/material';
import React from 'react';

const Slide = React.forwardRef<HTMLDivElement, MuiSlideProps>((props, ref) => {
  return <MuiSlide {...props} ref={ref} />;
});

export default Slide;
