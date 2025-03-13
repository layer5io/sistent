import { Avatar, Box, Grid, Typography } from '../../base';
import { CLOUD_URL } from '../../constants/constants';
import { PersonIcon } from '../../icons';
import { useTheme } from '../../theme';

interface UserTableAvatarInfoProps {
  userId: string;
  userName: string;
  userEmail: string;
  profileUrl?: string;
}

const UserTableAvatarInfo: React.FC<UserTableAvatarInfoProps> = ({
  userId,
  userName,
  userEmail,
  profileUrl
}): JSX.Element => {
  const theme = useTheme();
  const handleProfileClick = (): void => {
    window.open(`${CLOUD_URL}/user/${userId}`);
  };

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Box
          sx={{
            color: theme.palette.text.default,
            mr: 2,
            cursor: 'pointer'
          }}
        >
          <Avatar onClick={handleProfileClick} alt={userName} src={profileUrl}>
            {profileUrl ? '' : <PersonIcon />}
          </Avatar>
        </Box>
      </Grid>
      <Grid item xs>
        {userName}
        <Typography variant="body2" color={theme.palette.text.disabled}>
          {userEmail}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default UserTableAvatarInfo;
