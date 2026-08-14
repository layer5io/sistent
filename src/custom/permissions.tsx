import { Key } from '@meshery/schemas/permissions';
import KeyIcon from '@mui/icons-material/Key';
import LaunchIcon from '@mui/icons-material/Launch';
import SecurityIcon from '@mui/icons-material/Security';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import type {
  MissingCapabilityReason,
  MissingPermissionReason
} from '../actors/mesheryExtensionContract';
import { MESHERY_EXTENSION_EVENT } from '../actors/mesheryExtensionContract';
import { Box, Chip, ClickAwayListener, Link, Tooltip, Typography } from '../base';
import { OrgHierarchyIcon } from '../icons/OrgHierarchy';
import { RoleKeyIcon } from '../icons/RoleKey';
import { UsersIcon } from '../icons/Users';
import {
  getPermissionKeyCombinator,
  getPermissionKeys,
  usePermissionUserContext,
  useUnmetPermissionKeys,
  type PermissionKeySpec
} from './PermissionProvider';
export type { Key };

/** Monochrome fill used for tooltip-context icons */
const CONTEXT_ICON_COLOR = '#9E9E9E';
const CONTEXT_ICON_SIZE = '14';

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
  /**
   * The key, or key set, the blocked affordance is gated on. Every key the user
   * does not hold is listed in the tooltip.
   */
  permissionKey: PermissionKeySpec;
  children: React.ReactNode;
  variant?: 'inline' | 'badge';
}

/** Distinct, defined values in first-seen order — used for the metadata chips. */
const uniqueDefined = (values: (string | undefined)[]): string[] =>
  Array.from(new Set(values.filter((v): v is string => !!v)));

/**
 * Props for `PermissionSessionContext`.
 *
 * When `displayedKeys` is provided the component renders the full permission
 * detail (key names, descriptions, categories, reference link) followed by the
 * user context section. When omitted, only the user/org/role context section is
 * rendered — useful for generic 403 error pages that have no specific key.
 */
export interface PermissionSessionContextProps {
  /**
   * `'tooltip'` — compact, dark-background styling for inside a tooltip.
   * `'card'` — theme-aware, scaled-up styling for full-page display.
   * @default 'tooltip'
   */
  variant?: 'tooltip' | 'card';
  /**
   * Permission key spec to resolve. When provided, the component resolves
   * `displayedKeys`, `subtitle`, `categories`, and `subcategories` automatically
   * — exactly the same resolution that `PermissionShield` does.
   *
   * Takes priority over manually supplied `displayedKeys`.
   */
  permissionKey?: PermissionKeySpec;
  /** The permission keys to display detail for. Omit to show only user context. */
  displayedKeys?: Key[];
  /** Subtitle line (e.g. "Needs any of: …"). Shown only when `displayedKeys` is provided. */
  subtitle?: string;
  /** Category labels derived from the keys. Shown as chips. */
  categories?: string[];
  /** Subcategory labels derived from the keys. Shown as chips after categories. */
  subcategories?: string[];
}

/**
 * Standalone component that renders the permission session context — the same
 * content shown inside `PermissionShield`'s tooltip. Extracted so that consumers
 * (e.g. error pages) can embed it inline without duplicating the JSX.
 *
 * Reads user/org/role context from the nearest `PermissionProvider`.
 *
 * Two usage modes:
 * 1. **Self-resolving** (`permissionKey`): pass the key spec and the component
 *    resolves everything internally — same logic as `PermissionShield`.
 * 2. **Pre-resolved** (`displayedKeys` etc.): pass already-resolved data.
 */
