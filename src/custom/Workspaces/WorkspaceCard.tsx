import { useTheme } from '@mui/material';
import { Backdrop, CircularProgress, Grid } from '../../base';
import { FlipCard } from '../FlipCard';
import { RecordRow, RedirectButton, TransferButton } from './WorkspaceTransferButton';
import { formattoLongDate } from './helper';
import {
  AllocationColumnGrid,
  AllocationWorkspace,
  BulkSelectCheckbox,
  CardBackActionsGrid,
  CardBackTitleGrid,
  CardBackTopGrid,
  CardBackWrapper,
  CardFrontWrapper,
  CardTitle,
  DateColumnGrid,
  DateGrid,
  DateLabel,
  DescriptionLabel,
  EmptyDescription,
  L5DeleteIcon,
  L5EditIcon,
  RecentActivityGrid,
  RecentActivityTitle,
  WorkspaceCardGrid
} from './styles';

interface WorkspaceDetails {
  id: number;
  name: string;
  description: string;
  deleted_at: { Valid: boolean };
  updated_at: string;
  created_at: string;
}

type Activity = {
  description: string;
  first_name: string;
  created_at: string;
};

interface CardFrontProps {
  onFlip: () => void;
  name: string;
  description: string;
  environmentsCount: number;
  onAssignEnvironment: () => void;
  teamsCount: number;
  onAssignTeam: () => void;
  designAndViewOfWorkspaceCount: number;
  onAssignDesign: () => void;
  isEnvironmentAllowed: boolean;
  isTeamAllowed: boolean;
  isDesignAllowed: boolean;
  isViewAllowed: boolean;
  isViewsVisible: boolean;
  isDesignsVisible: boolean;
  isTeamsVisible: boolean;
  isEnvironmentsVisible: boolean;
}

interface CardBackProps {
  onFlipBack: () => void;
  onSelect: () => void;
  name: string;
  onEdit: () => void;
  onDelete: () => void;
  selectedWorkspaces: number[];
  workspaceId: number;
  loadingEvents: boolean;
  recentActivities: Activity[];
  updatedDate: string;
  createdDate: string;
  deleted: boolean;
  isDeleteWorkspaceAllowed: boolean;
  isEditWorkspaceAllowed: boolean;
}

interface WorkspaceCardProps {
  workspaceDetails: WorkspaceDetails;
  onDelete: () => void;
  onEdit: () => void;
  onSelect: () => void;
  selectedWorkspaces: number[];
  onAssignTeam: () => void;
  onAssignEnvironment: () => void;
  onAssignDesign: () => void;
  recentActivities: Activity[];
  onFlip: () => void;
  onFlipBack: () => void;
  loadingEvents: boolean;
  teamsOfWorkspaceCount: number;
  environmentsOfWorkspaceCount: number;
  designAndViewOfWorkspaceCount: number;
  isEnvironmentAllowed: boolean;
  isTeamAllowed: boolean;
  isDesignAllowed: boolean;
  isViewAllowed: boolean;
  isDeleteWorkspaceAllowed: boolean;
  isEditWorkspaceAllowed: boolean;
  isViewsVisible: boolean;
  isDesignsVisible: boolean;
  isTeamsVisible: boolean;
  isEnvironmentsVisible: boolean;
}

/**
 * Renders a Workspace card component.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.environmentDetails - The details of the workspace.
 * @param {string} props.environmentDetails.name - The name of the workspace.
 * @param {string} props.environmentDetails.description - The description of the workspace.
 * @param {Function} props.onDelete - Function to delete the workspace.
 * @param {Function} props.onEdit - Function to edit the workspace.
 * @param {Function} props.onSelect - Function to select workspace for bulk actions.
 * @param {Array} props.selectedWorkspaces - Selected workspace list for delete.
 * @param {Function} props.onAssignTeam - Function to open team assignment modal open.
 * @param {Function} props.onAssignDesign - Function to open design assignment modal open.
 * @param {Array} props.latestActivity - List of latest activity.
 * @param {Function} props.onFlip - Click event to trigger when card flip.
 * @param {Function} props.onFlipBack - Click event to trigger when card flip back.
 * @param {Boolean} props.loadingEvents - Loading state of the events.
 * @param {Number} props.teamsOfWorkspaceCount - Count of teams assigned to the workspace.
 * @param {Number} props.environmentsOfWorkspaceCount - Count of environments assigned to the workspace.
 * @param {Number} props.designAndViewOfWorkspaceCount - Count of designs/views assigned to the workspace.
 * @param {Boolean} props.isEnvironmentAllowed - Flag to check if environment assignment is allowed.
 * @param {Boolean} props.isTeamAllowed - Flag to check if team assignment is allowed.
 * @param {Boolean} props.isDesignAndViewAllowed - Flag to check if design assignment is allowed.
 * @param {Boolean} props.isDeleteWorkspaceAllowed - Flag to check if workspace deletion is allowed.
 * @param {Boolean} props.isEditWorkspaceAllowed - Flag to check if workspace edit is allowed.
 * @returns {React.ReactElement} The Workspace card component.
 *
 */

