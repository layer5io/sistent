import { Autocomplete } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Avatar,
  Box,
  Checkbox,
  Chip,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Grid2,
  TextField,
  Tooltip,
  Typography
} from '../../base';

import { iconSmall } from '../../constants/iconsSizes';
import { CloseIcon, PersonIcon } from '../../icons';
import { isSoftDeleted } from '../../utils/nullTime';
import {
  User as BaseUser,
  getUserContactLabel,
  getUserDisplayName,
  getUserIdentifier,
  getUserLabel,
  isSameUser
} from '../../utils/user';

interface User extends BaseUser {
  deleted?: boolean;
}

interface UserSearchFieldProps {
  usersData: User[];
  setUsersData: React.Dispatch<React.SetStateAction<User[]>>;
  label?: string;
  setDisableSave?: (disable: boolean) => void;
  handleNotifyPref?: () => void;
  notifyUpdate?: boolean;
  showNotifyCheckbox?: boolean;
  isCreate?: boolean;
  searchType?: string;
  disabled?: boolean;
  currentUserData: User | null;
  searchedUsers: User[];
  isUserSearchLoading: boolean;
  fetchSearchedUsers: (value: string) => void;
  usersSearch: string;
  setUsersSearch: React.Dispatch<React.SetStateAction<string>>;
}

