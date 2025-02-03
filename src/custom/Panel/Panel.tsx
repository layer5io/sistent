import { Resizable } from 're-resizable';
import React from 'react';
import Draggable from 'react-draggable';
import { Box, BoxProps, IconButton, Tooltip } from '../../base';
import { CloseIcon, CollapseAllIcon, ExpandAllIcon } from '../../icons';
import { PanelDragHandleIcon } from '../../icons/PanelDragHandle';
import { useTheme } from '../../theme';
import { ErrorBoundary } from '../ErrorBoundary';
import {
  DragHandle,
  DrawerHeader,
  HeaderActionsContainer,
  HeaderContainer,
  PanelBody,
  PanelContainer,
  ResizableContent
} from './style';

export type PanelProps = {
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
      <PanelContainer theme={theme} intitialPosition={intitialPosition} sx={sx}>
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
                  <DragHandle>
                    <PanelDragHandleIcon />
                  </DragHandle>
                  <HeaderContainer>
                    <HeaderActionsContainer
                      id={`${id}-panel-header-actions-container`}
                    ></HeaderActionsContainer>
                    <IconButton onClick={handleClose}>
                      <CloseIcon />
                    </IconButton>
                  </HeaderContainer>
                </DrawerHeader>
              </div>
              <PanelBody className="panel-body">{children}</PanelBody>
            </ErrorBoundary>
          </ResizableContent>
        </Resizable>
      </PanelContainer>
    </Draggable>
  );
};

export const Panel: React.FC<PanelProps> = ({ ...props }) => {
  return <Panel_ {...props} />;
};
