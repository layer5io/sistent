import HistoryIcon from '@mui/icons-material/History';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '../../base';
import { iconLarge, iconXSmall } from '../../constants/iconsSizes';
import { DesignIcon, EnvironmentIcon, TeamsIcon, ViewIcon, WorkspaceIcon } from '../../icons';
import { getFormatDate, getFullFormattedTime } from '../../utils';
import { CustomTooltip } from '../CustomTooltip';
import { Modal, ModalBody, ModalFooter } from '../Modal';

interface EventData {
  created_at: string;
  description: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
}

interface EventsResponse {
  data: EventData[];
  page: number;
  total_count: number;
}

interface RecentActivityModalProps {
  workspaceId: string;
  workspaceName: string;
  open: boolean;
  handleClose: () => void;
  useGetEventsOfWorkspaceQuery: (
    params: {
      workspaceId: string;
      page: number;
      pagesize: number;
    },
    options?: { skip: boolean }
  ) => {
    data?: EventsResponse;
    isLoading: boolean;
    isFetching: boolean;
  };
}

const WorkspaceRecentActivityModal: React.FC<RecentActivityModalProps> = ({
  workspaceId,
  workspaceName,
  open,
  handleClose,
  useGetEventsOfWorkspaceQuery
}) => {
  const [page, setPage] = useState<number>(0);
  const _pageSize = 25;
  const [allEvents, setAllEvents] = useState<EventData[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const _observer = useRef<IntersectionObserver | null>(null);
  const _loaderRef = useRef<HTMLDivElement | null>(null);

  const {
    data: eventsData,
    isLoading: isEventsLoading,
    isFetching
  } = useGetEventsOfWorkspaceQuery(
    {
      workspaceId,
      page: page,
      pagesize: _pageSize
    },
    { skip: !open }
  );

  // Update events when data is fetched
  useEffect(() => {
    if (eventsData) {
      if (page === 0) {
        setAllEvents(eventsData.data);
      } else {
        setAllEvents((prev) => [...prev, ...eventsData.data]);
      }

      // Check if we've loaded all events
      setHasMore((eventsData.page + 1) * _pageSize < eventsData.total_count);
    }
  }, [eventsData, page, _pageSize]);

  // Reset pagination when modal opens
  useEffect(() => {
    if (open) {
      setPage(0);
      setAllEvents([]);
      setHasMore(true);
    }
  }, [open]);

  // Callback for the IntersectionObserver
  const lastEventElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isEventsLoading || isFetching) return;

      // Disconnect previous observer if it exists
      if (_observer.current) _observer.current.disconnect();

      // Create a new observer
      _observer.current = new IntersectionObserver((entries) => {
        // If the loader element is visible and we have more data to load
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      // Observe the loader element
      if (node) _observer.current.observe(node);
    },
    [isEventsLoading, isFetching, hasMore]
  );

  const getImage = (description: string) => {
    const availableTypes = ['design', 'view', 'environment', 'team'];
    const type = availableTypes.find((type) => description.includes(type));

    switch (type) {
      case 'design':
        return <DesignIcon {...iconXSmall} />;
      case 'view':
        return <ViewIcon {...iconXSmall} />;
      case 'environment':
        return <EnvironmentIcon {...iconXSmall} />;
      case 'team':
        return <TeamsIcon {...iconXSmall} fill="" />;
      default:
        return <WorkspaceIcon {...iconXSmall} />;
    }
  };

  return (
    <>
      <Modal
        title={`"${workspaceName}" Recent Activity`}
        open={open}
        closeModal={handleClose}
        headerIcon={<HistoryIcon />}
        maxWidth="md"
      >
        <ModalBody style={{ maxHeight: '40rem' }}>
          {page === 0 && isEventsLoading ? (
            <Box display="flex" justifyContent="center" padding={4}>
              <CircularProgress />
            </Box>
          ) : allEvents.length > 0 ? (
            <>
              {allEvents.map((data, index) => (
                <List
                  sx={{ width: '100%', padding: '0' }}
                  key={`${data.created_at}-${data.description}-${index}`}
                >
                  <ListItem
                    style={{ padding: '0' }}
                    alignItems="flex-start"
                    secondaryAction={
                      <Box display={'flex'} flexDirection="column" alignItems="flex-end" gap={0.2}>
                        {getImage(data.description)}
                        <CustomTooltip title={getFullFormattedTime(data.created_at)}>
                          <div>
                            <Typography
                              variant="caption"
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                fontStyle: 'italic'
                              }}
                            >
                              Updated At: {getFormatDate(data.created_at)}
                            </Typography>
                          </div>
                        </CustomTooltip>
                      </Box>
                    }
                  >
                    <ListItemAvatar
                      style={{
                        minWidth: '0',
                        marginTop: '0.75rem',
                        marginRight: '1rem'
                      }}
                    >
                      <Avatar alt={data.first_name} src={data.avatar_url} sx={iconLarge} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={data.first_name + ' ' + data.last_name}
                      secondary={<>{data.description}</>}
                    />
                  </ListItem>
                  <Divider />
                </List>
              ))}

              {/* The loader element that will trigger the next page load */}
              <div
                ref={hasMore ? lastEventElementRef : null}
                style={{ height: '20px', width: '100%' }}
              />

              {isFetching && (
                <Box display="flex" justifyContent="center" padding={2} ref={_loaderRef}>
                  <CircularProgress size={24} />
                </Box>
              )}

              {!hasMore && allEvents.length > 0 && (
                <Typography variant="body2" color="textSecondary" style={{ textAlign: 'center' }}>
                  No more activities to load
                </Typography>
              )}
            </>
          ) : (
            <Box display="flex" justifyContent="center" padding={4}>
              <Typography variant="body2" color="textSecondary">
                No recent activity found for this workspace.
              </Typography>
            </Box>
          )}
        </ModalBody>
        <ModalFooter variant="filled">
          <></>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default WorkspaceRecentActivityModal;
