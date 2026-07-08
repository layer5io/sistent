import React from 'react';
import { Box, Typography, ClickAwayListener, Chip } from '@mui/material';
import { EventBus } from '../actors/eventBus';
import Tooltip from '../base/Tooltip/Tooltip';
import ShieldIcon from '@mui/icons-material/Shield';

const SECTION_HEADING_SX = {
  fontSize: '0.7rem',
  fontWeight: 700,
  letterSpacing: '0.06em',
  textTransform: 'uppercase' as const,
  color: 'rgba(255, 255, 255, 0.7)',
  mb: 0.75,
};

const DIVIDER_SX = {
  height: '1px',
  background: 'rgba(255, 255, 255, 0.1)',
  my: 1.25,
};

export interface Key {
  // Backwards compatibility for old CanShow
  subject?: string;
  action?: string;

  // New Schemas key structure
  id?: string;
  category?: string;
  subcategory?: string;
  function?: string;
  description?: string;
}

export type InvertAction = 'disable' | 'hide';

export type MissingPermissionReason = {
  type: 'MISSING_PERMISSION';
  data: {
    keyId: string;
  };
};

export type MissingCapabilityReason = {
  type: 'MISSING_CAPABILITY';
  data: {
    capabilityId: string;
  };
};

export type ReasonEvent = MissingPermissionReason | MissingCapabilityReason;

export interface HasKeyProps<ReasonEvent> {
  Key?: Key;
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
  variant = 'inline',
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
        window.dispatchEvent(new CustomEvent('permission-shield-opened', { detail: { id: uniqueId } }));
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
      {/* Header Row */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1.5,
          width: '100%',
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: '1rem',
            lineHeight: 1.3,
            color: '#FFFFFF',
          }}
        >
          {permissionKey.function || permissionKey.subject || 'Access Restricted'}
        </Typography>

        {/* Status dot chip */}
        <Chip
          size="small"
          label="Locked"
          icon={
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#EBC024',
                marginLeft: 6,
                marginRight: 0,
              }}
            />
          }
          sx={{
            background: 'rgba(235, 192, 36, 0.12)',
            color: '#EBC024',
            fontWeight: 600,
            fontSize: '0.7rem',
            height: '20px',
            border: '1px solid rgba(235, 192, 36, 0.25)',
            '& .MuiChip-label': {
              paddingLeft: '4px',
              paddingRight: '6px',
            },
          }}
        />
      </Box>

      {/* Meta info chips row */}
      {permissionKey.category && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 1.5 }}>
          <Chip
            size="small"
            label={permissionKey.category}
            sx={{
              background: 'rgba(255, 255, 255, 0.08)',
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '0.7rem',
              height: '20px',
            }}
          />
          {permissionKey.subcategory && (
            <Chip
              size="small"
              label={permissionKey.subcategory}
              sx={{
                background: 'rgba(255, 255, 255, 0.08)',
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '0.7rem',
                height: '20px',
              }}
            />
          )}
        </Box>
      )}

      {/* Divider */}
      <Box sx={DIVIDER_SX} />

      {/* Description Section */}
      <Typography sx={SECTION_HEADING_SX}>What this permission allows</Typography>
      <Box
        component="ul"
        sx={{
          paddingLeft: '1.25rem',
          margin: 0,
          color: 'rgba(255, 255, 255, 0.9)',
          fontSize: '0.85rem',
          lineHeight: 1.45,
        }}
      >
        <Box component="li">
          {permissionKey.description || `Allows you to perform the ${permissionKey.function || permissionKey.subject || 'selected'} operation.`}
        </Box>
      </Box>

      {/* Resource Details / Key Info */}
      {permissionKey.id && (
        <>
          <Box sx={DIVIDER_SX} />
          <Typography sx={SECTION_HEADING_SX}>Resource ID</Typography>
          <Typography
            sx={{
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              fontSize: '0.7rem',
              background: 'rgba(0, 0, 0, 0.2)',
              padding: '4px 6px',
              borderRadius: '4px',
              color: 'rgba(255, 255, 255, 0.7)',
              wordBreak: 'break-all',
            }}
          >
            {permissionKey.id}
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
          alignItems: 'center',
        }}
      >
        <Box sx={{ width: '100%', opacity: 0.5, pointerEvents: 'none' }}>
          {children}
        </Box>

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
                maxWidth: 420,
                minWidth: 320,
                padding: '16px',
                borderLeft: '4px solid #EBC024',
                borderRadius: '8px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                '& .MuiTypography-root': {
                  color: 'inherit',
                },
              },
            },
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
                      color: '#EBC024',
                    },
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
                      color: '#EBC024',
                    },
                  }
            }
          >
            <ShieldIcon sx={{ fontSize: '14px', color: 'inherit' }} />
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
  eventBus: () => EventBus<ReasonEvent>
) => {
  return ({
    Key,
    children,
    notifyOnclick = true,
    predicate,
    invert_action = ['disable'],
  }: HasKeyProps<ReasonEvent>) => {
    if (!children) {
      return null;
    }

    const actionString = Key?.id || Key?.action || '';
    const subjectString = Key?.function || Key?.subject || '';

    const hasKey = subjectString ? CAN(actionString, subjectString) : true;
    const predicateRes = predicate && predicate(getCapabilitiesRegistry());

    const can = predicateRes ? predicateRes[0] && hasKey : hasKey;

    const reason = predicateRes?.[1] || {
      type: 'MISSING_PERMISSION',
      data: {
        keyId: actionString,
      },
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
          console.log('cant perform action : reason', reason, eventBus);
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
          opacity: opacity,
        }}
        onClick={onClick}
      >
        {React.isValidElement(children) ? React.cloneElement(children as React.ReactElement<{ style?: React.CSSProperties; onClick?: React.MouseEventHandler }>, {
          style: {
            ...((children as React.ReactElement<{ style?: React.CSSProperties; onClick?: React.MouseEventHandler }>).props.style || {}),
            cursor: 'pointer',
            pointerEvents,
            opacity: opacity,
          },
          onClick: onClick,
        }) : children}
      </div>
    );
  };
};
