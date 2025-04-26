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
import { CustomTooltip } from '../CustomTooltip';
import { Modal, ModalBody, ModalButtonPrimary, ModalButtonSecondary, ModalFooter } from '../Modal';
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
import { TypedMutationTrigger, TypedUseQuery } from '@reduxjs/toolkit/dist/query/react';

const options = {
  PUBLIC: 'Anyone with the link can edit',
  PRIVATE: 'Only people with access can open with the link'
};

const SHARE_MODE = {
  PRIVATE: 'private',
  PUBLIC: 'public'
};

interface User {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar_url?: string;
  deleted_at?: { Valid: boolean };
}

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

const AccessListActor: React.FC<AccessListActorProps> = ({ actor: actorData, hostURL, isOwner, handleDelete }) => {
  const theme = useTheme()
  const [isRevoking, setIsRevoking] = useState(false)
  const revokeAcess = async () => {
    setIsRevoking(true)
    try {
      const res = await handleDelete(actorData.email)
    }
    finally {
      setIsRevoking(false)
    }
  }

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
        {isOwner && (
          <div>Owner</div>
        )}

        {!isOwner && !isRevoking && (
          <CustomTooltip title="Remove Access" placement="top" arrow>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={revokeAcess}
            >
              <DeleteIcon fill={theme.palette.background.neutral?.default} />
            </IconButton>
          </CustomTooltip>
        )}

        {isRevoking && <CircularProgress size={24} sx={{ color: theme.palette.icon.default }} />}

      </ListItemSecondaryAction>
    </ListItem>)
}



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
          {accessList.map((actorData) => (<AccessListActor hostURL={hostURL} key={actorData.id}
            actor={actorData} handleDelete={handleDelete} isOwner={ownerData.id == actorData.id} />))}
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

type ResourceAccessArg = {
  resourceType: string;
  resourceId: string;
  resourceAccessMappingPayload: {
    grant_access: string[];
    revoke_access: string[];
    notify_users: boolean;
  };
};


import type { MutationTrigger } from '@reduxjs/toolkit/query/react';
import { startCase } from 'lodash';