const UserSearchField: React.FC<UserSearchFieldProps> = ({
  usersData, //updatedOrgUsers
  setUsersData, //setupdatedOrgUsers
  label = 'Add User',
  setDisableSave,
  handleNotifyPref,
  notifyUpdate,
  showNotifyCheckbox = true,
  isCreate,
  searchType,
  disabled = false,
  currentUserData, //current logged in user data
  searchedUsers = [], //users result by api
  isUserSearchLoading,
  fetchSearchedUsers, //function to perform search
  usersSearch, //username value
  setUsersSearch //state to modify username value
}) => {
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [hasInitialFocus, setHasInitialFocus] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [localUsersData, setLocalUsersData] = useState<User[]>(usersData || []);
  useEffect(() => {
    setLocalUsersData(usersData || []);
  }, [usersData]);

  const displayOptions = useMemo(() => {
    if (hasInitialFocus && !usersSearch && currentUserData) {
      return [currentUserData];
    }

    const filteredResults = searchedUsers.filter(
      (user: User) => !isSameUser(user, currentUserData)
    );

    if (!usersSearch && currentUserData) {
      return [currentUserData, ...filteredResults];
    }

    return filteredResults;
  }, [searchedUsers, currentUserData, usersSearch, hasInitialFocus]);

  const handleDelete = useCallback(
    (idToDelete: string, event: React.MouseEvent) => {
      event.stopPropagation();

      const updatedUsers = localUsersData.filter((user) => getUserIdentifier(user) !== idToDelete);
      setLocalUsersData(updatedUsers);
      setUsersData(updatedUsers);

      if (setDisableSave) {
        setDisableSave(false);
      }
    },
    [localUsersData, setUsersData, setDisableSave, fetchSearchedUsers, inputValue]
  );

  const handleAdd = useCallback(
    (event: React.SyntheticEvent<Element, Event>, value: User | null) => {
      if (!value) return;

      const isDuplicate = localUsersData.some((user) => isSameUser(user, value));
      const isDeleted = isSoftDeleted(value.deletedAt);

      if (isDuplicate || isDeleted) {
        setError(isDuplicate ? 'User already selected' : 'User does not exist');
        return;
      }
      setInputValue('');
      setUsersSearch('');
      setError('');
      setOpen(false);

      setLocalUsersData((prev) => [...prev, value]);
      setUsersData((prev) => [...prev, value]);

      if (setDisableSave) {
        setDisableSave(false);
      }
    },
    [localUsersData, setUsersData, setDisableSave, setUsersSearch]
  );

  const handleInputChange = useCallback(
    (event: React.SyntheticEvent<Element, Event>, newValue: string) => {
      setInputValue(newValue);

      if (newValue === '') {
        setOpen(true);
        setUsersSearch('');
        setHasInitialFocus(true);
      } else {
        const encodedValue = encodeURIComponent(newValue);
        setUsersSearch(newValue);
        fetchSearchedUsers(encodedValue);
        setError('');
        setOpen(true);
        setHasInitialFocus(false);
      }
    },
    [fetchSearchedUsers, setUsersSearch]
  );
  return (
    <>
      <Autocomplete
        id="user-search-field"
        style={{ width: '100%' }}
        open={open}
        options={displayOptions}
        getOptionLabel={() => ''}
        isOptionEqualToValue={isSameUser}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        inputValue={inputValue}
        onChange={handleAdd}
        onInputChange={handleInputChange}
        filterOptions={(options) => options}
        loading={isUserSearchLoading}
        disabled={disabled}
        disableClearable
        freeSolo={false}
        value={undefined}
        selectOnFocus={true}
        blurOnSelect={true}
        clearOnBlur={true}
        popupIcon={null}
        forcePopupIcon={false}
        noOptionsText={isUserSearchLoading ? 'Loading...' : 'No users found'}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            error={!!error}
            helperText={error}
            slotProps={{
              ...params.slotProps,
              inputLabel: {
                ...params.slotProps?.inputLabel,
                style: {
                  fontFamily: 'inherit'
                }
              },
              input: {
                ...params.slotProps?.input,
                endAdornment: (
                  <React.Fragment>
                    {isUserSearchLoading ? <CircularProgress color="inherit" size={20} /> : null}
                  </React.Fragment>
                )
              }
            }}
          />
        )}
        renderOption={(props, option: User) => {
          const displayName = getUserDisplayName(option);
          const contactLabel = getUserContactLabel(option);
          const isDeleted = option.deleted || isSoftDeleted(option.deletedAt);
          return (
            // Spread MUI's props untouched: Autocomplete's generated option id
            // wires up aria-activedescendant and keyboard navigation.
            <li {...props}>
              <Box sx={{ '& > img': { mr: 2, flexShrink: 0 } }}>
                {' '}
                <Grid2 container sx={{ alignItems: 'center' }}>
                  <Grid2>
                    <Box sx={{ color: 'text.secondary', mr: 2 }}>
                      <Avatar alt={displayName} src={option.avatarUrl}>
                        {option.avatarUrl ? '' : <PersonIcon />}
                      </Avatar>
                    </Box>
                  </Grid2>
                  <Grid2 size="grow">
                    {isDeleted ? (
                      <Typography variant="body2" color="text.secondary">
                        {getUserLabel(option)} (deleted)
                      </Typography>
                    ) : (
                      <>
                        <Typography variant="body2">{displayName}</Typography>
                        {contactLabel && contactLabel !== displayName && (
                          <Typography variant="body2" color="text.secondary">
                            {contactLabel}
                          </Typography>
                        )}
                      </>
                    )}
                  </Grid2>
                </Grid2>
              </Box>
            </li>
          );
        }}
      />
      {showNotifyCheckbox && !isCreate && handleNotifyPref && (
        <FormGroup row={true}>
          <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={notifyUpdate}
                  onChange={handleNotifyPref}
                  name="notify"
                  color="primary"
                />
              }
              label={`Notify ${searchType} of membership change`}
            />
          </div>
        </FormGroup>
      )}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 0.5,
          mt: usersData?.length > 0 ? '0.5rem' : ''
        }}
      >
        {!showAllUsers && localUsersData?.[0] && (
          <Chip
            key={getUserIdentifier(localUsersData[0])}
            avatar={
              <Avatar alt={getUserDisplayName(localUsersData[0])} src={localUsersData[0].avatarUrl}>
                {!localUsersData[0].avatarUrl && getUserDisplayName(localUsersData[0]).charAt(0)}
              </Avatar>
            }
            label={getUserLabel(localUsersData[0])}
            onDelete={(e) => handleDelete(getUserIdentifier(localUsersData[0]), e)}
            deleteIcon={
              <Tooltip title="Remove user">
                <CloseIcon style={iconSmall} />
              </Tooltip>
            }
            size="small"
          />
        )}

        {showAllUsers &&
          localUsersData?.map((user) => (
            <Chip
              key={getUserIdentifier(user)}
              avatar={
                <Avatar alt={getUserDisplayName(user)} src={user.avatarUrl}>
                  {!user.avatarUrl && getUserDisplayName(user).charAt(0)}
                </Avatar>
              }
              label={getUserLabel(user)}
              onDelete={(e) => handleDelete(getUserIdentifier(user), e)}
              deleteIcon={
                <Tooltip title="Remove user">
                  <CloseIcon style={iconSmall} />
                </Tooltip>
              }
              size="small"
            />
          ))}

        {localUsersData?.length > 1 && (
          <Typography
            onClick={() => setShowAllUsers(!showAllUsers)}
            sx={{
              cursor: 'pointer'
            }}
          >
            {showAllUsers ? '(hide)' : `(+${localUsersData.length - 1})`}
          </Typography>
        )}
      </Box>
    </>
  );
};

export default UserSearchField;
