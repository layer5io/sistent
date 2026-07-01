import { styled } from '@mui/material/styles';
import React from 'react';
import { Box, IconButton, Toolbar, Typography } from '../../base';
import { IndeterminateCheckBoxIcon } from '../../icons';
import { useTheme } from '../../theme';
import { CustomTooltip } from '../CustomTooltip';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.background.card
      : theme.palette.background.secondary,
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  minHeight: '64px'
}));

export interface BulkActionToolbarProps {
  selectedCount: number;
  onDeselectAll?: () => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  'data-testid'?: string;
}

export const BulkActionToolbar: React.FC<BulkActionToolbarProps> = ({
  selectedCount,
  onDeselectAll,
  children,
  style = {},
  'data-testid': testId = 'bulk-action-toolbar'
}) => {
  const theme = useTheme();

  if (selectedCount <= 0) {
    return null;
  }

  const iconFill = theme.palette.icon.default;

  return (
    <StyledToolbar style={style} data-testid={testId}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {onDeselectAll && (
          <CustomTooltip title="Deselect ALL" arrow>
            <IconButton
              onClick={onDeselectAll}
              sx={{ marginRight: theme.spacing(2) }}
              data-testid="deselect-all-button"
            >
              <IndeterminateCheckBoxIcon fill={iconFill} />
            </IconButton>
          </CustomTooltip>
        )}
        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: theme.palette.text.default }}>
          {selectedCount} selected
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: theme.spacing(1) }}>{children}</Box>
    </StyledToolbar>
  );
};

export default BulkActionToolbar;
