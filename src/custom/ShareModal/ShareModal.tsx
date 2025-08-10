import { CircularProgress, SelectChangeEvent } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Typography
} from '../../base';
import { ChainIcon, DeleteIcon, LockIcon, PublicIcon } from '../../icons';
import { useTheme } from '../../theme';
import { BLACK, WHITE } from '../../theme/colors';
import {
  canShareResourceWithNewUsers,
  canUpdateResourceVisibility,
  User
} from '../../utils/permissions';
import { CustomTooltip } from '../CustomTooltip';
import { Modal, ModalBody, ModalButtonSecondary, ModalFooter } from '../Modal';
import UserShareSearch from '../UserSearchField/UserSearchField';
import {
  CustomDialogContentText,
  CustomListItemText,
  CustomSelect,
  FormControlWrapper,
  IconButtonWrapper,
  ListWrapper,
  VisibilityIconWrapper
} from './style';

const options = {
  PUBLIC: 'Anyone with the link can edit',
  PRIVATE: 'Only people with access can open with the link'
};

const SHARE_MODE = VISIBILITY;

interface AccessListProps {
  accessList: User[];
  ownerData: User;
  handleDelete: (email: string) => Promise<{ error: string }>;
  hostURL?: string | null;
}

interface AccessListActorProps {
  actor: User;
  isOwner: boolean;
  hostURL?: string | null;
  handleDelete: (email: string) => Promise<{ error: string }>;
}

const AccessListActor: React.FC<AccessListActorProps> = ({
  actor: actorData,
  hostURL,
  isOwner,
  handleDelete
}) => {
  const theme = useTheme();
  const [isRevoking, setIsRevoking] = useState(false);
  const revokeAcess = async () => {
    setIsRevoking(true);
    try {
      await handleDelete(actorData.email);
    } finally {
      setIsRevoking(false);
    }
  };

  const openInNewTab = (url: string) => {
    window.open(url, '_blank', 'noreferrer');
  };

  return (
    <ListItem key={actorData.id} style={{ paddingLeft: '0' }}>
      <ListItemAvatar>
        <Avatar
          alt={actorData.first_name}
          src={actorData.avatar_url}
          imgProps={{ referrerPolicy: 'no-referrer' }}
          onClick={() => {
            hostURL && openInNewTab(`${hostURL}/user/${actorData.id}`);
          }}
        />
      </ListItemAvatar>
      <ListItemText
        primary={`${actorData.first_name || ''} ${actorData.last_name || ''}`}
        secondary={actorData.email}
        secondaryTypographyProps={{
          sx: {
            color: theme.palette.background.neutral?.pressed
          }
        }}
      />
      <ListItemSecondaryAction>
        {isOwner && <div>Owner</div>}

        {!isOwner && !isRevoking && (
          <CustomTooltip title="Remove Access" placement="top" arrow>
            <IconButton edge="end" aria-label="delete" onClick={revokeAcess}>
              <DeleteIcon fill={theme.palette.background.neutral?.default} />
            </IconButton>
          </CustomTooltip>
        )}

        {isRevoking && <CircularProgress size={24} sx={{ color: theme.palette.icon.default }} />}
      </ListItemSecondaryAction>
    </ListItem>
  );
};

/**
 * Custom component to show users list with delete icon and owner tag
 */
const AccessList: React.FC<AccessListProps> = ({
  accessList,
  ownerData,
  handleDelete,
  hostURL
}: AccessListProps) => {
  return (
    <>
      {accessList.length > 0 && (
        <Typography variant="h6" style={{ marginTop: '0.5rem' }}>
          People with Access
        </Typography>
      )}
      <ListWrapper>
        <List dense>
          {accessList.map((actorData) => (
            <AccessListActor
              hostURL={hostURL}
              key={actorData.id}
              actor={actorData}
              handleDelete={handleDelete}
              isOwner={ownerData.id == actorData.id}
            />
          ))}
        </List>
      </ListWrapper>
    </>
  );
};

interface SelectedResource {
  visibility: string;
  name: string;
  [key: string]: unknown;
}

type SelectedResources = SelectedResource | SelectedResource[];

export type ResourceAccessArg = {
  resourceType: string;
  resourceId: string | string[];
  resourceAccessMappingPayload: {
    grant_access: string[];
    revoke_access: string[];
    notify_users: boolean;
  };
};

import { startCase } from 'lodash';
import { VISIBILITY } from '../../constants/constants';

interface ShareModalProps {
  /** Function to close the share modal */
  handleShareModalClose: () => void;
  /** The resource(s) that is selected for sharing.*/
  selectedResource: SelectedResources;
  /** The name of the data being shared, like design or filter */
  dataName: string;
  /** Data of the user who owns the resource */
  ownerData: User;
  /** Function to fetch the list of users who have access to the resource */
  fetchAccessActors: () => Promise<User[]>;
  /** Optional URL of the host application. Defaults to `null` if not provided */
  hostURL?: string | null;
  handleUpdateVisibility: (value: string) => Promise<{ error: string }>;
  handleShareWithNewUsers: (newUsers: User[]) => Promise<{ error: string }>;
  canShareWithNewUsers: boolean;
  handleRevokeAccess: (revokedUsser: User[]) => Promise<{ error: string }>;
  canRevokeAccess: boolean;

