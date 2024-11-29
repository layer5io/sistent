import { SelectChangeEvent } from '@mui/material';
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
  handleDelete: (email: string) => void;
  hostURL?: string | null;
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
  const openInNewTab = (url: string) => {
    window.open(url, '_blank', 'noreferrer');
  };

  const theme = useTheme();

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
              />
              <ListItemSecondaryAction>
                {ownerData.id === actorData.id ? (
                  <div>Owner</div>
                ) : (
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDelete(actorData.email)}
                  >
                    <DeleteIcon fill={theme.palette.background.neutral?.default} />
                  </IconButton>
                )}
              </ListItemSecondaryAction>
            </ListItem>
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
  /** Function to handle the sharing of the resource with specified users and options */
  handleShare: (shareUserData: User[], selectedOption: string | undefined) => void;
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
  handleShare,
  hostURL = null,
  handleCopy,

  isVisibilitySelectorDisabled = false,
  fetchSuggestions
}: ShareModalProps): JSX.Element => {
  const theme = useTheme();
  const [openMenu, setMenu] = useState<boolean>(false);
  const [selectedOption, setOption] = useState<string | undefined>(selectedResource?.visibility);
  const [shareUserData, setShareUserData] = useState<User[]>([]);

  const handleDelete = (email: string) => {
    setShareUserData((prevData) => prevData.filter((user) => user.email !== email));
  };

  const handleOptionClick = (event: SelectChangeEvent<unknown>) => {
    const value = event.target.value as string;
    setOption(value);
  };

  const handleMenuClose = () => setMenu(false);

  const isShareDisabled = () => {
    const existingAccessIds = shareUserData.map((user) => user.id);
    const ownerDataId = ownerData?.id;

    if (ownerDataId) {
      existingAccessIds.push(ownerDataId);
    }

    const hasMismatchedUsers = !shareUserData.every((user) => existingAccessIds.includes(user.id));

    return (
      shareUserData.length === existingAccessIds.length &&
      !hasMismatchedUsers &&
      (selectedOption === selectedResource?.visibility ||
        shareUserData.length !== existingAccessIds.length)
    );
  };

  useEffect(() => {
    const fetchActors = async () => {
      const actors = await fetchAccessActors();
      setShareUserData(actors);
    };
    fetchActors();
  }, [fetchAccessActors]);

  useEffect(() => {
    if (selectedResource) {
      setOption(selectedResource?.visibility);
    }
  }, [selectedResource]);

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
            customUsersList={
              <AccessList
                accessList={shareUserData}
                ownerData={ownerData}
                handleDelete={handleDelete}
                hostURL={hostURL}
              />
            }
            fetchSuggestions={fetchSuggestions}
          />
          <CustomListItemText>
            <Typography variant="h6">General Access</Typography>
          </CustomListItemText>
          <CustomDialogContentText>
            <FormControlWrapper size="small">
              <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                <VisibilityIconWrapper>
                  {selectedOption === SHARE_MODE.PUBLIC ? (
                    <PublicIcon
                      width={24}
                      height={24}
                      stroke={theme.palette.mode === 'dark' ? WHITE : BLACK}
                    />
                  ) : (
                    <LockIcon
                      width={24}
                      height={24}
                      stroke={theme.palette.mode === 'dark' ? WHITE : BLACK}
                    />
                  )}
                </VisibilityIconWrapper>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <CustomSelect
                    variant="outlined"
                    defaultValue={selectedOption}
                    labelId="share-menu-select"
                    id="share-menu"
                    open={openMenu}
                    onClose={handleMenuClose}
                    onOpen={() => setMenu(true)}
                    onChange={handleOptionClick}
                    disabled={isVisibilitySelectorDisabled}
                  >
                    {Object.values(SHARE_MODE).map((option) => (
                      <MenuItem key={option} selected={option === selectedOption} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </MenuItem>
                    ))}
                  </CustomSelect>
                  <Typography component="span" variant="body2">
                    {selectedOption === SHARE_MODE.PRIVATE ? options.PRIVATE : options.PUBLIC}
                  </Typography>
                </div>
              </div>
            </FormControlWrapper>
          </CustomDialogContentText>
        </ModalBody>

        <ModalFooter
          variant="filled"
          helpText="You can share your designs or designs for which you have permission to share with other members of your organization and teams, and you can control access permissions."
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
            <ModalButtonPrimary
              disabled={isShareDisabled()}
              variant="contained"
              color="primary"
              onClick={() => handleShare(shareUserData, selectedOption)}
            >
              Share
            </ModalButtonPrimary>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ShareModal;
