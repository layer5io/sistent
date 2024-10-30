import React from 'react';

interface KanvasIconProps {
  width: number;
  height: number;
  fill?: string;
  style?: React.CSSProperties;
  primaryFill?: string;
  secondaryFill?: string;
}

const KanvasIcon: React.FC<KanvasIconProps> = ({
  width,
  height,
  fill,
  style,
  primaryFill = 'white'
}) => (
  <svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 500 500"
    fill={fill}
    style={style}
  >
    <polygon fill={primaryFill} points="261.82 30.1 261.82 228.75 433.99 129.07 261.82 30.1" />
    <polygon fill={primaryFill} points="261.82 270.3 261.82 469.9 435.56 370.56 261.82 270.3" />
    <g opacity=".8">
      <polygon fill={primaryFill} points="237.03 227.38 237.03 31.77 66.97 129.25 237.03 227.38" />
    </g>
    <g opacity=".8">
      <polygon fill={primaryFill} points="237.03 468.98 237.03 271.74 66.56 370.43 237.03 468.98" />
    </g>
    <g opacity=".8">
      <polygon fill={primaryFill} points="447.37 348.75 447.37 149.97 275.4 249.52 447.37 348.75" />
    </g>
    <polygon fill={primaryFill} points="52.63 149.59 52.63 349.85 225.87 249.56 52.63 149.59" />
  </svg>
);

export default KanvasIcon;
