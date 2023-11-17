import { Chip } from 'base';
import React from 'react';
import { Tooltip } from '../base/Tooltip';

export interface ConnectioChipProps {
  tooltip: string;
  tooltipPlacement?: string;
  chipLabel: boolean;
  chipIcon?: Element;
  chipDeleteIcon?: Element;
  style?: React.CSSProperties;
  onDelete?: () => void;
}

function ConnectioChip({
  tooltip,
  tooltipPlacement = 'top',
  chipLabel,
  chipIcon,
  chipDeleteIcon,
  style,
  onDelete
}: ConnectioChipProps): JSX.Element {
  return (
    <Tooltip title={tooltip} placement={tooltipPlacement}>
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
        variant="outlined"
        label={chipLabel}
        onDelete={onDelete}
        deleteIcon={chipDeleteIcon}
        icon={chipIcon}
        style={style}
      />
    </Tooltip>
  );
}

export default ConnectioChip;
