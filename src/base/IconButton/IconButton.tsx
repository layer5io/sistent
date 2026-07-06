import {
  IconButton as MuiIconButton,
  type IconButtonProps as MuiIconButtonProps
} from '@mui/material';
import React from 'react';
import { Key, PermissionAction, usePermission, PermissionShield } from '../../custom/permissions';

export interface IconButtonProps extends MuiIconButtonProps {
  permissionKey?: Key;
  permissionAction?: PermissionAction;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => {
  const { permissionKey, permissionAction = 'disable', ...rest } = props;
  const { hasPermission, action } = usePermission({ permissionKey, permissionAction });

  if (!hasPermission) {
    switch (action) {
      case 'hide':
        return null;
      case 'showShield':
        return (
          <PermissionShield permissionKey={permissionKey!} variant="badge">
            <MuiIconButton ref={ref} {...rest} disabled={true} />
          </PermissionShield>
        );
      case 'disable':
      default:
        return <MuiIconButton ref={ref} {...rest} disabled={true} />;
    }
  }

  return <MuiIconButton ref={ref} {...rest} />;
});

IconButton.displayName = 'IconButton';

export default IconButton;
