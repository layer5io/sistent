import { Autocomplete, AutocompleteRenderInputParams } from '@mui/material';
import { debounce } from 'lodash';
import React, { SyntheticEvent, useMemo, useState } from 'react';
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
  user_id: string;
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
  org_id?: string;
  currentUserData: User;
  searchedUsers: User[];
  isUserSearchLoading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchSearchedUsers: any;
  usersSearch: string;
  setUsersSearch: React.Dispatch<React.SetStateAction<string>>;
}

const UserSearchField: React.FC<UserSearchFieldProps> = ({
  usersData,
  setUsersData,
  label,
  setDisableSave,
  handleNotifyPref,
  notifyUpdate,
  isCreate,
  searchType,
  disabled = false,
  currentUserData,
  searchedUsers,
  isUserSearchLoading,
  fetchSearchedUsers,
  usersSearch,
  setUsersSearch
}) => {
  const [error, setError] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [hasInitialFocus, setHasInitialFocus] = useState(true);
  // Combine current user with search results
  const displayOptions = useMemo(() => {
    if (!searchedUsers) return [];

    // Filter out current user from search results
    const filteredResults = searchedUsers.filter(
      (user: User) => user.user_id !== currentUserData?.user_id
    );
    // Show only current user on initial focus
    if (hasInitialFocus && !usersSearch && currentUserData) {
      return [currentUserData];
    }
    // If there's no search query, add current user at the top
    if (!usersSearch && currentUserData) {
      return [currentUserData, ...filteredResults];
    }
    return filteredResults;
  }, [searchedUsers, currentUserData, usersSearch, hasInitialFocus]);

  const fetchSuggestions = debounce((value: string) => {
    setHasInitialFocus(false);
    setUsersSearch(value);
    fetchSearchedUsers();
  }, 300);

  const handleDelete = (email: string) => {
    const usersDataSet = new Set(usersData);
    usersDataSet.forEach((avatarObj: User) => {
      if (avatarObj.email === email) {
        usersDataSet.delete(avatarObj);
      }
    });
    setUsersData(Array.from(usersDataSet));
    if (setDisableSave) {
      setDisableSave(false);
    }
  };

  const handleAdd = (event: SyntheticEvent<Element, Event>, value: User) => {
    if (!value) return;

    setUsersData((prevData: User[]) => {
      prevData = prevData || [];
      const isDuplicate = prevData?.some((user) => user.user_id === value.user_id);
      const isDeleted = value.deleted_at?.Valid === true;

      if (isDuplicate || isDeleted) {
        setError(isDuplicate ? 'User already selected' : 'User does not exist');
        return prevData;
      }

      setError('');
      return [...prevData, value];
    });

    // Reset UI state after updating users
    setInputValue('');
    setOpen(false);
    setUsersSearch('');

    if (setDisableSave) {
      setDisableSave(false);
    }
  };

  const handleInputChange = (event: SyntheticEvent<Element, Event>, value: string) => {
    if (value === '') {
      setOpen(true);
      setUsersSearch('');
      setHasInitialFocus(true);
    } else {
      const encodedValue = encodeURIComponent(value);
      fetchSuggestions(encodedValue);
      setError('');
      setOpen(true);
    }
  };

  const handleFocus = () => {
    setOpen(true);
    if (!usersSearch) {
      setHasInitialFocus(true);
    }
  };

  const handleBlur = () => {
    setOpen(false);
    setUsersSearch('');
    // Reset initial focus state when field is blurred
    setHasInitialFocus(true);
  };

  return (
    <>
      <Autocomplete
        id="user-search-field"
        style={{ width: 'auto' }}
        filterOptions={(x: User) => x}
        options={displayOptions}
        disableClearable
        includeInputInList
        filterSelectedOptions
        disableListWrap
        disabled={disabled}
        open={open}
        loading={isUserSearchLoading}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        value={inputValue}
        getOptionLabel={() => ''}
        noOptionsText={isUserSearchLoading ? 'Loading...' : 'No users found'}
        onChange={handleAdd}
        onInputChange={handleInputChange}
        isOptionEqualToValue={(option: User, value: User) => option.user_id === value.user_id}
        clearOnBlur
        onFocus={handleFocus}
        onBlur={handleBlur}
        renderInput={(params: AutocompleteRenderInputParams) => (
          <TextField
            {...params}
            label={label || 'Add User'}
            error={!!error}
            helperText={error}
            fullWidth
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
          <li {...props}>
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
          </li>
        )}
      />

      {/* TODO: Remove dependancy of this checkbox in this component, it should be defined on parent component. We should keep this component reusable and should not add checkbox specific to some component */}
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
        {!showAllUsers && usersData?.length > 0 && (
          <Chip
            key={usersData[usersData.length - 1]?.user_id}
            avatar={
              <Avatar
                alt={usersData[usersData.length - 1]?.first_name}
                src={usersData[usersData.length - 1]?.avatar_url}
              >
                {usersData[usersData.length - 1]?.avatar_url
                  ? ''
                  : usersData[usersData.length - 1]?.first_name?.charAt(0)}
              </Avatar>
            }
            label={usersData[usersData.length - 1]?.email}
            size="small"
            onDelete={() => handleDelete(usersData[usersData.length - 1]?.email)}
            deleteIcon={
              <Tooltip title="Remove member">
                <CloseIcon style={iconSmall} />
              </Tooltip>
            }
          />
        )}
        {showAllUsers &&
          usersData?.map((avatarObj: User) => (
            <Chip
              key={avatarObj.user_id}
              avatar={
                <Avatar alt={avatarObj.first_name} src={avatarObj.avatar_url}>
                  {avatarObj.avatar_url ? '' : avatarObj.first_name?.charAt(0)}
                </Avatar>
              }
              label={avatarObj.email}
              size="small"
              onDelete={() => handleDelete(avatarObj.email)}
              deleteIcon={
                <Tooltip title="Remove member">
                  <CloseIcon style={iconSmall} />
                </Tooltip>
              }
            />
          ))}
        {usersData?.length > 1 && (
          <Typography
            onClick={() => setShowAllUsers(!showAllUsers)}
            sx={{
              cursor: 'pointer',
              color: 'white',
              fontWeight: '600',
              '&:hover': {
                color: 'black'
              }
            }}
          >
            {showAllUsers ? '(hide)' : `(+${usersData.length - 1})`}
          </Typography>
        )}
      </Box>
    </>
  );
};

export default UserSearchField;
