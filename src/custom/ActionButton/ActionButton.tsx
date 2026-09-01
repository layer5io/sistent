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
import type { PermissionAction, PermissionKeySpec } from '../PermissionProvider';

/**
 * Represents an individual menu item in the ActionButton dropdown.
 */
export interface Option {
  /** Leading icon rendered next to the menu item label. */
  icon: React.ReactNode;
  /** Display text for the menu option. */
  label: string;
  /** Click callback triggered when the option is selected. */
  onClick: (event: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => void;
  /** When true, renders a horizontal Divider instead of a MenuItem. */
  isDivider?: boolean;
  /** When false, the option is filtered out and not rendered. */
  show?: boolean;
  /** When true, disables the menu option from user interaction. */
  disabled?: boolean;
  /** Permission key specification for RBAC CASL gating. */
  permissionKey?: PermissionKeySpec;
  /** Permission action (e.g. 'showShield' | 'hide') for CASL gating. */
  permissionAction?: PermissionAction;
}

/**
 * Props for the ActionButton split-button component.
 */
export interface ActionButtonProps {
  /** Optional click handler for the primary button. If omitted, clicking toggles the dropdown. */
  defaultActionClick?: () => void;
  /** Whether the primary action button is disabled. */
  defaultActionDisabled?: boolean;
  /** List of dropdown menu options. */
  options: Option[];
  /** Primary button label text; defaults to `'Action'`. */
  label?: string;
  /** Popper placement relative to the button group; defaults to `'bottom-end'`. */
  placement?: 'bottom-start' | 'bottom' | 'bottom-end' | 'top-start' | 'top' | 'top-end';
  /** Permission key passed down to the primary Button for CASL gating. */
  permissionKey?: PermissionKeySpec;
  /** Permission action for the primary Button. */
  permissionAction?: PermissionAction;
}

/**
 * ActionButton — Split-button component featuring a primary action and a nested dropdown menu.
 */
export default function ActionButton({
  defaultActionClick,
  defaultActionDisabled = false,
  options,
  label = 'Action',
  placement = 'bottom-end',
  permissionKey,
  permissionAction
}: ActionButtonProps): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);

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
        <Button
          onClick={handleMainClick}
          variant="contained"
          disabled={defaultActionDisabled}
          permissionKey={permissionKey}
          permissionAction={permissionAction}
        >
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
                      permissionKey={option.permissionKey}
                      permissionAction={option.permissionAction}
                      onClick={(event) => {
                        if (option.disabled) {
                          return;
                        }
                        setOpen(false);
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
