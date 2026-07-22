import { TextField as MuiTextField, type TextFieldProps as MuiTextFieldProps } from '@mui/material';
import React from 'react';
import { useHasPermission, type PermissionAction } from '../../custom/PermissionProvider';
import { Key, PermissionShield } from '../../custom/permissions';

export type TextFieldProps = MuiTextFieldProps & {
  permissionKey?: Key;
  /**
   * Determines behavior when the user lacks the required permission.
   *
   * - `'showShield'` (default) — disables the text field and shows a shield icon
   *   with a permission-metadata tooltip.
   * - `'hide'` — renders nothing.
   *
   * Ignored when `permissionKey` is not provided.
   */
  permissionAction?: PermissionAction;
};

const TextField = React.forwardRef<HTMLDivElement, TextFieldProps>((props, ref) => {
  const { permissionKey, permissionAction = 'showShield', ...muiProps } = props;
  const hasPermission = useHasPermission(permissionKey);

  // useHasPermission returns true when no permissionKey is provided (backward compatible)
  if (hasPermission) {
    return <MuiTextField {...muiProps} ref={ref} />;
  }

  // User LACKS permission → apply the permissionAction
  if (permissionAction === 'hide') {
    return null;
  }

  return (
    <PermissionShield permissionKey={permissionKey!} variant="inline">
      <MuiTextField {...muiProps} ref={ref} disabled={true} />
    </PermissionShield>
  );
});

TextField.displayName = 'TextField';

export default TextField;
