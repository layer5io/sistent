import { FC } from 'react';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../../constants/constants';
import { IconProps } from '../types';

export const CloudSavedIcon: FC<IconProps> = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 19.8 13.3"
      {...props}
    >
      <path d="M6.6 7.6c-.2-.2-.2-.5 0-.7.2-.2.5-.2.7 0l1.4 1.4 3.5-3.5c.2-.2.5-.2.7 0 .2.2.2.5 0 .7L8.7 9.7 6.6 7.6zM3.2 6c.3-.1.4-.3.4-.5v-.1c-.1-.3-.1-.5 0-.8 0-.6.4-1.1 1-1.3.2-.1.4-.1.5-.1.3 0 .7.1 1 .3l.1.1c.2.2.5.1.6-.1l.1-.1c.8-1.6 2.5-2.5 4.2-2.3 1.8.2 3.3 1.6 3.6 3.4.1.6.1 1.2-.1 1.8v.2c-.1.3.2.6.5.5h.2c.4-.1.8-.1 1.2-.1 1.2.1 2.1 1.1 2.3 2.3.1.8-.2 1.6-.7 2.2-.5.6-1.3.8-2 .8H4.4c-1.8 0-3.2-1.3-3.3-3C1 7.7 1.9 6.4 3.2 6zM0 9.2c.1 2.3 2 4 4.3 4h11.8c1 0 2-.4 2.7-1.2.7-.7 1.1-1.7 1-2.7-.1-1.9-1.6-3.4-3.5-3.6h-.6c.1-.5 0-1 0-1.5-.4-2.3-2.3-4-4.6-4.3-2-.2-3.9.7-5 2.4-.5-.2-1-.3-1.5-.2-1.1.2-2 1-2.2 2.1-.1.3-.1.6 0 .9C.9 5.9-.1 7.5 0 9.2z" />
    </svg>
  );
};

export default CloudSavedIcon;
