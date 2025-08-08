import { ExpandMore } from '@mui/icons-material';
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
 *     avatar_url: 'https://example.com/avatar1.jpg',
 *     border_color: '#00B39F',
 *     user_id: 'user123'
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
 * @property {string} avatar_url - URL to the user's avatar image
 * @property {string} border_color - Color code for the avatar border (e.g., '#00B39F')
 * @property {string} user_id - Unique identifier for the user
 */
interface User {
  name: string;
  avatar_url: string;
  border_color: string;
  user_id: string;
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
              useThemeColors={true} // Enable theme-based colors
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
                  <Divider />
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={onOpenWorkspace}
                    style={{
                      fontSize: '1rem',
                      padding: '2px 8px',
                      minWidth: 'auto',
                      marginTop: '8px'
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
                src={user.avatar_url}
                borderColor={user.border_color}
                imgProps={{ referrerPolicy: 'no-referrer' }}
                onClick={() => openInNewTab(`${providerUrl}/user/${user.user_id}`)}
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
                  onClick={() => openInNewTab(`${providerUrl}/user/${user.user_id}`)}
                >
                  <StyledAvatar
                    alt={user.name}
                    src={user.avatar_url}
                    borderColor={user.border_color}
                    imgProps={{ referrerPolicy: 'no-referrer' }}
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
