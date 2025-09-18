import { FC } from 'react';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH, KEPPEL_GREEN_FILL,} from '../../constants/constants';
import { IconProps } from '../types';

type AcademyIconProps = {
topFill: string;
centerFill: string;
bottomFill: string;
} & IconProps;

const AcademyIcon: FC<AcademyIconProps> = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  topFill = KEPPEL_GREEN_FILL,
  centerFill = KEPPEL_GREEN_FILL,
  bottomFill = KEPPEL_GREEN_FILL,
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 22 22"
      data-testid="academy-icon-svg"
      {...props}
    >
        <path
          fill={topFill}
          d="M22.5,4.5v.8c0,.2-.2.4-.4.4h-1.1v.6c0,.3-.3.6-.6.6H2.1c-.3,0-.6-.3-.6-.6v-.6H.4c-.2,0-.4-.2-.4-.4v-.8c0-.2,0-.3.2-.3L11.1,0c0,0,.2,0,.3,0l10.9,4.1c.1,0,.2.2.2.3Z"
        />
        <path
          fill={centerFill}
          d="M3.8,7.5v9h-1.7c-.3,0-.6.3-.6.6v.9h19.5v-.9c0-.3-.3-.6-.6-.6h-1.7V7.5h-3v9h-3V7.5h-3v9h-3V7.5h-3Z"
        />
        <path
          fill={bottomFill}
          d="M21.4,18.8H1.1c-.6,0-1.1.5-1.1,1.1v.8c0,.2.2.4.4.4h21.8c.2,0,.4-.2.4-.4v-.8c0-.6-.5-1.1-1.1-1.1Z"
        />
       </svg>
  );
};

export default AcademyIcon;