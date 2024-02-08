import { Paper, Tab, Tabs } from '@layer5/sistent';
import { styled } from '@mui/material';
import { ResourcesConfig } from './resources/config';
import TextTooltip from '../MesheryMeshInterface/TextTooltip';
import { KubernetesIcon } from '@layer5/sistent';
import MesheryIcon from './MesheryIcon';
import { TabPanel } from './TabPanel';
import { useRouter } from 'next/navigation';
import Overview from './Overview';
import ResourcesSubMenu from './resources/ResourcesSubMenu';
import ResourcesTable from './resources/ResourcesTable';
import { withRouter } from 'next/router';

const DashboardTab = styled(Tab)(({ theme }) => ({
  minWidth: 40,
  paddingLeft: 0,
  paddingRight: 0,
  '&.Mui-selected': {
    color: theme.palette.mode === 'dark' ? '#00B39F' : theme.palette.primary.main,
  },
}));

const DashboardTabs = styled(Tabs)(({ theme }) => ({
  flexGrow: 1,
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.mode === 'dark' ? '#00B39F' : theme.palette.primary.main,
  },
  '& .MuiTab-fullWidth': {
    flexBasis: 'unset',
  },
}));

const useDashboardRouter = () => {
  const router = useRouter();
  const { query, push: pushRoute, route } = router;

  const resourceCategory = query && query.resourceCategory ? query.resourceCategory : 'Overview';
  const selectedResource = query && query.resource;

  const changeResourceTab = (resourceCategory) => {
    if (query.resourceCategory === resourceCategory) {
      return;
    }
    pushRoute(
      `${route}?resourceCategory=${resourceCategory || query.resourceCategory}`,
      undefined,
      { shallow: true },
    );
  };

  const handleChangeSelectedResource = (resource) => {
    if (query.resource === resource) {
      return;
    }
    pushRoute(`${route}?resourceCategory=${resourceCategory}&resource=${resource}`, undefined, {
      shallow: true,
    });
  };

  return { resourceCategory, changeResourceTab, selectedResource, handleChangeSelectedResource };
};

const ResourceCategoryTabs = ['Overview', ...Object.keys(ResourcesConfig)];

function Dashboard() {
  const { resourceCategory, changeResourceTab, selectedResource, handleChangeSelectedResource } =
    useDashboardRouter();

  const getResourceCategoryIndex = (resourceCategory) => {
    return ResourceCategoryTabs.findIndex((resource) => resource === resourceCategory);
  };

  const getResourceCategory = (index) => {
    return ResourceCategoryTabs[index];
  };

  return (
    <div
      style={{
        flexGrow: 1,
        maxWidth: '100%',
        height: 'auto',
      }}
    >
      <Paper
        square
        sx={{
          flexGrow: 1,
          maxWidth: '100%',
          height: 'auto',
        }}
      >
        <DashboardTabs
          indicatorColor="primary"
          variant="fullWidth"
          textColor="primary"
          allowScrollButtonsMobile
          scrollButtons="auto"
          value={getResourceCategoryIndex(resourceCategory)}
          onChange={(_e, val) => {
            changeResourceTab(getResourceCategory(val));
          }}
        >
          {ResourceCategoryTabs.map((resource, idx) => {
            return (
              <TextTooltip key={idx} title={`View ${resource}`} placement="top">
                <DashboardTab
                  value={idx}
                  key={resource}
                  icon={
                    resource === 'Overview' ? (
                      <MesheryIcon />
                    ) : (
                      <KubernetesIcon width="28px" height="28px" />
                    )
                  }
                />
              </TextTooltip>
            );
          })}
        </DashboardTabs>
      </Paper>
      <TabPanel value={resourceCategory} index={'Overview'}>
        <Overview />
      </TabPanel>
      {Object.keys(ResourcesConfig).map((resource, idx) => (
        <TabPanel value={resourceCategory} index={resource} key={resource}>
          {ResourcesConfig[resource].submenu ? (
            <ResourcesSubMenu
              key={idx}
              resource={ResourcesConfig[resource]}
              selectedResource={selectedResource}
              handleChangeSelectedResource={handleChangeSelectedResource}
              updateProgress={updateProgress}
              k8sConfig={k8sconfig}
              selectedK8sContexts={selectedK8sContexts}
            />
          ) : (
            <ResourcesTable
              key={idx}
              workloadType={resource}
              k8sConfig={k8sconfig}
              selectedK8sContexts={selectedK8sContexts}
              resourceConfig={ResourcesConfig[resource].tableConfig}
              menu={ResourcesConfig[resource].submenu}
              updateProgress={updateProgress}
            />
          )}
        </TabPanel>
      ))}
    </div>
  );
}

export default withRouter(Dashboard);
