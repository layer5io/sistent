import React from 'react';

interface LearningIconProps {
  width?: string;
  height?: string;
  primaryFill?: string;
  secondaryFill?: string;
  style?: React.CSSProperties;
}

const LearningIcon: React.FC<LearningIconProps> = ({
  width = '32px',
  height = '32px',
  primaryFill = '#FDFDFD',
  secondaryFill = '#FDFDFD',
  style = {}
}) => (
  <svg
    width={width}
    height={height}
    fill={primaryFill}
    style={style}
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 40 40"
  >
    <path
      fill={primaryFill}
      d="M20,6c-0.5,0-1,0.1-1.5,0.3L1,12.6c-0.6,0.2-1,0.8-1,1.4c0,0.6,0.4,1.2,1,1.4l3.6,1.3c-1,1.6-1.6,3.5-1.6,5.5
    V24c0,1.8-0.7,3.6-1.4,5c-0.4,0.8-0.9,1.6-1.4,2.3C0,31.7-0.1,32,0.1,32.3c0.1,0.3,0.4,0.6,0.7,0.6l4,1c0.3,0.1,0.5,0,0.8-0.1
    s0.4-0.4,0.4-0.6c0.5-2.7,0.3-5.1-0.1-6.8c-0.2-0.9-0.5-1.8-0.8-2.6v-1.5c0-1.9,0.6-3.7,1.7-5.1c0.8-1,1.8-1.7,3.1-2.2l9.8-3.9
    c0.5-0.2,1.1,0,1.3,0.6c0.2,0.5,0,1.1-0.6,1.3l-9.8,3.9c-0.8,0.3-1.5,0.8-2,1.3l10,3.6c0.5,0.2,1,0.3,1.5,0.3c0.5,0,1-0.1,1.5-0.3
    L39,15.4c0.6-0.2,1-0.8,1-1.4c0-0.6-0.4-1.2-1-1.4L21.5,6.3C21,6.1,20.5,6,20,6z"
    />
    <path
      fill={secondaryFill}
      d="M8,29.5c0,2.2,5.4,4.5,12,4.5s12-2.3,12-4.5l-1-9.1l-8.9,3.2C21.5,23.9,20.7,24,20,24c-0.7,0-1.5-0.1-2.2-0.4
    L9,20.4L8,29.5z"
    />
  </svg>
);

export default LearningIcon;
