import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ListItemTextProps, MenuListProps, useMediaQuery, useTheme } from '@mui/material';
import React, { MouseEvent, useState } from 'react';
import { Collapse, Divider, ListItemText, MenuItem } from '../../base';
import { IconWrapper, MenuItemList, MenuItemSubList, MenuListStyle, SubIconWrapper } from './style';

type NavigationItem = {
  id: string;
  title: string;
  icon: React.ReactNode;
  permission?: boolean;
  onClick: () => void;
  subItems?: NavigationItem[];
  addDivider?: boolean;
  showOnWeb?: boolean;
};

interface NavigationNavbarProps {
  navigationItems: NavigationItem[];
  MenuListProps?: Omit<MenuListProps, 'children'>;
  ListItemTextProps?: Omit<ListItemTextProps, 'primary'>;
}

const NavigationNavbar: React.FC<NavigationNavbarProps> = ({
  navigationItems,
  MenuListProps = {},
  ListItemTextProps = {}
}) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const [openSectionId, setOpenSectionId] = useState<string | null>(null);
  const toggleSectionOpen = (sectionId: string, event: MouseEvent<SVGSVGElement>) => {
    event.stopPropagation();
    setOpenSectionId((currentOpenSectionId) =>
      currentOpenSectionId === sectionId ? null : sectionId
    );
  };

  return (
    <MenuListStyle {...MenuListProps} dense>
      {navigationItems.map((item) => {
        const isOpen = openSectionId === item.id;
        const permission = item.permission ?? true;
        const addDivider = item.addDivider ?? false;

        const showOnWeb = item.showOnWeb ?? true;

        if (!showOnWeb && isDesktop) {
          return null;
        }

        return (
          <React.Fragment key={item.id}>
            <MenuItem
              disabled={!permission}
              onClick={item.onClick}
              data-testid={`nav-item-${item.id}`}
            >
              <MenuItemList>
                {item.icon && <IconWrapper>{item.icon}</IconWrapper>}
                <ListItemText primary={item.title} {...ListItemTextProps} />
              </MenuItemList>
              {item.subItems && (
                <ListItemText data-testid={`nav-toggle-${item.id}`}>
                  {isOpen ? (
                    <ExpandLessIcon onClick={(e) => toggleSectionOpen(item.id, e)} />
                  ) : (
                    <ExpandMoreIcon onClick={(e) => toggleSectionOpen(item.id, e)} />
                  )}
                </ListItemText>
              )}
            </MenuItem>
            {item.subItems && (
              <Collapse in={isOpen} timeout="auto" unmountOnExit variant="submenu">
                {item.subItems.map((subItem) => (
                  <MenuItem
                    key={subItem.id}
                    disabled={!subItem.permission}
                    onClick={subItem.onClick}
                    data-testid={`nav-subitem-${subItem.id}`}
                  >
                    <MenuItemSubList>
                      {subItem.icon && <SubIconWrapper>{subItem.icon}</SubIconWrapper>}
                      <ListItemText primary={subItem.title} {...ListItemTextProps} />
                    </MenuItemSubList>
                  </MenuItem>
                ))}
              </Collapse>
            )}
            {addDivider && <Divider />}
          </React.Fragment>
        );
      })}
    </MenuListStyle>
  );
};

export default NavigationNavbar;
