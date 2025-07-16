/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Pattern } from '../../custom/CustomCatalog/CustomCard';
import { withDefaultPageArgs } from '../../custom/PerformersSection/PerformersSection';
import { AssignmentHookResult } from '../../custom/Workspaces/types';

interface AddedAndRemovedViews {
  addedviewsIds: string[];
  removedviewsIds: string[];
}

interface useViewAssignmentProps {
  workspaceId: string;
  useGetViewsOfWorkspaceQuery: any;
  useAssignViewToWorkspaceMutation: any;
  useUnassignViewFromWorkspaceMutation: any;
  isViewsVisible: boolean;
}

const useViewAssignment = ({
  workspaceId,
  useGetViewsOfWorkspaceQuery,
  useAssignViewToWorkspaceMutation,
  useUnassignViewFromWorkspaceMutation,
  isViewsVisible
}: useViewAssignmentProps): AssignmentHookResult<Pattern> => {
  const [viewsPage, setviewsPage] = useState<number>(0);
  const [viewsData, setviewsData] = useState<Pattern[]>([]);
  const viewsPageSize = 25;
  const [viewsOfWorkspacePage, setviewsOfWorkspacePage] = useState<number>(0);
  const [workspaceviewsData, setWorkspaceviewsData] = useState<Pattern[]>([]);
  const [assignviewModal, setAssignviewModal] = useState<boolean>(false);
  const [skipviews, setSkipviews] = useState<boolean>(true);
  const [disableTransferButton, setDisableTransferButton] = useState<boolean>(true);
  const [assignedviews, setAssignedviews] = useState<Pattern[]>([]);

  const { data: views } = useGetViewsOfWorkspaceQuery(
    withDefaultPageArgs({
      workspaceId,
      page: viewsPage,
      pagesize: viewsPageSize,
      filter: '{"assigned":false}'
    }),
    {
      skip: skipviews || !isViewsVisible
    }
  );

  const { data: viewsOfWorkspace } = useGetViewsOfWorkspaceQuery(
    withDefaultPageArgs({
      workspaceId,
      page: viewsOfWorkspacePage,
      pagesize: viewsPageSize
    }),
    {
      skip: skipviews || !isViewsVisible
    }
  );

  const [assignviewToWorkspace] = useAssignViewToWorkspaceMutation();
  const [unassignviewFromWorkspace] = useUnassignViewFromWorkspaceMutation();

  useEffect(() => {
    const viewsDataRtk = views?.views ? views.views : [];
    setviewsData((prevData) => [...prevData, ...viewsDataRtk]);
  }, [views]);

  useEffect(() => {
    const viewsOfWorkspaceDataRtk = viewsOfWorkspace?.views ? viewsOfWorkspace.views : [];
    setWorkspaceviewsData((prevData) => [...prevData, ...viewsOfWorkspaceDataRtk]);
  }, [viewsOfWorkspace]);

  const handleAssignviewModal = (e?: React.MouseEvent): void => {
    e?.stopPropagation();
    setAssignviewModal(true);
    setSkipviews(false);
  };

  const handleAssignviewModalClose = (e?: React.MouseEvent): void => {
    e?.stopPropagation();
    setAssignviewModal(false);
    setSkipviews(true);
  };

  const handleAssignablePageview = (): void => {
    const pagesCount = Math.ceil(Number(views?.total_count) / viewsPageSize);
    if (viewsPage < pagesCount - 1) {
      setviewsPage((prevviewsPage) => prevviewsPage + 1);
    }
  };

  const handleAssignedPageview = (): void => {
    const pagesCount = Math.ceil(Number(viewsOfWorkspace?.total_count) / viewsPageSize);
    if (viewsOfWorkspacePage < pagesCount - 1) {
      setviewsOfWorkspacePage((prevPage) => prevPage + 1);
    }
  };

  const getAddedAndRemovedviews = (allAssignedviews: Pattern[]): AddedAndRemovedViews => {
    const originalviewsIds = workspaceviewsData.map((view) => view.id);
    const updatedviewsIds = allAssignedviews.map((view) => view.id);

    const addedviewsIds = updatedviewsIds.filter((id) => !originalviewsIds.includes(id));
    const removedviewsIds = originalviewsIds.filter((id) => !updatedviewsIds.includes(id));

    return { addedviewsIds, removedviewsIds };
  };

  const isViewsActivityOccurred = (allViews: Pattern[]): boolean => {
    const { addedviewsIds, removedviewsIds } = getAddedAndRemovedviews(allViews);
    return addedviewsIds.length > 0 || removedviewsIds.length > 0;
  };

  const handleAssignviews = async (): Promise<void> => {
    const { addedviewsIds, removedviewsIds } = getAddedAndRemovedviews(assignedviews);

    addedviewsIds.map((id) =>
      assignviewToWorkspace({
        workspaceId,
        viewId: id
      }).unwrap()
    );

    removedviewsIds.map((id) =>
      unassignviewFromWorkspace({
        workspaceId,
        viewId: id
      }).unwrap()
    );

    setviewsData([]);
    setWorkspaceviewsData([]);
    setviewsPage(0);
    setviewsOfWorkspacePage(0);
    handleAssignviewModalClose();
  };

  const handleAssignviewsData = (updatedAssignedData: Pattern[]): void => {
    const { addedviewsIds, removedviewsIds } = getAddedAndRemovedviews(updatedAssignedData);
    setDisableTransferButton(!(addedviewsIds.length > 0 || removedviewsIds.length > 0));
    setAssignedviews(updatedAssignedData);
  };

  return {
    data: viewsData,
    workspaceData: workspaceviewsData,
    assignModal: assignviewModal,
    handleAssignModal: handleAssignviewModal,
    handleAssignModalClose: handleAssignviewModalClose,
    handleAssignablePage: handleAssignablePageview,
    handleAssignedPage: handleAssignedPageview,
    handleAssign: handleAssignviews,
    isActivityOccurred: isViewsActivityOccurred,
    handleAssignData: handleAssignviewsData,
    disableTransferButton,
    assignedItems: assignedviews
  };
};

export default useViewAssignment;
