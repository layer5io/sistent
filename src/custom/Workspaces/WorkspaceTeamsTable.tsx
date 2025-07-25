/* eslint-disable @typescript-eslint/no-explicit-any */
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { Button } from '../../base';
import { TeamsIcon } from '../../icons';
import { useTheme } from '../../theme';
import { CustomColumnVisibilityControl } from '../CustomColumnVisibilityControl';
import SearchBar from '../SearchBar';
import { TeamTableConfiguration } from '../TeamTable';
import TeamTable from '../TeamTable/TeamTable';
import AssignmentModal from './AssignmentModal';
import useTeamAssignment from './hooks/useTeamAssignment';
import { TableHeader, TableRightActionHeader } from './styles';

export interface TeamsTableProps {
  workspaceId: string;
  workspaceName: string;
  useGetTeamsOfWorkspaceQuery: any;
  useUnassignTeamFromWorkspaceMutation: any;
  useAssignTeamToWorkspaceMutation: any;
  isEditTeamAllowed: boolean;
  isAssignTeamAllowed: boolean;
  isRemoveTeamFromWorkspaceAllowed: boolean;
  isDeleteTeamAllowed: boolean;
  isLeaveTeamAllowed: boolean;
  org_id: string;
  fetchTeamUsers: any;
  useGetUsersForOrgQuery: any;
  useNotificationHandlers: any;
  useRemoveUserFromTeamMutation: any;
}

const TeamsTable: React.FC<TeamsTableProps> = ({
  workspaceId,
  workspaceName,
  useGetTeamsOfWorkspaceQuery,
  useAssignTeamToWorkspaceMutation,
  useUnassignTeamFromWorkspaceMutation,
  isEditTeamAllowed,
  isAssignTeamAllowed,
  isRemoveTeamFromWorkspaceAllowed,
  isLeaveTeamAllowed,
  isDeleteTeamAllowed,
  org_id,
  useGetUsersForOrgQuery,
  useNotificationHandlers,
  useRemoveUserFromTeamMutation
}) => {
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [sortOrder, setSortOrder] = useState<string>('updated_at desc');
  const [bulkSelect, setBulkSelect] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [isSearchExpanded, setIsSearchExpanded] = useState<boolean>(false);

  const { data: teamsOfWorkspace } = useGetTeamsOfWorkspaceQuery({
    workspaceId,
    page: page,
    pageSize: pageSize,
    order: sortOrder,
    search: search
  });
  const [unassignTeamFromWorkspace] = useUnassignTeamFromWorkspaceMutation();

  const teamAssignment = useTeamAssignment({
    workspaceId,
    useGetTeamsOfWorkspaceQuery,
    useAssignTeamToWorkspaceMutation,
    useUnassignTeamFromWorkspaceMutation,
    isTeamsVisible: isAssignTeamAllowed || isRemoveTeamFromWorkspaceAllowed
  });

  const handleRemoveTeamFromWorkspace = (teamId: string): void => {
    unassignTeamFromWorkspace({
      workspaceId,
      teamId
    }).unwrap();
  };

  const tableProps = TeamTableConfiguration({
    teams: teamsOfWorkspace?.teams,
    count: teamsOfWorkspace?.total_count,
    page,
    pageSize,
    setPage,
    setPageSize,
    sortOrder,
    setSortOrder,
    bulkSelect,
    setBulkSelect,
    handleRemoveTeamFromWorkspace,
    handleTeamView: () => {},
    handleDeleteTeam: () => {},
    handleleaveTeam: () => {},
    teamId: '',
    workspace: true,
    isEditTeamAllowed,
    isLeaveTeamAllowed,
    isRemoveTeamFromWorkspaceAllowed,
    isDeleteTeamAllowed: isDeleteTeamAllowed,
    setSearch
  });
  const theme = useTheme();
  return (
    <>
      <TableHeader>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={teamAssignment.handleAssignModal}
          style={{ margin: '1rem' }}
        >
          Assign Teams
        </Button>
        <TableRightActionHeader>
          <SearchBar
            onSearch={(value) => {
              setSearch(value);
            }}
            onClear={() => {
              setSearch('');
            }}
            expanded={isSearchExpanded}
            setExpanded={setIsSearchExpanded}
            placeholder="Search workspaces..."
          />
          <CustomColumnVisibilityControl
            columns={tableProps.columns}
            customToolsProps={{
              columnVisibility: tableProps.columnVisibility,
              setColumnVisibility: tableProps.setColumnVisibility
            }}
            id={'teams-table'}
          />
        </TableRightActionHeader>
      </TableHeader>
      <TeamTable
        teams={teamsOfWorkspace?.teams}
        tableOptions={tableProps.tableOptions}
        columnVisibility={tableProps.columnVisibility}
        colViews={tableProps.colViews}
        tableCols={tableProps.tableCols}
        updateCols={tableProps.updateCols}
        columns={tableProps.columns}
        isRemoveFromTeamAllowed={isRemoveTeamFromWorkspaceAllowed}
        org_id={org_id}
        useGetUsersForOrgQuery={useGetUsersForOrgQuery}
        useNotificationHandlers={useNotificationHandlers}
        useRemoveUserFromTeamMutation={useRemoveUserFromTeamMutation}
      />

      <AssignmentModal
        open={teamAssignment.assignModal}
        onClose={teamAssignment.handleAssignModalClose}
        title={`Assign Teams to ${workspaceName}`}
        headerIcon={
          <TeamsIcon
            height="40"
            width="40"
            primaryFill={theme.palette.common.white}
            fill={theme.palette.icon.disabled}
          />
        }
        name="Teams"
        assignableData={teamAssignment.data}
        handleAssignedData={teamAssignment.handleAssignData}
        originalAssignedData={teamAssignment.workspaceData}
        emptyStateIcon={
          <TeamsIcon
            height="5rem"
            width="5rem"
            primaryFill={'#808080'}
            secondaryFill={theme.palette.icon.disabled}
            fill={'#808080'}
          />
        }
        handleAssignablePage={teamAssignment.handleAssignablePage}
        handleAssignedPage={teamAssignment.handleAssignedPage}
        originalLeftCount={teamAssignment.data?.length || 0}
        originalRightCount={teamsOfWorkspace?.total_count || 0}
        onAssign={teamAssignment.handleAssign}
        disableTransfer={teamAssignment.disableTransferButton}
        helpText={`Assign Teams to ${workspaceName}`}
        isAssignAllowed={isAssignTeamAllowed}
        isRemoveAllowed={isRemoveTeamFromWorkspaceAllowed}
      />
    </>
  );
};

export default TeamsTable;
