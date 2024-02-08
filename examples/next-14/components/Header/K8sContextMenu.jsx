import { useNotification } from '@/hooks/useNotification';
import { useState, useEffect } from 'react';
import { Button, IconButton, ClickAwayListener } from '@layer5/sistent';
import { Slide } from '@mui/material';
import Link from 'next/link';

function K8sContextMenu({
  classes = {},
  contexts = {},
  activeContexts = [],
  show,
  updateK8SConfig,
  setActiveContexts = () => {},
  searchContexts = () => {},
}) {
  const [anchorEl, setAnchorEl] = useState(false);
  const [showFullContextMenu, setShowFullContextMenu] = useState(false);
  const [transformProperty, setTransformProperty] = useState(100);
  const deleteCtxtRef = createRef();
  const { notify } = useNotification();
  const ping = useKubernetes();
  const meshsyncControllerState = useSelector((state) => state.get('controllerState'));
  const connectionMetadataState = useSelector((state) => state.get('connectionMetadataState'));

  const { getControllerStatesByContexID } = useControllerStatus(meshsyncControllerState);
  const styleSlider = {
    position: 'absolute',
    left: '-7rem',
    zIndex: '-1',
    bottom: showFullContextMenu ? '-55%' : '-110%',
    transform: showFullContextMenu ? `translateY(${transformProperty}%)` : 'translateY(0)',
  };

  const ctxStyle = {
    ...disabledStyle,
    marginRight: '0.5rem',
  };

  const handleKubernetesDelete = (name, connectionID) => async () => {
    let responseOfDeleteK8sCtx = await deleteCtxtRef.current.show({
      title: `Delete ${name} context ?`,
      subtitle: `Are you sure you want to delete ${name} cluster from Meshery?`,
      options: ['CONFIRM', 'CANCEL'],
      variant: PROMPT_VARIANTS.DANGER,
    });
    if (responseOfDeleteK8sCtx === 'CONFIRM') {
      const successCallback = async () => {
        const updatedConfig = await loadActiveK8sContexts();
        if (Array.isArray(updatedConfig)) {
          updateK8SConfig({ k8sConfig: updatedConfig });
        }
      };
      deleteKubernetesConfig(
        successHandlerGenerator(notify, `Kubernetes config removed for ${name}`, successCallback),
        errorHandlerGenerator(notify, `Not able to remove config for ${name}`),
        connectionID,
      );
    }
  };

  let open = Boolean(anchorEl);
  if (showFullContextMenu) {
    open = showFullContextMenu;
  }

  useEffect(() => {
    setTransformProperty(
      (prev) => prev + (contexts.total_count ? contexts.total_count * 3.125 : 0),
    );
  }, []);

  return (
    <>
      <div style={show ? cursorNotAllowed : {}}>
        <IconButton
          aria-label="contexts"
          className="k8s-icon-button"
          onClick={(e) => {
            e.preventDefault();
            setShowFullContextMenu((prev) => !prev);
          }}
          onMouseOver={(e) => {
            e.preventDefault();
            setAnchorEl(true);
          }}
          onMouseLeave={(e) => {
            e.preventDefault();
            setAnchorEl(false);
          }}
          aria-owns={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          style={show ? ctxStyle : { marginRight: '0.5rem' }}
        >
          <div className={classes.cbadgeContainer}>
            <img
              className="k8s-image"
              src={
                connectionMetadataState
                  ? `/${connectionMetadataState[CONNECTION_KINDS.KUBERNETES]?.icon}`
                  : ''
              }
              width="24px"
              height="24px"
              // style={{ zIndex: '2' }}
            />
            <div className={classes.cbadge}>{contexts?.total_count || 0}</div>
          </div>
        </IconButton>
      </div>

      <Slide
        direction="down"
        style={styleSlider}
        timeout={400}
        in={open}
        mountOnEnter
        unmountOnExit
      >
        <div>
          <ClickAwayListener
            onClickAway={(e) => {
              if (
                typeof e.target.className == 'string' &&
                !e.target.className?.includes('cbadge') &&
                e.target?.className != 'k8s-image' &&
                !e.target.className.includes('k8s-icon-button')
              ) {
                setAnchorEl(false);
                setShowFullContextMenu(false);
              }
            }}
          >
            <Paper className={classes.cMenuContainer}>
              <div>
                <TextField
                  id="search-ctx"
                  label="Search"
                  size="small"
                  variant="outlined"
                  onChange={(ev) => searchContexts(ev.target.value)}
                  style={{
                    width: '100%',
                    backgroundColor: 'rgba(102, 102, 102, 0.12)',
                    margin: '1px 0px',
                  }}
                  InputProps={{
                    endAdornment: <Search className={classes.searchIcon} style={iconMedium} />,
                  }}
                />
              </div>
              <div>
                {contexts?.total_count ? (
                  <>
                    <Checkbox
                      checked={activeContexts.includes('all')}
                      onChange={() => setActiveContexts('all')}
                      color="primary"
                    />
                    <span style={{ fontWeight: 'bolder' }}>select all</span>
                  </>
                ) : (
                  <Link href="/settings">
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      style={{ margin: '0.5rem 0.5rem', whiteSpace: 'nowrap' }}
                    >
                      <AddIcon className={classes.AddIcon} style={iconMedium} />
                      Connect Clusters
                    </Button>
                  </Link>
                )}
                {contexts?.contexts?.map((ctx, idx) => {
                  const { operatorState, meshSyncState, natsState } = getControllerStatesByContexID(
                    ctx.id,
                  );

                  return (
                    <div key={`${ctx.uniqueID}-${idx}`} id={ctx.id} className={classes.chip}>
                      <CustomTextTooltip
                        backgroundColor={CHARCOAL}
                        title={`Server: ${ctx.server},  Operator: ${formatToTitleCase(
                          operatorState,
                        )}, MeshSync: ${formatToTitleCase(
                          meshSyncState,
                        )}, Broker: ${formatToTitleCase(natsState)}`}
                      >
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                          }}
                        >
                          <Checkbox
                            checked={activeContexts.includes(ctx.id)}
                            onChange={() => setActiveContexts(ctx.id)}
                            color="primary"
                          />
                          <_ConnectionChip
                            title={ctx?.name}
                            onDelete={handleKubernetesDelete(ctx.name, ctx.connection_id)}
                            handlePing={() => ping(ctx.name, ctx.server, ctx.connection_id)}
                            iconSrc={
                              connectionMetadataState
                                ? `/${connectionMetadataState[CONNECTION_KINDS.KUBERNETES]?.icon}`
                                : ''
                            } // chnage to use connection def
                            status={operatorState}
                          />
                        </div>
                      </CustomTextTooltip>
                    </div>
                  );
                })}
              </div>
            </Paper>
          </ClickAwayListener>
        </div>
      </Slide>

      <PromptComponent ref={deleteCtxtRef} />
    </>
  );
}

export default K8sContextMenu;
