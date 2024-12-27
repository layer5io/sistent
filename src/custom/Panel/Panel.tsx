import { Resizable } from 're-resizable';
import React from 'react';
import Draggable from 'react-draggable';
import { Box, BoxProps, IconButton, Tooltip } from '../../base';
import { CloseIcon, CollapseAllIcon, ExpandAllIcon } from '../../icons';
import { PanelDragHandleIcon } from '../../icons/PanelDragHandle';
import { useTheme } from '../../theme';
import { ErrorBoundary } from '../ErrorBoundary';
import { DrawerHeader, PanelBody, ResizableContent } from './style';

type PanelProps = {
  isOpen: boolean;
  children: React.ReactNode;
  areAllExpanded?: boolean;
  toggleExpandAll?: () => void;
  handleClose: () => void;
  sx?: BoxProps['sx'];
  id?: string;
  intitialPosition?: {
    left?: string | number;
    right?: string | number;
    top?: string | number;
    bottom?: string | number;
  };
};

const Panel_: React.FC<PanelProps> = ({
  isOpen,
  id = 'panel',
  children,
  areAllExpanded,
  toggleExpandAll,
  handleClose,
  intitialPosition,
  sx
}) => {
  const theme = useTheme();
  if (!isOpen) return null;
  return (
    <Draggable handle=".drag-handle">
      <Box
        sx={{
          borderRadius: '8px',
          overflow: 'hidden',
          flexShrink: 0,
          zIndex: 99999,
          position: 'absolute',
          backgroundColor: theme.palette.background.blur?.light,
          boxShadow: '0 4px 16px #05003812',
          maxHeight: '80%',
          display: 'flex',
          boxSizing: 'border-box',
          ...(intitialPosition || {
            top: '6rem',
            right: '2rem'
          }),
          ...(sx || {})
        }}
      >
        <Resizable
          defaultSize={{ width: '18rem', height: 'auto' }}
          onResize={() => {
            window.dispatchEvent(new Event('panel-resize'));
          }}
          enable={{
            top: true,
            right: true,
            bottom: true,
            left: true,
            topRight: true,
            bottomRight: true,
            bottomLeft: true,
            topLeft: true
          }}
        >
          <ResizableContent>
            <ErrorBoundary>
              <div className="drag-handle">
                <DrawerHeader>
                  <Box display="flex" justifyContent="flex-end" padding="8px">
                    {toggleExpandAll && (
                      <Tooltip title={areAllExpanded ? 'Collapse All' : 'Expand All'}>
                        <IconButton onClick={toggleExpandAll}>
                          {areAllExpanded ? <CollapseAllIcon /> : <ExpandAllIcon />}
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                  <PanelDragHandleIcon
                    style={{ marginTop: '-3rem', position: 'absolute', left: '50%' }}
                  />
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'end',
                      alignItems: 'center',
                      flex: 1
                    }}
                  >
                    <div
                      id={`${id}-panel-header-actions-container`}
                      style={{
                        display: 'flex',
                        gap: '1rem',
                        justifyContent: 'flex-end',
                        alignItems: 'center'
                      }}
                    ></div>
                    <IconButton onClick={handleClose}>
                      <CloseIcon />
                    </IconButton>
                  </div>
                </DrawerHeader>
              </div>
              <PanelBody className="panel-body">{children}</PanelBody>
            </ErrorBoundary>
          </ResizableContent>
        </Resizable>
      </Box>
    </Draggable>
  );
};

export const Panel: React.FC<PanelProps> = ({ ...props }) => {
  return <Panel_ {...props} />;
};
