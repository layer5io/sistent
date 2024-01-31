import { Chip as MuiChip, type ChipProps } from '@mui/material';

export function Chip(props: ChipProps): JSX.Element {
  return <MuiChip {...props} />;
}

export default Chip;