const WorkspaceCard = ({
  workspaceDetails,
  onDelete,
  onEdit,
  onSelect,
  selectedWorkspaces,
  onAssignTeam,
  onAssignEnvironment,
  onAssignDesign,
  recentActivities,
  onFlip,
  onFlipBack,
  loadingEvents,
  teamsOfWorkspaceCount,
  environmentsOfWorkspaceCount,
  designAndViewOfWorkspaceCount,
  isEnvironmentAllowed,
  isTeamAllowed,
  isDesignAllowed,
  isViewAllowed,
  isDeleteWorkspaceAllowed,
  isEditWorkspaceAllowed,
  isViewsVisible,
  isDesignsVisible,
  isEnvironmentsVisible,
  isTeamsVisible
}: WorkspaceCardProps) => {
  const deleted = workspaceDetails.deleted_at.Valid;
  return (
    <FlipCard
      disableFlip={selectedWorkspaces.includes(workspaceDetails.id) ? true : false}
      padding={'0'}
    >
      <CardFront
        onFlip={onFlip}
        name={workspaceDetails?.name}
        description={workspaceDetails?.description}
        environmentsCount={environmentsOfWorkspaceCount}
        onAssignEnvironment={onAssignEnvironment}
        teamsCount={teamsOfWorkspaceCount}
        onAssignTeam={onAssignTeam}
        designAndViewOfWorkspaceCount={designAndViewOfWorkspaceCount}
        onAssignDesign={onAssignDesign}
        isEnvironmentAllowed={isEnvironmentAllowed}
        isTeamAllowed={isTeamAllowed}
        isDesignAllowed={isDesignAllowed}
        isViewAllowed={isViewAllowed}
        isViewsVisible={isViewsVisible}
        isDesignsVisible={isDesignsVisible}
        isEnvironmentsVisible={isEnvironmentsVisible}
        isTeamsVisible={isTeamsVisible}
      />

      <CardBack
        onFlipBack={onFlipBack}
        onSelect={onSelect}
        name={workspaceDetails?.name}
        onEdit={onEdit}
        onDelete={onDelete}
        selectedWorkspaces={selectedWorkspaces}
        workspaceId={workspaceDetails?.id}
        loadingEvents={loadingEvents}
        recentActivities={recentActivities}
        updatedDate={workspaceDetails?.updated_at}
        createdDate={workspaceDetails?.created_at}
        deleted={deleted}
        isDeleteWorkspaceAllowed={isDeleteWorkspaceAllowed}
        isEditWorkspaceAllowed={isEditWorkspaceAllowed}
      />
    </FlipCard>
  );
};

export default WorkspaceCard;

const CardFront = ({
  onFlip,
  name,
  description,
  environmentsCount,
  onAssignEnvironment,
  teamsCount,
  onAssignTeam,
  designAndViewOfWorkspaceCount,
  onAssignDesign,
  isEnvironmentAllowed,
  isTeamAllowed,
  isDesignAllowed,
  isViewAllowed,
  isViewsVisible,
  isDesignsVisible,
  isEnvironmentsVisible,
  isTeamsVisible
}: CardFrontProps) => {
  return (
    <CardFrontWrapper elevation={2} onClick={onFlip}>
      <WorkspaceCardGrid>
        <CardTitle variant="body2" onClick={(e) => e.stopPropagation()}>
          {name}
        </CardTitle>
      </WorkspaceCardGrid>
      <Grid>
        {description ? (
          <DescriptionLabel onClick={(e) => e.stopPropagation()} sx={{ maxHeight: '105px' }}>
            {description}
          </DescriptionLabel>
        ) : (
          <EmptyDescription onClick={(e) => e.stopPropagation()}>No description</EmptyDescription>
        )}
      </Grid>
      <Grid
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          pt: { xs: 1, md: 2 },
          gap: 1
        }}
      >
        {isEnvironmentsVisible && (
          <AllocationColumnGrid>
            <AllocationWorkspace onClick={(e) => e.stopPropagation()}>
              {isEnvironmentAllowed ? (
                <TransferButton
                  title="Environments"
                  count={environmentsCount}
                  onAssign={onAssignEnvironment}
                  disabled={!isEnvironmentAllowed}
                />
              ) : (
                <RedirectButton title="Environment" count={environmentsCount} />
              )}
              <RedirectButton title="Connections" count={0} />
            </AllocationWorkspace>
          </AllocationColumnGrid>
        )}

        {isTeamsVisible && (
          <AllocationColumnGrid>
            <AllocationWorkspace onClick={(e) => e.stopPropagation()}>
              {isTeamAllowed ? (
                <TransferButton
                  title="Teams"
                  count={teamsCount}
                  onAssign={onAssignTeam}
                  disabled={!isTeamAllowed}
                />
              ) : (
                <RedirectButton title="Teams" count={teamsCount} />
              )}
              <RedirectButton title="Users" count={0} />
            </AllocationWorkspace>
          </AllocationColumnGrid>
        )}

        {isDesignsVisible && !isViewsVisible && (
          <AllocationColumnGrid>
            <AllocationWorkspace onClick={(e) => e.stopPropagation()}>
              {isDesignAllowed ? (
                <TransferButton
                  title="Designs"
                  count={designAndViewOfWorkspaceCount}
                  onAssign={onAssignDesign}
                  disabled={!isDesignAllowed}
                />
              ) : (
                <RedirectButton title="Designs" count={designAndViewOfWorkspaceCount} />
              )}
              <RedirectButton title="Deploys" count={0} />
            </AllocationWorkspace>
          </AllocationColumnGrid>
        )}

        {isDesignsVisible && isViewsVisible && (
          <AllocationColumnGrid>
            <AllocationWorkspace onClick={(e) => e.stopPropagation()}>
              {isDesignAllowed && isViewAllowed ? (
                <TransferButton
                  title="Designs/Views"
                  count={designAndViewOfWorkspaceCount}
                  onAssign={onAssignDesign}
                  disabled={!(isDesignAllowed && isViewAllowed)}
                />
              ) : (
                <RedirectButton title="Designs/Views" count={designAndViewOfWorkspaceCount} />
              )}
              <RedirectButton title="Deploys" count={0} />
            </AllocationWorkspace>
          </AllocationColumnGrid>
        )}
      </Grid>
    </CardFrontWrapper>
  );
};

