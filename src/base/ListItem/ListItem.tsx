import { ListItem as MuiListItem, ListItemProps as MuiListItemProps } from '@mui/material';
import React from 'react';
import {
  useHasPermission,
  type PermissionAction,
  type PermissionKeySpec
} from '../../custom/PermissionProvider';
import { PermissionShield } from '../../custom/permissions';

export interface ListItemProps extends MuiListItemProps {
  /**
   * A single permission key, or a key set — `{ anyOf: [...] }` (any one key
   * suffices) or `{ allOf: [...] }` (every key required).
   */
  permissionKey?: PermissionKeySpec;
  disabled?: boolean;
  /**
   * Determines behavior when the user lacks the required permission.
   *
   * - `'showShield'` (default) — disables the item and shows a shield icon
   *   with a permission-metadata tooltip.
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

  // useHasPermission returns true when no permissionKey is provided (backward compatible)
  if (hasPermission) {
    return <MuiListItem {...rest} ref={ref} />;
  }

  // User LACKS permission → apply the permissionAction
  if (permissionAction === 'hide') {
    return null;
  }

  return (
    <PermissionShield permissionKey={permissionKey!} variant="inline">
      <MuiListItem {...rest} ref={ref} />
    </PermissionShield>
  );
});

ListItem.displayName = 'ListItem';

export default ListItem;
