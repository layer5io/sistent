/* eslint-disable react-hooks/exhaustive-deps */
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
  Grid,
  TextField,
  Tooltip,
  Typography
} from '../../base';
import { iconSmall } from '../../constants/iconsSizes';
import { CloseIcon, PersonIcon } from '../../icons';

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar_url?: string;
  deleted_at?: { Valid: boolean };
  deleted?: boolean;
}

interface UserSearchFieldProps {
  usersData: User[];
  setUsersData: React.Dispatch<React.SetStateAction<User[]>>;
  label?: string;
  setDisableSave?: (disable: boolean) => void;
  handleNotifyPref?: () => void;
  notifyUpdate?: boolean;
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
  usersData,
  setUsersData,
  label = 'Add User',
  setDisableSave,
  handleNotifyPref,
  notifyUpdate,
  isCreate,
  searchType,
  disabled = false,
  currentUserData,
  searchedUsers = [],
  isUserSearchLoading,
  fetchSearchedUsers,
  usersSearch,
  setUsersSearch
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
      (user: User) =>
        user.id !== currentUserData?.id &&
        !localUsersData.some((selectedUser) => selectedUser.id === user.id) &&
        !user.deleted_at?.Valid
    );

    if (!usersSearch && currentUserData) {
      return [currentUserData, ...filteredResults];
    }

    return filteredResults;
  }, [searchedUsers, currentUserData, usersSearch, hasInitialFocus, localUsersData]);

  const handleDelete = useCallback(
    (idToDelete: string, event: React.MouseEvent) => {
      event.stopPropagation();

      const updatedUsers = localUsersData.filter((user) => user.id !== idToDelete);
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

      const isDuplicate = localUsersData.some((user) => user.id === value.id);
      const isDeleted = value.deleted_at?.Valid === true;

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
        fetchSearchedUsers(encodedValue);
        setError('');
        setOpen(true);
        setHasInitialFocus(false);
      }
    },
    [fetchSearchedUsers]
  );

  return (
    <>
      <Autocomplete
        id="user-search-field"
        style={{ width: '100%' }}
        open={open}
        options={displayOptions}
        getOptionLabel={() => inputValue}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        inputValue={inputValue}
        onChange={handleAdd}
        onInputChange={handleInputChange}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        filterOptions={(options, { inputValue }) => {
          return options.filter((option: User) => {
            const searchStr = inputValue.toLowerCase();
            return (
              option.first_name?.toLowerCase().includes(searchStr) ||
              option.last_name?.toLowerCase().includes(searchStr) ||
              option.email?.toLowerCase().includes(searchStr)
            );
          });
        }}
        loading={isUserSearchLoading}
        disabled={disabled}
        disableClearable
        value={undefined}
        selectOnFocus={false}
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
            InputLabelProps={{
              style: {
                fontFamily: 'inherit'
              }
            }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {isUserSearchLoading ? <CircularProgress color="inherit" size={20} /> : null}
                </React.Fragment>
              )
            }}
          />
        )}
        renderOption={(props, option: User) => (
          <li {...props} id={option.id}>
            <Box sx={{ '& > img': { mr: 2, flexShrink: 0 } }}>
              {' '}
              <Grid container alignItems="center">
                <Grid item>
                  <Box sx={{ color: 'text.secondary', mr: 2 }}>
                    <Avatar alt={option.first_name} src={option.avatar_url}>
                      {option.avatar_url ? '' : <PersonIcon />}
                    </Avatar>
                  </Box>
                </Grid>
                <Grid item xs>
                  {option.deleted ? (
                    <Typography variant="body2" color="text.secondary">
                      {option.email} (deleted)
                    </Typography>
                  ) : (
                    <>
                      <Typography variant="body2">
                        {option.first_name} {option.last_name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {option.email}
                      </Typography>
                    </>
                  )}
                </Grid>
              </Grid>
            </Box>
          </li>
        )}
      />

      {!isCreate && (
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
            key={localUsersData[0].id}
            avatar={
              <Avatar alt={localUsersData[0].first_name} src={localUsersData[0].avatar_url}>
                {!localUsersData[0].avatar_url && localUsersData[0].first_name?.[0]}
              </Avatar>
            }
            label={localUsersData[0].email}
            onDelete={(e) => handleDelete(localUsersData[0].id, e)}
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
              key={user.id}
              avatar={
                <Avatar alt={user.first_name} src={user.avatar_url}>
                  {!user.avatar_url && user.first_name?.[0]}
                </Avatar>
              }
              label={user.email}
              onDelete={(e) => handleDelete(user.id, e)}
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
