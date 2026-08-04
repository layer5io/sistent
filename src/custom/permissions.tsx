import { Key } from '@meshery/schemas/permissions';
import SecurityIcon from '@mui/icons-material/Security';
import React from 'react';
import type {
  MissingCapabilityReason,
  MissingPermissionReason
} from '../actors/mesheryExtensionContract';
import { MESHERY_EXTENSION_EVENT } from '../actors/mesheryExtensionContract';
import { Box, ClickAwayListener, Tooltip } from '../base';
import { PERMISSION_SHIELD_CARD_SX, PermissionShieldContent } from './PermissionShieldContent';
export { PERMISSION_SHIELD_CARD_SX, PermissionShieldContent };
export type { PermissionShieldContentProps } from './PermissionShieldContent';
export type { Key };

export type InvertAction = 'disable' | 'hide';

// These two reason events are published onto whichever bus the caller supplies,
// which in Meshery is the host <-> extension bus. They are therefore part of the
// extension contract and are declared there, so the host's typed bus and every
// extension's subscriber derive them from one place. Re-exported here to keep the
// long-standing `@sistent/sistent` import paths working.
export type { MissingCapabilityReason, MissingPermissionReason };

export type ReasonEvent = MissingPermissionReason | MissingCapabilityReason;

/**
 * The only capability `createCanShow` needs from the bus it is handed.
 *
 * Deliberately structural rather than `EventBus<ReasonEvent>`: `EventBus<T>` is
 * invariant in `T` (it both accepts `T` in `publish` and yields `T` from `on`),
 * so the host's `EventBus<MesheryExtensionEvent>` — the bus the contract tells
 * every host to declare — is NOT assignable to `EventBus<ReasonEvent>` and the
 * integration fails to compile. A publisher that accepts the whole contract
 * union can obviously accept a reason event, and that is all this needs.
 */
export type ReasonEventPublisher = {
  publish: (event: ReasonEvent) => void;
};

export interface HasKeyProps<ReasonEvent> {
  Key?: Key & { action?: string; subject?: string };
  predicate?: (capabilitiesRegistry: unknown) => [boolean, ReasonEvent];
  children: React.ReactNode;
  notifyOnclick?: boolean;
  invert_action?: InvertAction[];
}

export interface PermissionShieldProps {
  permissionKey: Key;
  children: React.ReactNode;
  variant?: 'inline' | 'badge';
}

/**
 * PermissionShield Wrapper Component
 *
 * Renders children with a shield icon overlay showing permission metadata.
 * This is a pure visual component — it does NOT check permissions itself.
 * The consumer is responsible for determining disabled state (e.g. via CAN()).
 *
 * Usage in base components: when `disabled` is true AND `permissionKey` is provided,
 * the component automatically wraps itself in PermissionShield.
 */
export const PermissionShield: React.FC<PermissionShieldProps> = ({
  permissionKey,
  children,
  variant = 'inline'
}) => {
  const [open, setOpen] = React.useState(false);
  const uniqueId = React.useId();

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen((prev) => {
      const next = !prev;
      if (next) {
        window.dispatchEvent(
          new CustomEvent('permission-shield-opened', { detail: { id: uniqueId } })
        );
      }
      return next;
    });
  };

  React.useEffect(() => {
    const handleOtherOpen = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.id !== uniqueId) {
        setOpen(false);
      }
    };
    window.addEventListener('permission-shield-opened', handleOtherOpen);
    return () => {
      window.removeEventListener('permission-shield-opened', handleOtherOpen);
    };
  }, [uniqueId]);

  if (!permissionKey) {
    return <>{children}</>;
  }

  const tooltipTitle = <PermissionShieldContent permissionKey={permissionKey} />;

  const isBadge = variant === 'badge';

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box
        sx={{
          position: 'relative',
          display: isBadge ? 'inline-flex' : 'flex',
          width: isBadge ? 'auto' : '100%',
          alignItems: 'center',
          cursor: 'not-allowed'
        }}
      >
        <Box sx={{ width: '100%', opacity: 0.5, pointerEvents: 'none' }}>{children}</Box>

        <Tooltip
          title={tooltipTitle}
          placement="top"
          open={open}
          onClose={handleClose}
          disableHoverListener
          disableFocusListener
          disableTouchListener
          slotProps={{
            tooltip: {
              sx: PERMISSION_SHIELD_CARD_SX
            }
          }}
        >
          <Box
            onClick={handleToggle}
            sx={
              isBadge
                ? {
                    position: 'absolute',
                    bottom: -6,
                    left: -6,
                    backgroundColor: 'rgba(30, 30, 30, 0.9)',
                    color: '#808080',
                    borderRadius: '50%',
                    width: 18,
                    height: 18,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 2,
                    cursor: 'help',
                    zIndex: 10,
                    pointerEvents: 'auto',
                    transition: 'color 0.2s ease',
                    '&:hover': {
                      color: '#EBC024'
                    }
                  }
                : {
                    position: 'absolute',
                    top: '50%',
                    right: 8,
                    transform: 'translateY(-50%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#808080',
                    transition: 'color 0.2s ease',
                    zIndex: 10,
                    pointerEvents: 'auto',
                    '&:hover': {
                      color: '#EBC024'
                    }
                  }
            }
          >
            <SecurityIcon sx={{ fontSize: '14px', color: 'inherit' }} />
          </Box>
        </Tooltip>
      </Box>
    </ClickAwayListener>
  );
};