  /* eslint-disable @typescript-eslint/no-explicit-any */
  resourceAccessMutator: any;
  notify: ({ message, event_type }: { message: string; event_type: 'success' | 'error' }) => void;

  /* eslint-disable @typescript-eslint/no-explicit-any */
  useGetAllUsersQuery: any;
  shareableLink: string;
  mesheryURL: string; // url to hosted meshery
  currentUser: User;
}

/**
 * ShareModal component allows sharing a resource with specified users
 * and configuring visibility options.
 */
const ShareModal: React.FC<ShareModalProps> = ({
  handleShareModalClose,
  selectedResource,
  dataName,
  ownerData,
  fetchAccessActors,
  hostURL = null,
  currentUser,
  handleUpdateVisibility,
  resourceAccessMutator,
  notify,
  useGetAllUsersQuery,
  shareableLink
}: ShareModalProps): JSX.Element => {
  console.log('amit selectdResource', selectedResource);
  const theme = useTheme();
  const [openMenu, setMenu] = useState<boolean>(false);
  const [shareUserData, setShareUserData] = useState<User[]>([]);
  const [resourceVisibility, setVisibility] = useState(
    Array.isArray(selectedResource) ? selectedResource[0].visibility : selectedResource.visibility
  );
  console.log('amit resourceVisibility', resourceVisibility);
  const [isUpdatingVisibility, setUpdatingVisibility] = useState(false);

  const userCanUpdateVisibility = Array.isArray(selectedResource)
    ? selectedResource.every((resource) =>
        canUpdateResourceVisibility(resource, currentUser, ownerData)
      )
    : canUpdateResourceVisibility(selectedResource, currentUser, ownerData);

  const userCanShareWithNewUsers = Array.isArray(selectedResource)
    ? selectedResource.every((resource) =>
        canShareResourceWithNewUsers(resource, currentUser, ownerData)
      )
    : canShareResourceWithNewUsers(selectedResource, currentUser, ownerData);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareableLink);
    notify({
      message: 'Link copied to clipboard',
      event_type: 'success'
    });
  };

  const resourceType = dataName === 'design' ? 'pattern' : dataName;

  const handleShareWithNewUsers = async (newUsers: User[]) => {
    const grantAccessList = newUsers.map((user) => ({
      actor_id: user.user_id,
      actor_type: 'user'
    }));
    const emails = newUsers.map((u) => u.email);

    if (Array.isArray(selectedResource)) {
      const responses = await Promise.all(
        selectedResource.map((resource) =>
          resourceAccessMutator({
            resourceType,
            resourceId: resource.id,
            resourceAccessMappingPayload: {
              grant_access: [...grantAccessList],
              revoke_access: [],
              notify_users: true
            }
          })
        )
      );

      const hasError = responses.some((response) => response?.error);

      if (!hasError) {
        notify({
          message: `${dataName}s shared with ${emails.join(', ')}`,
          event_type: 'success'
        });
      } else {
        notify({
          message: `An error occurred. Some ${dataName}s may not have been shared`,
          event_type: 'error'
        });
      }

      return {
        error: hasError ? 'Some resources failed to share' : ''
      };
    }

    const response = await resourceAccessMutator({
      resourceType,
      resourceId: !Array.isArray(selectedResource) ? selectedResource.id : selectedResource[0].id,
      resourceAccessMappingPayload: {
        grant_access: [...grantAccessList],
        revoke_access: [],
        notify_users: true
      }
    });

    if (!response?.error) {
      notify({
        message: `${dataName} shared with ${emails.join(', ')}`,
        event_type: 'success'
      });
    }

    if (response?.error) {
      notify({
        message: `An error occurred. ${dataName} not shared`,
        event_type: 'error'
      });
    }

    return {
      error: response?.error?.error
    };
  };

  const handleRevokeAccess = async (revokedUsers: User[]) => {
    const revokeAccessList = revokedUsers.map((user) => ({
      actor_id: user.id,
      actor_type: 'user'
    }));
    const emails = revokedUsers.map((u) => u.email);

    const response = await resourceAccessMutator({
      resourceType,
      resourceId: !Array.isArray(selectedResource) ? selectedResource.id : selectedResource[0].id,
      resourceAccessMappingPayload: {
        grant_access: [],
        revoke_access: [...revokeAccessList],
        notify_users: true
      }
    });

    if (!response?.error) {
      const msg = `Access to ${dataName} revoked for  ${emails.join(', ')} `;
      notify({
        message: msg,
        event_type: 'success'
      });
    }

    if (response?.error) {
      notify({
        message: `failed to revokke access to ${dataName}`,
        event_type: 'error'
      });
    }

    return {
      error: response?.error?.error
    };
  };

  const handleDelete = async (email: string) => {
    const revoked = shareUserData.find((user) => user.email == email);
    if (!revoked) {
      console.error('cant revoke user without acesss');
      return { error: '' };
    }
    return handleRevokeAccess([revoked]);
  };

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const notifyVisibilityChange = (res: any, value: any) => {
    const UPDATE_VISIBILITY_MSG = Array.isArray(selectedResource)
      ? `${startCase(dataName)}s (${selectedResource.length}) are now ${value}`
      : `${startCase(dataName)} '${selectedResource.name}' is now ${value}`;
    const FAILED_TO_UPDATE_VISIBILITY_MSG = `Failed to update visibility. ${res?.error?.error || ''}`;

    if (!res.error) {
      notify({
        message: UPDATE_VISIBILITY_MSG,
        event_type: 'success'
      });
    } else {
      notify({
        message: FAILED_TO_UPDATE_VISIBILITY_MSG,
        event_type: 'error'
      });
    }
  };

  const updateVisisbility = async (event: SelectChangeEvent<unknown>) => {
    const value = event.target.value as string;

    if (value == resourceVisibility) {
      console.error('visibility is already ', value);
      return;
    }

    try {
      setUpdatingVisibility(true);
      const res = await handleUpdateVisibility(value);
      notifyVisibilityChange(res, value);
      if (!res?.error) {
        setVisibility(value);
      }
    } finally {
      setUpdatingVisibility(false);
    }
  };

  const handleMenuClose = () => setMenu(false);

  useEffect(() => {
    const fetchActors = async () => {
      const actors = await fetchAccessActors();
      setShareUserData(actors);
    };
    fetchActors();
  }, [fetchAccessActors]);

  return (
    <div style={{ marginBottom: '1rem' }}>
      <Modal
        open={true}
        useBrandColors={true}
        closeModal={handleShareModalClose}
        title={
          Array.isArray(selectedResource)
            ? `Share ${selectedResource.length} ${dataName}s`
            : `Share ${dataName} "${selectedResource?.name}"`
        }
      >
        <ModalBody>
          <UserShareSearch
            usersData={shareUserData}
            shareWithNewUsers={handleShareWithNewUsers}
            disabled={!userCanShareWithNewUsers}
            useGetAllUsersQuery={useGetAllUsersQuery}
          />

          <AccessList
            accessList={shareUserData}
            ownerData={ownerData}
            handleDelete={handleDelete}
            hostURL={hostURL}
          />

          {!Array.isArray(selectedResource) && resourceVisibility !== 'published' && (
            <>
              <CustomListItemText>
                <Typography variant="h6">General Access</Typography>
              </CustomListItemText>
              <CustomDialogContentText>
                <FormControlWrapper size="small">
                  <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                    <VisibilityIconWrapper>
                      {isUpdatingVisibility && <CircularProgress size={24} />}

                      {!isUpdatingVisibility && resourceVisibility === SHARE_MODE.PUBLIC && (
                        <PublicIcon
                          width={24}
                          height={24}
                          fill={theme.palette.icon.default}
                          stroke={theme.palette.mode === 'dark' ? WHITE : BLACK}
                        />
                      )}

                      {!isUpdatingVisibility && resourceVisibility == SHARE_MODE.PRIVATE && (
                        <LockIcon
                          width={24}
                          height={24}
                          fill={theme.palette.icon.default}
                          stroke={theme.palette.mode === 'dark' ? WHITE : BLACK}
                        />
                      )}
                    </VisibilityIconWrapper>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <CustomSelect
                        variant="outlined"
                        value={resourceVisibility}
                        labelId="share-menu-select"
                        id="share-menu"
                        open={openMenu}
                        onClose={handleMenuClose}
                        onOpen={() => setMenu(true)}
                        onChange={updateVisisbility}
                        disabled={!userCanUpdateVisibility || isUpdatingVisibility}
                      >
                        {Object.values(SHARE_MODE).map((option) => (
                          <MenuItem
                            key={option}
                            selected={option === resourceVisibility}
                            value={option}
                          >
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                          </MenuItem>
                        ))}
                      </CustomSelect>
                      <Typography
                        sx={{
                          color: theme.palette.background.neutral?.pressed
                        }}
                        component="span"
                        variant="body2"
                      >
                        {resourceVisibility === SHARE_MODE.PRIVATE
                          ? options.PRIVATE
                          : options.PUBLIC}
                      </Typography>
                    </div>
                  </div>
                </FormControlWrapper>
              </CustomDialogContentText>
            </>
          )}
        </ModalBody>

        <ModalFooter
          variant="filled"
          useBrandColors={true}
          helpText="You can share your designs or designs for which you have permission to share with other members of your organization and teams, and you can control access permissions. [Learn More](https://docs.layer5.io/kanvas/designer/share-resource)"
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'end',
              gap: '1rem'
            }}
          >
            <ModalButtonSecondary
              variant="outlined"
              onClick={handleCopy}
              style={{ marginRight: '1rem', padding: '7px 16px' }}
            >
              <IconButtonWrapper>
                <ChainIcon width="24" height="24" fill={theme.palette.text.constant?.white} />
              </IconButtonWrapper>
              <Typography>Copy Link</Typography>
            </ModalButtonSecondary>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ShareModal;
