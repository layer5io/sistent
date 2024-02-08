import { useTheme } from '@mui/material';
import { Fragment, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProviders } from '@/lib/redux/features/provider/provider.slice';
import { selectProviders } from '@/lib/redux/selectors';
import {
  Typography,
  Tooltip,
  DialogContent,
  DialogContentText,
  List,
  ListItem,
  DialogActions,
  Button,
  Box,
  ButtonGroup,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Divider,
} from '@layer5/sistent';
import ProviderLayout from './layout';
import { useMediaQuery, Link, ListItemText, CircularProgress, Popper, Grow } from '@mui/material';
import { MesheryLogo, MesheryDialog, MesheryDialogTitle, MenuProviderDisabled } from './styles';
import { content } from './content';
import ProviderFooter from './ProviderFooter';
import { disabledMenuItems } from './disabledMenuItem';
import { ArrowDropDown } from '@mui/icons-material';

export default function Provider() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const dispatch = useDispatch();
  const availableProviders = useSelector(selectProviders);

  useEffect(() => {
    void dispatch(fetchProviders());
  }, [dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <ProviderLayout>
        <MesheryLogo
          src="/static/img/meshery-logo/meshery-logo-light-text.png"
          alt="meshery logo"
        />
        <Typography variant="h6" sx={{ fontWeight: 700 }} gutterBottom>
          Please choose a
          <Tooltip
            title="Learn more about providers"
            arrow
            placement="bottom"
            data-cy="providers-tooltip"
            sx={{
              color: '#00B39F',
              cursor: 'pointer',
              fontWeight: 700,
            }}
          >
            <Link
              onClick={handleClickOpen}
              underline="none"
              sx={{
                color: 'darkcyan',
                cursor: 'pointer',
                fontWeight: 700,
              }}
            >
              {' '}
              provider{' '}
            </Link>
          </Tooltip>
        </Typography>
        <MesheryDialog
          fullScreen={fullScreen}
          open={open}
          onClick={handleClose}
          aria-labelledby="dialog-title"
          disableScrollLock={true}
          data-cy="providers-modal"
        >
          <MesheryDialogTitle id="dialog-title" onClose={handleClose}>
            Choosing a provider
          </MesheryDialogTitle>
          <DialogContent dividers>
            <DialogContentText>
              <Typography paragraph gutterBottom>
                Login to Meshery by choosing from the available providers. Providers offer
                authentication, session management and long-term persistence of user preferences,
                performance tests, service mesh adapter configurations and so on.
              </Typography>
              {availableProviders != null &&
                Object.keys(availableProviders).map((key) => {
                  const provider = availableProviders[key];

                  return (
                    <Fragment key={provider?.provider_name}>
                      <p style={{ fontWeight: 700 }}>{provider?.provider_name}</p>
                      <ul>
                        {provider?.provider_description?.map((desc, i) => (
                          <li key={`desc-${i}`}>{String(desc)}</li>
                        ))}
                      </ul>
                    </Fragment>
                  );
                })}
              {content.map((section, index) => (
                <div key={index}>
                  <Typography variant="body1" fontWeight={700}>
                    {section.title}
                  </Typography>
                  <List dense>
                    {section.items.map((item, itemIndex) => (
                      <ListItem disablePadding key={itemIndex}>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </div>
              ))}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={handleClose}
              color="primary"
              variant="contained"
              data-cy="providers-modal-button-ok"
            >
              OK
            </Button>
          </DialogActions>
        </MesheryDialog>
        <ProviderOptions />
      </ProviderLayout>
      <ProviderFooter />
    </Fragment>
  );
}

function ProviderOptions() {
  const dispatch = useDispatch();
  const availableProviders = useSelector(selectProviders);

  useEffect(() => {
    dispatch(fetchProviders())
      .unwrap()
      .catch((error) => {
        console.log('Error fetching providers:', error);
      });
  }, [dispatch]);

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleClick = () => {
    console.log('clicked!');
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleMenuItemClick = (event, provider) => {
    event.preventDefault();
    void dispatch(setSelectedProvider(provider));
    setIsLoading(true);
    window.location.href = `/api/provider?provider=${encodeURIComponent(provider)}`;
  };

  const handleClose = (event) => {
    if (anchorRef.current?.contains(event.target) ?? false) {
      return;
    }

    setOpen(false);
  };

  return (
    <Box
      sx={(theme) => ({
        width: '60%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: theme.spacing(4),
      })}
    >
      <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="provider button">
        <Button size="large" onClick={handleClick}>
          Select a Provider
        </Button>
        <Button
          size="large"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select provider"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          {isLoading && <CircularProgress />}
          {selectProviders !== '' ? selectProviders : 'Select your provider'}
          <ArrowDropDown />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {availableProviders != null &&
                    Object.keys(availableProviders).map((key) => (
                      <MenuItem
                        key={key}
                        onClick={(e) => {
                          handleMenuItemClick(e, key);
                        }}
                      >
                        {key}
                      </MenuItem>
                    ))}
                  {isLoading && (
                    <Fragment>
                      <Divider sx={{ my: 0.5 }} />
                      {disabledMenuItems.map((item) => (
                        <MenuProviderDisabled disabled={true} key={item.key}>
                          {item.text}
                          {'\u00A0'} <span>Disabled</span>
                        </MenuProviderDisabled>
                      ))}
                    </Fragment>
                  )}
                  {!isLoading && (
                    <Fragment>
                      <Divider sx={{ my: 0.5 }} />
                      {disabledMenuItems.map((item) => (
                        <MenuProviderDisabled disabled={true} key={item.key}>
                          {item.text}
                          {'\u00A0'} <span>Disabled</span>
                        </MenuProviderDisabled>
                      ))}
                    </Fragment>
                  )}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
}
