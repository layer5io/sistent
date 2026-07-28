import {
  ListItemText as MuiListItemText,
  ListItemTextProps as MuiListItemTextProps
} from '@mui/material';

function withNoWrapDefault<T extends object>(
  slotProp: T | ((ownerState: any) => T) | undefined
) {
  if (typeof slotProp === 'function') {
    return (ownerState: any) => ({
      noWrap: true,
      ...slotProp(ownerState)
    });
  }
  return { noWrap: true, ...slotProp };
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
