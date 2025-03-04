import { Theme } from '@mui/material';
import { MUIDataTableColumn, MUIDataTableMeta } from 'mui-datatables';
import { PLAYGROUND_MODES } from '../../constants/constants';
import { ChainIcon, CopyIcon, KanvasIcon, PublishIcon } from '../../icons';
import Download from '../../icons/Download/Download';
import { downloadPattern, slugify } from '../CatalogDetail/helper';
import { RESOURCE_TYPES } from '../CatalogDetail/types';
import { Pattern } from '../CustomCatalog/CustomCard';
import { ConditionalTooltip } from '../Helpers/CondtionalTooltip';
import { ColView } from '../Helpers/ResponsiveColumns/responsive-coulmns.tsx';
import { DataTableEllipsisMenu } from '../ResponsiveDataTable';
import { UserTableAvatarInfo } from '../UsersTable';
import { getColumnValue } from './helper';
import { L5DeleteIcon, NameDiv } from './style';

interface TableMeta extends MUIDataTableMeta {
  rowIndex: number;
  tableData: Pattern[];
}

interface ColumnConfigProps {
  handleDeleteModal: (data: Pattern) => () => void;
  handlePublishModal: (data: Pattern) => void;
  handleUnpublishModal: (data: Pattern) => () => void;
  handleCopyUrl: (type: string, name: string, id: string) => void;
  handleClone: (name: string, id: string) => void;
  handleShowDetails: (designId: string, designName: string) => void;
  handleDownload?: (design: Pattern) => void;
  getDownloadUrl?: (id: string) => string;
  isDownloadAllowed: boolean;
  isCopyLinkAllowed: boolean;
  isDeleteAllowed: boolean;
  isPublishAllowed: boolean;
  isUnpublishAllowed: boolean;
  // for workspace designs table page only
  isFromWorkspaceTable?: boolean;
  isRemoveAllowed?: boolean;
  theme?: Theme;
}

export const colViews: ColView[] = [
  ['id', 'na'],
  ['name', 'xs'],
  ['first_name', 'xs'],
  ['created_at', 'na'],
  ['updated_at', 'l'],
  ['visibility', 'l'],
  ['user_id', 'na'],
  ['actions', 'xs']
];

