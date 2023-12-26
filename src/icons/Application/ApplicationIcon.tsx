import { FC } from 'react';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../../constants/constants';
import { IconProps } from '../types';

const ApplicationIcon: FC<IconProps> = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 53 47"
      data-testid="application-icon-svg"
      {...props}
    >
      <path d="M34.208 2.886A3.938 3.938 0 0 0 32.406.521a3.868 3.868 0 0 0-5.3 1.432l-.59 1.042-.59-1.042A3.92 3.92 0 0 0 20.61.521a3.903 3.903 0 0 0-1.416 5.322l2.845 4.933-10.506 18.175H3.885a3.892 3.892 0 0 0 0 7.78h29.516l-4.492-7.78h-8.408L33.82 5.845a3.784 3.784 0 0 0 .388-2.959Z" />
      <path d="M49.113 28.95h-7.646l-8.688-15.063-4.492 7.78 13.49 23.389a3.802 3.802 0 0 0 2.364 1.809 3.806 3.806 0 0 0 2.952-.39 3.889 3.889 0 0 0 1.415-5.306l-2.55-4.44h3.157a3.892 3.892 0 0 0 0-7.78l-.002.001Z" />
      <path d="m5.254 39.843-.762 1.322a3.88 3.88 0 0 0 1.43 5.306c.59.343 1.26.52 1.942.514a3.897 3.897 0 0 0 3.375-1.945l2.984-5.197H5.254Z" />
    </svg>
  );
};

export default ApplicationIcon;