// returns the children if the user has the permission to view the component or if a key is not provided
// if the user does not have the permission to view the component, it will return null or a disabled version of the component specified by the invert_action prop
export const createCanShow = (
  getCapabilitiesRegistry = () => {},
  CAN: (action: string, subject: string) => boolean,
  eventBus: () => ReasonEventPublisher
) => {
  return ({
    Key,
    children,
    notifyOnclick = true,
    predicate,
    invert_action = ['disable']
  }: HasKeyProps<ReasonEvent>) => {
    if (!children) {
      return null;
    }

    const actionString = Key?.id || Key?.action || '';
    const subjectString = Key?.function || Key?.subject || '';

    const hasKey = subjectString ? CAN(actionString, subjectString) : true;
    const predicateRes = predicate && predicate(getCapabilitiesRegistry());

    const can = predicateRes ? predicateRes[0] && hasKey : hasKey;

    const reason: ReasonEvent = predicateRes?.[1] || {
      // Named handle, not the raw literal: renaming the event in the contract
      // must break this publish site rather than silently stop matching the
      // subscriber's `event.type === ...` on the far side of the bundle boundary.
      type: MESHERY_EXTENSION_EVENT.MissingPermission,
      data: {
        keyId: actionString
      }
    };

    if (can) {
      return children;
    }

    if (invert_action.includes('hide')) {
      return null;
    }

    const pointerEvents = notifyOnclick ? 'auto' : 'none';

    const onClick = notifyOnclick
      ? (e: React.MouseEvent<HTMLDivElement | HTMLElement>) => {
          e.stopPropagation();
          const mesheryEventBus = eventBus();
          mesheryEventBus.publish(reason);
        }
      : () => {};

    const opacity = invert_action.includes('disable') ? 0.5 : 1;

    return (
      <div
        style={{
          cursor: 'pointer',
          pointerEvents,
          opacity: opacity
        }}
        onClick={onClick}
      >
        {React.isValidElement(children)
          ? React.cloneElement(
              children as React.ReactElement<{
                style?: React.CSSProperties;
                onClick?: React.MouseEventHandler;
              }>,
              {
                style: {
                  ...((
                    children as React.ReactElement<{
                      style?: React.CSSProperties;
                      onClick?: React.MouseEventHandler;
                    }>
                  ).props.style || {}),
                  cursor: 'pointer',
                  pointerEvents,
                  opacity: opacity
                },
                onClick: onClick
              }
            )
          : children}
      </div>
    );
  };
};

// Re-export PermissionProvider types and hooks
export {
  PermissionProvider,
  useHasPermission,
  usePermission,
  usePermissionUserContext
} from './PermissionProvider';
export type {
  PermissionAction,
  PermissionProviderProps,
  PermissionProviderValue,
  PermissionUserContext
} from './PermissionProvider';
