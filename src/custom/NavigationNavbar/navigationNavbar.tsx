import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ListItemTextProps, MenuListProps, useMediaQuery, useTheme } from '@mui/material';
import React, { MouseEvent, useState } from 'react';
import { Collapse, Divider, ListItemText, MenuItem } from '../../base';
import {
  useHasPermission,
  type PermissionAction,
  type PermissionKeySpec
} from '../PermissionProvider';
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
   * `false` makes the item inert rather than merely styled as disabled: it
   * neither navigates nor expands its sub-items.
   * @deprecated Prefer `permissionKey` for automatic PermissionShield support.
   */
  permission?: boolean;
  /**
   * Sistent permission key for automatic PermissionShield integration.
   * When provided, the underlying `MenuItem` receives this key and handles
   * disabled state + shield tooltip automatically. Takes precedence over `permission`.
   *
   * Accepts a single `Key` or a key set — `{ anyOf: [...] }` / `{ allOf: [...] }`.
   * A section/parent item is reachable exactly when at least one of its children
   * is, so gate it on `{ anyOf: [...every child key...] }`.
   */
  permissionKey?: PermissionKeySpec;
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

/**
 * Whether the user may reach this item.
 *
 * `permissionKey` takes precedence over the legacy `permission` boolean, exactly
 * as the `disabled` wiring below already did — this only makes the resulting
 * decision available to the navbar itself so an unreachable item can be made
 * inert rather than merely styled as disabled.
 */
const useIsNavigationItemPermitted = (item: NavigationItem): boolean => {
  const hasPermission = useHasPermission(item.permissionKey);
  return item.permissionKey ? hasPermission : (item.permission ?? true);
};

/** Never navigates. Replaces `onClick` on an item the user cannot reach. */
const noop = () => {};

interface NavigationNavbarItemProps {
  item: NavigationItem;
  isOpen: boolean;
  onToggle: (sectionId: string, event: MouseEvent<SVGSVGElement>) => void;
  ListItemTextProps: Omit<ListItemTextProps, 'primary'>;
}

const NavigationNavbarSubItem: React.FC<{
  item: NavigationItem;
  ListItemTextProps: Omit<ListItemTextProps, 'primary'>;
}> = ({ item, ListItemTextProps }) => {
  const isPermitted = useIsNavigationItemPermitted(item);

  return (
    <MenuItem
      disabled={item.permissionKey ? undefined : !(item.permission ?? true)}
      permissionKey={item.permissionKey}
      permissionAction={item.permissionAction}
      onClick={isPermitted ? item.onClick : noop}
      data-testid={`nav-subitem-${item.id}`}
    >
      <MenuItemSubList>
        {item.icon && <SubIconWrapper>{item.icon}</SubIconWrapper>}
        <ListItemText primary={item.title} {...ListItemTextProps} />
      </MenuItemSubList>
    </MenuItem>
  );
};

const NavigationNavbarItem: React.FC<NavigationNavbarItemProps> = ({
  item,
  isOpen,
  onToggle,
  ListItemTextProps
}) => {
  // An item the user cannot reach must be inert, not merely styled as disabled:
  // it may neither navigate nor toggle its children open. A section gated on
  // `{ anyOf: [...child keys...] }` that resolves to false means every child is
  // unreachable too, so expanding it would only offer more dead ends, and
  // activating it lands the user on a "you don't have permission" error page.
  const isPermitted = useIsNavigationItemPermitted(item);
  const expanded = isPermitted && isOpen;

  return (
    <>
      <MenuItem
        disabled={item.permissionKey ? undefined : !(item.permission ?? true)}
        permissionKey={item.permissionKey}
        permissionAction={item.permissionAction}
        onClick={isPermitted ? item.onClick : noop}
        data-testid={`nav-item-${item.id}`}
      >
        <MenuItemList>
          {item.icon && <IconWrapper>{item.icon}</IconWrapper>}
          <ListItemText primary={item.title} {...ListItemTextProps} />
        </MenuItemList>
        {item.subItems && (
          <ListItemText data-testid={`nav-toggle-${item.id}`}>
            {expanded ? (
              <ExpandLessIcon onClick={isPermitted ? (e) => onToggle(item.id, e) : noop} />
            ) : (
              <ExpandMoreIcon onClick={isPermitted ? (e) => onToggle(item.id, e) : noop} />
            )}
          </ListItemText>
        )}
      </MenuItem>
      {item.subItems && (
        <Collapse in={expanded} timeout="auto" unmountOnExit variant="submenu">
          {item.subItems.map((subItem) => (
            <NavigationNavbarSubItem
              key={subItem.id}
              item={subItem}
              ListItemTextProps={ListItemTextProps}
            />
          ))}
        </Collapse>
      )}
    </>
  );
};

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
        const showOnWeb = item.showOnWeb ?? true;

        if (!showOnWeb && isDesktop) {
          return null;
        }

        return (
          <React.Fragment key={item.id}>
            <NavigationNavbarItem
              item={item}
              isOpen={openSectionId === item.id}
              onToggle={toggleSectionOpen}
              ListItemTextProps={ListItemTextProps}
            />
            {(item.addDivider ?? false) && <Divider />}
          </React.Fragment>
        );
      })}
    </MenuListStyle>
  );
};

export default NavigationNavbar;