const CardBack = ({
  onFlipBack,
  onSelect,
  name,
  onEdit,
  onDelete,
  selectedWorkspaces,
  workspaceId,
  loadingEvents,
  recentActivities,
  updatedDate,
  createdDate,
  deleted,
  isDeleteWorkspaceAllowed,
  isEditWorkspaceAllowed
}: CardBackProps) => {
  const isWorkspaceSelected = selectedWorkspaces?.includes(workspaceId);
  const isEditButtonDisabled = isWorkspaceSelected ? true : !isEditWorkspaceAllowed;
  const isDeleteButtonDisabled = isWorkspaceSelected ? true : !isDeleteWorkspaceAllowed;

  const theme = useTheme();
  return (
    <CardBackWrapper elevation={2} onClick={onFlipBack}>
      <CardBackTopGrid xs={12}>
        <CardBackTitleGrid xs={6}>
          <BulkSelectCheckbox
            onClick={(e) => e.stopPropagation()}
            onChange={onSelect}
            disabled={deleted ? true : !isDeleteWorkspaceAllowed}
          />
          <CardTitle
            sx={{ color: theme.palette.background.constant?.white }}
            variant="body2"
            onClick={(e) => e.stopPropagation()}
          >
            {name}
          </CardTitle>
        </CardBackTitleGrid>
        <CardBackActionsGrid xs={6}>
          <L5EditIcon
            onClick={onEdit}
            disabled={isEditButtonDisabled}
            style={{ fill: theme.palette.background.constant?.white }}
            bulk={true}
          />
          <L5DeleteIcon
            onClick={onDelete}
            style={{ fill: theme.palette.background.constant?.white }}
            disabled={isDeleteButtonDisabled}
            bulk={true}
          />
        </CardBackActionsGrid>
      </CardBackTopGrid>
      <Grid sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
        <RecentActivityTitle variant="body2">Recent Activity</RecentActivityTitle>
      </Grid>
      <RecentActivityGrid>
        {loadingEvents ? (
          <Backdrop sx={{ zIndex: '2010' }} open={loadingEvents}>
            <CircularProgress
              color="inherit"
              style={{ color: theme.palette.background.constant?.white }}
            />
          </Backdrop>
        ) : (
          recentActivities?.map((activity, index) => {
            return (
              <RecordRow
                key={index}
                title={activity?.description}
                name={activity?.first_name}
                date={activity?.created_at}
              />
            );
          })
        )}
      </RecentActivityGrid>
      <DateGrid xs={12}>
        <DateColumnGrid xs={6}>
          <DateLabel onClick={(e) => e.stopPropagation()}>
            Updated At: {formattoLongDate(updatedDate)}
          </DateLabel>
        </DateColumnGrid>
        <DateColumnGrid xs={6}>
          <DateLabel onClick={(e) => e.stopPropagation()}>
            Created At: {formattoLongDate(createdDate)}
          </DateLabel>
        </DateColumnGrid>
      </DateGrid>
    </CardBackWrapper>
  );
};
