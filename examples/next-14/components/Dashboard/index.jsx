import { ResourcesConfig } from './resources/config';
import TextTooltip from '../MesheryMeshInterface/TextTooltip';
import { KubernetesIcon } from '@layer5/sistent';
import MesheryIcon from './MesheryIcon';
import { TabPanel } from './TabPanel';
import Overview from './Overview';
import ResourcesSubMenu from './resources/ResourcesSubMenu';
import ResourcesTable from './resources/ResourcesTable';
import { withRouter } from 'next/router';
import { DashboardTab } from '@/styles/DashboardTab';
import { DashboardTabs } from '@/styles/DashboardTabs';
import useDashboardRouter from '@/lib/hooks/useDashboardRouter';

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
    <DashboardLayout>
      <PaperSquare square>
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
                      <MesheryIcon width="28px" height="28px" />
                    ) : (
                      <KubernetesIcon width="28px" height="28px" />
                    )
                  }
                />
              </TextTooltip>
            );
          })}
        </DashboardTabs>
      </PaperSquare>
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
    </DashboardLayout>
  );
}

export default withRouter(Dashboard);
