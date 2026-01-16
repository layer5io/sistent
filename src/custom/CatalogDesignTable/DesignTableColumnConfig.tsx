import { Lock, Public } from '@mui/icons-material';
import { Theme } from '@mui/material';
import { MUIDataTableColumn, MUIDataTableMeta } from '@sistent/mui-datatables';
import { Typography } from '../../base';
import { PLAYGROUND_MODES } from '../../constants/constants';
import { ChainIcon, CopyIcon, KanvasIcon, MoveFileIcon, PublishIcon } from '../../icons';
import Download from '../../icons/Download/Download';
import { downloadPattern, slugify } from '../CatalogDetail/helper';
import { RESOURCE_TYPES } from '../CatalogDetail/types';
import { Pattern } from '../CustomCatalog/CustomCard';
import { ConditionalTooltip } from '../Helpers/CondtionalTooltip';
import { ColView } from '../Helpers/ResponsiveColumns/responsive-coulmns.tsx';
import { DataTableEllipsisMenu } from '../ResponsiveDataTable';
import { VisibilityChipMenu } from '../VisibilityChipMenu';
import { VIEW_VISIBILITY } from '../VisibilityChipMenu/VisibilityChipMenu';
import AuthorCell from './AuthorCell';
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
  handleOpenInDesigner?: (designId: string, designName: string) => void;
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
  showPlaygroundActions: boolean;
  handleVisibilityChange?: (id: string, visibility: VIEW_VISIBILITY) => void;
  currentUserId?: string;
  refetchWorkspaceDesigns: () => void;
}

export const colViews: ColView[] = [
  ['id', 'na'],
  ['name', 'xs'],
  ['user', 'xs'],
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
  handleOpenInDesigner,
  showPlaygroundActions = true,
  isFromWorkspaceTable = false,
  currentUserId,
  handleVisibilityChange,
  refetchWorkspaceDesigns
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
      name: 'user',
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

          return (
            <AuthorCell
              userId={user_id}
              avatarUrl={avatar_url}
              firstName={firstName}
              lastName={lastName}
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
        searchable: true,
        customBodyRender: (value: VIEW_VISIBILITY, tableMeta) => {
          const rowIndex = (tableMeta as TableMeta).rowIndex;
          const designId = (tableMeta as TableMeta).tableData[rowIndex]?.id;
          const designVisibility = (tableMeta as TableMeta).tableData[rowIndex]?.visibility;
          const ownerId = (tableMeta as TableMeta).tableData[rowIndex]?.user_id;
          const isOwner = ownerId === currentUserId;
          const isEnabled = designVisibility !== VIEW_VISIBILITY.PUBLISHED && isOwner;
          return (
            <VisibilityChipMenu
              value={value as VIEW_VISIBILITY}
              onChange={(value) => {
                if (handleVisibilityChange) {
                  handleVisibilityChange(designId, value as VIEW_VISIBILITY);
                  refetchWorkspaceDesigns();
                }
              }}
              enabled={isEnabled}
              options={[
                [VIEW_VISIBILITY.PUBLIC, Public],
                [VIEW_VISIBILITY.PRIVATE, Lock]
              ]}
            />
          );
        }
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
        searchable: false,
        customBodyRender: (_, tableMeta: MUIDataTableMeta) => {
          const userEmail = getColumnValue(tableMeta as TableMeta, 'email');
          return <Typography variant="body2">{userEmail}</Typography>;
        }
      }
    },

    {
      name: 'actions',
      label: 'Actions',
      options: {
        filter: false,
        sort: false,
        searchable: false,

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
              title: 'Open in Playground',
              hidden: showPlaygroundActions == false,
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
              hidden: !handleOpenInDesigner,
              title: 'Open in Designer',
              // disabled : !handleOpenInDesigner,
              onClick: () =>
                handleOpenInDesigner && handleOpenInDesigner(rowData?.id, rowData?.name),
              icon: (
                <KanvasIcon width={24} height={24} primaryFill={theme?.palette.icon.secondary} />
              )
            },

            {
              title: 'Delete',
              disabled: !isDeleteAllowed,
              onClick: () => handleDeleteModal(rowData)(),
              icon: <L5DeleteIcon />
            }
          ].filter((a) => a?.hidden != true);

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
            hidden: false,
            title: 'Clone',
            onClick: () => handleClone(rowData?.name, rowData?.id),
            icon: <CopyIcon width={24} height={24} fill={theme?.palette.icon.secondary} />
          };

          const moveAction = {
            title: 'Move Design',
            disabled: !isRemoveAllowed,
            onClick: () => handleDeleteModal(rowData)(),
            icon: <MoveFileIcon />
          };

          if (isFromWorkspaceTable) {
            actionsList.splice(0, 0, moveAction);
          }

          if (rowData.visibility === 'published') {
            actionsList.splice(0, 0, cloneAction);
            actionsList.splice(2, 0, unpublishAction);
          } else {
            actionsList.splice(1, 0, publishAction);
          }

          return <DataTableEllipsisMenu actionsList={actionsList} />;
        }
      }
    }
  ];
};
