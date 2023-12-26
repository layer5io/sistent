import { Slide as MuiSlide, type SlideProps as MuiSlideProps } from '@mui/material';

export function Slide(props: MuiSlideProps): JSX.Element {
  return <MuiSlide {...props} />;
}

export default Slide;
