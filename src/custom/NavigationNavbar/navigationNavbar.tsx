import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
};

type NavigationNavbarProps = {
  navigationItems: NavigationItem[];
};

const NavigationNavbar: React.FC<NavigationNavbarProps> = ({ navigationItems }) => {
  const [openSectionId, setOpenSectionId] = useState<string | null>(null);

  const toggleSectionOpen = (sectionId: string, event: MouseEvent<SVGSVGElement>) => {
    event.stopPropagation();
    setOpenSectionId((currentOpenSectionId) =>
      currentOpenSectionId === sectionId ? null : sectionId
    );
  };

  const NavigationNavbarItems = () => {
    return navigationItems.map((item) => {
      const isOpen = openSectionId === item.id;
      const permission = item.permission ?? true;
      const addDivider = item.addDivider ?? false;

      return (
        <React.Fragment key={item.id}>
          <MenuItem disabled={!permission} onClick={item.onClick}>
            <MenuItemList>
              <IconWrapper>{item.icon}</IconWrapper>
              <ListItemText primary={item.title} />
            </MenuItemList>
            {item.subItems && (
              <ListItemText>
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
                <MenuItem key={subItem.id} disabled={!subItem.permission} onClick={subItem.onClick}>
                  <MenuItemSubList>
                    <SubIconWrapper>{subItem.icon}</SubIconWrapper>
                    <ListItemText primary={subItem.title} />
                  </MenuItemSubList>
                </MenuItem>
              ))}
            </Collapse>
          )}

          {addDivider && <Divider />}
        </React.Fragment>
      );
    });
  };

  return <MenuListStyle dense>{NavigationNavbarItems()}</MenuListStyle>;
};

export default NavigationNavbar;
