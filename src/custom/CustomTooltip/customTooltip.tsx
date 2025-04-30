import _ from 'lodash';
import React, { useState } from 'react';
import { Tooltip, TooltipProps } from '../../base';
import { WHITE } from '../../theme';
import { RenderMarkdownTooltip } from '../Markdown';

type CustomTooltipProps = {
  title: string | React.ReactNode | JSX.Element;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  children: React.ReactNode;
  fontSize?: string;
  fontWeight?: number;
  variant?: 'standard' | 'small';
  bgColor?: string;
  componentsProps?: TooltipProps['componentsProps'];
} & Omit<TooltipProps, 'title' | 'onClick'>;

function CustomTooltip({
  title,
  onClick,
  placement,
  children,
  fontSize,
  fontWeight = 400,
  variant = 'standard',
  bgColor = '#141414',
  componentsProps = {},
  ...props
}: CustomTooltipProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const isTouchDevice = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const handleTouchEnd = () => {
    setTimeout(() => setIsOpen(false), 1500);
  };

  return (
    <Tooltip
      componentsProps={_.merge(
        {
          tooltip: {
            sx: {
              background: bgColor,
              color: WHITE,
              maxWidth: '600px',
              fontSize: fontSize || (variant === 'standard' ? '1rem' : '0.75rem'),
              fontWeight: { fontWeight },
              borderRadius: '0.5rem',
              padding: variant === 'standard' ? '0.9rem' : '0.5rem 0.75rem',
              boxShadow: 'rgba(0, 0, 0, 0.6) 0px 4px 10px, rgba(0, 0, 0, 0.5) 0px 2px 4px'
            }
          },
          popper: {
            sx: {
              zIndex: 9999999999,
              opacity: '1'
            }
          },
          arrow: {
            sx: {
              color: bgColor
            }
          }
        },
        componentsProps
      )}
      open={isTouchDevice() ? isOpen : undefined}
      title={typeof title === 'string' ? <RenderMarkdownTooltip content={title} /> : title}
      placement={placement}
      arrow
      onClick={onClick}
      {...props}
    >
      <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        {children}
      </div>
    </Tooltip>
  );
}

export default CustomTooltip;
export type { CustomTooltipProps };
