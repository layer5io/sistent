import React from 'react';

interface ChallengesIconProps {
  width?: string;
  height?: string;
  primaryFill?: string;
  brandFill?: string;
  secondaryFill?: string;
  style?: React.CSSProperties;
}

const ChallengesIcon: React.FC<ChallengesIconProps> = ({
  width = '32px',
  height = '32px',
  primaryFill = '#B1B9BC',
  brandFill = '#00B39F',
  secondaryFill = '#51636B',
  style = {}
}) => (
  <svg
    width={width}
    height={height}
    fill={primaryFill}
    style={style}
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 254 187"
  >
    <path d="M137.75 186.964L195.857 81.2227L253.994 186.964H137.75Z" fill={secondaryFill} />
    <path
      d="M217.85 121.244L207.007 132.244L195.51 121.244L183.639 132.244L173.852 121.244L195.852 81.2227L217.85 121.244Z"
      fill={primaryFill}
    />
    <path d="M0 186.879L42.5621 109.473L85.1469 186.879H0Z" fill={secondaryFill} />
    <path
      d="M58.6074 138.964L50.7041 147.07L42.3246 138.964L33.6726 147.07L26.5391 138.964L42.5736 109.473L58.6074 138.964Z"
      fill={primaryFill}
    />
    <path d="M70.9531 24.245H125.504V0H70.9531L89.6349 12.1225L70.9531 24.245Z" fill={brandFill} />
    <path d="M51 186.89L128.281 45.4609L205.562 186.89H51Z" fill={primaryFill} />
    <path
      d="M157.592 99.3499L143.115 114.155L127.831 99.3499L112.02 114.155L99 99.3499L128.297 45.4609L157.592 99.3499Z"
      fill="#F6F8F8"
    />
    <line
      x1="128.516"
      y1="8.74229e-08"
      x2="118.414"
      y2="57.5818"
      stroke={brandFill}
      strokeWidth="4"
    />
  </svg>
);

export default ChallengesIcon;
