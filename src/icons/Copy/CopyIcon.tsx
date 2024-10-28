import React from 'react';

interface CopyIconProps {
  width: number;
  height: number;
  fill?: string;
  style?: React.CSSProperties;
  secondaryFill?: string;
}

const CopyIcon: React.FC<CopyIconProps> = ({ width, height, fill = 'white', style }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 22 22"
    xmlns="http://www.w3.org/2000/svg"
    fill={fill}
    style={style}
  >
    <g mask="url(#mask0_15532_38310)">
      <path d="M14.6654 0.914062H3.66536C2.65703 0.914062 1.83203 1.73906 1.83203 2.7474V15.5807H3.66536V2.7474H14.6654V0.914062ZM17.4154 4.58073H7.33203C6.3237 4.58073 5.4987 5.40573 5.4987 6.41406V19.2474C5.4987 20.2557 6.3237 21.0807 7.33203 21.0807H17.4154C18.4237 21.0807 19.2487 20.2557 19.2487 19.2474V6.41406C19.2487 5.40573 18.4237 4.58073 17.4154 4.58073ZM17.4154 19.2474H7.33203V6.41406H17.4154V19.2474Z" />
    </g>
  </svg>
);

export default CopyIcon;
