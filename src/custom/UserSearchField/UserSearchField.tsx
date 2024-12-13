import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useState } from 'react';
import { Avatar, Box, Chip, Grid, TextField, Tooltip, Typography } from '../../base';
import { iconSmall } from '../../constants/iconsSizes';
import { CloseIcon } from '../../icons/Close';
import { PersonIcon } from '../../icons/Person';
import { useTheme } from '../../theme';

interface User {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar_url?: string;
  deleted_at?: { Valid: boolean };
}

interface UserSearchFieldProps {
  // Array of user objects currently selected.
  usersData: User[];
  // Function to update the selected users data.
  setUsersData: React.Dispatch<React.SetStateAction<User[]>>;
  // Label for the text field.
  label?: string;
  // Function to enable or disable the save button.
  setDisableSave?: (disabled: boolean) => void;
  // Type of search being performed, e.g., 'user', 'admin'.
  searchType?: string;
  // Boolean indicating whether the search field is disabled.
  disabled?: boolean;
  // Custom component to change rendering style of users list, if not given
  // by default it will show list with avatar and email of selected users
  customUsersList?: JSX.Element;
  /**
   * Function to fetch user suggestions based on the input value.
   * @param {string} value - The input value for which suggestions are to be fetched.
   * @returns {Promise<User[]>} A promise that resolves to an array of user suggestions.
   */
  fetchSuggestions: (value: string) => Promise<User[]>;
}

const UserShareSearch: React.FC<UserSearchFieldProps> = ({
  usersData,
  setUsersData,
  label,
  setDisableSave,
  disabled = false,
  customUsersList,
  fetchSuggestions
}: UserSearchFieldProps) => {
  const [error, setError] = useState<string | false>(false);
  const [inputValue, setInputValue] = useState<User | undefined>(undefined);
  const [options, setOptions] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [searchUserLoading, setSearchUserLoading] = useState(false);
  const [showAllUsers, setShowAllUsers] = useState(false);
  const theme = useTheme();

  const handleDelete = (email: string) => {
    setUsersData(usersData.filter((user) => user.email !== email));
    if (setDisableSave) {
      setDisableSave(false);
    }
  };

  const handleAdd = (_event: React.SyntheticEvent<Element, Event>, value: User | null) => {
    if (value) {
      setUsersData((prevData: User[]): User[] => {
        prevData = prevData || [];
        const isDuplicate = prevData.some((user) => user.user_id === value.user_id);
        const isDeleted = value.deleted_at?.Valid === true;

        if (isDuplicate || isDeleted) {
          setError(isDuplicate ? 'User already selected' : 'User does not exist');
          return prevData;
        }

        setError(false);
        return [...prevData, value];
      });
      setInputValue(undefined); // Clear the input value
      setOptions([]);
      if (setDisableSave) {
        setDisableSave(false);
      }
    }
  };

  const handleInputChange = (_event: React.SyntheticEvent<Element, Event>, value: string) => {
    if (value === '') {
      setOptions([]);
      setOpen(false);
    } else {
      setSearchUserLoading(true);
      fetchSuggestions(value).then((filteredData) => {
        setOptions(filteredData);
        setSearchUserLoading(false);
      });
      setError(false);
      setOpen(true);
    }
  };

  /**
   * Clone customUsersList component to pass necessary props
   */
  const clonedComponent = customUsersList
    ? React.cloneElement(customUsersList, {
        handleDelete: handleDelete
      })
    : null;

  const renderChip = (avatarObj: User) => (
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
  );

  return (
    <>
      <Autocomplete
        id="user-search-field"
        sx={{ width: 'auto' }}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        filterOptions={(x) => x}
        options={options}
        disableClearable
        includeInputInList
        filterSelectedOptions
        disableListWrap
        disabled={disabled}
        open={open}
        loading={searchUserLoading}
        value={inputValue}
        getOptionLabel={() => ''}
        noOptionsText={searchUserLoading ? 'Loading...' : 'No users found'}
        onChange={handleAdd}
        onInputChange={handleInputChange}
        isOptionEqualToValue={(option, value) => option === value}
        clearOnBlur
        renderInput={(params) => (
          <TextField
            {...params}
            label={label || 'Add User'}
            error={!!error}
            helperText={error}
            fullWidth
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>{searchUserLoading ? <CircularProgress color="inherit" size={20} /> : null}</>
              )
            }}
          />
        )}
        renderOption={(props: React.HTMLAttributes<HTMLLIElement>, option) => (
          // @ts-expect-error Props need to be passed to BOX component to make sure styles getting updated
          <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
            <Grid container alignItems="center">
              <Grid item>
                <Box sx={{ color: 'text.secondary', mr: 2 }}>
                  <Avatar alt={option.first_name} src={option.avatar_url}>
                    {option.avatar_url ? '' : <PersonIcon />}
                  </Avatar>
                </Box>
              </Grid>
              <Grid item xs>
                {option.deleted_at?.Valid ? (
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
        )}
      />

      {customUsersList ? (
        clonedComponent
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 0.5,
            mt: usersData?.length > 0 ? '0.5rem' : ''
          }}
        >
          {showAllUsers
            ? usersData?.map((avatarObj) => renderChip(avatarObj))
            : usersData?.length > 0 && renderChip(usersData[usersData.length - 1])}
          {usersData?.length > 1 && (
            <Typography
              onClick={() => setShowAllUsers(!showAllUsers)}
              sx={{
                cursor: 'pointer',
                color: theme.palette.text.default,
                fontWeight: '600',
                '&:hover': {
                  color: theme.palette.text.brand
                }
              }}
            >
              {showAllUsers ? '(hide)' : `(+${usersData.length - 1})`}
            </Typography>
          )}
        </Box>
      )}
    </>
  );
};

export default UserShareSearch;
