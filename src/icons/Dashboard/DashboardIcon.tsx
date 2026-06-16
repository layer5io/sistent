import { FC, useRef } from 'react';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../../constants/constants';
import { IconProps } from '../types';
import { injectKeyframes, PathStyle } from './styles';
import { useAnimationTrigger } from './useAnimationTrigger';

injectKeyframes();

export interface DashboardIconProps extends IconProps {
  isHoverEffect?: boolean;
}

export const DashboardIcon: FC<DashboardIconProps> = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  isHoverEffect = false,
  fill,
  ...props
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  useAnimationTrigger(svgRef, isHoverEffect);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      overflow="visible"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path className="dashboard-icon-tl" d="M3 3h8v10H3z" fill={fill} style={PathStyle} />
      <path className="dashboard-icon-tr" d="M13 3h8v6h-8z" fill={fill} style={PathStyle} />
      <path className="dashboard-icon-br" d="M13 11h8v10h-8z" fill={fill} style={PathStyle} />
      <path className="dashboard-icon-bl" d="M3 15h8v6H3z" fill={fill} style={PathStyle} />
    </svg>
  );
};

export default DashboardIcon;
