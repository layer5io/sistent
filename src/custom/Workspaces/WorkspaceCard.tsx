import { useTheme } from '@mui/material';
import { Backdrop, CircularProgress, Grid, Typography } from '../../base';
import { FlipCard } from '../FlipCard';
import { RecordRow, RedirectButton, TransferButton } from './WorkspaceTransferButton';
import { formattoLongDate } from './helper';
import {
  AllocationWorkspace,
  BulkSelectCheckbox,
  CardTitle,
  CardWrapper,
  DateLabel,
  DescriptionLabel,
  EmptyDescription,
  L5DeleteIcon,
  L5EditIcon
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
  isDesignAndViewAllowed: boolean;
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
  isDesignAndViewAllowed: boolean;
  isDeleteWorkspaceAllowed: boolean;
  isEditWorkspaceAllowed: boolean;
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
  isDesignAndViewAllowed,
  isDeleteWorkspaceAllowed,
  isEditWorkspaceAllowed
}: WorkspaceCardProps) => {
  const deleted = workspaceDetails.deleted_at.Valid;
  return (
    <FlipCard disableFlip={selectedWorkspaces.includes(workspaceDetails.id) ? true : false}>
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
        isDesignAndViewAllowed={isDesignAndViewAllowed}
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
  isDesignAndViewAllowed
}: CardFrontProps) => {
  const theme = useTheme();
  return (
    <CardWrapper
      elevation={2}
      sx={{
        minHeight: { xs: '520px', sm: '400px' },
        background: theme.palette.background.card
      }}
      onClick={onFlip}
    >
      <Grid sx={{ display: 'flex', flexDirection: 'row' }}>
        <CardTitle variant="body2" onClick={(e) => e.stopPropagation()}>
          {name}
        </CardTitle>
      </Grid>
      <Grid sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
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
        <Grid xs={12} sm={4}>
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
        </Grid>
        <Grid xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center' }}>
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
        </Grid>
        <Grid xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <AllocationWorkspace onClick={(e) => e.stopPropagation()}>
            {isDesignAndViewAllowed ? (
              <TransferButton
                title="Designs/Views"
                count={designAndViewOfWorkspaceCount}
                onAssign={onAssignDesign}
                disabled={!isDesignAndViewAllowed}
              />
            ) : (
              <RedirectButton title="Designs/Views" count={designAndViewOfWorkspaceCount} />
            )}
            <RedirectButton title="Deploys" count={0} />
          </AllocationWorkspace>
        </Grid>
      </Grid>
    </CardWrapper>
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
    <CardWrapper
      elevation={2}
      sx={{
        minHeight: { xs: '520px', sm: '400px' },
        background: 'linear-gradient(180deg, #007366 0%, #000 100%)'
      }}
      onClick={onFlipBack}
    >
      <Grid xs={12}>
        <Grid xs={12} sx={{ display: 'flex', flexDirection: 'row' }}>
          <Grid xs={6} sx={{ display: 'flex', alignItems: 'flex-start' }}>
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
          </Grid>
          <Grid
            xs={6}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end'
            }}
          >
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
          </Grid>
        </Grid>
      </Grid>
      <Grid sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
        <Typography
          sx={{
            fontSize: '1.25rem',
            fontWeight: 600,
            padding: '0.5rem 0',
            color: theme.palette.background.constant?.white
          }}
          variant="body2"
        >
          Recent Activity
        </Typography>
      </Grid>
      <Grid
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '14.5rem',
          overflowY: 'scroll'
        }}
      >
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
      </Grid>
      <Grid
        sx={{
          display: 'flex',
          flexDirection: 'row',
          position: 'absolute',
          bottom: '20px',
          width: '100%',
          color: `${theme.palette.background.constant?.white}99`
        }}
      >
        <Grid xs={6} sx={{ textAlign: 'left' }}>
          <DateLabel onClick={(e) => e.stopPropagation()}>
            Updated At: {formattoLongDate(updatedDate)}
          </DateLabel>
        </Grid>
        <Grid xs={6} sx={{ textAlign: 'left' }}>
          <DateLabel onClick={(e) => e.stopPropagation()}>
            Created At: {formattoLongDate(createdDate)}
          </DateLabel>
        </Grid>
      </Grid>
    </CardWrapper>
  );
};
