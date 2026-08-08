import {
  ListItemText as MuiListItemText,
  ListItemTextProps as MuiListItemTextProps
} from '@mui/material';
import type { ListItemTextOwnerState } from '@mui/material/ListItemText';

function withNoWrapDefault<T extends object>(
  slotProp: T | ((ownerState: ListItemTextOwnerState) => T) | undefined
): T | ((ownerState: ListItemTextOwnerState) => T) {
  if (typeof slotProp === 'function') {
    return (ownerState: ListItemTextOwnerState) => ({
      noWrap: true,
      ...slotProp(ownerState)
    });
  }
  return { noWrap: true, ...slotProp } as T;
}

export function ListItemText({
  slotProps,
  ...props
}: MuiListItemTextProps): JSX.Element {
  const { primary, secondary } = slotProps ?? {};

  return (
    <MuiListItemText
      slotProps={{
        ...slotProps,
        primary: withNoWrapDefault(primary),
        secondary: withNoWrapDefault(secondary)
      }}
      {...props}
    />
  );
}
