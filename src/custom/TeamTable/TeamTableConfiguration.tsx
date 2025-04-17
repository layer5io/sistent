/* eslint-disable @typescript-eslint/no-explicit-any */
import { MUIDataTableColumn, MUIDataTableMeta } from 'mui-datatables';
import { useState } from 'react';
import { DeleteIcon, EditIcon } from '../../icons';
import LogoutIcon from '../../icons/Logout/LogOutIcon';
import { CHARCOAL, useTheme } from '../../theme';
import { CustomTooltip } from '../CustomTooltip';
import { FormatId } from '../FormatId';
import { ConditionalTooltip } from '../Helpers/CondtionalTooltip';
import { useWindowDimensions } from '../Helpers/Dimension';
import { ColView, updateVisibleColumns } from '../Helpers/ResponsiveColumns/responsive-coulmns.tsx';
import { IconWrapper } from '../ResponsiveDataTable';
import { TooltipIcon } from '../TooltipIconButton';
import {
  MesheryDeleteIcon,
  TableIconsContainer,
  TableIconsDisabledContainer,
  TableTopIcon,
  TableTopIconsWrapper
} from '../Workspaces/styles';
import { Team } from '../Workspaces/types';

// currently team does not support bulk team delete
interface DeleteTeamsBtnProps {
  selected: any;
  teams: Team[];
  deleteTeamsModalHandler: (deleteTeams: { team_ids: string[]; team_names: string[] }) => void;
}

function DeleteTeamsBtn({ selected, teams, deleteTeamsModalHandler }: DeleteTeamsBtnProps) {
  const deleteTeams = {
    team_ids: [] as string[],
    team_names: [] as string[]
  };
  selected?.data.forEach((val: any) => {
    const idx = val.index;
    deleteTeams['team_ids'].push(teams[idx]?.team_id);
    deleteTeams['team_names'].push(teams[idx]?.team_name);
  });

  return (
    <TableTopIcon>
      <MesheryDeleteIcon>
        <CustomTooltip key="delete_teams" title="Delete Teams">
          <DeleteIcon
            height={28}
            width={28}
            fill={CHARCOAL}
            onClick={() => {
              deleteTeamsModalHandler(deleteTeams);
            }}
          />
        </CustomTooltip>
      </MesheryDeleteIcon>
    </TableTopIcon>
  );
}

interface TeamTableConfigurationProps {
  teams: Team[];
  count: number;
  page: number;
  pageSize: number;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  sortOrder: string;
  setSortOrder: (sortOrder: string) => void;
  bulkSelect: boolean;
  setBulkSelect: (bulkSelect: boolean) => void;
  handleTeamView: (ev: React.MouseEvent, rowData: any) => void;
  handleDeleteTeam: (ev: React.MouseEvent, rowData: any) => void;
  handleleaveTeam: (ev: React.MouseEvent, rowData: any) => void;
  handleRemoveTeamFromWorkspace?: (rowData: any) => void;
  teamId: string;
  workspace?: boolean;
  isEditTeamAllowed: boolean;
  isLeaveTeamAllowed: boolean;
  isRemoveTeamFromWorkspaceAllowed?: boolean;
  isDeleteTeamAllowed: boolean;
  setSearch: (search: string) => void;
}

