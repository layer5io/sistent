import React, { useState } from 'react';
import { AppBar, Grid, Toolbar, Typography } from '@layer5/sistent';
import K8sContextMenu from './K8sContextMenu';
import { withNotify } from '@/hooks/useNotification';
import { connect } from 'react-redux';

const iconMedium = {
  // your styles for icon medium
};

const cursorNotAllowed = {
  // your styles for cursor not allowed
};

const disabledStyle = {
  // your styles for disabled style
};

function Header({
  title,
  onDrawerToggle,
  isBeta,
  theme,
  themeSetter,
  onDrawerCollapse,
  capabilityregistryObj,
  updateCapabilities,
}) {
  const [collaboratorExt, setCollaboratorExt] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dataFetch('/api/provider/capabilities', {
          method: 'GET',
          credentials: 'include',
        });
        const capabilitiesRegistryObj = new CapabilitiesRegistry(result);
        setCollaboratorExt(
          ExtensionPointSchemaValidator('collaborator')(result?.extensions?.collaborator),
        );
        updateCapabilities({ capabilitiesRegistry: result });
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();

    return () => {
      // cleanup
    };
  }, [updateCapabilities]);

  return (
    <React.Fragment>
      {/* LoadTheme component goes here */}
      <AppBar
        color="primary"
        position="sticky"
        // elevation={1}
        className={onDrawerCollapse ? classes.appBarOnDrawerClosed : classes.appBarOnDrawerOpen}
      >
        <Toolbar
          className={onDrawerCollapse ? classes.toolbarOnDrawerClosed : classes.toolbarOnDrawerOpen}
        >
          <Grid container alignItems="center">
            <Hidden smUp>
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={onDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon className={classes.headerIcons} style={iconMedium} />
                </IconButton>
              </Grid>
            </Hidden>
            <Grid item xs container alignItems="center" className={classes.pageTitleWrapper}>
              <Typography
                color="inherit"
                variant="h5"
                className={classes.pageTitle}
                data-cy="headerPageTitle"
              >
                {title}
                {isBeta ? <sup className={classes.betaBadge}>BETA</sup> : ''}
              </Typography>
            </Grid>
            <Grid
              item
              className={classes.userContainer}
              style={{ position: 'relative', right: '-27px' }}
            >
              {/* According to the capabilities load the component */}
              {collaboratorExt && (
                <ExtensionSandbox
                  type="collaborator"
                  Extension={(url) => RemoteComponent({ url, loaderType })}
                  capabilitiesRegistry={capabilityregistryObj}
                />
              )}
              <div className={classes.userSpan} style={{ position: 'relative' }}>
                <K8sContextMenu
                  classes={classes}
                  // other props go here
                />
              </div>

              <div
                data-test="settings-button"
                style={
                  !capabilityregistryObj?.isHeaderComponentEnabled([SETTINGS])
                    ? cursorNotAllowed
                    : {}
                }
              >
                <Link href="/settings">
                  <IconButton
                    style={
                      !capabilityregistryObj?.isHeaderComponentEnabled([SETTINGS])
                        ? disabledStyle
                        : {}
                    }
                    color="inherit"
                  >
                    <OutlinedSettingsIcon
                      fill={WHITE}
                      className={
                        classes.headerIcons +
                        ' ' +
                        (title === 'Settings' ? classes.itemActiveItem : '')
                      }
                      style={iconMedium}
                    />
                  </IconButton>
                </Link>
              </div>

              <div data-test="notification-button">
                <NotificationDrawerButton />
              </div>
              <span className={classes.userSpan}>
                <User
                  classes={classes}
                  theme={theme}
                  themeSetter={themeSetter}
                  color="inherit"
                  iconButtonClassName={classes.iconButtonAvatar}
                  avatarClassName={classes.avatar}
                  // other props go here
                />
              </span>
              {/* <div className="dark-theme-toggle">
                      <input id="toggle" className="toggle" type="checkbox" onChange={themeToggler} checked={!themeToggle} />
                    </div> */}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  onDrawerToggle: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  isBeta: PropTypes.bool.isRequired,
  theme: PropTypes.object.isRequired,
  themeSetter: PropTypes.func.isRequired,
  onDrawerCollapse: PropTypes.bool.isRequired,
  capabilityregistryObj: PropTypes.object.isRequired,
  updateCapabilities: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    title: state.get('page').get('title'),
    isBeta: state.get('page').get('isBeta'),
    selectedK8sContexts: state.get('selectedK8sContexts'),
    k8sconfig: state.get('k8sConfig'),
    operatorState: state.get('operatorState'),
    meshSyncState: state.get('meshSyncState'),
    capabilitiesRegistry: state.get('capabilitiesRegistry'),
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateK8SConfig: bindActionCreators(updateK8SConfig, dispatch),
  updateProgress: bindActionCreators(updateProgress, dispatch),
  updateCapabilities: bindActionCreators(updateCapabilities, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withNotify(Header));
