import { Checkbox as MuiCheckbox, type CheckboxProps as MuiCheckboxProps } from '@mui/material';
import React from 'react';
import { useHasPermission, type PermissionAction } from '../../custom/PermissionProvider';
import { Key, PermissionShield } from '../../custom/permissions';

export interface CheckboxProps extends MuiCheckboxProps {
  permissionKey?: Key;
  /**
   * Determines behavior when the user lacks the required permission.
   *
   * - `'showShield'` (default) — disables the checkbox and shows a shield icon
   *   with a permission-metadata tooltip.
   * - `'hide'` — renders nothing.
   *
   * Ignored when `permissionKey` is not provided.
   */
  permissionAction?: PermissionAction;
}

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>((props, ref) => {
  const { permissionKey, permissionAction = 'showShield', ...muiProps } = props;
  const hasPermission = useHasPermission(permissionKey);

  // useHasPermission returns true when no permissionKey is provided (backward compatible)
  if (hasPermission) {
    return <MuiCheckbox {...muiProps} ref={ref} />;
  }

  // User LACKS permission → apply the permissionAction
  if (permissionAction === 'hide') {
    return null;
  }

  return (
    <PermissionShield permissionKey={permissionKey!} variant="badge">
      <MuiCheckbox {...muiProps} ref={ref} disabled={true} />
    </PermissionShield>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
