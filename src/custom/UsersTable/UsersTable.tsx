/* eslint-disable @typescript-eslint/no-explicit-any */
import { Theme } from '@mui/material';
import { MUIDataTableColumn, MUIDataTableMeta } from 'mui-datatables';
import { useRef, useState } from 'react';
import { Box, Tooltip } from '../../base';
import { EditIcon } from '../../icons';
import Github from '../../icons/Github/GithubIcon';
import Google from '../../icons/Google/GoogleIcon';
import LogoutIcon from '../../icons/Logout/LogOutIcon';
import { CHARCOAL, SistentThemeProviderWithoutBaseLine } from '../../theme';
import { useWindowDimensions } from '../Helpers/Dimension';
import {
  ColView,
  updateVisibleColumns
} from '../Helpers/ResponsiveColumns/responsive-coulmns.tsx/responsive-column';
import PromptComponent, { PROMPT_VARIANTS } from '../Prompt';
import ResponsiveDataTable from '../ResponsiveDataTable';
import { TooltipIcon } from '../TooltipIconButton';
import { parseDeletionTimestamp } from '../Workspaces/helper';
import { TableIconsContainer, TableIconsDisabledContainer } from '../Workspaces/styles';
import UserTableAvatarInfo from './UserTableAvatarInfo';
interface ActionButtonsProps {
  tableMeta: MUIDataTableMeta;
  isRemoveFromTeamAllowed: boolean;
  handleRemoveFromTeam: (data: any[]) => () => void;
  theme?: Theme;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  tableMeta,
  handleRemoveFromTeam,
  isRemoveFromTeamAllowed,
  theme
}) => {
  return (
    <div>
      {isRemoveFromTeamAllowed ? (
        <TableIconsContainer>
          <TooltipIcon
            id={`delete_user-${tableMeta.rowIndex}`}
            onClick={handleRemoveFromTeam(tableMeta.rowData)}
            title="Remove user membership from team"
            iconType="delete"
          >
            <LogoutIcon fill={theme?.palette.icon.default} />
          </TooltipIcon>
        </TableIconsContainer>
      ) : (
        <TableIconsDisabledContainer>
          <LogoutIcon fill={theme?.palette.icon.disabled} secondaryFill={CHARCOAL} />
        </TableIconsDisabledContainer>
      )}
    </div>
  );
};

interface UsersTableProps {
  teamID: string;
  useGetUsersForOrgQuery: any;
  org_id: string;
  useRemoveUserFromTeamMutation: any;
  useNotificationHandlers: any;
  isRemoveFromTeamAllowed: boolean;
  theme?: Theme;
}

