import * as React from 'react';
import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  Divider,
  MenuItem,
  MenuList,
  Paper,
  Popper
} from '../../base';
import { DropDownIcon } from '../../icons';

export interface Option {
  icon: React.ReactNode;
  label: string;
  onClick: (event: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => void;
  isDivider?: boolean;
  show?: boolean;
  disabled?: boolean;
}

export interface ActionButtonProps {
  defaultActionClick?: () => void;
  defaultActionDisabled?: boolean;
  options: Option[];
  label?: string;
  placement?: 'bottom-start' | 'bottom' | 'bottom-end' | 'top-start' | 'top' | 'top-end';
}

export default function ActionButton({
  defaultActionClick,
  defaultActionDisabled = false,
  options,
  label = 'Action',
  placement = 'bottom-start'
}: ActionButtonProps): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);

  const handleMenuItemClick = () => {
    setOpen(false);
  };

  const handleToggle = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as Node)) {
      return;
    }
    setOpen(false);
  };

  const handleMainClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (defaultActionClick) {
      defaultActionClick();
    } else {
      handleToggle(event);
    }
  };

  return (
    <React.Fragment>
      <ButtonGroup
        variant="contained"
        style={{ boxShadow: 'none' }}
        ref={anchorRef}
        aria-label="Button group with a nested menu"
      >
        <Button onClick={handleMainClick} variant="contained" disabled={defaultActionDisabled}>
          {label}
        </Button>
        <Button
          size="small"
          onClick={handleToggle}
          variant="contained"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="menu"
        >
          <DropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement={placement}
      >
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList id="split-button-menu" autoFocusItem>
              {options
                .filter((option) => option?.show !== false)
                .map((option, index) =>
                  option.isDivider ? (
                    <Divider key={index} />
                  ) : (
                    <MenuItem
                      key={index}
                      disabled={option.disabled}
                      onClick={(event) => {
                        if (option.disabled) {
                          return;
                        }
                        handleMenuItemClick();
                        option.onClick(event, index);
                      }}
                    >
                      <div style={{ marginRight: '1rem' }}>{option.icon}</div>
                      {option.label}
                    </MenuItem>
                  )
                )}
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </React.Fragment>
  );
}