export const createDesignsColumnsConfig = ({
  handleDeleteModal,
  handlePublishModal,
  handleUnpublishModal,
  handleCopyUrl,
  handleClone,
  handleShowDetails,
  getDownloadUrl,
  handleDownload,
  isUnpublishAllowed,
  isCopyLinkAllowed,
  isDeleteAllowed,
  isPublishAllowed,
  isDownloadAllowed,
  isRemoveAllowed,
  theme,
  isFromWorkspaceTable = false
}: ColumnConfigProps): MUIDataTableColumn[] => {
  return [
    {
      name: 'id',
      label: 'ID',
      options: {
        filter: false,
        customBodyRender: (value: string) => <ConditionalTooltip value={value} maxLength={10} />
      }
    },
    {
      name: 'name',
      label: 'Name',
      options: {
        filter: false,
        sort: true,
        searchable: true,
        customBodyRender: (value: string, tableMeta: MUIDataTableMeta) => {
          const designId = (tableMeta as TableMeta).tableData[tableMeta.rowIndex]?.id ?? '';
          const designName = (tableMeta as TableMeta).tableData[tableMeta.rowIndex]?.name ?? '';

          return <NameDiv onClick={() => handleShowDetails(designId, designName)}>{value}</NameDiv>;
        }
      }
    },
    {
      name: 'first_name',
      label: 'Author',
      options: {
        filter: false,
        sort: true,
        searchable: true,
        customBodyRender: (_, tableMeta: MUIDataTableMeta) => {
          const firstName = getColumnValue(tableMeta as TableMeta, 'first_name');
          const lastName = getColumnValue(tableMeta as TableMeta, 'last_name');
          const avatar_url = getColumnValue(tableMeta as TableMeta, 'avatar_url');
          const user_id = getColumnValue(tableMeta as TableMeta, 'user_id');
          const userEmail = getColumnValue(tableMeta as TableMeta, 'email');

          return (
            <UserTableAvatarInfo
              userEmail={userEmail}
              userId={user_id}
              userName={`${firstName} ${lastName}`}
              profileUrl={avatar_url}
            />
          );
        }
      }
    },
    {
      name: 'created_at',
      label: 'Created At',
      options: {
        filter: false,
        sort: true,
        searchable: true,
        setCellHeaderProps: () => {
          return { align: 'center' };
        }
      }
    },
    {
      name: 'updated_at',
      label: 'Updated At',
      options: {
        filter: false,
        sort: true,
        searchable: true,
        setCellHeaderProps: () => {
          return { align: 'center' };
        }
      }
    },
    {
      name: 'visibility',
      label: 'Visibility',
      options: {
        filter: false,
        sort: false,
        searchable: true
      }
    },
    {
      name: 'user_id',
      label: 'User ID',
      options: {
        filter: false,
        sort: false,
        searchable: false
      }
    },

    {
      name: 'email',
      label: 'email',
      options: {
        filter: false,
        sort: false,
        searchable: false
      }
    },

    {
      name: 'actions',
      label: 'Actions',
      options: {
        filter: false,
        sort: false,
        searchable: false,
        setCellHeaderProps: () => ({ align: 'center' as const }),
        setCellProps: () => ({ align: 'center' as const }),
        customBodyRender: function CustomBody(_, tableMeta: MUIDataTableMeta) {
          const rowIndex = (tableMeta as TableMeta).rowIndex;
          const rowData = (tableMeta as TableMeta).tableData[rowIndex];
          const actionsList = [
            {
              title: 'Download',
              onClick: getDownloadUrl
                ? () => downloadPattern(rowData.id, rowData.name, getDownloadUrl)
                : () => handleDownload && handleDownload(rowData),
              disabled: !isDownloadAllowed,
              icon: <Download width={24} height={24} fill={theme?.palette.icon.secondary} />
            },
            {
              title: 'Copy Link',
              disabled: rowData.visibility === 'private' || !isCopyLinkAllowed,
              onClick: () => {
                handleCopyUrl(RESOURCE_TYPES.DESIGN, rowData?.name, rowData?.id);
              },
              icon: <ChainIcon width={'24'} height={'24'} fill={theme?.palette.icon.secondary} />
            },
            {
              title: 'Open in playground',
              onClick: () => {
                window.open(
                  `https://playground.meshery.io/extension/meshmap?mode=${
                    PLAYGROUND_MODES.DESIGNER
                  }&type=${RESOURCE_TYPES.DESIGN}&id=${rowData?.id}&name=${slugify(rowData?.name)}`,
                  '_blank'
                );
              },
              icon: (
                <KanvasIcon width={24} height={24} primaryFill={theme?.palette.icon.secondary} />
              )
            },
            {
              title: isFromWorkspaceTable ? 'Remove Design' : 'Delete',
              disabled: isFromWorkspaceTable ? !isRemoveAllowed : !isDeleteAllowed,
              onClick: () => handleDeleteModal(rowData)(),
              icon: <L5DeleteIcon />
            }
          ];

          const publishAction = {
            title: 'Publish',
            disabled: !isPublishAllowed,
            onClick: () => handlePublishModal(rowData),
            icon: <PublishIcon width={24} height={24} fill={theme?.palette.icon.secondary} />
          };

          const unpublishAction = {
            title: 'Unpublish',
            onClick: () => handleUnpublishModal(rowData)(),
            disabled: !isUnpublishAllowed,
            icon: <PublishIcon width={24} height={24} fill={theme?.palette.icon.secondary} />
          };

          const cloneAction = {
            title: 'Clone',
            onClick: () => handleClone(rowData?.name, rowData?.id),
            icon: <CopyIcon width={24} height={24} fill={theme?.palette.icon.secondary} />
          };

          if (rowData.visibility === 'published') {
            actionsList.splice(0, 0, cloneAction);
            actionsList.splice(2, 0, unpublishAction);
          } else {
            actionsList.splice(1, 0, publishAction);
          }

          return <DataTableEllipsisMenu actionsList={actionsList} theme={theme} />;
        }
      }
    }
  ];
};
