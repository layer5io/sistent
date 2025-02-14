/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MUIDataTableColumn, MUIDataTableMeta } from 'mui-datatables';
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share';
import { iconMedium } from '../../constants/iconsSizes';
import {
  ChainIcon,
  CopyIcon,
  DownloadIcon,
  FacebookIcon,
  KanvasIcon,
  LinkedinIcon,
  PublishIcon,
  TwitterIcon
} from '../../icons';
import { downloadPattern } from '../CatalogDetail/helper';
import { Pattern } from '../CustomCatalog/CustomCard';
import { ConditionalTooltip } from '../Helpers/CondtionalTooltip';
import { ColView } from '../Helpers/ResponsiveColumns/responsive-coulmns.tsx/responsive-column';
import { DataTableEllipsisMenu } from '../ResponsiveDataTable';
import AuthorCell from './AuthorCell';
import { getColumnValue } from './helper';
import { NameDiv } from './style';

export const colViews: ColView[] = [
  ['id', 'na'],
  ['name', 'xs'],
  ['first_name', 'xs'],
  ['last_name', 'na'],
  ['created_at', 'na'],
  ['updated_at', 'l'],
  ['design_type', 'xs'],
  ['class', 'l'],
  ['view_count', 'na'],
  ['download_count', 'na'],
  ['clone_count', 'na'],
  ['deployment_count', 'na'],
  ['share_count', 'na'],
  ['actions', 'xs']
];

interface ColumnConfigProps {
  handleShowDetails: (design: Pattern) => void;
  handleClone: (designId: string, name: string) => void;
  handleCopyUrl: (designId: string, name: string) => void;
  handleOpenPlayground: (designId: string, name: string) => void;
  handleUnpublish?: (design: Pattern) => void;
  maxWidth?: boolean;
  getCatalogUrl: (type: string, name: string) => string;
  theme?: any;
  showUnpublish?: boolean;
  showOpenPlayground?: boolean;
  currentUserId?: string;
  isCloneDisabled?: boolean;
  isUnpublishDisabled?: boolean;
  getDownloadUrl: (id: string) => string;
}

interface ActionItem {
  title: string;
  icon?: JSX.Element;
  onClick?: () => void;
  disabled?: boolean;
  customComponent?: JSX.Element;
  type?: string;
}

