import { styled } from '@mui/material';
import React from 'react';

export interface TableToolbarProps {
  leadingContent?: React.ReactNode;
  centerContent?: React.ReactNode;
  endContent?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  'data-testid'?: string;
  ariaLabel?: string;
}

const TableToolbarRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  width: '100%',
  flexWrap: 'wrap'
}));

const ToolbarSlot = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  flexWrap: 'wrap',
  minWidth: 0
}));

const ToolbarLeadingSlot = styled(ToolbarSlot)(() => ({
  flex: '0 0 auto'
}));

const ToolbarCenterSlot = styled(ToolbarSlot)(() => ({
  flex: '1 1 0',
  justifyContent: 'center'
}));

const ToolbarEndSlot = styled(ToolbarSlot)(() => ({
  flex: '0 0 auto',
  marginLeft: 'auto',
  justifyContent: 'flex-end'
}));

export function TableToolbar({
  leadingContent,
  centerContent,
  endContent,
  className,
  style,
  'data-testid': dataTestId = 'table-toolbar',
  ariaLabel = 'Table toolbar'
}: TableToolbarProps): JSX.Element {
  return (
    <TableToolbarRoot
      role="toolbar"
      aria-label={ariaLabel}
      className={className}
      style={style}
      data-testid={dataTestId}
    >
      {leadingContent ? (
        <ToolbarLeadingSlot data-testid={`${dataTestId}-leading`}>
          {leadingContent}
        </ToolbarLeadingSlot>
      ) : null}
      {centerContent ? (
        <ToolbarCenterSlot data-testid={`${dataTestId}-center`}>{centerContent}</ToolbarCenterSlot>
      ) : null}
      {endContent ? (
        <ToolbarEndSlot data-testid={`${dataTestId}-end`}>{endContent}</ToolbarEndSlot>
      ) : null}
    </TableToolbarRoot>
  );
}

export default TableToolbar;
