import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ListItemTextProps, MenuListProps, useMediaQuery, useTheme } from '@mui/material';
import React, { MouseEvent, useState } from 'react';
import { Collapse, Divider, ListItemText, MenuItem } from '../../base';
import { type PermissionAction } from '../PermissionProvider';
import { type Key } from '../permissions';
import { IconWrapper, MenuItemList, MenuItemSubList, MenuListStyle, SubIconWrapper } from './style';

export type NavigationItem = {
  id: string;
  /**
   * Label rendered into `ListItemText`'s `primary` slot.
   *
   * Accepts any `React.ReactNode`, not just a string, so composed labels -
   * a label plus a trailing external-link glyph, a `<Chip>` badge, a count -
   * type-check as well as they already render.
   */
  title: React.ReactNode;
  icon?: React.ReactNode;
  /**
   * Legacy boolean permission flag.
   * When `permissionKey` is provided, this field is ignored.
   * @deprecated Prefer `permissionKey` for automatic PermissionShield support.
   */
  permission?: boolean;
  /**
   * Sistent permission key for automatic PermissionShield integration.
   * When provided, the underlying `MenuItem` receives this key and handles
   * disabled state + shield tooltip automatically. Takes precedence over `permission`.
   */
  permissionKey?: Key;
  /**
   * Determines behavior when the user lacks the required permission.
   * Only used when `permissionKey` is provided.
   *
   * - `'showShield'` (default) — disables the item and shows a shield icon.
   * - `'hide'` — renders nothing.
   */
  permissionAction?: PermissionAction;
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
        const addDivider = item.addDivider ?? false;

        const showOnWeb = item.showOnWeb ?? true;

        if (!showOnWeb && isDesktop) {
          return null;
        }

        // When permissionKey is provided, let MenuItem handle permission gating.
        // Otherwise fall back to the legacy boolean `permission` field.
        const usePermissionKey = !!item.permissionKey;
        const legacyPermission = item.permission ?? true;

        return (
          <React.Fragment key={item.id}>
            <MenuItem
              disabled={usePermissionKey ? undefined : !legacyPermission}
              permissionKey={item.permissionKey}
              permissionAction={item.permissionAction}
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
                {item.subItems.map((subItem) => {
                  const useSubPermissionKey = !!subItem.permissionKey;
                  const subLegacyPermission = subItem.permission ?? true;

                  return (
                    <MenuItem
                      key={subItem.id}
                      disabled={useSubPermissionKey ? undefined : !subLegacyPermission}
                      permissionKey={subItem.permissionKey}
                      permissionAction={subItem.permissionAction}
                      onClick={subItem.onClick}
                      data-testid={`nav-subitem-${subItem.id}`}
                    >
                      <MenuItemSubList>
                        {subItem.icon && <SubIconWrapper>{subItem.icon}</SubIconWrapper>}
                        <ListItemText primary={subItem.title} {...ListItemTextProps} />
                      </MenuItemSubList>
                    </MenuItem>
                  );
                })}
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
