import { ListItemProps, styled } from '@mui/material';
import { Resizable } from 're-resizable';
import React from 'react';
import Draggable from 'react-draggable';
import { Box, BoxProps, IconButton, ListItem, Tooltip } from '../../base';
import { CloseIcon, CollapseAllIcon, ExpandAllIcon } from '../../icons';
import { PanelDragHandleIcon } from '../../icons/PanelDragHandle';
import { useTheme } from '../../theme';
import { ErrorBoundary } from '../ErrorBoundary';

export const ListHeader = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(0.5, 0.5),
  marginBlock: theme.spacing(1),
  '& .MuiListItemText-primary': {
    fontSize: '1rem',
    textTransform: 'capitalize',
    fontWeight: 700
  },
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover
  },
  '& .MuiSvgIcon-root': {
    opacity: 0,
    transition: 'opacity 0.2s'
  },
  '&:hover .MuiSvgIcon-root': {
    opacity: 1
  }
}));

interface CustomListItemProps extends ListItemProps {
  isVisible: boolean;
}

// Use the new interface in the styled component
export const StyledListItem = styled(ListItem, {
  shouldForwardProp: (props) => props !== 'isVisible'
})<CustomListItemProps>(({ theme, isVisible }) => ({
  padding: theme.spacing(0.05, 0.5),
  fontStyle: isVisible ? 'normal' : 'italic',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  '& .MuiSvgIcon-root': {
    height: 20,
    width: 20
  },
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    opacity: isVisible ? 0.8 : 0.3
  },
  '& .MuiTypography-root': {
    fontSize: '0.9rem',
    opacity: isVisible ? 1 : 0.5
  }
}));

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

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(4, 2),
  alignContent: 'stretch',
  justifyContent: 'space-between',
  cursor: 'move',
  background:
    theme.palette.mode === 'light'
      ? 'linear-gradient(90deg, #3B687B 0%, #507D90 100%)'
      : 'linear-gradient(90deg, #28353A 0%, #3D4F57 100%)',
  height: '3rem',
  flexShrink: 0
}));

const PanelBody = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.surfaces,
  overflow: 'auto',
  flex: 1,
  minHeight: 0
}));

// New container for Resizable content
const ResizableContent = styled('div')({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  minHeight: '3rem'
});

// // watches for the size of the element
// const useDimensions = (ref: React.RefObject<HTMLDivElement>) => {
//   const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });
//   React.useEffect(() => {
//     const { current } = ref;
//     if (current) {
//       const resizeObserver = new ResizeObserver((entries) => {
//         entries.forEach((entry) => {
//           setDimensions({
//             width: entry.contentRect.width,
//             height: entry.contentRect.height
//           });
//         });
//       });
//       resizeObserver.observe(current);
//       return () => {
//         resizeObserver.unobserve(current);
//       };
//     }
//   }, [ref]);
//   return dimensions;
// };

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
  //   const mode = theme?.palette?.type;
  if (!isOpen) return null;
  return (
    // <SistentThemeProviderWithoutBaseLine initialMode={mode}>
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
                    fill={theme.palette.icon.default}
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
                      <CloseIcon fill={theme.palette.icon.default} />
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
    // </SistentThemeProviderWithoutBaseLine>
  );
};

export const Panel: React.FC<PanelProps> = ({ ...props }) => {
  return (
    // <SistentThemeProviderWithoutBaseLine initialMode={mode}>
    <Panel_ {...props} />
    // </SistentThemeProviderWithoutBaseLine>
  );
};
