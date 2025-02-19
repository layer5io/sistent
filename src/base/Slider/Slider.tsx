import { Slider as MuiSlider, SliderProps as MuiSliderProps } from '@mui/material';
import React from 'react';

export const Slider = React.forwardRef<HTMLDivElement, MuiSliderProps>((props, ref) => (
  <MuiSlider {...props} ref={ref} />
));

export default Slider;