interface ShareModalProps {
  /** Function to close the share modal */
  handleShareModalClose: () => void;
  /** The resource that is selected for sharing.*/
  selectedResource: SelectedResource;
  /** The name of the data being shared, like design or filter */
  dataName: string;
  /** Data of the user who owns the resource */
  ownerData: User;
  /** Function to fetch the list of users who have access to the resource */
  fetchAccessActors: () => Promise<User[]>;
  /** Optional URL of the host application. Defaults to `null` if not provided */
  hostURL?: string | null;
  /**
   * Optional URL of the resource. Defaults to empty string if not provided
   * Resource URL will be the URL which user will copy with Copy Link Button
   */
  resourceURL?: string;
  /** Optional flag to disable the visibility selector. Defaults to `false` if not provided */
  isVisibilitySelectorDisabled?: boolean;
  /**
   * Function to fetch user suggestions based on the input value.
   * @param {string} value - The input value for which suggestions are to be fetched.
   * @returns {Promise<User[]>} A promise that resolves to an array of user suggestions.
   */
  fetchSuggestions: (value: string) => Promise<User[]>;
  handleCopy: () => void;
  handleUpdateVisibility: (value: string) => Promise<{ error: string }>,
  handleShareWithNewUsers: (newUsers: User[]) => Promise<{ error: string }>,
  canShareWithNewUsers: boolean,
  handleRevokeAccess: (revokedUsser: User[]) => Promise<{ error: string }>
  canRevokeAccess: boolean,
  resourceAccessMutator: MutationTrigger<ResourceAccessArg>,
  notify: ({ message, event_type }: { message: string, event_type: "success" | "error" }) => void,
  useGetAllUsersQuery: any,
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
  handleCopy,
  handleUpdateVisibility,
  canShareWithNewUsers,
  isVisibilitySelectorDisabled = false,
  fetchSuggestions,
  resourceAccessMutator,
  notify,
  useGetAllUsersQuery,

}: ShareModalProps): JSX.Element => {
  const theme = useTheme();
  const [openMenu, setMenu] = useState<boolean>(false);
  const [shareUserData, setShareUserData] = useState<User[]>([]);
  const [resourceVisibility, setVisibility] = useState(selectedResource.visibility)
  const [isUpdatingVisibility, setUpdatingVisibility] = useState(false)




  const resourceType = dataName === "design" ? "pattern" : dataName;


  const handleShareWithNewUsers = async (newUsers: User[]) => {
    console.log("new users", newUsers)
    const grantAccessList = newUsers.map(user => ({
      actor_id: user.user_id ?? user.id,
      actor_type: "user"
    }))
    const emails = newUsers.map(u => u.email)

    const response = await resourceAccessMutator({
      resourceType,
      resourceId: selectedResource?.id,
      resourceAccessMappingPayload: {
        grant_access: [...grantAccessList],
        revoke_access: [],
        notify_users: true
      }
    })



    if (!response?.error) {
      const msg = `${dataName} shared with ${emails.join(", ")} `;
      notify({
        message: msg,
        event_type: "success"
      });
    }

    if (response?.error) {
      notify({
        message: `An error occurred. ${dataName} not shared`,
        event_type: "error"
      });
    }

    return {
      error: response?.error?.error
    }

  };


  const handleRevokeAccess = async (revokedUsers: User[]) => {
    const revokeAccessList = revokedUsers.map(user => ({
      actor_id: user.id,
      actor_type: "user"
    }))
    const emails = revokedUsers.map(u => u.email)

    const response = await resourceAccessMutator({
      resourceType,
      resourceId: selectedResource?.id,
      resourceAccessMappingPayload: {
        grant_access: [],
        revoke_access: [...revokeAccessList],
        notify_users: true
      }
    })


    if (!response?.error) {
      const msg = `Access to ${dataName} revoked for  ${emails.join(", ")} `;
      notify({
        message: msg,
        event_type: "success"
      });

    }

    if (response?.error) {
      notify({
        message: `failed to revokke access to ${dataName}`,
        event_type: "error"
      });
    }

    return {
      error: response?.error?.error
    }

  };


  const handleDelete = async (email: string) => {
    const revoked = shareUserData.find(user => user.email == email)
    if (!revoked) {
      console.error("cant revoke user without acesss")
      return { error: "" }
    }
    return handleRevokeAccess([revoked])
  };


  const notifyVisibilityChange = (res: any, value: any) => {
    const UPDATE_VISIBILITY_MSG = `${startCase(dataName)} '${selectedResource.name}' is now ${value}`;
    const FAILED_TO_UPDATE_VISIBILITY_MSG = `Failed to update visibility. ${res?.error?.error || ""}`;

    if (!res.error) {
      notify({
        message: UPDATE_VISIBILITY_MSG,
        event_type: "success"
      });
    } else {

      notify({
        message: FAILED_TO_UPDATE_VISIBILITY_MSG,
        event_type: "error"
      });
    }
  }

  const updateVisisbility = async (event: SelectChangeEvent<unknown>) => {
    const value = event.target.value as string;

    if (value == resourceVisibility) {
      console.error("visibility is already ", value)
      return
    }

    try {
      setUpdatingVisibility(true)
      const res = await handleUpdateVisibility(value)
      notifyVisibilityChange(res, value)
      if (!res?.error) {
        setVisibility(value)
      }
    } finally {
      setUpdatingVisibility(false)
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
        title={`Share ${dataName} "${selectedResource?.name}"`}
      >
        <ModalBody>
          <UserShareSearch
            setUsersData={setShareUserData}
            usersData={shareUserData}
            label="Search Users"
            shareWithNewUsers={handleShareWithNewUsers}
            // isSharing={isSharing}
            disabled={canShareWithNewUsers}
            customUsersList={
              <AccessList
                accessList={shareUserData}
                ownerData={ownerData}
                handleDelete={handleDelete}
                hostURL={hostURL}
              />
            }
            useGetAllUsersQuery={useGetAllUsersQuery}
            fetchSuggestions={fetchSuggestions}
          />

          <AccessList
            accessList={shareUserData}
            ownerData={ownerData}
            handleDelete={handleDelete}
            hostURL={hostURL}
          />

          {resourceVisibility !== 'published' && (
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
                        disabled={isVisibilitySelectorDisabled || isUpdatingVisibility}
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
                        {resourceVisibility === SHARE_MODE.PRIVATE ? options.PRIVATE : options.PUBLIC}
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
          helpText="You can share your designs or designs for which you have permission to share with other members of your organization and teams, and you can control access permissions. <a href='https://docs.layer5.io/kanvas/designer/share-resource/'>Learn more</a>"
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
            {/* <ModalButtonPrimary
              disabled={isShareDisabled()}
              variant="contained"
              color="primary"
              onClick={() => handleShare(shareUserData, selectedOption)}
            >
              Share
            </ModalButtonPrimary> */}
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ShareModal;
