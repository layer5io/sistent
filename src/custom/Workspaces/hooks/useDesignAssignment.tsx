/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Pattern } from '../../CustomCatalog/CustomCard';
import { withDefaultPageArgs } from '../../PerformersSection/PerformersSection';
import { AssignmentHookResult } from '../types';

interface AddedAndRemovedDesigns {
  addedDesignsIds: string[];
  removedDesignsIds: string[];
}

interface useDesignAssignmentProps {
  workspaceId: string;
  useGetDesignsOfWorkspaceQuery: any;
  useAssignDesignToWorkspaceMutation: any;
  useUnassignDesignFromWorkspaceMutation: any;
}

const useDesignAssignment = ({
  workspaceId,
  useGetDesignsOfWorkspaceQuery,
  useAssignDesignToWorkspaceMutation,
  useUnassignDesignFromWorkspaceMutation
}: useDesignAssignmentProps): AssignmentHookResult<Pattern> => {
  const [designsPage, setDesignsPage] = useState<number>(0);
  const [designsData, setDesignsData] = useState<Pattern[]>([]);
  const designsPageSize = 25;
  const [designsOfWorkspacePage, setDesignsOfWorkspacePage] = useState<number>(0);
  const [workspaceDesignsData, setWorkspaceDesignsData] = useState<Pattern[]>([]);
  const [assignDesignModal, setAssignDesignModal] = useState<boolean>(false);
  const [skipDesigns, setSkipDesigns] = useState<boolean>(true);
  const [disableTransferButton, setDisableTransferButton] = useState<boolean>(true);
  const [assignedDesigns, setAssignedDesigns] = useState<Pattern[]>([]);

  const { data: designs } = useGetDesignsOfWorkspaceQuery(
    withDefaultPageArgs({
      workspaceId,
      page: designsPage,
      pagesize: designsPageSize,
      filter: '{"assigned":false}'
    }),
    {
      skip: skipDesigns
    }
  );

  const { data: designsOfWorkspace } = useGetDesignsOfWorkspaceQuery(
    withDefaultPageArgs({
      workspaceId,
      page: designsOfWorkspacePage,
      pagesize: designsPageSize
    }),
    {
      skip: skipDesigns
    }
  );

  const [assignDesignToWorkspace] = useAssignDesignToWorkspaceMutation();
  const [unassignDesignFromWorkspace] = useUnassignDesignFromWorkspaceMutation();

  useEffect(() => {
    const designsDataRtk = designs?.designs ? designs.designs : [];
    setDesignsData((prevData) => [...prevData, ...designsDataRtk]);
  }, [designs]);

  useEffect(() => {
    const designsOfWorkspaceDataRtk = designsOfWorkspace?.designs ? designsOfWorkspace.designs : [];
    setWorkspaceDesignsData((prevData) => [...prevData, ...designsOfWorkspaceDataRtk]);
  }, [designsOfWorkspace]);

  const handleAssignDesignModal = (e?: React.MouseEvent): void => {
    e?.stopPropagation();
    setAssignDesignModal(true);
    setSkipDesigns(false);
  };

  const handleAssignDesignModalClose = (e?: React.MouseEvent): void => {
    e?.stopPropagation();
    setAssignDesignModal(false);
    setSkipDesigns(true);
  };

  const handleAssignablePageDesign = (): void => {
    const pagesCount = Math.ceil(Number(designs?.total_count) / designsPageSize);
    if (designsPage < pagesCount - 1) {
      setDesignsPage((prevDesignsPage) => prevDesignsPage + 1);
    }
  };

  const handleAssignedPageDesign = (): void => {
    const pagesCount = Math.ceil(Number(designsOfWorkspace?.total_count) / designsPageSize);
    if (designsOfWorkspacePage < pagesCount - 1) {
      setDesignsOfWorkspacePage((prevPage) => prevPage + 1);
    }
  };

  const getAddedAndRemovedDesigns = (allAssignedDesigns: Pattern[]): AddedAndRemovedDesigns => {
    const originalDesignsIds = workspaceDesignsData.map((design) => design.id);
    const updatedDesignsIds = allAssignedDesigns.map((design) => design.id);

    const addedDesignsIds = updatedDesignsIds.filter((id) => !originalDesignsIds.includes(id));
    const removedDesignsIds = originalDesignsIds.filter((id) => !updatedDesignsIds.includes(id));

    return { addedDesignsIds, removedDesignsIds };
  };

  const handleAssignDesigns = async (): Promise<void> => {
    const { addedDesignsIds, removedDesignsIds } = getAddedAndRemovedDesigns(assignedDesigns);

    for (const id of addedDesignsIds) {
      await assignDesignToWorkspace({
        workspaceId,
        designId: id
      }).unwrap();
    }

    for (const id of removedDesignsIds) {
      await unassignDesignFromWorkspace({
        workspaceId,
        designId: id
      }).unwrap();
    }

    setDesignsData([]);
    setWorkspaceDesignsData([]);
    handleAssignDesignModalClose();
  };

  const handleAssignDesignsData = (updatedAssignedData: Pattern[]): void => {
    const { addedDesignsIds, removedDesignsIds } = getAddedAndRemovedDesigns(updatedAssignedData);
    setDisableTransferButton(!(addedDesignsIds.length > 0 || removedDesignsIds.length > 0));
    setAssignedDesigns(updatedAssignedData);
  };

  return {
    data: designsData,
    workspaceData: workspaceDesignsData,
    assignModal: assignDesignModal,
    handleAssignModal: handleAssignDesignModal,
    handleAssignModalClose: handleAssignDesignModalClose,
    handleAssignablePage: handleAssignablePageDesign,
    handleAssignedPage: handleAssignedPageDesign,
    handleAssign: handleAssignDesigns,
    handleAssignData: handleAssignDesignsData,
    disableTransferButton,
    assignedItems: assignedDesigns
  };
};

export default useDesignAssignment;
