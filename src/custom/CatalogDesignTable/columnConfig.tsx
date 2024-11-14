/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MUIDataTableColumn, MUIDataTableMeta } from 'mui-datatables';
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share';
import { Avatar, Box, Grid, Typography } from '../../base';
import { CLOUD_URL } from '../../constants/constants';
import { iconMedium } from '../../constants/iconsSizes';
import {
  ChainIcon,
  CopyIcon,
  DownloadIcon,
  FacebookIcon,
  KanvasIcon,
  LinkedinIcon,
  PersonIcon,
  PublishIcon,
  TwitterIcon
} from '../../icons';
import { downloadFilter, downloadYaml } from '../CatalogDetail/helper';
import { RESOURCE_TYPES } from '../CatalogDetail/types';
import { Pattern } from '../CustomCatalog/CustomCard';
import { CustomTooltip } from '../CustomTooltip';
import { ConditionalTooltip } from '../Helpers/CondtionalTooltip';
import { DataTableEllipsisMenu } from '../ResponsiveDataTable';
import { NameDiv } from './style';

export type ColView = [string, 'na' | 'xs' | 'l'];

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
  type?: string;
  theme?: any;
  showUnpublish?: boolean;
  showOpenPlayground?: boolean;
  currentUserId?: string;
  isCloneDisabled?: boolean;
  isUnpublishDisabled?: boolean;
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
  type,
  theme,
  showUnpublish,
  currentUserId,
  isCloneDisabled,
  isUnpublishDisabled,
  showOpenPlayground
}: ColumnConfigProps): MUIDataTableColumn[] => {
  const cleanedType = type?.replace('my-', '').replace(/s$/, '');
  const getColumnValue = (tableMeta: MUIDataTableMeta, targetColumn: string): any => {
    //@ts-ignore
    const rowData = tableMeta.tableData[tableMeta.rowIndex] as Pattern;
    return (rowData as any)[targetColumn] || '';
  };

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
          const displayName =
            firstName && lastName
              ? `${firstName} ${lastName}`
              : firstName
              ? firstName
              : lastName
              ? lastName
              : '';

          return (
            <Box sx={{ '& > img': { mr: 2, flexShrink: 0 } }}>
              <Grid
                container
                alignItems="center"
                style={maxWidth ? { width: 'max-content' } : { width: '' }}
              >
                <Grid item>
                  <Box sx={{ color: 'text.secondary', mr: 1 }}>
                    <CustomTooltip title={`View ${displayName}'s Profile`}>
                      <div>
                        <Avatar
                          style={{ cursor: 'pointer' }}
                          alt={displayName}
                          src={avatar_url}
                          onClick={() => {
                            window.open(`${CLOUD_URL}/user/${user_id}`, '_blank');
                          }}
                        >
                          {!avatar_url && <PersonIcon />}
                        </Avatar>
                      </div>
                    </CustomTooltip>
                  </Box>
                </Grid>
                {maxWidth && (
                  <Grid item>
                    <Typography variant="body2">{displayName}</Typography>
                  </Grid>
                )}
              </Grid>
            </Box>
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
              onClick: () => {
                cleanedType === RESOURCE_TYPES.FILTERS
                  ? downloadFilter(rowData.id, rowData.name)
                  : downloadYaml(rowData.pattern_file, rowData.name);
              },
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
          return <DataTableEllipsisMenu actionsList={actionsList} theme={theme} />;
        }
      }
    }
  ];
};
