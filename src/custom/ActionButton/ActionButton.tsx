import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper
} from '@mui/material';
import * as React from 'react';

interface Option {
  icon: React.ReactNode;
  label: string;
  onClick: (event: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => void;
}

interface ActionButtonProps {
  defaultActionClick: () => void;
  options: Option[];
}

export default function ActionButton({
  defaultActionClick,
  options
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

  return (
    <React.Fragment>
      <ButtonGroup
        variant="contained"
        style={{ boxShadow: 'none' }}
        ref={anchorRef}
        aria-label="Button group with a nested menu"
      >
        <Button onClick={defaultActionClick} variant="contained">
          Action
        </Button>
        <Button size="small" onClick={handleToggle} variant="contained">
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={index}
                      onClick={(event) => {
                        handleMenuItemClick();
                        option.onClick(event, index);
                      }}
                    >
                      <div style={{ marginRight: '1rem' }}>{option.icon}</div>
                      {option.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}
