import {
  IconButton as MuiIconButton,
  type IconButtonProps as MuiIconButtonProps
} from '@mui/material';
import React from 'react';
import { Key, PermissionShield } from '../../custom/permissions';

export interface IconButtonProps extends MuiIconButtonProps {
  permissionKey?: Key;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => {
  const { permissionKey, disabled, ...rest } = props;

  // When disabled AND permissionKey is provided, show the shield overlay
  if (disabled && permissionKey) {
    return (
      <PermissionShield permissionKey={permissionKey} variant="badge">
        <MuiIconButton ref={ref} {...rest} disabled={true} />
      </PermissionShield>
    );
  }

  return <MuiIconButton ref={ref} {...rest} disabled={disabled} />;
});

IconButton.displayName = 'IconButton';

export default IconButton;
