import { useRouter } from 'next/router';
import exportToJsonFile from './exportToJsonFile';
import RenderAccountExtension from './renderAccountExtension';
import useFetchUserData from '@/lib/hooks/useFetchUserData';
import withMetadata from '@/utils/getMetadataWrapper';
import React from 'react';
import Popper from '@mui/material/Popper';
import {
  Avatar,
  Box,
  ClickAwayListener,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
} from '@layer5/sistent';
import Grow from '@mui/material/Grow';

function UserPref({ getPath, pageTitle, color }) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState();

  const { user, loading, error } = useFetchUserData('/api/user', {
    credentials: 'same-origin',
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClose = (event) => {
    if (anchorEl.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handlePreference = () => {
    router.push('/user/preferences');
  };

  const handleLogout = () => {
    window.location.href = '/user/logout';
  };

  const handleGetToken = () => {
    const data = user;
    exportToJsonFile(data, 'auth.json');
  };

  return (
    <React.Fragment>
      <Box data-test="profile-button">
        <IconButton
          color={color}
          ref={(node) => {
            anchorEl = node;
          }}
        >
          <Avatar />
        </IconButton>
      </Box>
      <Popper
        open={open}
        anchorEl={anchorEl}
        transition
        style={{ zIndex: 10000 }}
        placement="top-end"
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            id="menu-list-grow"
            style={{
              transformOrigin: placement === 'bottom' ? 'left top' : 'left bottom',
            }}
          >
            <Paper className={classes.popover}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList>
                  {account && account.length ? (
                    <RenderAccountExtension accountExtensions={account} />
                  ) : null}
                  <MenuItem onClick={handleGetToken}>Get Token</MenuItem>
                  <MenuItem onClick={handlePreference}>Preferences</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}

export default withMetadata(UserPref);