export const createDesignColumns = ({
  handleShowDetails,
  handleClone,
  handleCopyUrl,
  handleOpenPlayground,
  handleUnpublish = () => {},
  maxWidth = true,
  getCatalogUrl,
  getDownloadUrl,
  theme,
  showUnpublish,
  currentUserId,
  isCloneDisabled,
  isUnpublishDisabled,
  showOpenPlayground
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
          //@ts-ignore
          const design = tableMeta.tableData[tableMeta.rowIndex] as Pattern;
          return <NameDiv onClick={() => handleShowDetails(design)}>{value}</NameDiv>;
        }
      }
    },
    {
      name: 'avatar_url',
      label: 'Avatar',
      options: {
        display: false
      }
    },
    {
      name: 'user_id',
      label: 'User ID',
      options: {
        display: false
      }
    },
    {
      name: 'first_name',
      label: 'Author',
      options: {
        filter: false,
        sort: true,
        searchable: true,
        customBodyRender: (_: string, tableMeta: MUIDataTableMeta) => {
          const firstName = getColumnValue(tableMeta, 'first_name');
          const lastName = getColumnValue(tableMeta, 'last_name');
          const avatar_url = getColumnValue(tableMeta, 'avatar_url');
          const user_id = getColumnValue(tableMeta, 'user_id');

          return (
            <AuthorCell
              firstName={firstName}
              lastName={lastName}
              avatarUrl={avatar_url}
              userId={user_id}
              maxWidth={maxWidth}
            />
          );
        }
      }
    },
    {
      name: 'last_name',
      label: 'Last Name',
      options: {
        display: false
      }
    },
    {
      name: 'created_at',
      label: 'Created At',
      options: {
        filter: false,
        sort: true,
        searchable: true
      }
    },
    {
      name: 'updated_at',
      label: 'Updated At',
      options: {
        filter: false,
        sort: true,
        searchable: true
      }
    },
    {
      name: 'design_type',
      label: 'Type',
      options: {
        filter: true,
        sort: false,
        searchable: true
      }
    },
    {
      name: 'class',
      label: 'Class',
      options: {
        filter: true,
        sort: false,
        searchable: true
      }
    },
    {
      name: 'view_count',
      label: 'Opens',
      options: {
        filter: false,
        sort: true
      }
    },
    {
      name: 'download_count',
      label: 'Downloads',
      options: {
        filter: false,
        sort: true
      }
    },
    {
      name: 'clone_count',
      label: 'Clones',
      options: {
        filter: false,
        sort: true
      }
    },
    {
      name: 'deployment_count',
      label: 'Deploys',
      options: {
        filter: false,
        sort: true
      }
    },
    {
      name: 'share_count',
      label: 'Shares',
      options: {
        filter: false,
        sort: true
      }
    },
    {
      name: 'actions',
      label: 'Actions',
      options: {
        filter: false,
        sort: false,
        searchable: false,
        setCellHeaderProps: () => ({ align: 'center' }),
        setCellProps: () => ({ align: 'center' }),
        customBodyRender: (_: any, tableMeta: MUIDataTableMeta) => {
          //@ts-ignore
          const rowData = tableMeta.tableData[tableMeta.rowIndex] as Pattern;

          function constructMessage() {
            const currentUser = rowData?.user_id === currentUserId;
            if (currentUser) {
              return `Check out my design "${rowData?.name}" on Layer5's Catalog`;
            } else {
              return `Check out ${
                rowData?.first_name + ' ' + rowData.last_name
              }'s design "${rowData?.name}" on Layer5's Catalog`;
            }
          }
          const baseActions: ActionItem[] = [
            {
              title: 'Clone',
              onClick: () => handleClone(rowData.id, rowData.name),
              disabled: isCloneDisabled,
              icon: <CopyIcon width={24} height={24} fill={theme.palette.text.primary} />
            },
            {
              title: 'Download',
              onClick: () => downloadPattern(rowData.id, rowData.name, getDownloadUrl),
              icon: <DownloadIcon width={24} height={24} fill={theme.palette.text.primary} />
            },
            {
              title: 'Copy Link',
              onClick: () => handleCopyUrl(rowData.id, rowData.name),
              icon: <ChainIcon width={'24'} height={'24'} fill={theme.palette.text.primary} />
            },
            {
              title: 'Share Design via Socials',
              type: 'share-social',
              customComponent: (
                <div
                  style={{
                    height: '40px',
                    textAlign: 'center',
                    backgroundColor: theme.palette.superLightCasper
                  }}
                >
                  <TwitterShareButton
                    url={getCatalogUrl('designs', rowData.name)}
                    title={constructMessage()}
                    hashtags={['opensource', 'Layer5', 'cloud']}
                  >
                    <TwitterIcon style={iconMedium} />
                  </TwitterShareButton>
                  <LinkedinShareButton
                    url={getCatalogUrl('designs', rowData.name)}
                    summary={constructMessage()}
                  >
                    <LinkedinIcon style={iconMedium} />
                  </LinkedinShareButton>
                  <FacebookShareButton
                    url={getCatalogUrl('designs', rowData.name)}
                    hashtag={'#opensource'}
                  >
                    <FacebookIcon style={iconMedium} />
                  </FacebookShareButton>
                </div>
              )
            }
          ];
          // Conditionally add playground and unpublish buttons
          const actionsList = [...baseActions];

          if (showUnpublish) {
            actionsList.splice(2, 0, {
              title: 'Unpublish',
              onClick: () => handleUnpublish(rowData),
              disabled: isUnpublishDisabled,
              icon: <PublishIcon width={24} height={24} fill={theme.palette.text.primary} />
            });
          }

          if (showOpenPlayground) {
            actionsList.splice(2, 0, {
              title: 'Open in playground',
              onClick: () => handleOpenPlayground(rowData.id, rowData.name),
              icon: <KanvasIcon width={24} height={24} primaryFill={theme.palette.text.primary} />
            });
          }
          //@ts-ignore
          return <DataTableEllipsisMenu actionsList={actionsList} />;
        }
      }
    }
  ];
};
