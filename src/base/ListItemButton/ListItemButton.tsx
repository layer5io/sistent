import {
  ListItemButton as MuiListItemButton,
  ListItemButtonProps as MuiListItemButtonProps
} from '@mui/material';
import React from 'react';
import { useHasPermission, type PermissionAction } from '../../custom/PermissionProvider';
import { Key, PermissionShield } from '../../custom/permissions';

export interface ListItemButtonProps extends MuiListItemButtonProps {
  permissionKey?: Key;
  /**
   * Determines behavior when the user lacks the required permission.
   *
   * - `'showShield'` (default) — disables the button and shows a shield icon
   *   with a permission-metadata tooltip.
   * - `'hide'` — renders nothing.
   *
   * Ignored when `permissionKey` is not provided.
   */
  permissionAction?: PermissionAction;
}

const ListItemButton = React.forwardRef<HTMLDivElement, ListItemButtonProps>((props, ref) => {
  const { permissionKey, permissionAction = 'showShield', disabled, ...rest } = props;
  const hasPermission = useHasPermission(permissionKey);

  // useHasPermission returns true when no permissionKey is provided (backward compatible)
  if (hasPermission) {
    return <MuiListItemButton {...rest} ref={ref} disabled={disabled} />;
  }

  // User LACKS permission → apply the permissionAction
  if (permissionAction === 'hide') {
    return null;
  }

  return (
    <PermissionShield permissionKey={permissionKey!} variant="inline">
      <MuiListItemButton {...rest} ref={ref} disabled={true} />
    </PermissionShield>
  );
});

ListItemButton.displayName = 'ListItemButton';

export { ListItemButton };
export default ListItemButton;