export const PermissionSessionContext: React.FC<PermissionSessionContextProps> = ({
  variant = 'tooltip',
  permissionKey: permissionKeyProp,
  displayedKeys: displayedKeysProp,
  subtitle: subtitleProp,
  categories: categoriesProp,
  subcategories: subcategoriesProp
}) => {
  const [copiedKeyId, setCopiedKeyId] = React.useState<string | null>(null);
  const userContext = usePermissionUserContext();
  const theme = useTheme();

  // Self-resolve when permissionKey is provided (same logic as PermissionShield)
  const unmetKeys = useUnmetPermissionKeys(permissionKeyProp);
  const selfResolved = !!permissionKeyProp;

  let displayedKeys = displayedKeysProp;
  let subtitle = subtitleProp;
  let categories = categoriesProp;
  let subcategories = subcategoriesProp;

  if (selfResolved) {
    const declaredKeys = getPermissionKeys(permissionKeyProp);
    displayedKeys = unmetKeys.length > 0 ? unmetKeys : declaredKeys;
    const combinator = getPermissionKeyCombinator(permissionKeyProp);
    const keyNames = displayedKeys
      .map((key) => key.function || 'Access Restricted')
      .join(', ');
    subtitle =
      combinator === 'anyOf' && keyNames
        ? `Needs any of: ${keyNames}`
        : combinator === 'allOf' && keyNames
          ? `Needs all of: ${keyNames}`
          : 'Missing requisite key';
    categories = uniqueDefined(displayedKeys.map((key) => key.category));
    subcategories = uniqueDefined(displayedKeys.map((key) => key.subcategory));
  }

  const isCard = variant === 'card';
  const hasKeys = displayedKeys && displayedKeys.length > 0;

  // Variant-aware palette: tooltip uses hard-coded dark-bg colors;
  // card adapts to the current MUI theme.
  const palette = isCard
    ? {
        bg: theme.palette.background.paper,
        color: theme.palette.text.primary,
        muted: theme.palette.text.secondary,
        subtle: theme.palette.text.disabled,
        divider: theme.palette.divider,
        contextBg: theme.palette.action.hover,
        contextBorder: theme.palette.divider,
        chipBg: theme.palette.action.selected,
        chipColor: theme.palette.text.secondary,
        accent: theme.palette.primary.main,
        keyColor: theme.palette.text.primary
      }
    : {
        bg: 'transparent',
        color: '#FFFFFF',
        muted: '#9E9E9E',
        subtle: 'rgba(255, 255, 255, 0.45)',
        divider: 'rgba(255, 255, 255, 0.1)',
        contextBg: 'rgba(255, 255, 255, 0.02)',
        contextBorder: 'rgba(255, 255, 255, 0.05)',
        chipBg: 'rgba(255, 255, 255, 0.08)',
        chipColor: 'rgba(255, 255, 255, 0.8)',
        accent: '#EBC024',
        keyColor: '#FFFFFF'
      };

  const dividerSx = { height: '1px', background: palette.divider, my: isCard ? 1.5 : 1.25 };
  const baseFontScale = isCard ? 1.25 : 1;

  const iconSize = isCard ? '18' : CONTEXT_ICON_SIZE;
  const iconColor = isCard ? theme.palette.text.secondary : CONTEXT_ICON_COLOR;

  return (
    <Box
      sx={{
        width: '100%',
        color: palette.color,
        p: isCard ? 2 : 0.5,
        background: isCard ? palette.bg : 'transparent',
        borderRadius: isCard ? '8px' : 0,
        border: isCard ? `1px solid ${palette.contextBorder}` : 'none'
      }}
    >
      {/* Title: AUTHORIZATION REQUIRED */}
      <Typography
        sx={{
          fontSize: `${0.65 * baseFontScale}rem`,
          fontWeight: 800,
          color: palette.muted,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          mb: 0.5
        }}
      >
        Authorization Required
      </Typography>

      {/* Subtitle */}
      {subtitle && (
        <Typography
          sx={{
            fontSize: `${0.75 * baseFontScale}rem`,
            color: isCard ? palette.muted : 'rgba(255, 255, 255, 0.75)',
            mb: 1.25,
            lineHeight: 1.3
          }}
        >
          {subtitle}
        </Typography>
      )}

      {/* Divider */}
      {(hasKeys || subtitle) && <Box sx={dividerSx} />}

      {/* One block per key: KeyIcon (copy button) + key name, then description */}
      {hasKeys &&
        displayedKeys!.map((key, index) => {
          const copied = copiedKeyId === (key.id || `#${index}`);
          const copyKeyId = (e: React.SyntheticEvent) => {
            e.stopPropagation();
            const id = key.id || '';
            void navigator.clipboard
              ?.writeText(id)
              .then(() => {
                setCopiedKeyId(key.id || `#${index}`);
                setTimeout(() => setCopiedKeyId(null), 1500);
              })
              .catch(() => undefined);
          };

          return (
            <React.Fragment key={key.id || index}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 1, mb: 0.25 }}>
                <Tooltip title={copied ? 'Copied!' : 'Copy key ID to clipboard'} placement="top">
                  <Box
                    component="span"
                    role="button"
                    tabIndex={0}
                    aria-label={`Copy key ID for ${key.function || 'this permission'}`}
                    onClick={copyKeyId}
                    onKeyDown={(e: React.KeyboardEvent) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        copyKeyId(e);
                      }
                    }}
                    sx={{
                      display: 'inline-flex',
                      cursor: 'pointer',
                      color: copied ? palette.accent : isCard ? palette.muted : 'rgba(255, 255, 255, 0.7)',
                      transition: 'color 0.2s ease',
                      '&:hover': {
                        color: palette.accent
                      }
                    }}
                  >
                    <KeyIcon sx={{ fontSize: `${1 * baseFontScale}rem` }} />
                  </Box>
                </Tooltip>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: `${0.95 * baseFontScale}rem`,
                    lineHeight: 1.3,
                    color: palette.keyColor
                  }}
                >
                  {key.function || 'Access Restricted'}
                </Typography>
              </Box>

              {/* Description */}
              <Box sx={{ px: 1, mb: 1.25 }}>
                <Typography
                  sx={{
                    fontStyle: 'italic',
                    color: isCard ? palette.muted : 'rgba(255, 255, 255, 0.7)',
                    fontSize: `${0.8 * baseFontScale}rem`,
                    lineHeight: 1.4
                  }}
                >
                  {key.description ||
                    `Allows you to perform the ${key.function || 'selected'} operation.`}
                </Typography>
              </Box>
            </React.Fragment>
          );
        })}

      {/* Divider */}
      {hasKeys && <Box sx={dividerSx} />}

      {/* Bottom row: Category/Subcategory chips + Key Reference link */}
      {hasKeys && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 0.75,
            mt: 0.5
          }}
        >
          {Boolean(categories?.length || subcategories?.length) && (
            <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
              {[...(categories || []), ...(subcategories || [])].map((label, index) => (
                <Chip
                  key={`${index}-${label}`}
                  size="small"
                  label={label}
                  sx={{
                    background: palette.chipBg,
                    color: palette.chipColor,
                    fontSize: `${0.7 * baseFontScale}rem`,
                    height: isCard ? '24px' : '20px'
                  }}
                />
              ))}
            </Box>
          )}
          <Link
            href="https://docs.meshery.io/reference/references/permissions/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            sx={{
              display: 'inline-flex',
              alignItems: 'baseline',
              fontSize: `${0.75 * baseFontScale}rem`,
              color: palette.accent,
              textDecoration: 'none',
              fontWeight: 600,
              marginLeft: 'auto',
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
      )}

      {/* User / Org / Role context — from PermissionProvider */}
      {userContext && (userContext.userName || userContext.orgName) && (
        <>
          <Box sx={dividerSx} />
          <Box
            sx={{
              background: palette.contextBg,
              border: `1px solid ${palette.contextBorder}`,
              borderRadius: '6px',
              p: isCard ? 1.5 : 1,
              display: 'flex',
              flexDirection: 'column',
              gap: isCard ? 1 : 0.75,
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
                    width={iconSize}
                    height={iconSize}
                    primaryFill={iconColor}
                    secondaryFill={iconColor}
                    style={{ flexShrink: 0 }}
                  />
                  <Typography
                    sx={{
                      fontSize: `${0.68 * baseFontScale}rem`,
                      color: palette.muted,
                      fontWeight: 500
                    }}
                  >
                    User
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontSize: `${0.72 * baseFontScale}rem`,
                    color: palette.keyColor,
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
                  width={iconSize}
                  height={iconSize}
                  fill={iconColor}
                  primaryFill={iconColor}
                  secondaryFill={iconColor}
                  style={{ flexShrink: 0 }}
                />
                <Typography
                  sx={{
                    fontSize: `${0.68 * baseFontScale}rem`,
                    color: palette.muted,
                    fontWeight: 500
                  }}
                >
                  Org
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontSize: `${0.72 * baseFontScale}rem`,
                  color: palette.keyColor,
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
                  width={iconSize}
                  height={iconSize}
                  fill={iconColor}
                  secondaryFill={iconColor}
                  style={{ flexShrink: 0 }}
                />
                <Typography
                  sx={{
                    fontSize: `${0.68 * baseFontScale}rem`,
                    color: palette.muted,
                    fontWeight: 500
                  }}
                >
                  Role(s)
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontSize: `${0.72 * baseFontScale}rem`,
                  color: palette.keyColor,
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
              fontSize: `${0.68 * baseFontScale}rem`,
              fontStyle: 'italic',
              color: palette.subtle,
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
 * PermissionShield Wrapper Component
 *
 * Renders children with a shield icon overlay showing permission metadata.
 * It never decides *whether* to block — the consumer owns the disabled state
 * (e.g. via CAN()), and a key the user does in fact hold is still displayed.
 * It does read the provider to work out *which* of the declared keys are unmet,
 * so a key set can name every missing key instead of only one.
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

  // Delegate all key resolution (unmet keys, subtitle, categories, subcategories)
  // to PermissionSessionContext's self-resolving path. This keeps the tooltip
  // and card rendering paths in sync — both use the same internal resolution logic.
  const tooltipTitle = (
    <PermissionSessionContext
      variant="tooltip"
      permissionKey={permissionKey}
    />
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
            popper: {
              modifiers: [
                {
                  name: 'flip',
                  enabled: true,
                  options: {
                    fallbackPlacements: ['bottom', 'right', 'left']
                  }
                },
                {
                  name: 'preventOverflow',
                  enabled: true,
                  options: {
                    boundary: 'viewport',
                    altAxis: true,
                    padding: 8
                  }
                }
              ]
            },
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
  getPermissionKeys,
  isPermissionKeySet,
  useHasPermission,
  usePermission,
  usePermissionUserContext,
  useUnmetPermissionKeys
} from './PermissionProvider';
export type {
  PermissionAction,
  PermissionKeySet,
  PermissionKeySpec,
  PermissionProviderProps,
  PermissionProviderValue,
  PermissionUserContext
} from './PermissionProvider';
