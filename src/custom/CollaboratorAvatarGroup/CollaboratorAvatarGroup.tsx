import { ExpandMore } from '@mui/icons-material';
import { alpha } from '@mui/material';
import { MouseEvent, useState } from 'react';
import { Avatar, AvatarGroup, Button, Divider, Popover, Typography } from '../../base';
import { iconSmall } from '../../constants/iconsSizes';
import { styled, useTheme } from '../../theme';
import { DARK_TEAL_BLUE } from '../../theme/colors/colors';
import { CustomTooltip } from '../CustomTooltip';

/**
 * CollaboratorAvatarGroup is a component that displays a group of user avatars with a popup for additional users.
 *
 * @component
 * @example
 * ```tsx
 * const users = {
 *   'client1': {
 *     name: 'John Doe',
 *     avatarUrl: 'https://example.com/avatar1.jpg',
 *     borderColor: '#00B39F',
 *     userId: 'user123'
 *   }
 * };
 *
 * <CollaboratorAvatarGroup
 *   users={users}
 *   providerUrl="https://redirect.com"
 * />
 * ```
 */

/**
 * User object structure representing a collaborator
 * @interface User
 * @property {string} name - Display name of the user
 * @property {string} avatarUrl - URL to the user's avatar image
 * @property {string} borderColor - Color code for the avatar border (e.g., '#00B39F')
 * @property {string} userId - Unique identifier for the user
 */
interface User {
  name: string;
  avatarUrl: string;
  borderColor: string;
  userId: string;
}

/**
 * Collection of users mapped by their client IDs
 * @interface Users
 * @property {User} [clientID] - User object mapped to their client ID
 */
interface Users {
  [clientID: string]: User;
}

/**
 * Props for the CollaboratorAvatarGroup component
 * @interface CollaboratorAvatarGroupProps
 * @property {Users} users - Object containing user information mapped by client IDs
 * @property {string} providerUrl - Base URL of the provider (e.g., 'https://github.com')
 * @property {() => void} [onOpenWorkspace] - function to open workspace
 */
interface CollaboratorAvatarGroupProps {
  users: Users;
  providerUrl: string;
  onOpenWorkspace?: () => void;
}

interface StyledAvatarProps {
  borderColor: string;
}
const StyledAvatar = styled(Avatar)<StyledAvatarProps>(({ theme, borderColor }) => {
  return {
    width: theme.spacing(4),
    height: theme.spacing(4),
    cursor: 'pointer',
    border: `1.5px solid ${borderColor || theme.palette.common.white} !important`
  };
});

const MoreAvatarButton = styled('div')(({ theme }) => ({
  width: theme.spacing(4.5),
  height: theme.spacing(4.5),
  border: `1.5px solid ${theme.palette.common.white}`,
  borderRadius: '50%',
  background: DARK_TEAL_BLUE,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: '-10px',
  zIndex: 0,
  '&:hover': {
    cursor: 'pointer'
  }
}));

const PopupAvatarWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  padding: '5px 15px 5px 10px',
  '&:hover': {
    cursor: 'pointer',
    background: '#cecece80 !important'
  }
});

const UserName = styled(Typography)({
  marginLeft: '10px'
});

const StyledPopover = styled(Popover)(() => ({
  '& .MuiPopover-paper': {
    marginTop: '10px',
    maxHeight: '331px'
  }
}));

const CollaboratorAvatarGroup = ({
  users,
  providerUrl,
  onOpenWorkspace
}: CollaboratorAvatarGroupProps): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const openInNewTab = (url: string): void => {
    window.open(url, '_blank', 'noreferrer');
  };

  const handleClick = (event: MouseEvent<HTMLDivElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const totalUsers = Object.entries(users).length;
  const visibleAvatars = 4;
  const theme = useTheme();
  return (
    <AvatarGroup max={visibleAvatars + 1}>
      {Object.entries(users)
        .slice(0, visibleAvatars)
        .map(([clientID, user]) => {
          return (
            <CustomTooltip
              key={clientID}
              // The surface is deliberately inherited from `CustomTooltip`'s own
              // default: no other call site overrides it, and `background.paper`
              // is not a sistent token.
              title={
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                  <Typography
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      margin: 'auto',
                      fontSize: '1rem'
                    }}
                  >
                    {user.name}
                  </Typography>
                  {/*
                    WORKAROUND for https://github.com/layer5io/sistent/issues/1783 - delete
                    the two `borderColor` overrides and the button `color` override once that
                    component-level fix lands, and do not copy this into other tooltips.
                    `CustomTooltip`'s surface is the literal `#141414` in both palette modes,
                    but `palette.divider`, the theme's outlined-button border and the button
                    label colour all resolve to mode-dependent tokens, so in light mode the
                    separator is invisible, the button outline is near black-on-black and the
                    label is black-on-black outright: `MuiButton`'s root override spreads
                    `typography.textB2SemiBold`, whose `color` is `common.black` in light mode
                    (src/theme/typography.ts), and that wins over MUI's own
                    `--variant-outlinedColor`. Measured on the hovered component, the label was
                    `rgb(0, 0, 0)` on `rgb(20, 20, 20)` - 1.06:1. These three are fixed to
                    white / white alphas, which are stable across modes because the surface
                    they sit on is; the label now matches the tooltip's own body text at
                    18.4:1, clearing WCAG AA.
                  */}
                  <Divider style={{ borderColor: alpha(theme.palette.common.white, 0.2) }} />
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={onOpenWorkspace}
                    style={{
                      fontSize: '1rem',
                      padding: '2px 8px',
                      minWidth: 'auto',
                      marginTop: '8px',
                      borderColor: alpha(theme.palette.common.white, 0.4),
                      color: theme.palette.common.white
                    }}
                  >
                    Open Recents
                  </Button>
                </div>
              }
              arrow
            >
              <StyledAvatar
                key={clientID}
                alt={user.name}
                src={user.avatarUrl}
                borderColor={user.borderColor}
                // MUI replaced `imgProps` with the `img` slot.
                slotProps={{ img: { referrerPolicy: 'no-referrer' } }}
                onClick={() => openInNewTab(`${providerUrl}/user/${user.userId}`)}
              />
            </CustomTooltip>
          );
        })}
      {totalUsers > visibleAvatars && (
        <>
          <MoreAvatarButton onClick={handleClick} aria-describedby="user-popover">
            {anchorEl ? (
              <ExpandMore
                fill={theme.palette.common.white}
                {...iconSmall}
                style={{ marginLeft: '4px' }}
              />
            ) : (
              <Typography
                variant="body2"
                style={{ color: theme.palette.common.white, fontSize: '12px' }}
              >
                {`+${totalUsers - visibleAvatars}`}
              </Typography>
            )}
          </MoreAvatarButton>
          <StyledPopover
            id="user-popover"
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
          >
            {Object.entries(users)
              .slice(visibleAvatars, totalUsers)
              .map(([clientID, user]) => (
                <PopupAvatarWrapper
                  key={clientID}
                  onClick={() => openInNewTab(`${providerUrl}/user/${user.userId}`)}
                >
                  <StyledAvatar
                    alt={user.name}
                    src={user.avatarUrl}
                    borderColor={user.borderColor}
                    // MUI replaced `imgProps` with the `img` slot.
                    slotProps={{ img: { referrerPolicy: 'no-referrer' } }}
                  />
                  <UserName variant="body1">{user.name}</UserName>
                </PopupAvatarWrapper>
              ))}
          </StyledPopover>
        </>
      )}
    </AvatarGroup>
  );
};

export default CollaboratorAvatarGroup;
