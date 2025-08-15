import { Resizable } from 're-resizable';
import React from 'react';
import Draggable from 'react-draggable';
import { Box, BoxProps, Tooltip } from '../../base';
import { CloseIcon, CollapseAllIcon, ExpandAllIcon, FullScreenIcon, ResizeIcon } from '../../icons';
import { useTheme } from '../../theme';
import { ErrorBoundary } from '../ErrorBoundary';
import {
  CustomIconButton,
  DragHandle,
  DrawerHeader,
  HeaderActionsContainer,
  HeaderContainer,
  PanelBody,
  PanelContainer,
  PanelTitle,
  ResizableContent,
  ResizeIconContainer
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
  defaultSize?: {
    width?: string | number;
    height?: string | number;
  };
  minimizePanel?: () => void;
  title?: string;
};

const Panel_: React.FC<PanelProps> = ({
  isOpen,
  id = 'panel',
  children,
  areAllExpanded,
  toggleExpandAll,
  handleClose,
  defaultSize,
  intitialPosition,
  sx,
  minimizePanel,
  title = ''
}) => {
  const theme = useTheme();
  if (!isOpen) return null;
  return (
    <Draggable handle=".drag-handle">
      <PanelContainer intitialPosition={intitialPosition} sx={sx}>
        <Resizable
          defaultSize={{
            width: defaultSize?.width || '18rem',
            height: defaultSize?.height || 'auto'
          }}
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
                        <CustomIconButton onClick={toggleExpandAll}>
                          {areAllExpanded ? <CollapseAllIcon /> : <ExpandAllIcon />}
                        </CustomIconButton>
                      </Tooltip>
                    )}
                  </Box>
                  <DragHandle />
                  <HeaderContainer>
                    <HeaderActionsContainer
                      id={`${id}-panel-header-actions-container`}
                    ></HeaderActionsContainer>
                    <PanelTitle>{title}</PanelTitle>
                    {minimizePanel && (
                      <CustomIconButton onClick={minimizePanel}>
                        <FullScreenIcon fill={theme.palette.common.white} />
                      </CustomIconButton>
                    )}
                    <CustomIconButton onClick={handleClose}>
                      <CloseIcon fill={theme.palette.common.white} />
                    </CustomIconButton>
                  </HeaderContainer>
                </DrawerHeader>
              </div>
              <PanelBody className="panel-body">{children}</PanelBody>
            </ErrorBoundary>
            <ResizeIconContainer>
              <ResizeIcon />
            </ResizeIconContainer>
          </ResizableContent>
        </Resizable>
      </PanelContainer>
    </Draggable>
  );
};

export const Panel: React.FC<PanelProps> = ({ ...props }) => {
  return <Panel_ {...props} />;
};
