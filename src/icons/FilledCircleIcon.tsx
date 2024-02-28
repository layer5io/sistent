import { FC } from 'react';
import { IconProps } from './types';

export const FilledCircleIcon: FC<IconProps> = ({
  width,
  height,
  fill = 'currentColor',
  ...props
}) => {
  return (
    <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.3661 38.0349C1.40555 33.2661 -2.80363 21.3246 1.96473 11.3628C4.25461 6.57899 8.35082 2.90088 13.3523 1.13757C18.3537 -0.62574 23.8507 -0.329761 28.6338 1.96035C38.5946 6.72929 42.8037 18.6709 38.0351 28.6325C33.2669 38.5944 21.3267 42.804 11.3661 38.0349Z"
        fill={fill}
        {...props}
      />
    </svg>
  );
};

export default { Filled: FilledCircleIcon };
