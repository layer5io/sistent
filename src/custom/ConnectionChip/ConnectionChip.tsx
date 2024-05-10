import { ChipProps, TooltipProps } from '@mui/material';
import React from 'react';
import { Chip } from '../../base/Chip';
import { CustomTooltip } from '../CustomTooltip';

export interface ConnectionChipProps {
  tooltip: string;
  tooltipPlacement?: TooltipProps['placement'];
  variant?: ChipProps['variant'];
  label: string;
  icon?: React.ReactElement;
  onClick?: () => void;
  onDelete?: () => void;
  style?: React.CSSProperties;
}

function ConnectionChip({
  tooltip,
  tooltipPlacement = 'top',
  variant = 'filled',
  label,
  icon,
  onClick,
  onDelete,
  style,
  ...rest
}: ConnectionChipProps): JSX.Element {
  return (
    <CustomTooltip title={tooltip} placement={tooltipPlacement}>
      <Chip
        sx={{
          paddingY: '10px',
          padding: '5px 6px !important',
          color: 'black',
          fontSize: '14px',
          textTransform: 'uppercase',
          fontWeight: 400,
          height: 'unset',
          borderRadius: '100px',
          border: '0.5px solid #51636B',
          background: 'white',
          maxWidth: '230px'
        }}
        variant={variant}
        label={label}
        onClick={onClick}
        onDelete={onDelete}
        icon={icon}
        style={style}
        {...rest}
      />
    </CustomTooltip>
  );
}

export default ConnectionChip;
