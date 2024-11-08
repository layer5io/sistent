/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTheme } from '@mui/material';
import { MUIDataTableColumn, MUIDataTableMeta } from 'mui-datatables';
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share';
import { Avatar, Box, Grid, Typography } from '../../base';
import { iconMedium } from '../../constants/iconsSizes';
import {
  ChainIcon,
  CopyIcon,
  DownloadIcon,
  FacebookIcon,
  LinkedinIcon,
  PersonIcon,
  PublishIcon,
  TwitterIcon
} from '../../icons';
import { Pattern } from '../CustomCatalog/CustomCard';
import { CustomTooltip } from '../CustomTooltip';
import { ConditionalTooltip } from '../Helpers/CondtionalTooltip';
import { DataTableEllipsisMenu } from '../ResponsiveDataTable';

export const colViews = [
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
  handleCardClick: (design: Pattern) => void;
  handleCopyUrl: (design: Pattern) => void;
  maxWidth?: boolean;
  getCatalogUrl: (type: string, name: string) => string;
}

interface ActionItem {
  title: string;
  icon?: JSX.Element;
  onClick?: () => void;
  disabled?: boolean;
  customComponent?: JSX.Element;
  type?: string;
}

export const createColumns = (
  {
    handleShowDetails,
    handleCardClick,
    handleCopyUrl,
    maxWidth = true,
    getCatalogUrl
  }: ColumnConfigProps,
  theme: any
): MUIDataTableColumn[] => {
  const getColumnValue = (tableMeta: MUIDataTableMeta, targetColumn: string): any => {
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
          const design = tableMeta.tableData[tableMeta.rowIndex] as Pattern;
          return (
            <div onClick={() => handleShowDetails(design)} style={{ cursor: 'pointer' }}>
              {value}
            </div>
          );
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
                            window.location.href = `/user/${user_id}`;
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
        setCellHeaderProps: () => ({ align: 'center' as const }),
        setCellProps: () => ({ align: 'center' as const }),
        customBodyRender: (_: any, tableMeta: MUIDataTableMeta) => {
          const rowData = tableMeta.tableData[tableMeta.rowIndex] as Pattern;

          const constructMessage = () => {
            return `Check out ${rowData.first_name} ${rowData.last_name}'s design "${rowData.name}" on Layer5's Catalog`;
          };

          const actionsList: ActionItem[] = [
            {
              title: 'Clone',
              onClick: () => handleCardClick(rowData),
              disabled: false,
              icon: <CopyIcon width={24} height={24} fill={theme.palette.secondary.iconMain} />
            },
            {
              title: 'Download',
              onClick: () => {},
              icon: <DownloadIcon width={24} height={24} fill={theme.palette.charcoal} />
            },
            {
              title: 'Unpublish',
              onClick: () => {},
              disabled: false,
              icon: <PublishIcon width={24} height={24} fill={theme.palette.charcoal} />
            },
            {
              title: 'Copy Link',
              onClick: () => handleCopyUrl(rowData),
              icon: <ChainIcon width={'24'} height={'24'} fill={theme.palette.charcoal} />
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
          //@ts-ignore
          return <DataTableEllipsisMenu actionsList={actionsList} />;
        }
      }
    }
  ];
};

//@ts-ignore
const ColumnConfig: React.FC<ColumnConfigProps> = (props) => {
  const theme = useTheme();
  return createColumns(props, theme);
};

export default ColumnConfig;
