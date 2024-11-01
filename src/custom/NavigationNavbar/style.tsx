import { styled } from '@mui/material/styles';
import { ListItem, MenuList } from '../../base';

export const ListItemStyle = styled('div')(({ theme }) => ({
  marginLeft: '.5rem',
  color: theme.palette.background.secondary
}));

export const MenuListStyle = styled(MenuList)({
  overflowY: 'auto',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    width: '0em'
  }
});

export const MenuItemList = styled(ListItem)(() => ({
  pointerEvents: 'auto',
  margin: '0.5rem 0rem 0.5rem 0rem',
  fontSize: '0.1rem',
  padding: '0'
}));

export const MenuItemSubList = styled(ListItem)(() => ({
  pointerEvents: 'auto',
  margin: '0rem 0rem 0rem 0.5rem',
  fontSize: '0.1rem'
}));

export const IconWrapper = styled('div')({
  marginRight: '0.75rem',
  marginLeft: '0.5rem'
});

export const SubIconWrapper = styled('div')({
  marginRight: '0.5rem'
});
