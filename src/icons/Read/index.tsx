import React from 'react';
import SistentIcon from '../SistentIcon';
import { IconProps } from '../types';

function ReadIcon({ ...props }: IconProps): React.JSX.Element {
  return (
    <SistentIcon
      size={props.size}
      viewBox="0 0 20 19"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M20,7c0-0.7-0.4-1.3-0.9-1.7L10,0L1,5.3C0.4,5.7,0,6.3,0,7v10c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2L20,7z M10,12L1.7,6.8
		L10,2l8.3,4.8L10,12z"
        fill={props.fill}
      />
    </SistentIcon>
  );
}

export { ReadIcon };
