/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { withDefaultPageArgs } from '../../PerformersSection/PerformersSection';
import { AssignmentHookResult, Environment } from '../types';

interface UseEnvironmentAssignmentProps {
  workspaceId: string;
  useGetEnvironmentsOfWorkspaceQuery: any;
  useAssignEnvironmentToWorkspaceMutation: any;
  useUnassignEnvironmentFromWorkspaceMutation: any;
}

const useEnvironmentAssignment = ({
  workspaceId,
  useGetEnvironmentsOfWorkspaceQuery,
  useAssignEnvironmentToWorkspaceMutation,
  useUnassignEnvironmentFromWorkspaceMutation
}: UseEnvironmentAssignmentProps): AssignmentHookResult<Environment> => {
  const [environmentsPage, setEnvironmentsPage] = useState<number>(0);
  const [environmentsData, setEnvironmentsData] = useState<Environment[]>([]);
  const environmentsPageSize = 25;
  const [environmentsOfWorkspacePage, setEnvironmentsOfWorkspacePage] = useState<number>(0);
  const [workspaceEnvironmentsData, setWorkspaceEnvironmentsData] = useState<Environment[]>([]);
  const [assignEnvironmentModal, setAssignEnvironmentModal] = useState<boolean>(false);
  const [skipEnvironments, setSkipEnvironments] = useState<boolean>(true);

  const { data: environments } = useGetEnvironmentsOfWorkspaceQuery(
    withDefaultPageArgs({
      workspaceId,
      page: environmentsPage,
      pagesize: environmentsPageSize,
      filter: '{"assigned":false}'
    }),
    {
      skip: skipEnvironments
    }
  );

  const { data: environmentsOfWorkspace } = useGetEnvironmentsOfWorkspaceQuery(
    withDefaultPageArgs({
      workspaceId,
      page: environmentsOfWorkspacePage,
      pagesize: environmentsPageSize
    }),
    {
      skip: skipEnvironments
    }
  );

  const [assignEnvironmentToWorkspace] = useAssignEnvironmentToWorkspaceMutation();
  const [unassignEnvironmentFromWorkspace] = useUnassignEnvironmentFromWorkspaceMutation();
  const [disableTransferButton, setDisableTransferButton] = useState<boolean>(true);
  const [assignedEnvironments, setAssignedEnvironments] = useState<Environment[]>([]);

  useEffect(() => {
    const environmentsDataRtk = environments?.environments ? environments.environments : [];
    setEnvironmentsData((prevData) => [...prevData, ...environmentsDataRtk]);
  }, [environments]);

  useEffect(() => {
    const environmentsOfWorkspaceDataRtk = environmentsOfWorkspace?.environments
      ? environmentsOfWorkspace.environments
      : [];
    setWorkspaceEnvironmentsData((prevData) => [...prevData, ...environmentsOfWorkspaceDataRtk]);
  }, [environmentsOfWorkspace]);

  const handleAssignEnvironmentModal = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setAssignEnvironmentModal(true);
    setSkipEnvironments(false);
  };

  const handleAssignEnvironmentModalClose = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setAssignEnvironmentModal(false);
    setSkipEnvironments(true);
  };

  const handleAssignablePageEnvironment = () => {
    const pagesCount = Math.ceil(Number(environments?.total_count) / environmentsPageSize);
    if (environmentsPage < pagesCount - 1) {
      setEnvironmentsPage((prevEnvironmentsPage) => prevEnvironmentsPage + 1);
    }
  };

  const handleAssignedPageEnvironment = () => {
    const pagesCount = Math.ceil(
      Number(environmentsOfWorkspace?.total_count) / environmentsPageSize
    );
    if (environmentsOfWorkspacePage < pagesCount - 1) {
      setEnvironmentsOfWorkspacePage((prevPage) => prevPage + 1);
    }
  };

  const handleAssignEnvironments = async () => {
    const { addedEnvironmentsIds, removedEnvironmentsIds } =
      getAddedAndRemovedEnvironments(assignedEnvironments);

    for (const id of addedEnvironmentsIds) {
      await assignEnvironmentToWorkspace({
        workspaceId,
        environmentId: id
      }).unwrap();
    }

    for (const id of removedEnvironmentsIds) {
      await unassignEnvironmentFromWorkspace({
        workspaceId,
        environmentId: id
      }).unwrap();
    }

    setEnvironmentsData([]);
    setWorkspaceEnvironmentsData([]);
    handleAssignEnvironmentModalClose();
  };

  const getAddedAndRemovedEnvironments = (allAssignedEnvironments: Environment[]) => {
    const originalEnvironmentsIds = workspaceEnvironmentsData.map((env) => env.id);
    const updatedEnvironmentsIds = allAssignedEnvironments.map((env) => env.id);

    const addedEnvironmentsIds = updatedEnvironmentsIds.filter(
      (id) => !originalEnvironmentsIds.includes(id)
    );
    const removedEnvironmentsIds = originalEnvironmentsIds.filter(
      (id) => !updatedEnvironmentsIds.includes(id)
    );

    return { addedEnvironmentsIds, removedEnvironmentsIds };
  };

  const handleAssignEnvironmentsData = (updatedAssignedData: Environment[]) => {
    const { addedEnvironmentsIds, removedEnvironmentsIds } =
      getAddedAndRemovedEnvironments(updatedAssignedData);
    addedEnvironmentsIds.length > 0 || removedEnvironmentsIds.length > 0
      ? setDisableTransferButton(false)
      : setDisableTransferButton(true);
    setAssignedEnvironments(updatedAssignedData);
  };

  return {
    data: environmentsData,
    workspaceData: workspaceEnvironmentsData,
    assignModal: assignEnvironmentModal,
    handleAssignModal: handleAssignEnvironmentModal,
    handleAssignModalClose: handleAssignEnvironmentModalClose,
    handleAssignablePage: handleAssignablePageEnvironment,
    handleAssignedPage: handleAssignedPageEnvironment,
    handleAssign: handleAssignEnvironments,
    handleAssignData: handleAssignEnvironmentsData,
    disableTransferButton,
    assignedItems: assignedEnvironments
  };
};

export default useEnvironmentAssignment;
