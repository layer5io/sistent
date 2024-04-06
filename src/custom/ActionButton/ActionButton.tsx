import * as React from 'react';
import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  MenuItem,
  MenuList,
  Paper,
  Popper
} from '../../base';
import { DropDownIcon } from '../../icons';
interface Option {
  icon: React.ReactNode;
  label: string;
  onClick: (event: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => void;
}

interface ActionButtonProps {
  defaultActionClick: () => void;
  options: Option[];
  label: string;
}

export default function ActionButton({
  defaultActionClick,
  options,
  label
}: ActionButtonProps): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenuItemClick = () => {
    setOpen(false);
  };

  const handleToggle = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup
        variant="contained"
        style={{ boxShadow: 'none' }}
        aria-label="Button group with a nested menu"
      >
        <Button onClick={defaultActionClick} variant="contained">
          {label}
        </Button>
        <Button size="small" onClick={handleToggle} variant="contained">
          <DropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1
        }}
        open={open}
        anchorEl={anchorEl}
        role={undefined}
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
      </Popper>
    </React.Fragment>
  );
}
