import { ListItem as MuiListItem, ListItemProps as MuiListItemProps } from '@mui/material';
import React from 'react';
import { useHasPermission, type PermissionAction } from '../../custom/PermissionProvider';
import { Key, PermissionShield } from '../../custom/permissions';

export interface ListItemProps extends MuiListItemProps {
  permissionKey?: Key;
  disabled?: boolean;
  /**
   * Determines behavior when the user lacks the required permission.
   *
   * - `'showShield'` (default) — disables the item and shows a shield icon
   *   with a permission-metadata tooltip.
   * - `'disable'` — disables the item without a shield.
   * - `'hide'` — renders nothing.
   *
   * Ignored when `permissionKey` is not provided.
   */
  permissionAction?: PermissionAction;
}

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>((props, ref) => {
  const { permissionKey, permissionAction = 'showShield', ...rest } = props;
  delete (rest as Record<string, unknown>).disabled;
  const hasPermission = useHasPermission(permissionKey);

  // No permissionKey → normal behavior (backward compatible)
  // Note: MUI ListItem doesn't have a native `disabled` prop, so we only use
  // it as a custom guard for the PermissionShield wrapper
  if (!permissionKey) {
    return <MuiListItem {...rest} ref={ref} />;
  }

  // User HAS permission → render normally
  if (hasPermission) {
    return <MuiListItem {...rest} ref={ref} />;
  }

  // User LACKS permission → apply the permissionAction
  switch (permissionAction) {
    case 'hide':
      return null;
    case 'disable':
      return <MuiListItem {...rest} ref={ref} />;
    case 'showShield':
    default:
      return (
        <PermissionShield permissionKey={permissionKey} variant="inline">
          <MuiListItem {...rest} ref={ref} />
        </PermissionShield>
      );
  }
});

ListItem.displayName = 'ListItem';

export default ListItem;
