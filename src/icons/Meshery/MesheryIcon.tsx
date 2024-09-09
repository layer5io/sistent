import { FC } from 'react';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../../constants/constants';
import { CustomIconProps } from '../types';

const MesheryIcon: FC<CustomIconProps> = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  primaryFill = '#00B39F',
  secondaryFill = '#00D3A9',
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 135 135"
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M69.5 31.82V64.07L97.45 47.89L69.5 31.82Z" fill={secondaryFill} />
      <path d="M69.5 70.81V103.22L97.7 87.09L69.5 70.81Z" fill={secondaryFill} />
      <path d="M65.47 63.85V32.09L37.87 47.92L65.47 63.85Z" fill={primaryFill} />
      <path
        d="M10.1 103.1C15.5182 111.811 22.842 119.179 31.52 124.65V90.71L10.1 103.1Z"
        fill={primaryFill}
      />
      <path d="M65.47 103.06V71.05L37.8 87.07L65.47 103.06Z" fill={primaryFill} />
      <path d="M35.54 122.63L63.56 106.61L35.54 90.41V122.63Z" fill={secondaryFill} />
      <path d="M99.62 122.8V90.63L71.64 106.63L99.62 122.8Z" fill={primaryFill} />
      <path
        d="M127.03 99.37C131.817 90.4433 134.524 80.5502 134.95 70.43L105.78 87.11L127.03 99.37Z"
        fill={primaryFill}
      />
      <path d="M103.64 83.69L131.76 67.61L103.64 51.45V83.69Z" fill={secondaryFill} />
      <path d="M99.62 44.5V12.52L71.77 28.49L99.62 44.5Z" fill={primaryFill} />
      <path d="M99.62 83.55V51.28L71.7 67.44L99.62 83.55Z" fill={primaryFill} />
      <path d="M35.54 51.22V83.73L63.66 67.45L35.54 51.22Z" fill={secondaryFill} />
      <path
        d="M65.47 0C55.1388 0.298791 45.016 2.97835 35.89 7.83L65.52 24.83L65.47 0Z"
        fill={primaryFill}
      />
      <path d="M35.54 12.3V44.62L63.69 28.48L35.54 12.3Z" fill={secondaryFill} />
      <path
        d="M31.52 10.34C22.8442 15.8136 15.521 23.1813 10.1 31.89L31.52 44.25V10.34Z"
        fill={primaryFill}
      />
      <path
        d="M99.43 8C90.2123 3.0393 79.9635 0.299881 69.5 0V25.15L99.43 8Z"
        fill={secondaryFill}
      />
      <path
        d="M0 69.87C0.348236 80.2825 3.1145 90.4711 8.08 99.63L29.77 87.07L0 69.87Z"
        fill={secondaryFill}
      />
      <path
        d="M8.07001 35.37C3.13121 44.4917 0.372439 54.6334 0.0100098 65L29.8 47.91L8.07001 35.37Z"
        fill={secondaryFill}
      />
      <path
        d="M35.78 127.13C44.9355 132.013 55.0981 134.706 65.47 135V110.15L35.78 127.13Z"
        fill={primaryFill}
      />
      <path
        d="M124.89 32C119.512 23.3126 112.237 15.9553 103.61 10.48V44.3L124.89 32Z"
        fill={secondaryFill}
      />
      <path
        d="M103.64 124.54C112.314 119.022 119.624 111.61 125.02 102.86L103.64 90.52V124.54Z"
        fill={secondaryFill}
      />
      <path
        d="M134.96 64.81C134.572 54.5437 131.835 44.5032 126.96 35.46L105.5 47.88L134.96 64.81Z"
        fill={primaryFill}
      />
      <path
        d="M69.5 135C79.845 134.709 89.9825 132.029 99.12 127.17L69.5 110V135Z"
        fill={secondaryFill}
      />
      <path d="M31.52 83.44V51.56L3.83002 67.43L31.52 83.44Z" fill={primaryFill} />
    </svg>
  );
};

export default MesheryIcon;
