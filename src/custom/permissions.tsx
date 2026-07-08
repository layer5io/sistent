import React from 'react';
import { Box, Typography } from '@mui/material';
import { EventBus } from '../actors/eventBus';
import CustomTooltip from './CustomTooltip/customTooltip';
import ShieldIcon from '@mui/icons-material/Shield';

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
  const tooltipTitle = (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, p: 0.5, color: '#FFFFFF' }}>
      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
        You don't currently have permission to perform this action.
      </Typography>
      {permissionKey.category && (
        <Box>
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              fontWeight: 'bold',
              color: 'rgba(255, 255, 255, 0.7)',
              textTransform: 'uppercase',
            }}
          >
            Category
          </Typography>
          <Typography variant="body2">{permissionKey.category}</Typography>
        </Box>
      )}
      {permissionKey.subcategory && (
        <Box>
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              fontWeight: 'bold',
              color: 'rgba(255, 255, 255, 0.7)',
              textTransform: 'uppercase',
            }}
          >
            Subcategory
          </Typography>
          <Typography variant="body2">{permissionKey.subcategory}</Typography>
        </Box>
      )}
      {(permissionKey.description || permissionKey.function) && (
        <Box>
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              fontWeight: 'bold',
              color: 'rgba(255, 255, 255, 0.7)',
              textTransform: 'uppercase',
            }}
          >
            Description
          </Typography>
          <Typography variant="body2">
            {permissionKey.description || permissionKey.function}
          </Typography>
        </Box>
      )}
    </Box>
  );

  const isBadge = variant === 'badge';

  return (
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

      <CustomTooltip title={tooltipTitle} placement="top" interactive>
        <Box
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
      </CustomTooltip>
    </Box>
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
        {React.cloneElement(children as React.ReactElement<{ style?: React.CSSProperties; onClick?: React.MouseEventHandler }>, {
          style: {
            ...((children as React.ReactElement<{ style?: React.CSSProperties; onClick?: React.MouseEventHandler }>).props.style || {}),
            cursor: 'pointer',
            pointerEvents,
            opacity: opacity,
          },
          onClick: onClick,
        })}
      </div>
    );
  };
};
