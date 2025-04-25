import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { debounce } from 'lodash';
import React, { useState } from 'react';
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
  // setUsersData,
  label,
  setDisableSave,
  // disabled = false,
  customUsersList,
  fetchSuggestions,
  // isSharing,
  shareWithNewUsers,
}: UserSearchFieldProps) => {
  const [error, setError] = useState<string | false>(false);
  const [inputValue, setInputValue] = useState<User | undefined>(undefined);
  const [options, setOptions] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [searchUserLoading, setSearchUserLoading] = useState(false);
  const [showAllUsers, setShowAllUsers] = useState(false);
  const theme = useTheme();
  // console.log("usersData", usersData)
  const [usersToShareWith, setUsersToShareWith] = useState([])
  // console.log("usersShrewith", usersToShareWith,shareWithNewUsers)
  const [isSharing, setIsSharing] = useState(false)

  // const handleDelete = (email: string) => {
  //   setUsersData(usersData.filter((user) => user.email !== email));
  //   if (setDisableSave) {
  //     setDisableSave(false);
  //   }
  // };

  const handleShareWithNewUsers = async () => {

    try {
      setIsSharing(true)
      const result = await shareWithNewUsers(usersToShareWith)
      console.log("sharing result",result)
      if (!result.error) {
        setUsersToShareWith([])
      } else {
        setError(result.error)
      }
    }
    catch(e){
      console.log("error while sharing",e)
    } finally {
      setIsSharing(false)
    }
  }

  const handleAdd = (_event: React.SyntheticEvent<Element, Event>, value: User | null) => {
    if (value) {
      console.log("value", value)

      setUsersToShareWith(value)

      // setUsersData((prevData: User[]): User[] => {
      //   prevData = prevData || [];
      //   const isDuplicate = prevData.some((user) => user.user_id === value.user_id);
      //   const isDeleted = value.deleted_at?.Valid === true;

      //   if (isDuplicate || isDeleted) {
      //     setError(isDuplicate ? 'User already selected' : 'User does not exist');
      //     return prevData;
      //   }

      //   setError(false);
      //   return [...prevData, value];
      // });
      // setInputValue(undefined); // Clear the input value
      // setOptions([]);
      // if (setDisableSave) {
      //   setDisableSave(false);
      // }
    }
  };

  const handleInputChange = debounce(
    async (_event: React.SyntheticEvent<Element, Event>, value: string) => {
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
  );

  // selected options are filtered out
  const filteredOptions = options.filter(option => !usersToShareWith.concat(usersData).find(u => u.id == option.id))
  // console.log("filteredData", filteredOptions)



  /**
   * Clone customUsersList component to pass necessary props
   */
  // const clonedComponent = customUsersList
  //   ? React.cloneElement(customUsersList, {
  //     handleDelete: handleDelete
  //   })
  //   : null;

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
    // onDelete={() => handleDelete(avatarObj.email)}
    // deleteIcon={
    //   <Tooltip title="Remove member">
    //     <CloseIcon style={iconSmall} />
    //   </Tooltip>
    // }
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
          loading={searchUserLoading}
          value={inputValue}
          getOptionLabel={() => ''}
          noOptionsText={searchUserLoading ? 'Loading...' : 'No users found'}
          onChange={handleAdd}
          onInputChange={handleInputChange}
          isOptionEqualToValue={(option, value) => option === value}
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

        <Button variant='contained' color='primary' onClick={handleShareWithNewUsers} disabled={ isSharing || usersToShareWith.length == 0}>
          {isSharing ? <CircularProgress size={24} sx={{
            color:"#fff"
          }}  /> : "Share"}
        </Button>
      </Box>
      {/* customUsersList ? (
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
      ) */}
    </>
  );
};

export default UserShareSearch;