export default function TeamTableConfiguration({
  teams,
  count,
  page,
  pageSize,
  setPage,
  setPageSize,
  sortOrder,
  setSortOrder,
  bulkSelect,
  setBulkSelect,
  handleTeamView,
  handleDeleteTeam,
  handleRemoveTeamFromWorkspace,
  handleleaveTeam,
  teamId,
  workspace = false,
  isEditTeamAllowed,
  isLeaveTeamAllowed,
  isRemoveTeamFromWorkspaceAllowed,
  isDeleteTeamAllowed,
  setSearch
}: TeamTableConfigurationProps) {
  const { width } = useWindowDimensions();
  const theme = useTheme();
  // Keys should be same as the value of 'name' key in columns array
  const colViews: ColView[] = [
    ['id', 'na'],
    ['name', 'xs'],
    ['description', 'm'],
    ['owner', 'l'],
    ['created_at', 'na'],
    ['updated_at', 'xl'],
    ['deleted_at', 'na'],
    ['actions', 'xs']
  ];

  const columns: MUIDataTableColumn[] = [
    {
      name: 'id',
      label: 'ID',
      options: {
        filter: false,
        sort: false,
        searchable: false,
        customBodyRender: (value: string) => <FormatId id={value} />
      }
    },
    {
      name: 'name',
      label: 'Name',
      options: {
        filter: false,
        sort: true,
        searchable: true
      }
    },
    {
      name: 'description',
      label: 'Description',
      options: {
        filter: false,
        sort: true,
        searchable: false,
        customBodyRender: (value: string) => (
          <ConditionalTooltip value={value ?? ''} maxLength={30} />
        )
      }
    },
    {
      name: 'owner',
      label: 'Owner',
      options: {
        filter: false,
        sort: true,
        searchable: true
      }
    },
    {
      name: 'created_at',
      label: 'Created At',
      options: {
        filter: false,
        sort: true,
        searchable: false,
        sortDescFirst: true
      }
    },
    {
      name: 'updated_at',
      label: 'Updated At',
      options: {
        filter: false,
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
        customBodyRender: (v: string) => JSON.stringify(v),
        filterOptions: {
          names: ['Deleted', 'Not Deleted'],
          logic: (val: string, filters: any) => {
            if (val != 'NA' && filters.indexOf('Deleted') >= 0) return true;
            else if (val == 'NA' && filters.indexOf('Not Deleted') >= 0) return true;
            return false;
          },
          fullWidth: true
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
        customBodyRender: (_: string, tableMeta: MUIDataTableMeta) => {
          if (bulkSelect || tableMeta.rowData[4].Valid) {
            return (
              <TableIconsDisabledContainer>
                <EditIcon
                  style={{
                    marginRight: '.5rem'
                  }}
                />
                <DeleteIcon height={28} width={28} fill={CHARCOAL} />
              </TableIconsDisabledContainer>
            );
          }
          return (
            <TableIconsContainer>
              {!workspace && (
                <>
                  <IconWrapper disabled={!isEditTeamAllowed}>
                    <TooltipIcon
                      id={`edit_team-${tableMeta.rowIndex}`}
                      title="Edit Team"
                      onClick={(ev) => {
                        isEditTeamAllowed && handleTeamView(ev, tableMeta.rowData);
                      }}
                      iconType="edit"
                    >
                      <EditIcon style={{ height: 28.8, width: 28.8 }} fill={CHARCOAL} />
                    </TooltipIcon>
                  </IconWrapper>
                  <IconWrapper disabled={!isLeaveTeamAllowed}>
                    <TooltipIcon
                      id={`leave_team-${tableMeta.rowIndex}`}
                      title="Leave Team"
                      onClick={(e) => isLeaveTeamAllowed && handleleaveTeam(e, tableMeta.rowData)}
                      iconType="delete"
                    >
                      <LogoutIcon fill={CHARCOAL} secondaryFill={CHARCOAL} />
                    </TooltipIcon>
                  </IconWrapper>
                </>
              )}
              {workspace ? (
                <IconWrapper disabled={!isRemoveTeamFromWorkspaceAllowed}>
                  <TooltipIcon
                    id={`remove_team-${tableMeta.rowIndex}`}
                    title={'Move Team'}
                    onClick={() => {
                      isRemoveTeamFromWorkspaceAllowed &&
                        handleRemoveTeamFromWorkspace &&
                        handleRemoveTeamFromWorkspace(tableMeta.rowData[0]);
                    }}
                    iconType="delete"
                  >
                    <DeleteIcon height={28} width={28} fill={theme.palette.icon.default} />
                  </TooltipIcon>
                </IconWrapper>
              ) : (
                <IconWrapper disabled={!isDeleteTeamAllowed}>
                  <TooltipIcon
                    id={`delete_team-${tableMeta.rowIndex}`}
                    title={'Delete Team'}
                    onClick={(ev: React.MouseEvent) => {
                      isDeleteTeamAllowed && handleDeleteTeam(ev, tableMeta.rowData);
                    }}
                    iconType="delete"
                  >
                    <DeleteIcon height={28} width={28} fill={CHARCOAL} />
                  </TooltipIcon>
                </IconWrapper>
              )}
            </TableIconsContainer>
          );
        }
      }
    }
  ];
  const ExpandedRowIdx = teams?.findIndex((team) => team.id === teamId);

  const options = {
    filter: false,
    selectableRows: 'none' as const,
    filterType: 'dropdown' as const,
    expandableRows: true,
    expandableRowsHeader: false,
    expandableRowsOnClick: true,
    responsive: 'standard' as const,
    count: count,
    rowsPerPage: pageSize,
    page,
    print: false,
    download: false,
    elevation: 0,
    serverSide: true,
    viewColumns: false,
    search: false,
    rowsExpanded: [ExpandedRowIdx],
    customToolbarSelect: (selected: any) => (
      <TableTopIconsWrapper>
        <DeleteTeamsBtn
          selected={selected}
          teams={teams}
          // deleteTeamsModalHandler={handleDeleteTeamsModalOpen}
          deleteTeamsModalHandler={() => {}}
        />
      </TableTopIconsWrapper>
    ),
    textLabels: {
      selectedRows: {
        text: 'teams(s) selected'
      }
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
          setSearch(tableState.searchText !== null ? tableState.searchText : '');
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
        case 'rowSelectionChange':
          if (tableState.selectedRows.data.length) {
            if (!bulkSelect) {
              setBulkSelect(true);
            }
          } else {
            setBulkSelect(false);
          }
          break;
        default:
          if (tableState.selectedRows.data.length == 0) {
            if (bulkSelect) {
              setBulkSelect(false);
            }
          }
      }
    },
    isRowSelectable: (dataIndx: number) => {
      if (teams[dataIndx]['deleted_at'].Valid === true) return false;
      return true;
    },
    setRowProps: (row: any, rowIndex: number, tableState: any) => {
      const selectedRows =
        tableState && tableState.selectedRows ? tableState.selectedRows.data : [];

      if (selectedRows.includes(rowIndex)) {
        return {
          style: {
            backgroundColor: theme.palette.background.hover
          }
        };
      }

      if (row[6].Valid) {
        return {
          style: {
            backgroundColor: theme.palette.icon.disabled
          }
        };
      }

      return {
        style: {
          backgroundColor: theme.palette.background.constant?.table
        }
      };
    }
  };

  const [tableCols, updateCols] = useState(columns);
  const [columnVisibility, setColumnVisibility] = useState(() => {
    const showCols = updateVisibleColumns(colViews, width);
    const initialVisibility: Record<string, boolean> = {};
    columns.forEach((col) => {
      initialVisibility[col.name] = showCols[col.name];
    });
    return initialVisibility;
  });

  return {
    columns,
    tableOptions: options,
    tableCols,
    updateCols,
    columnVisibility,
    setColumnVisibility,
    colViews
  };
}
