import { Paper, Box, Tab, Tabs, Tooltip } from '@layer5/sistent';
import TabPanel from '../TabPanel';
import ResourcesTable from './ResourcesTable';
import { KubernetesIcon } from '@layer5/sistent';
import React from 'react';

function ResourcesSubMenu(props) {
  const {
    updateProgress,
    k8sConfig,
    resource,
    selectedK8sContexts,
    selectedResource,
    handleChangeSelectedResource,
  } = props;

  if (!selectedResource) {
    handleChangeSelectedResource(Object.keys(resource.tableConfig())[0]);
  }

  const TABS = Object.keys(resource.tableConfig());

  const getResourceCategoryIndex = (resourceCategory) => {
    return TABS.findIndex((resource) => resource === resourceCategory);
  };

  const getResourceCategory = (index) => {
    return TABS[index];
  };

  return (
    <>
      <div className={classes.wrapperClss}>
        <Paper className={classes.wrapperClss}>
          <div className={classes.subMenuTab}>
            <Box sx={{ margin: '0 auto', width: '100%', maxWidth: { xs: 490, sm: 880, md: 1200 } }}>
              <Tabs
                value={getResourceCategoryIndex(selectedResource)}
                className={classes.tabs}
                onChange={(_e, v) => handleChangeSelectedResource(getResourceCategory(v))}
                variant="scrollable"
                scrollButtons="auto"
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                {TABS.map((key, index) => (
                  <Tooltip
                    key={index}
                    title={`${resource.tableConfig()[key].name}`}
                    placement="top"
                  >
                    <Tab
                      key={index}
                      value={index}
                      label={
                        <div className={classes.iconText}>
                          <KubernetesIcon className={classes.iconText} width="22px" height="22px" />
                          {resource.tableConfig()[key].name}
                        </div>
                      }
                    />
                  </Tooltip>
                ))}
              </Tabs>
            </Box>
          </div>
        </Paper>
        {TABS.map((key, index) => (
          <TabPanel value={selectedResource} index={key} key={index}>
            <ResourcesTable
              key={index}
              workloadType={key}
              updateProgress={updateProgress}
              classes={classes}
              k8sConfig={k8sConfig}
              resourceConfig={resource.tableConfig}
              submenu={resource.submenu}
              selectedK8sContexts={selectedK8sContexts}
            />
          </TabPanel>
        ))}
      </div>
    </>
  );
}

export default ResourcesSubMenu;
