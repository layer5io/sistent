import { Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { Avatar, Box, Chip, Grid2, TextField, Typography } from '../../base';
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
  disabled?: boolean;
  shareWithNewUsers: (newUsers: User[]) => Promise<{ error: string }>;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  useGetAllUsersQuery: any;
}

const UserShareSearch: React.FC<UserSearchFieldProps> = ({
  usersData,
  disabled = false,
  shareWithNewUsers,
  useGetAllUsersQuery
}: UserSearchFieldProps) => {
  const [error, setError] = useState<string | false>(false);
  const [inputValue, setInputValue] = useState('');
  const [usersToShareWith, setUsersToShareWith] = useState<User[]>([]);
  const [isSharing, setIsSharing] = useState(false);
  const theme = useTheme();
  const [debouncedInput] = useDebounce(inputValue, 300);

  const { data: usersMatchingSearch, isLoading: searchUserLoading } = useGetAllUsersQuery(
    {
      search: debouncedInput,
      page: 0,
      pagesize: 10
    },
    { skip: debouncedInput.trim().length == 0 }
  );

  const suggestions = usersMatchingSearch?.data ?? ([] as User[]);

  // const open = inputValue.trim().length > 0 && suggestions?.length > 0

  const handleShareWithNewUsers = async () => {
    console.log('users to share with', usersToShareWith);
    try {
      setIsSharing(true);
      const result = await shareWithNewUsers(usersToShareWith);
      if (!result.error) {
        setUsersToShareWith([]);
      } else {
        setError(result.error);
      }
    } catch (e) {
      console.log('error while sharing', e);
    } finally {
      setIsSharing(false);
    }
  };

  const handleAdd = (_event: React.SyntheticEvent<Element, Event>, value: User[]) => {
    if (value) {
      setUsersToShareWith(value);
      setInputValue('');
    }
  };

  // Handler for input changes
  const handleInputChange = (event: React.SyntheticEvent, value: string, reason: string) => {
    // Only process actual typing events, not clearing or blurring
    if (reason === 'input') {
      setInputValue(value);
    } else if (reason === 'clear') {
      setInputValue('');
    }
  };

  const filteredOptions = suggestions.filter(
    (option: User) => !usersToShareWith.concat(usersData).find((u) => u.email === option.email)
  );

  const isShareDisabled = disabled || isSharing || usersToShareWith.length === 0;

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
      <Box display="flex" alignItems="center" justifyContent="space-between" gap={1}>
        <Autocomplete
          id="user-search-field"
          sx={{ width: '100%' }}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          filterOptions={(x) => x}
          options={filteredOptions}
          renderTags={(value, getTagProps) =>
            value.map((user, index) => <UserChip avatarObj={user} {...getTagProps({ index })} />)
          }
          disableClearable
          includeInputInList
          filterSelectedOptions
          multiple
          disableListWrap
          disabled={isSharing}
          // open={open}
          inputValue={inputValue}
          loading={searchUserLoading}
          value={usersToShareWith}
          getOptionLabel={(user) => user.email}
          noOptionsText={
            searchUserLoading
              ? 'Loading...'
              : inputValue == ''
                ? 'Search using name or email'
                : 'No users found'
          }
          onChange={handleAdd}
          onInputChange={handleInputChange}
          isOptionEqualToValue={(option, value) => option.email === value.email}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Add Users"
              error={!!error}
              helperText={error}
              fullWidth
              label=""
              disabled={isShareDisabled}
              sx={{
                '& .MuiOutlinedInput-root': {
                  paddingInline: '0.5rem',
                  paddingBlock: '0.1rem'
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
              <Grid2 container alignItems="center">
                <Grid2>
                  <Box sx={{ color: 'text.secondary', mr: 2 }}>
                    <Avatar alt={option.first_name} src={option.avatar_url}>
                      {option.avatar_url ? '' : <PersonIcon />}
                    </Avatar>
                  </Box>
                </Grid2>
                <Grid2 size="grow">
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
                </Grid2>
              </Grid2>
            </Box>
          )}
        />
        <Button
          variant="contained"
          sx={{
            '&.Mui-disabled': {
              color: `${theme.palette.text.secondary} !important`,
              backgroundColor: `${theme.palette.action.disabled}  !important` // This ensures the color stays when disabled
            }
          }}
          onClick={handleShareWithNewUsers}
          disabled={isShareDisabled}
        >
          {isSharing ? (
            <CircularProgress
              size={24}
              sx={{
                color: '#fff'
              }}
            />
          ) : (
            'Share'
          )}
        </Button>
      </Box>
    </>
  );
};

export default UserShareSearch;
