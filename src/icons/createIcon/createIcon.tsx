import React from 'react';
import { DEFAULT_FILL_NONE, DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../../constants/constants';
import { IconProps } from '../types';

export interface CreateIconOptions {
  /**
   * The icon SVG viewBox.
   * @default '0 0 24 24'
   */
  viewBox?: string;

  /**
   * The SVG path or elements to render inside the SVG.
   */
  path?: React.ReactNode | ((props: IconProps) => React.ReactNode);

  /**
   * Shorthand SVG path `d` attribute when providing a single path string.
   */
  d?: string;

  /**
   * The display name of the icon component (for React DevTools and testing).
   */
  displayName?: string;

  /**
   * Default props to override standard defaults (e.g. custom default fill or dimensions).
   */
  defaultProps?: Partial<IconProps> & Record<string, unknown>;
}

export function createIcon(options: CreateIconOptions): React.ForwardRefExoticComponent<
  IconProps & React.RefAttributes<SVGSVGElement>
> {
  const {
    viewBox = '0 0 24 24',
    d: pathDefinition,
    path: pathElement,
    displayName,
    defaultProps = {}
  } = options;

  const Comp = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => {
    const mergedProps = { ...defaultProps, ...props };
    const {
      width = DEFAULT_WIDTH,
      height = DEFAULT_HEIGHT,
      fill = DEFAULT_FILL_NONE,
      title,
      ...rest
    } = mergedProps;

    let content: React.ReactNode = null;
    if (typeof pathElement === 'function') {
      content = pathElement(mergedProps);
    } else if (pathElement) {
      content = pathElement;
    } else if (pathDefinition) {
      content = <path d={pathDefinition} fill={fill} />;
    }

    return (
      <svg
        {...rest}
        ref={ref}
        width={width}
        height={height}
        fill={fill}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
      >
        {title && <title>{title}</title>}
        {content}
      </svg>
    );
  });

  Comp.displayName = displayName || 'Icon';

  return Comp;
}

export default createIcon;
