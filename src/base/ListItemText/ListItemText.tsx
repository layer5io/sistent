import {
  ListItemText as MuiListItemText,
  ListItemTextProps as MuiListItemTextProps
} from '@mui/material';

export function ListItemText({
  slotProps,
  ...props
}: MuiListItemTextProps): JSX.Element {
  const { primary, secondary, root } = slotProps ?? {};

  return (
    <MuiListItemText
      slotProps={{
        root,
        primary: { noWrap: true, ...primary },
        secondary: { noWrap: true, ...secondary }
      }}
      {...props}
    />
  );
}
