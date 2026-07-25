import { Key } from '@meshery/schemas/permissions';
import KeyIcon from '@mui/icons-material/Key';
import LaunchIcon from '@mui/icons-material/Launch';
import SecurityIcon from '@mui/icons-material/Security';
import React from 'react';
import type {
  MissingCapabilityReason,
  MissingPermissionReason
} from '../actors/mesheryExtensionContract';
import { MESHERY_EXTENSION_EVENT } from '../actors/mesheryExtensionContract';
import { Box, Chip, ClickAwayListener, Link, Tooltip, Typography } from '../base';
import { usePermissionUserContext } from './PermissionProvider';
export type { Key };

const DIVIDER_SX = {
  height: '1px',
  background: 'rgba(255, 255, 255, 0.1)',
  my: 1.25
};

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
  const [copied, setCopied] = React.useState(false);
  const uniqueId = React.useId();
  const userContext = usePermissionUserContext();

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

  const tooltipTitle = (
    <Box sx={{ width: '100%', color: '#FFFFFF', p: 0.5 }}>
      {/* Title: AUTHORIZATION REQUIRED — medium gray */}
      <Typography
        sx={{
          fontSize: '0.65rem',
          fontWeight: 800,
          color: '#9E9E9E',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          mb: 0.5
        }}
      >
        Authorization Required
      </Typography>

      {/* Subtitle */}
      <Typography
        sx={{
          fontSize: '0.75rem',
          color: 'rgba(255, 255, 255, 0.75)',
          mb: 1.25,
          lineHeight: 1.3
        }}
      >
        Missing requisite key
      </Typography>

      {/* Divider */}
      <Box sx={DIVIDER_SX} />

      {/* Key Row: KeyIcon (doubles as copy button) + key name */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 1, mb: 0.25 }}>
        <Tooltip title={copied ? 'Copied!' : 'Copy key ID to clipboard'} placement="top">
          <Box
            component="span"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              navigator.clipboard.writeText(permissionKey.id || '');
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
            sx={{
              display: 'inline-flex',
              cursor: 'pointer',
              color: copied ? '#EBC024' : 'rgba(255, 255, 255, 0.7)',
              transition: 'color 0.2s ease',
              '&:hover': {
                color: '#EBC024'
              }
            }}
          >
            <KeyIcon sx={{ fontSize: '1rem' }} />
          </Box>
        </Tooltip>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: '0.95rem',
            lineHeight: 1.3,
            color: '#FFFFFF'
          }}
        >
          {permissionKey.function || 'Access Restricted'}
        </Typography>
      </Box>

      {/* Description — italicized, equal padding both sides, no divider from key name */}
      <Box sx={{ px: 1, mb: 1.25 }}>
        <Typography
          sx={{
            fontStyle: 'italic',
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '0.8rem',
            lineHeight: 1.4
          }}
        >
          {permissionKey.description ||
            `Allows you to perform the ${permissionKey.function || 'selected'} operation.`}
        </Typography>
      </Box>

      {/* Divider */}
      <Box sx={DIVIDER_SX} />

      {/* Bottom row: Category/Subcategory chips (left) + Key Reference link (right) */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 0.75,
          mt: 0.5
        }}
      >
        <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
          {permissionKey.category && (
            <Chip
              size="small"
              label={permissionKey.category}
              sx={{
                background: 'rgba(255, 255, 255, 0.08)',
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '0.7rem',
                height: '20px'
              }}
            />
          )}
          {permissionKey.subcategory && (
            <Chip
              size="small"
              label={permissionKey.subcategory}
              sx={{
                background: 'rgba(255, 255, 255, 0.08)',
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '0.7rem',
                height: '20px'
              }}
            />
          )}
        </Box>
        <Link
          href="https://docs.meshery.io/reference/references/permissions/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
          sx={{
            display: 'inline-flex',
            alignItems: 'baseline',
            fontSize: '0.75rem',
            color: '#EBC024',
            textDecoration: 'none',
            fontWeight: 600,
            '&:hover': {
              textDecoration: 'underline'
            }
          }}
        >
          Key Reference
          <Box
            component="span"
            sx={{
              fontSize: '10px',
              ml: '2px',
              verticalAlign: 'super',
              lineHeight: 0,
              position: 'relative',
              top: '-0.3em'
            }}
          >
            <LaunchIcon style={{ fontSize: '10px', width: '10px', height: '10px' }} />
          </Box>
        </Link>
      </Box>

      {/* User / Org / Role context — provided via PermissionProvider */}
      {userContext && (userContext.userName || userContext.orgName) && (
        <>
          <Box sx={DIVIDER_SX} />
          <Box
            sx={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '6px',
              p: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 0.75,
              mb: 0.75
            }}
          >
            {userContext.userName && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
                <Typography sx={{ fontSize: '0.68rem', color: '#9E9E9E', fontWeight: 500 }}>
                  User
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.72rem',
                    color: '#FFFFFF',
                    fontWeight: 600,
                    textAlign: 'right'
                  }}
                >
                  {userContext.userName}
                </Typography>
              </Box>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
              <Typography sx={{ fontSize: '0.68rem', color: '#9E9E9E', fontWeight: 500 }}>
                Org
              </Typography>
              <Typography
                sx={{
                  fontSize: '0.72rem',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  textAlign: 'right'
                }}
              >
                {userContext.orgName || 'Private Org'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
              <Typography sx={{ fontSize: '0.68rem', color: '#9E9E9E', fontWeight: 500 }}>
                Role(s)
              </Typography>
              <Typography
                sx={{
                  fontSize: '0.72rem',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  textAlign: 'right'
                }}
              >
                {userContext.roleNames && userContext.roleNames.length > 0
                  ? userContext.roleNames.join(', ')
                  : 'None'}
              </Typography>
            </Box>
          </Box>
          <Typography
            sx={{
              fontSize: '0.68rem',
              fontStyle: 'italic',
              color: 'rgba(255, 255, 255, 0.45)',
              lineHeight: 1.35
            }}
          >
            Seeing this message in error? Contact your Admins to request access.
          </Typography>
        </>
      )}
    </Box>
  );

  const isBadge = variant === 'badge';

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box
        sx={{
          position: 'relative',
          display: isBadge ? 'inline-flex' : 'flex',
          width: isBadge ? 'auto' : '100%',
          alignItems: 'center'
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
              sx: {
                background: '#1A1A1A',
                color: '#FFFFFF',
                maxWidth: 360,
                minWidth: 300,
                padding: '12px',
                borderLeft: '4px solid #EBC024',
                borderRadius: '8px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
              }
            }
          }}
        >
          <Box
            onClick={handleToggle}
            sx={
              isBadge
                ? {
                    position: 'absolute',
                    top: -6,
                    right: -6,
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
