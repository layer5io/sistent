import { Key } from '@meshery/schemas/permissions';
import KeyIcon from '@mui/icons-material/Key';
import LaunchIcon from '@mui/icons-material/Launch';
import React from 'react';
import { Box, Chip, Link, Tooltip, Typography } from '../base';
import { OrgHierarchyIcon } from '../icons/OrgHierarchy';
import { RoleKeyIcon } from '../icons/RoleKey';
import { UsersIcon } from '../icons/Users';
import type { PermissionUserContext } from './PermissionProvider';
import { usePermissionUserContext } from './PermissionProvider';

const DIVIDER_SX = {
  height: '1px',
  background: 'rgba(255, 255, 255, 0.1)',
  my: 1.25
};

/** Monochrome fill used for context icons */
const CONTEXT_ICON_COLOR = '#9E9E9E';
const CONTEXT_ICON_SIZE = '14';

export interface PermissionShieldContentProps {
  /** The permission key the user is missing. */
  permissionKey: Key;
  /**
   * Explicit user context override. When omitted the component reads from
   * `PermissionProvider` via `usePermissionUserContext()`.
   */
  userContext?: PermissionUserContext;
}

/**
 * Renders the key-metadata card shown inside `PermissionShield` tooltips.
 *
 * Extracted so the **same content** can be rendered:
 *  - as a MUI `Tooltip` title (inside `PermissionShield`), and
 *  - as a standalone inline card on a permission-denied page.
 *
 * The component expects to live on a **dark** background (`#1A1A1A` or similar).
 * When rendered standalone, wrap it in a container that supplies that background,
 * the gold left border, and the shadow — identical to the tooltip's `slotProps.tooltip.sx`.
 */
export const PermissionShieldContent: React.FC<PermissionShieldContentProps> = ({
  permissionKey,
  userContext: userContextProp
}) => {
  const [copied, setCopied] = React.useState(false);
  const providerContext = usePermissionUserContext();
  const userContext = userContextProp ?? providerContext;

  return (
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

      {/* Description — italicized, equal padding both sides */}
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

      {/* User / Org / Role context */}
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
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <UsersIcon
                    width={CONTEXT_ICON_SIZE}
                    height={CONTEXT_ICON_SIZE}
                    primaryFill={CONTEXT_ICON_COLOR}
                    secondaryFill={CONTEXT_ICON_COLOR}
                    style={{ flexShrink: 0 }}
                  />
                  <Typography sx={{ fontSize: '0.68rem', color: '#9E9E9E', fontWeight: 500 }}>
                    User
                  </Typography>
                </Box>
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
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 1
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <OrgHierarchyIcon
                  width={CONTEXT_ICON_SIZE}
                  height={CONTEXT_ICON_SIZE}
                  fill={CONTEXT_ICON_COLOR}
                  primaryFill={CONTEXT_ICON_COLOR}
                  secondaryFill={CONTEXT_ICON_COLOR}
                  style={{ flexShrink: 0 }}
                />
                <Typography sx={{ fontSize: '0.68rem', color: '#9E9E9E', fontWeight: 500 }}>
                  Org
                </Typography>
              </Box>
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
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 1
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <RoleKeyIcon
                  width={CONTEXT_ICON_SIZE}
                  height={CONTEXT_ICON_SIZE}
                  fill={CONTEXT_ICON_COLOR}
                  secondaryFill={CONTEXT_ICON_COLOR}
                  style={{ flexShrink: 0 }}
                />
                <Typography sx={{ fontSize: '0.68rem', color: '#9E9E9E', fontWeight: 500 }}>
                  Role(s)
                </Typography>
              </Box>
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
};

/**
 * The container styles that the `PermissionShield` tooltip applies via
 * `slotProps.tooltip.sx`. Exported so standalone uses can wrap
 * `PermissionShieldContent` in a `<Box sx={PERMISSION_SHIELD_CARD_SX}>` and
 * get an identical visual.
 */
export const PERMISSION_SHIELD_CARD_SX = {
  background: '#1A1A1A',
  color: '#FFFFFF',
  maxWidth: 360,
  minWidth: 300,
  padding: '12px',
  borderLeft: '4px solid #EBC024',
  borderRadius: '8px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
} as const;