const UsersTable: React.FC<UsersTableProps> = ({
  teamID,
  useGetUsersForOrgQuery,
  org_id,
  useRemoveUserFromTeamMutation,
  useNotificationHandlers,
  isRemoveFromTeamAllowed,
  theme
}) => {
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [sortOrder, setSortOrder] = useState<string>('last_login_time desc');
  const [search, setSearch] = useState<string>('');
  const availableRoles: string[] = [];
  const { handleError, handleSuccess, handleInfo } = useNotificationHandlers();
  const ref: any = useRef(null);
  const { width } = useWindowDimensions();

  const { data: userData } = useGetUsersForOrgQuery({
    page: page,
    pagesize: pageSize,
    search: search,
    order: sortOrder,
    teamId: teamID,
    orgId: org_id
  });

  const [removeUserFromTeam] = useRemoveUserFromTeamMutation();

  const users = userData?.data || [];
  const count = userData?.total_count || 0;

  const handleRemoveFromTeam = (data: any[]) => async () => {
    const user_id = data[0];

    const response = await ref.current?.show({
      title: `Remove User From Team ?`,
      subtitle: removeUserFromTeamModalContent(data[3], data[2]),
      primaryOption: 'Proceed',
      variant: PROMPT_VARIANTS.DANGER
    });
    if (response === 'Proceed') {
      removeUserFromTeam({
        orgId: org_id,
        teamId: teamID,
        userId: user_id
      })
        .unwrap()
        .then(() => {
          handleSuccess(`${data[4] ? data[4] : ''} ${data[5] ? data[5] : ''} removed from team`);
        })
        .catch((err: any) => {
          const error = err.response?.data?.message || 'Failed to remove user from team';
          if (err.response.status === 404) {
            handleInfo(error);
          } else {
            handleError(error);
          }
        });
    }
  };

  const getValidColumnValue = (rowData: any, columnName: string, columns: MUIDataTableColumn[]) => {
    const columnIndex = columns.findIndex((column: any) => column.name === columnName);
    return rowData[columnIndex];
  };

  const removeUserFromTeamModalContent = (user: string, email: string) => (
    <>
      <p>Are you sure you want to remove this user? (This action is irreversible)</p>
      <p>
        User:{' '}
        <i>
          <b>{user}</b>
        </i>
      </p>
      <p>
        Email:{' '}
        <i>
          <b>{email}</b>
        </i>
      </p>
    </>
  );

  let searchTimeout: NodeJS.Timeout;

  const options = {
    search: false,
    viewColumns: false,
    filter: false,
    rowsPerPageOptions: [10, 20, 25],
    responsive: 'standard',
    selectableRows: 'none',
    count: count,
    rowsPerPage: pageSize,
    page,
    print: false,
    download: false,
    elevation: 0,
    serverSide: true,
    sortOrder: {
      name: sortOrder.split(' ')[0],
      direction: sortOrder.split(' ')[1]
    },
    onTableChange: (action: string, tableState: any) => {
      const sortInfo = tableState.announceText ? tableState.announceText.split(' : ') : [];
      let order = '';
      if (tableState.activeColumn) {
        order = `${columns[tableState.activeColumn].name} desc`;
      }

      switch (action) {
        case 'changePage':
          setPage(tableState.page);
          break;
        case 'changeRowsPerPage':
          setPageSize(tableState.rowsPerPage);
          break;
        case 'search':
          if (searchTimeout) {
            clearTimeout(searchTimeout);
          }
          searchTimeout = setTimeout(() => {
            if (search !== tableState.searchText) {
              setSearch(tableState.searchText);
            }
          }, 500);
          break;
        case 'sort':
          if (sortInfo.length == 2) {
            if (sortInfo[1] === 'ascending') {
              order = `${columns[tableState.activeColumn].name} asc`;
            } else {
              order = `${columns[tableState.activeColumn].name} desc`;
            }
          }
          if (order !== sortOrder) {
            setSortOrder(order);
          }
          break;
      }
    }
  };

  const colViews: ColView[] = [
    ['user_id', 'na'],
    ['avatar_url', 'xs'],
    ['email', 'na'],
    ['username', 'na'],
    ['first_name', 'na'],
    ['last_name', 'na'],
    ['role_names', 'xs'],
    ['status', 'na'],
    ['joined_at', 'l'],
    ['last_login_time', 'l'],
    ['deleted_at', 'na']
    // ["actions", "xs"]
  ];

  const columns: MUIDataTableColumn[] = [
    {
      name: 'user_id',
      label: 'User ID',
      options: {
        filter: true,
        sort: true,
        searchable: false
      }
    },
    {
      name: 'avatar_url',
      label: 'Team Member',
      options: {
        filter: true,
        sort: true,
        searchable: false,
        customBodyRender: (value: string, tableMeta: MUIDataTableMeta) => (
          <Box sx={{ '& > img': { mr: 2, flexShrink: 0 } }}>
            <UserTableAvatarInfo
              userId={getValidColumnValue(tableMeta.rowData, 'user_id', columns)}
              userName={`${tableMeta.rowData[4]} ${tableMeta.rowData[5]}`}
              userEmail={tableMeta.rowData[2]}
              profileUrl={value}
            />
          </Box>
        )
      }
    },
    {
      name: 'email',
      label: 'Email',
      options: {
        filter: true,
        sort: true,
        searchable: true
      }
    },
    {
      name: 'username',
      label: 'Username',
      options: {
        filter: true,
        sort: true,
        searchable: true,
        customBodyRender: (value: string, tableMeta: MUIDataTableMeta) => (
          <div style={{ display: 'flex' }}>
            {value}

            {value?.includes('@') ? (
              <Tooltip title={`Search "${tableMeta.rowData[3]} ${tableMeta.rowData[4]}" on Google`}>
                <a
                  href={`https://www.google.com/search?q=${tableMeta.rowData[3]}+${tableMeta.rowData[4]}`}
                  style={{ color: 'inherit' }}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div>
                    <Google width={20} height={20} />
                  </div>
                </a>
              </Tooltip>
            ) : (
              <Tooltip title={`Lookup "${value}" on GitHub`}>
                <a
                  href={`https://www.github.com/${value}`}
                  style={{ color: 'inherit' }}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div>
                    <Github width={22} height={22} />
                  </div>
                </a>
              </Tooltip>
            )}
          </div>
        )
      }
    },
    {
      name: 'first_name',
      label: 'First',
      options: {
        filter: true,
        sort: true,
        searchable: true
      }
    },
    {
      name: 'last_name',
      label: 'Last',
      options: {
        filter: true,
        sort: true,
        searchable: true
      }
    },
    {
      name: 'role_names',
      label: 'Roles',
      options: {
        filter: true,
        sort: true,
        searchable: false,
        //  filterType: "multiselect",
        filterOptions: {
          names: availableRoles.concat(availableRoles?.map((role) => `!${role}`))
        },
        customBodyRender: (value: string[]) => <div>{value?.join(', ')}</div>
      }
    },
    {
      name: 'status',
      label: 'Status',
      options: {
        filter: true,
        sort: true,
        searchable: false
      }
    },
    {
      name: 'joined_at',
      label: 'Joined At',
      options: {
        filter: true,
        sort: true,
        searchable: false,
        sortDescFirst: true
      }
    },
    {
      name: 'last_login_time',
      label: 'Last Active At',
      options: {
        filter: true,
        sort: true,

        searchable: false,
        sortDescFirst: true
      }
    },
    {
      name: 'deleted_at',
      label: 'Deleted At',
      options: {
        filter: true,
        sort: true,
        searchable: false,
        sortDescFirst: true,
        filterOptions: {
          names: ['Deleted', 'Not Deleted'],
          logic: (val: string, filters: string[]) => {
            if (val != 'NA' && filters.indexOf('Deleted') >= 0) return true;
            else if (val == 'NA' && filters.indexOf('Not Deleted') >= 0) return true;
            return false;
          },
          fullWidth: true
        },
        customBodyRender: (_: string, tableMeta: MUIDataTableMeta) => {
          const rowData = users[tableMeta.rowIndex];
          return parseDeletionTimestamp(rowData);
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
        customBodyRender: (_: string, tableMeta: MUIDataTableMeta) =>
          getValidColumnValue(tableMeta.rowData, 'deleted_at', columns).Valid !== false ? (
            <TableIconsDisabledContainer>
              <EditIcon
                style={{
                  marginRight: '.5rem'
                }}
                fill={CHARCOAL}
                height="30"
                width="30"
              />
              <LogoutIcon fill={CHARCOAL} secondaryFill={CHARCOAL} height={30} width={30} />
            </TableIconsDisabledContainer>
          ) : (
            <ActionButtons
              tableMeta={tableMeta}
              handleRemoveFromTeam={handleRemoveFromTeam}
              isRemoveFromTeamAllowed={isRemoveFromTeamAllowed}
              theme={theme}
            />
          )
      }
    }
  ];

  const [tableCols, updateCols] = useState<MUIDataTableColumn[]>(columns);

  const [columnVisibility] = useState<Record<string, boolean>>(() => {
    const showCols: Record<string, boolean> = updateVisibleColumns(colViews, width);
    // Initialize column visibility based on the original columns' visibility
    const initialVisibility: Record<string, boolean> = {};
    columns.forEach((col) => {
      initialVisibility[col.name] = showCols[col.name];
    });
    return initialVisibility;
  });
  return (
    <SistentThemeProviderWithoutBaseLine initialMode={theme?.palette.mode}>
      <div style={{ margin: 'auto', width: '100%' }}>
        <ResponsiveDataTable
          columns={columns}
          data={users}
          options={{
            ...options,
            filter: true,
            sort: true
          }}
          colViews={colViews}
          tableCols={tableCols}
          updateCols={updateCols}
          columnVisibility={columnVisibility}
          backgroundColor={theme?.palette.background.tabs}
        />
      </div>
      <PromptComponent ref={ref} />
    </SistentThemeProviderWithoutBaseLine>
  );
};

export default UsersTable;
