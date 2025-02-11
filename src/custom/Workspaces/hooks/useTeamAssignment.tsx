/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { withDefaultPageArgs } from '../../PerformersSection/PerformersSection';
import { AssignmentHookResult, Team } from '../types';

interface UseTeamAssignmentProps {
  workspaceId: string;
  useGetTeamsOfWorkspaceQuery: any;
  useAssignTeamToWorkspaceMutation: any;
  useUnassignTeamFromWorkspaceMutation: any;
  isTeamsVisible?: boolean;
}

const useTeamAssignment = ({
  workspaceId,
  useGetTeamsOfWorkspaceQuery,
  useAssignTeamToWorkspaceMutation,
  useUnassignTeamFromWorkspaceMutation,
  isTeamsVisible
}: UseTeamAssignmentProps): AssignmentHookResult<Team> => {
  const [teamsPage, setTeamsPage] = useState<number>(0);
  const [teamsData, setTeamsData] = useState<Team[]>([]);
  const teamsPageSize = 25;
  const [teamsOfWorkspacePage, setTeamsOfWorkspacePage] = useState<number>(0);
  const [workspaceTeamsData, setWorkspaceTeamsData] = useState<Team[]>([]);
  const [assignTeamModal, setAssignTeamModal] = useState<boolean>(false);
  const [skipTeams, setSkipTeams] = useState<boolean>(true);
  const [assignTeamToWorkspace] = useAssignTeamToWorkspaceMutation();
  const [unassignTeamFromWorkspace] = useUnassignTeamFromWorkspaceMutation();
  const [disableTransferButton, setDisableTransferButton] = useState<boolean>(true);
  const [assignedTeams, setAssignedTeams] = useState<Team[]>([]);

  const { data: teams } = useGetTeamsOfWorkspaceQuery(
    withDefaultPageArgs({
      workspaceId,
      page: teamsPage,
      pagesize: teamsPageSize,
      filter: '{"assigned":false}'
    }),
    {
      skip: skipTeams || !isTeamsVisible
    }
  );

  const { data: teamsOfWorkspace } = useGetTeamsOfWorkspaceQuery(
    withDefaultPageArgs({
      workspaceId,
      page: teamsOfWorkspacePage,
      pagesize: teamsPageSize
    }),
    {
      skip: skipTeams || !isTeamsVisible
    }
  );

  useEffect(() => {
    const teamsDataRtk = teams?.teams ? teams.teams : [];
    setTeamsData((prevData) => [...prevData, ...teamsDataRtk]);
  }, [teams]);

  useEffect(() => {
    const teamsOfWorkspaceDataRtk = teamsOfWorkspace?.teams ? teamsOfWorkspace.teams : [];
    setWorkspaceTeamsData((prevData) => [...prevData, ...teamsOfWorkspaceDataRtk]);
  }, [teamsOfWorkspace]);

  const handleAssignTeamModal = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setAssignTeamModal(true);
    setSkipTeams(false);
  };

  const handleAssignTeamModalClose = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setAssignTeamModal(false);
    setSkipTeams(true);
  };

  const handleAssignablePageTeam = () => {
    const pagesCount = Math.ceil(Number(teams?.total_count) / teamsPageSize);
    if (teamsPage < pagesCount - 1) {
      setTeamsPage((prevTeamsPage) => prevTeamsPage + 1);
    }
  };

  const handleAssignedPageTeam = () => {
    const pagesCount = Math.ceil(Number(teamsOfWorkspace?.total_count) / teamsPageSize);

    if (teamsOfWorkspacePage < pagesCount - 1) {
      setTeamsOfWorkspacePage((prevPage) => prevPage + 1);
    }
  };

  const handleAssignTeams = () => {
    const { addedTeamsIds, removedTeamsIds } = getAddedAndRemovedTeams(assignedTeams);

    addedTeamsIds.map((id) =>
      assignTeamToWorkspace({
        workspaceId,
        teamId: id
      }).unwrap()
    );

    removedTeamsIds.map((id) =>
      unassignTeamFromWorkspace({
        workspaceId,
        teamId: id
      }).unwrap()
    );

    setTeamsData([]);
    setWorkspaceTeamsData([]);
    handleAssignTeamModalClose();
  };

  const getAddedAndRemovedTeams = (allAssignedTeams: Team[]) => {
    const originalTeamsIds = workspaceTeamsData.map((team) => team.id);
    const updatedTeamsIds = allAssignedTeams.map((team) => team.id);

    const addedTeamsIds = updatedTeamsIds.filter((id) => !originalTeamsIds.includes(id));
    const removedTeamsIds = originalTeamsIds.filter((id) => !updatedTeamsIds.includes(id));

    return { addedTeamsIds, removedTeamsIds };
  };

  const handleAssignTeamsData = (updatedAssignedData: Team[]) => {
    const { addedTeamsIds, removedTeamsIds } = getAddedAndRemovedTeams(updatedAssignedData);
    addedTeamsIds.length > 0 || removedTeamsIds.length > 0
      ? setDisableTransferButton(false)
      : setDisableTransferButton(true);
    setAssignedTeams(updatedAssignedData);
  };

  return {
    data: teamsData,
    workspaceData: workspaceTeamsData,
    assignModal: assignTeamModal,
    handleAssignModal: handleAssignTeamModal,
    handleAssignModalClose: handleAssignTeamModalClose,
    handleAssignablePage: handleAssignablePageTeam,
    handleAssignedPage: handleAssignedPageTeam,
    handleAssign: handleAssignTeams,
    handleAssignData: handleAssignTeamsData,
    disableTransferButton,
    assignedItems: assignedTeams
  };
};

export default useTeamAssignment;
