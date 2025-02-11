import { ListItemProps } from '@mui/material';
import { Box, IconButton, ListItem } from '../../base';
import { PanelDragHandleIcon } from '../../icons/PanelDragHandle';
import { accentGrey, black, styled } from '../../theme';
import { PanelProps } from './Panel';

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

export const PanelBody = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: accentGrey[10],
  overflow: 'auto',
  flex: 1,
  minHeight: 0
}));

export const ResizableContent = styled('div')({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  minHeight: '3rem'
});

export const PanelContainer = styled(Box)<{ intitialPosition: PanelProps['intitialPosition'] }>(
  ({ theme, intitialPosition }) => ({
    borderRadius: '8px',
    overflow: 'hidden',
    flexShrink: 0,
    zIndex: 99999,
    position: 'absolute',
    backgroundColor: theme.palette.background.blur?.light,
    boxShadow: `0 4px 16px ${black}`,
    maxHeight: '80%',
    display: 'flex',
    boxSizing: 'border-box',
    ...intitialPosition
  })
);

export const DragHandle = styled(PanelDragHandleIcon)(({ theme }) => ({
  fill: theme.palette.common.white,
  position: 'absolute',
  top: '-0.3rem',
  left: '50%'
}));

export const HeaderActionsContainer = styled('div')({
  display: 'flex',
  gap: '1rem',
  justifyContent: 'flex-end',
  alignItems: 'center'
});

export const HeaderContainer = styled('div')({
  display: 'flex',
  justifyContent: 'end',
  alignItems: 'center',
  flex: '1'
});

export const CustomIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.common.white
}));

export const PanelTitle = styled('div')(() => ({
  position: 'absolute',
  left: '0',
  right: '0',
  marginInline: 'auto',
  width: 'fit-content'
}));
