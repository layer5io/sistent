import React from 'react';
import { Avatar, Box, Grid2, Typography } from '../../base';
import { MESHERY_CLOUD_PROD } from '../../constants/constants';
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
      <Grid2
        container
        alignItems="center"
        style={maxWidth ? { width: 'max-content' } : { width: '' }}
      >
        <Grid2>
          <Box sx={{ color: 'text.secondary', mr: 1 }}>
            <CustomTooltip title={`View ${displayName}'s Profile`}>
              <div>
                <Avatar
                  style={{ cursor: 'pointer' }}
                  alt={displayName}
                  src={avatarUrl}
                  onClick={() => {
                    window.open(`${MESHERY_CLOUD_PROD}/user/${userId}`, '_blank');
                  }}
                >
                  {!avatarUrl && <PersonIcon />}
                </Avatar>
              </div>
            </CustomTooltip>
          </Box>
        </Grid2>
        {maxWidth && (
          <Grid2>
            <Typography variant="body2">{displayName}</Typography>
          </Grid2>
        )}
      </Grid2>
    </Box>
  );
};

export default AuthorCell;
