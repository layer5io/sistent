import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { debounce } from 'lodash';
import React, { useCallback, useState } from 'react';
import { Avatar, Box, Chip, Grid, TextField, Tooltip, Typography } from '../../base';
import { iconSmall } from '../../constants/iconsSizes';
import { CloseIcon } from '../../icons/Close';
import { PersonIcon } from '../../icons/Person';
import { useTheme } from '../../theme';
import { Button } from '@mui/material';
import { MutationDefinition } from '@reduxjs/toolkit/query';
import { TypedUseMutationResult } from '@reduxjs/toolkit/dist/query/react';

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
  shareWithNewUsers: (newUsers: User[]) => Promise<{ error: string }>,
  // isSharing : boolean
}

const UserShareSearch: React.FC<UserSearchFieldProps> = ({
  usersData,
  disabled = false,
  fetchSuggestions,
  shareWithNewUsers,
}: UserSearchFieldProps) => {
  const [error, setError] = useState<string | false>(false);
  const [inputValue, setInputValue] = useState("")
  const [options, setOptions] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [searchUserLoading, setSearchUserLoading] = useState(false);
  // const [showAllUsers, setShowAllUsers] = useState(false);
  const theme = useTheme();
  const [usersToShareWith, setUsersToShareWith] = useState([])
  const [isSharing, setIsSharing] = useState(false)


  const handleShareWithNewUsers = async () => {

    try {
      setIsSharing(true)
      const result = await shareWithNewUsers(usersToShareWith)
      console.log("sharing result", result)
      if (!result.error) {
        setUsersToShareWith([])
      } else {
        setError(result.error)
      }
    }
    catch (e) {
      console.log("error while sharing", e)
    } finally {
      setIsSharing(false)
    }
  }

  const handleAdd = (_event: React.SyntheticEvent<Element, Event>, value: User[]) => {
    if (value) {
      console.log("add value", value)
      setUsersToShareWith(value)
      setInputValue("")
      setOpen(false)
    }
  };

  const handleInputChange = useCallback( debounce(
    async ( value: string) => {
      console.log("inputChange",value)
      if (value === '') {
        setOptions([]);
        setOpen(false);
      } else {
        setSearchUserLoading(true);
        const suggestions = await fetchSuggestions(value);
        setOptions(suggestions);
        setSearchUserLoading(false);
        setError(false);
        setOpen(true);
      }
    },
    300
  ),[fetchSuggestions]);

  const filteredOptions = options.filter(option => !usersToShareWith.concat(usersData).find(u => u.id == option.id))

  const isShareDisabled = disabled || isSharing || usersToShareWith.length == 0

  const UserChip = ({ avatarObj, ...props }: { avatarObj: User }) => (
    <Chip
      key={avatarObj.user_id}
      avatar={
        <Avatar alt={avatarObj.first_name} src={avatarObj.avatar_url}>
          {avatarObj.avatar_url ? '' : avatarObj.first_name?.charAt(0)}
        </Avatar>
      }
      label={avatarObj.email}
      size="small"
      {...props}
    />
  );

  return (
    <>
      <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} gap={1}>
        <Autocomplete
          id="user-search-field"
          sx={{ width: '100%' }}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          filterOptions={(x) => x}
          options={filteredOptions}
          renderTags={(value, getTagProps) => value.map((user, index) => <UserChip avatarObj={user} {...getTagProps({ index })} />)}
          disableClearable
          includeInputInList
          filterSelectedOptions
          multiple
          disableListWrap
          disabled={isSharing}
          open={open}
          inputValue={inputValue}
          loading={searchUserLoading}
          value={usersToShareWith}
          getOptionLabel={(user) => user.email}
          noOptionsText={searchUserLoading ? 'Loading...' : 'No users found'}
          onChange={handleAdd}
          onInputChange={(event,value) => {
            console.log("onChange",value)
            setInputValue(value)
            handleInputChange(value)
          }}

          isOptionEqualToValue={(option, value) => option.id === value.id}
          // clearOnBlur

          renderInput={(params) => (
            <TextField
              {...params}
              // label={label || 'Add User'}
              placeholder='Add Users'
              error={!!error}
              helperText={error}
              fullWidth
              label=""
              disabled={isShareDisabled}

              sx={{
                "& .MuiOutlinedInput-root": {
                  paddingInline: "0.5rem",
                  paddingBlock: "0.1rem"
                }
              }}
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

        <Button variant='contained' color='primary'
          sx={{
            backgroundColor: isShareDisabled ? theme.palette.action.disabled : theme.palette.action.active
          }}
          onClick={handleShareWithNewUsers} disabled={isShareDisabled}>
          {isSharing ? <CircularProgress size={24} sx={{
            color: "#fff"
          }} /> : "Share"}
        </Button>
      </Box>
    </>
  );
};

export default UserShareSearch;
