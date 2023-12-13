import { PopperPlacementType, PopperProps } from '@mui/material/Popper';
import { Popper } from '../base/Popper';

export interface IPopperListener extends PopperProps {
  open: boolean;
  anchorEl: HTMLElement | null | undefined;
  children: React.ReactNode;
  placement?: PopperPlacementType;
}

export function PopperListener({
  children,
  open,
  anchorEl,
  placement = 'bottom-end',
  ...props
}: IPopperListener): JSX.Element {
  return (
    <Popper open={open} anchorEl={anchorEl} placement={placement} {...props}>
      {children}
    </Popper>
  );
}

export default PopperListener;
