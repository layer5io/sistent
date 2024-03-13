import { ConfigurationTableConfig } from './configuration/ConfigurationTableConfig';
import { NamespaceTableConfig } from './namespace/NamespaceTableConfig';
import { NodeTableConfig } from './nodes/NodeTableConfig';
import { SecurityTypesConfig } from './security/SecurityTypesConfig';
import { StorageTableConfig } from './storage/StorageTableConfig';
import { WorkloadTableConfig } from './workloads/WorkloadTableConfig';

export const ResourcesConfig = {
  Node: {
    tableConfig: NodeTableConfig,
    submenu: false,
  },
  Namespace: {
    tableConfig: NamespaceTableConfig,
    submenu: false,
  },
  Workload: {
    tableConfig: WorkloadTableConfig,
    submenu: true,
  },
  Configuration: {
    tableConfig: ConfigurationTableConfig,
    submenu: true,
  },
  Network: {
    // tableConfig: NetWorkTableConfig,
    submenu: true,
  },
  Security: {
    tableConfig: SecurityTypesConfig,
    submenu: true,
  },
  Storage: {
    tableConfig: StorageTableConfig,
    submenu: true,
  },
};

export const ALL_VIEW = 'all';
export const SINGLE_VIEW = 'single';
