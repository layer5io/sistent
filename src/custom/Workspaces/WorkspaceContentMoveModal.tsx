/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useContext, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Typography
} from '../../base';
import { EVENT_TYPES, RESOURCE_TYPE } from '../../constants/constants';
import { OpenFileIcon } from '../../icons';
import { styled } from '../../theme';
import { Pattern } from '../CustomCatalog/CustomCard';
import { Modal, ModalBody, ModalFooter, PrimaryActionButtons } from '../Modal';

interface WorkspaceContentMoveModalProps {
  workspaceContentMoveModal: boolean;
  setWorkspaceContentMoveModal: (open: boolean) => void;
  currentWorkspace: any;
  type: string;
  selectedContent: any;
  refetch?: () => void;
  useGetWorkspacesQuery: any;
  isCreateWorkspaceAllowed: boolean;
  isMoveDesignAllowed: boolean;
  isMoveViewAllowed: boolean;
  assignDesignToWorkspace: (params: { workspaceId: string; designId: string }) => Promise<any>;
  assignViewToWorkspace: (params: { workspaceId: string; viewId: string }) => Promise<any>;
  WorkspaceModalContext: React.Context<any>;
  notify: any;
  router: any;
  currentOrgId: string;
}

interface Workspace {
  id: string;
  name: string;
}

const WorkspaceItem = styled(ListItemButton)({
  borderRadius: '8px'
});

const CurrentWorkspaceSection = styled(Typography)(({ theme }) => ({
  marginBottom: '1rem',
  color: theme.palette.text.secondary
}));

const NoWorkspacesContainer = styled('div')(({ theme }) => ({
  padding: '1rem',
  textAlign: 'center',
  color: theme.palette.text.secondary,
  border: `1px dashed ${theme.palette.border.strong}`,
  borderRadius: '8px',
  margin: '1rem 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem'
}));

const getModalTitle = (type: string, selectedContent: any, multiSelectedContent: any[]): string => {
  const itemCount = multiSelectedContent?.length || 1;
  const resourceName = selectedContent?.name || itemCount;
  const resourceType = type === RESOURCE_TYPE.DESIGN ? 'Design' : 'View';

  return `Move ${resourceName} ${resourceType}${itemCount > 1 ? 's' : ''}`;
};

const WorkspaceContentMoveModal: React.FC<WorkspaceContentMoveModalProps> = ({
  workspaceContentMoveModal,
  setWorkspaceContentMoveModal,
  currentWorkspace,
  type,
  selectedContent,
  refetch,
  useGetWorkspacesQuery,
  isCreateWorkspaceAllowed,
  isMoveDesignAllowed,
  isMoveViewAllowed,
  assignDesignToWorkspace,
  assignViewToWorkspace,
  WorkspaceModalContext,
  notify,
  router,
  currentOrgId
}) => {
  const { setMultiSelectedContent, multiSelectedContent, closeModal } =
    useContext(WorkspaceModalContext);
  const { data: workspaceData, isLoading } = useGetWorkspacesQuery(
    {
      page: 0,
      pagesize: 'all',
      order: 'updated_at desc',
      orgID: currentOrgId
    },
    {
      skip: !currentOrgId
    }
  );

  const filteredWorkspaces = workspaceData?.workspaces?.filter(
    (workspace: Workspace) => workspace.id !== currentWorkspace.id
  );
  const [selectedWorkspaceForMove, setSelectedWorkspaceForMove] = useState<Workspace | null>(null);

  const handleMove = async (): Promise<void> => {
    setWorkspaceContentMoveModal(false);

    try {
      const moveDesign = async (designId: string): Promise<void> => {
        await assignDesignToWorkspace({
          workspaceId: selectedWorkspaceForMove!.id,
          designId
        });
      };

      const moveView = async (viewId: string): Promise<void> => {
        await assignViewToWorkspace({
          workspaceId: selectedWorkspaceForMove!.id,
          viewId
        });
      };

      if (RESOURCE_TYPE.DESIGN === type) {
        if (multiSelectedContent.length > 0) {
          await Promise.all(multiSelectedContent.map((design: Pattern) => moveDesign(design.id)));
          setMultiSelectedContent([]);
        }
        if (selectedContent) {
          await moveDesign(selectedContent.id);
        }
      } else {
        if (multiSelectedContent.length > 0) {
          await Promise.all(multiSelectedContent.map((view: { id: string }) => moveView(view.id)));
          setMultiSelectedContent([]);
        }
        if (selectedContent) {
          await moveView(selectedContent.id);
        }
      }
      if (refetch) {
        refetch();
      }
      notify({
        message: `Successfully moved ${type === RESOURCE_TYPE.DESIGN ? 'design' : 'view'}${multiSelectedContent.length > 1 ? 's' : ''} to ${selectedWorkspaceForMove!.name}`,
        event_type: EVENT_TYPES.SUCCESS
      });
    } catch {
      notify({
        message: `Failed to move ${type === RESOURCE_TYPE.DESIGN ? 'design' : 'view'}. Please try again.`,
        event_type: EVENT_TYPES.ERROR
      });
    }
  };

  const handleCreateWorkspace = (): void => {
    closeModal();
    setWorkspaceContentMoveModal(false);
    router.push('/management/workspaces');
  };

  const isMoveAllowed = type === RESOURCE_TYPE.DESIGN ? isMoveDesignAllowed : isMoveViewAllowed;

  return (
    <Modal
      open={workspaceContentMoveModal}
      headerIcon={<OpenFileIcon />}
      closeModal={() => setWorkspaceContentMoveModal(false)}
      title={getModalTitle(type, selectedContent, multiSelectedContent)}
    >
      <ModalBody>
        <CurrentWorkspaceSection>
          Current Workspace: <strong>{currentWorkspace.name}</strong>
        </CurrentWorkspaceSection>
        <Divider />
        <Box display="flex" flexDirection="column" marginTop={'1rem'}>
          {isLoading ? (
            <CircularProgress size={24} />
          ) : !filteredWorkspaces?.length ? (
            <NoWorkspacesContainer>
              <Typography>No other workspaces available to move content to.</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreateWorkspace}
                disabled={!isCreateWorkspaceAllowed}
              >
                Create Workspace
              </Button>
            </NoWorkspacesContainer>
          ) : (
            <>
              <Typography style={{ marginBottom: '0.5rem' }}>
                Select destination workspace
              </Typography>

              <List>
                {filteredWorkspaces.map((workspace: Workspace) => (
                  <WorkspaceItem
                    key={workspace.id}
                    selected={selectedWorkspaceForMove?.id === workspace.id}
                    onClick={() => isMoveAllowed && setSelectedWorkspaceForMove(workspace)}
                    disabled={!isMoveAllowed}
                  >
                    <ListItemText primary={workspace.name} />
                  </WorkspaceItem>
                ))}
              </List>
            </>
          )}
        </Box>
      </ModalBody>
      <ModalFooter variant="filled">
        <PrimaryActionButtons
          primaryText={'Move'}
          secondaryText="Cancel"
          primaryButtonProps={{
            onClick: handleMove,
            disabled:
              isLoading ||
              !selectedWorkspaceForMove ||
              !filteredWorkspaces?.length ||
              !isMoveAllowed
          }}
          secondaryButtonProps={{
            onClick: () => setWorkspaceContentMoveModal(false)
          }}
        />
      </ModalFooter>
    </Modal>
  );
};

export default WorkspaceContentMoveModal;
