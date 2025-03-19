import { SelectChangeEvent } from '@mui/material';
import { styled } from '@mui/material/styles';
import moment from 'moment-timezone';
import {
  Box,
  Button,
  Card,
  CardActions,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Typography
} from '../../base';
import { iconMedium } from '../../constants/iconsSizes';
import { WorkspaceIcon } from '../../icons';
import { useTheme } from '../../theme';
import { CustomTooltip } from '../CustomTooltip';

interface Activity {
  created_at: string;
  description: string;
}

interface Workspace {
  id: string;
  name: string;
}

interface WorkspaceActivityCardProps {
  selectedWorkspace: string;
  handleWorkspaceChange: (event: SelectChangeEvent<unknown>) => void;
  activities: Activity[];
  workspaces: Workspace[];
  isEventsLoading: boolean;
  workspacePagePath: string;
}

const StyledCard = styled(Card)(({ theme }) => ({
  padding: '1rem',
  height: '100%',
  overflowY: 'auto',
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.background.card : theme.palette.common.white
}));

const HeaderBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '8px'
});

const TitleWrapper = styled('div')({
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'center'
});

const StyledSelect = styled(Select)({
  maxWidth: '40%'
});

const LoaderBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '65%'
});

const StyledList = styled(List)({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem'
});

const ActivityWrapper = styled('div')({
  width: 'fit-content'
});

const StyledListItem = styled(ListItem)({
  cursor: 'default',
  padding: '0'
});

const StyledListItemText = styled(ListItemText)({
  margin: 0,
  paddingLeft: '0.5rem'
});

const EmptyStateTypography = styled(Typography)(({ theme }) => ({
  margin: '0.5rem',
  color: theme.palette.background.neutral?.pressed
}));

const WorkspaceActivityCard: React.FC<WorkspaceActivityCardProps> = ({
  selectedWorkspace,
  handleWorkspaceChange,
  activities,
  workspaces,
  isEventsLoading,
  workspacePagePath
}) => {
  const theme = useTheme();

  const iconsProps = {
    fill: theme.palette.icon?.default,
    primaryFill: theme.palette.icon?.default,
    secondaryFill: theme.palette.icon.disabled,
    opacity: 0.6,
    iconMedium
  };

  return (
    <StyledCard>
      <HeaderBox>
        <TitleWrapper>
          <WorkspaceIcon {...iconsProps} />
          <Typography variant="h6" fontWeight="700">
            WORKSPACE ACTIVITY
          </Typography>
        </TitleWrapper>

        <StyledSelect
          value={selectedWorkspace}
          onChange={handleWorkspaceChange}
          displayEmpty
          variant="standard"
          size="medium"
        >
          {workspaces?.map((workspace) => (
            <MenuItem key={workspace.id} value={workspace.id}>
              {workspace.name}
            </MenuItem>
          ))}
        </StyledSelect>
      </HeaderBox>
      {isEventsLoading ? (
        <LoaderBox>
          <CircularProgress />
        </LoaderBox>
      ) : activities?.length > 0 ? (
        <StyledList>
          {activities?.map((activity, index) => (
            <CustomTooltip
              key={index}
              title={moment(activity.created_at).format('LLLL')}
              arrow
              placement="right"
            >
              <ActivityWrapper>
                <StyledListItem disableGutters component="div">
                  <StyledListItemText
                    primary={
                      <span>
                        <strong>{moment(activity.created_at).format('MMM D')}:</strong>{' '}
                        {activity.description}
                      </span>
                    }
                  />
                </StyledListItem>
              </ActivityWrapper>
            </CustomTooltip>
          ))}
        </StyledList>
      ) : (
        <EmptyStateTypography variant="body1" align="left">
          No activities found for this workspace.
        </EmptyStateTypography>
      )}
      <CardActions>
        <Button disabled={false} variant="contained" href={workspacePagePath} size="small">
          All Workspaces
        </Button>
      </CardActions>
    </StyledCard>
  );
};

export default WorkspaceActivityCard;
