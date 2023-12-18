import { ChipProps, TooltipProps } from '@mui/material';
import React from 'react';
import { Chip } from '../../base/Chip';
import { Tooltip } from '../../base/Tooltip';
import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import CurvedArrowIcon from './curvedArrowIcon';

/**
 * Wrapper component for flip cards.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.message - The message of the empty state.
 * @param {string} props.icon - The icon of the empty state.
 *
 */

export interface EmptyStateProps {
  tooltip: string;
  tooltipPlacement?: TooltipProps['placement'];
  variant?: ChipProps['variant'];
  label: string;
  icon?: React.ReactElement;
  onClick?: () => void;
  onDelete?: () => void;
  style?: React.CSSProperties;
}

function EmptyState({
  tooltip,
  tooltipPlacement = 'top',
  variant = 'filled',
  label,
  icon,
  onClick,
  onDelete,
  style,
  ...rest
}: EmptyStateProps): JSX.Element {
  return (
    <div
      style={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        minHeight: '50vh',
      }}
    >
      <Grid style={{ display: 'flex', width: '100%', padding: '0 40px' }}>
        <CurvedArrowIcon />
        <Typography
          style={{
            fontSize: 24,
            color: '#808080',
            px: 5,
            py: 2,
            lineHeight: 1.5,
            letterSpacing: '0.15px',
            display: 'flex',
            alignItems: 'flex-end',
            marginBottom: -32,
          }}
        >
          {pointerLabel}
        </Typography>
      </Grid>
      <Grid style={{ marginTop: '120px' }}>
        {icon}
        <Typography
          style={{
            fontSize: 24,
            color: '#808080',
            px: 5,
            py: 2,
            lineHeight: 1,
          }}
        >
          {message}
        </Typography>
      </Grid>
    </div>
  );
}

export default EmptyState;
