import React from 'react';
import { Avatar, Box, Grid, Typography } from '../../base';
import { CLOUD_URL } from '../../constants/constants';
import { PersonIcon } from '../../icons';
import { CustomTooltip } from '../CustomTooltip';

interface AuthorCellProps {
  firstName: string;
  lastName: string;
  avatarUrl: string;
  userId: string;
  maxWidth?: boolean;
}

const AuthorCell: React.FC<AuthorCellProps> = ({
  firstName,
  lastName,
  avatarUrl,
  userId,
  maxWidth = true
}) => {
  const displayName =
    firstName && lastName
      ? `${firstName} ${lastName}`
      : firstName
        ? firstName
        : lastName
          ? lastName
          : '';

  return (
    <Box sx={{ '& > img': { mr: 2, flexShrink: 0 } }}>
      <Grid
        container
        alignItems="center"
        style={maxWidth ? { width: 'max-content' } : { width: '' }}
      >
        <Grid item>
          <Box sx={{ color: 'text.secondary', mr: 1 }}>
            <CustomTooltip title={`View ${displayName}'s Profile`}>
              <div>
                <Avatar
                  style={{ cursor: 'pointer' }}
                  alt={displayName}
                  src={avatarUrl}
                  onClick={() => {
                    window.open(`${CLOUD_URL}/user/${userId}`, '_blank');
                  }}
                >
                  {!avatarUrl && <PersonIcon />}
                </Avatar>
              </div>
            </CustomTooltip>
          </Box>
        </Grid>
        {maxWidth && (
          <Grid item>
            <Typography variant="body2">{displayName}</Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default AuthorCell;
