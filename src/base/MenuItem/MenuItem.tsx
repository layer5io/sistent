import { ListItemButton, MenuItemProps as MuiMenuItemProps } from '@mui/material';
import { dividerClasses } from '@mui/material/Divider';
import { listItemIconClasses } from '@mui/material/ListItemIcon';
import { listItemTextClasses } from '@mui/material/ListItemText';
import { getMenuItemUtilityClass, menuItemClasses } from '@mui/material/MenuItem';
import { alpha, styled } from '@mui/material/styles';
import composeClasses from '@mui/utils/composeClasses';
import clsx from 'clsx';
import React from 'react';

type MenuItemOwnerState = Pick<
  MuiMenuItemProps,
  'classes' | 'dense' | 'disabled' | 'divider' | 'disableGutters' | 'selected'
>;

const useUtilityClasses = (ownerState: MenuItemOwnerState) => {
  const { disabled, dense, divider, disableGutters, selected, classes } = ownerState;

  const slots = {
    root: [
      'root',
      dense && 'dense',
      disabled && 'disabled',
      !disableGutters && 'gutters',
      divider && 'divider',
      selected && 'selected'
    ]
  };

  return {
    ...classes,
    ...composeClasses(slots, getMenuItemUtilityClass, classes)
  };
};

const StandaloneMenuItemRoot = styled(ListItemButton, {
  name: 'MuiMenuItem',
  slot: 'Root'
})(({ theme }) => ({
  ...theme.typography.body1,
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  position: 'relative',
  textDecoration: 'none',
  minHeight: 48,
  boxSizing: 'border-box',
  whiteSpace: 'nowrap',
  [`& .${listItemTextClasses.root}`]: {
    marginTop: 0,
    marginBottom: 0
  },
  [`& .${listItemTextClasses.inset}`]: {
    paddingLeft: 36
  },
  [`& .${listItemIconClasses.root}`]: {
    minWidth: 36
  },
  [`& + .${dividerClasses.root}`]: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  [`& + .${dividerClasses.inset}`]: {
    marginLeft: 52
  },
  '&:hover': {
    textDecoration: 'none',
    backgroundColor: theme.palette.action.hover,
    '@media (hover: none)': {
      backgroundColor: 'transparent'
    }
  },
  [`&.${menuItemClasses.selected}`]: {
    backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    [`&.${menuItemClasses.focusVisible}`]: {
      backgroundColor: alpha(
        theme.palette.primary.main,
        theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity
      )
    }
  },
  [`&.${menuItemClasses.selected}:hover`]: {
    backgroundColor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity
    ),
    '@media (hover: none)': {
      backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
    }
  },
  [`&.${menuItemClasses.focusVisible}`]: {
    backgroundColor: theme.palette.action.focus
  },
  [`&.${menuItemClasses.disabled}`]: {
    opacity: theme.palette.action.disabledOpacity
  },
  variants: [
    {
      props: ({ disableGutters }: MenuItemOwnerState) => !disableGutters,
      style: {
        paddingLeft: 16,
        paddingRight: 16
      }
    },
    {
      props: ({ divider }: MenuItemOwnerState) => divider,
      style: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundClip: 'padding-box'
      }
    },
    {
      props: ({ dense }: MenuItemOwnerState) => !dense,
      style: {
        [theme.breakpoints.up('sm')]: {
          minHeight: 'auto'
        }
      }
    },
    {
      props: ({ dense }: MenuItemOwnerState) => dense,
      style: {
        minHeight: 32,
        paddingTop: 4,
        paddingBottom: 4,
        ...theme.typography.body2,
        [`& .${listItemIconClasses.root} svg`]: {
          fontSize: '1.25rem'
        }
      }
    }
  ]
}));

function assignRef<T>(ref: React.Ref<T> | undefined, value: T | null) {
  if (typeof ref === 'function') {
    ref(value);
    return;
  }

  if (ref) {
    (ref as React.MutableRefObject<T | null>).current = value;
  }
}

export const MenuItem = React.forwardRef<HTMLElement, MuiMenuItemProps>(
  function MenuItem(props, ref) {
    const {
      autoFocus = false,
      className,
      classes,
      component = 'li',
      dense = false,
      divider = false,
      disableGutters = false,
      disabled = false,
      focusVisibleClassName,
      role = 'menuitem',
      selected = false,
      tabIndex: tabIndexProp,
      ...other
    } = props;
    const itemRef = React.useRef<HTMLElement | null>(null);

    const ownerState = {
      classes,
      dense,
      disabled,
      divider,
      disableGutters,
      selected
    };
    const resolvedClasses = useUtilityClasses(ownerState);

    React.useEffect(() => {
      if (autoFocus) {
        itemRef.current?.focus();
      }
    }, [autoFocus]);

    const handleRef = React.useCallback(
      (element: HTMLElement | null) => {
        itemRef.current = element;
        assignRef(ref, element);
      },
      [ref]
    );

    return (
      <StandaloneMenuItemRoot
        ref={handleRef}
        className={clsx(resolvedClasses.root, className)}
        component={component}
        dense={dense}
        disableGutters={disableGutters}
        divider={divider}
        disabled={disabled}
        focusVisibleClassName={clsx(resolvedClasses.focusVisible, focusVisibleClassName)}
        role={role}
        selected={selected}
        tabIndex={tabIndexProp ?? (disabled ? -1 : 0)}
        {...other}
      />
    );
  }
);

export default MenuItem;
