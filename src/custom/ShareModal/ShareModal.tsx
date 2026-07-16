import { CircularProgress, SelectChangeEvent } from '@mui/material';
import { startCase } from 'lodash';
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
import { VISIBILITY } from '../../constants/constants';
import { ChainIcon, DeleteIcon, LockIcon, PublicIcon } from '../../icons';
import { useTheme } from '../../theme';
import { BLACK, WHITE } from '../../theme/colors';
import { canShareResourceWithNewUsers, canUpdateResourceVisibility } from '../../utils/permissions';
import {
  getUserContactLabel,
  getUserDisplayName,
  getUserIdentifier,
  getUserLabel,
  isSameUser,
  User
} from '../../utils/user';
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
  handleDelete: (actor: User) => Promise<{ error: string }>;
  hostURL?: string | null;
}

interface AccessListActorProps {
  actor: User;
  isOwner: boolean;
  hostURL?: string | null;
  handleDelete: (actor: User) => Promise<{ error: string }>;
}

const AccessListActor: React.FC<AccessListActorProps> = ({
  actor: actorData,
  hostURL,
  isOwner,
  handleDelete
}) => {
  const theme = useTheme();
  const [isRevoking, setIsRevoking] = useState(false);
  const revokeAccess = async () => {
    setIsRevoking(true);
    try {
      await handleDelete(actorData);
    } finally {
      setIsRevoking(false);
    }
  };

  const openInNewTab = (url: string) => {
    window.open(url, '_blank', 'noreferrer');
  };

  return (
    <ListItem key={getUserLabel(actorData)} style={{ paddingLeft: '0' }}>
      <ListItemAvatar>
        <Avatar
          alt={getUserDisplayName(actorData)}
          src={actorData.avatarUrl}
          imgProps={{ referrerPolicy: 'no-referrer' }}
          onClick={() => {
            if (hostURL) openInNewTab(`${hostURL}/user/${getUserIdentifier(actorData)}`);
          }}
        />
      </ListItemAvatar>
      <ListItemText
        primary={getUserDisplayName(actorData)}
        secondary={getUserContactLabel(actorData)}
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
            <IconButton edge="end" aria-label="delete" onClick={revokeAccess}>
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
              key={getUserLabel(actorData)}
              actor={actorData}
              handleDelete={handleDelete}
              isOwner={isSameUser(ownerData, actorData)}
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
  const theme = useTheme();
  const [openMenu, setMenu] = useState<boolean>(false);
  const [shareUserData, setShareUserData] = useState<User[]>([]);
  const [resourceVisibility, setVisibility] = useState(
    Array.isArray(selectedResource) ? selectedResource[0]?.visibility : selectedResource?.visibility
  );
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
    // Fail fast on records without a usable identifier: an empty actor_id
    // would produce an invalid grant_access payload and a confusing
    // partial-share result.
    if (newUsers.some((user) => !getUserIdentifier(user))) {
      notify({
        message: `Unable to share ${dataName}: a selected user record is missing its identifier`,
        event_type: 'error'
      });
      return { error: 'missing user identifier' };
    }

    const grantAccessList = newUsers.map((user) => ({
      actor_id: getUserIdentifier(user),
      actor_type: 'user'
    }));
    const recipients = newUsers.map(getUserLabel);

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
          message: `${dataName}s shared with ${recipients.join(', ')}`,
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
        message: `${dataName} shared with ${recipients.join(', ')}`,
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
    // Same guard as sharing: never issue a revoke_access entry with an
    // empty actor_id.
    if (revokedUsers.some((user) => !getUserIdentifier(user))) {
      notify({
        message: `Unable to revoke access to ${dataName}: the user record is missing its identifier`,
        event_type: 'error'
      });
      return { error: 'missing user identifier' };
    }

    const revokeAccessList = revokedUsers.map((user) => ({
      actor_id: getUserIdentifier(user),
      actor_type: 'user'
    }));
    const revokees = revokedUsers.map(getUserLabel);

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
      notify({
        message: `Access to ${dataName} revoked for ${revokees.join(', ')}`,
        event_type: 'success'
      });
    }

    if (response?.error) {
      notify({
        message: `Failed to revoke access to ${dataName}`,
        event_type: 'error'
      });
    }

    return {
      error: response?.error?.error
    };
  };

  const handleDelete = async (actor: User) => handleRevokeAccess([actor]);

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
