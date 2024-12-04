import useKubernetes from '@/lib/hooks/useKubernetes';
import { Title } from '@/components/Dashboard/View';
import { DefaultTableCell } from '../../DefaultTableCell';
import { SortableTableCell } from '../../SortableTableCell';
import { SINGLE_VIEW } from '../../config';

export const NamespaceTableConfig = (
  switchView,
  meshSyncResources,
  k8sConfig,
  connectionMetadataState,
) => {
  const ping = useKubernetes();
  return {
    name: 'Namespace',
    colViews: [
      ['id', 'na'],
      ['metadata.name', 'xs'],
      ['apiVersion', 'm'],
      ['cluster_id', 'xs'],
      ['metadata.creationTimestamp', 'l'],
    ],
    columns: [
      {
        name: 'id',
        label: 'ID',
        options: {
          display: false,
          customBodyRender: (value) => <FormatId id={value} />,
        },
      },
      {
        name: 'metadata.name',
        label: 'Name',
        options: {
          sort: false,
          customHeadRender: function CustomHead({ ...column }) {
            return <DefaultTableCell columnData={column} />;
          },
          customBodyRender: function CustomBody(value, tableMeta) {
            return (
              <Title
                onClick={() => switchView(SINGLE_VIEW, meshSyncResources[tableMeta.rowIndex])}
                data={
                  meshSyncResources[tableMeta.rowIndex]
                    ? meshSyncResources[tableMeta.rowIndex]?.component_metadata?.metadata
                    : {}
                }
                value={value}
              />
            );
          },
        },
      },
      {
        name: 'apiVersion',
        label: 'API version',
        options: {
          sort: true,
          sortThirdClickReset: true,
          customHeadRender: function CustomHead({ index, ...column }, sortColumn, columnMeta) {
            return (
              <SortableTableCell
                index={index}
                columnData={column}
                columnMeta={columnMeta}
                onSort={() => sortColumn(index)}
              />
            );
          },
        },
      },
      {
        name: 'cluster_id',
        label: 'Cluster',
        options: {
          sort: true,
          sortThirdClickReset: true,
          customHeadRender: function CustomHead({ index, ...column }, sortColumn, columnMeta) {
            return (
              <SortableTableCell
                index={index}
                columnData={column}
                columnMeta={columnMeta}
                onSort={() => sortColumn(index)}
              />
            );
          },
          customBodyRender: function CustomBody(val) {
            let context = getK8sContextFromClusterId(val, k8sConfig);
            return (
              <TootltipWrappedConnectionChip
                title={context.name}
                iconSrc={
                  connectionMetadataState
                    ? connectionMetadataState[CONNECTION_KINDS.KUBERNETES]?.icon
                    : ''
                }
                handlePing={() => ping(context.name, context.server, context.connection_id)}
              />
            );
          },
        },
      },
      {
        name: 'metadata.creationTimestamp',
        label: 'Age',
        options: {
          sort: false,
          customHeadRender: function CustomHead({ ...column }) {
            return <DefaultTableCell columnData={column} />;
          },
          customBodyRender: function CustomBody(value) {
            let time = timeAgo(value);
            return <>{time}</>;
          },
        },
      },
    ],
  };
};
