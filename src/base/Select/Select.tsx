import { Select as MuiSelect, type SelectProps as MuiSelectProps } from '@mui/material';
import React from 'react';
import { useHasPermission, type PermissionAction } from '../../custom/PermissionProvider';
import { Key, PermissionShield } from '../../custom/permissions';

export type SelectProps = MuiSelectProps & {
  permissionKey?: Key;
  /**
   * Determines behavior when the user lacks the required permission.
   *
   * - `'showShield'` (default) — disables the select and shows a shield icon
   *   with a permission-metadata tooltip.
   * - `'hide'` — renders nothing.
   *
   * Ignored when `permissionKey` is not provided.
   */
  permissionAction?: PermissionAction;
};

const Select = React.forwardRef<HTMLDivElement, SelectProps>((props, ref) => {
  const { permissionKey, permissionAction = 'showShield', ...muiProps } = props;
  const hasPermission = useHasPermission(permissionKey);

  // useHasPermission returns true when no permissionKey is provided (backward compatible)
  if (hasPermission) {
    return <MuiSelect {...muiProps} ref={ref} />;
  }

  // User LACKS permission → apply the permissionAction
  if (permissionAction === 'hide') {
    return null;
  }

  return (
    <PermissionShield permissionKey={permissionKey!} variant="inline">
      <MuiSelect {...muiProps} ref={ref} disabled={true} />
    </PermissionShield>
  );
});

Select.displayName = 'Select';

export default Select;
