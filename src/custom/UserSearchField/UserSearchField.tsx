import { Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { Avatar, Box, Chip, Grid2, TextField, Typography } from '../../base';
import { PersonIcon } from '../../icons/Person';
import { useTheme } from '../../theme';
import { isSoftDeleted } from '../../utils/nullTime';
import {
  getUserContactLabel,
  getUserDisplayName,
  getUserLabel,
  isSameUser,
  User
} from '../../utils/user';

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
    try {
      setIsSharing(true);
      const result = await shareWithNewUsers(usersToShareWith);
      if (!result.error) {
        setUsersToShareWith([]);
      } else {
        setError(result.error);
      }
    } catch (e) {
      console.error('error while sharing', e);
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

  // `?? []` tolerates JS consumers of the published package passing a
  // nullish usersData, mirroring the nullish-currentUser tolerance in
  // utils/permissions.ts.
  const alreadySelectedUsers = usersToShareWith.concat(usersData ?? []);
  const filteredOptions = suggestions.filter(
    (option: User) => !alreadySelectedUsers.some((u) => isSameUser(u, option))
  );

  const isShareDisabled = disabled || isSharing || usersToShareWith.length === 0;

  const UserChip = ({ avatarObj, ...props }: { avatarObj: User }) => (
    <Chip
      key={getUserLabel(avatarObj)}
      avatar={
        <Avatar alt={getUserDisplayName(avatarObj)} src={avatarObj.avatarUrl}>
          {avatarObj.avatarUrl ? '' : getUserDisplayName(avatarObj).charAt(0)}
        </Avatar>
      }
      label={getUserLabel(avatarObj)}
      size="small"
      {...props}
    />
  );

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
        <Autocomplete
          id="user-search-field"
          sx={{ width: '100%' }}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          filterOptions={(x) => x}
          options={filteredOptions}
          renderValue={(value, getItemProps) =>
            value.map((user, index) => <UserChip avatarObj={user} {...getItemProps({ index })} />)
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
          getOptionLabel={(user) => getUserLabel(user)}
          noOptionsText={
            searchUserLoading
              ? 'Loading...'
              : inputValue == ''
                ? 'Search using name or email'
                : 'No users found'
          }
          onChange={handleAdd}
          onInputChange={handleInputChange}
          isOptionEqualToValue={isSameUser}
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
              slotProps={{
                ...params.slotProps,
                input: {
                  ...params.slotProps?.input,
                  endAdornment: (
                    <>{searchUserLoading ? <CircularProgress color="inherit" size={20} /> : null}</>
                  )
                }
              }}
            />
          )}
          renderOption={(props: React.HTMLAttributes<HTMLLIElement>, option) => {
            const displayName = getUserDisplayName(option);
            const contactLabel = getUserContactLabel(option);
            return (
              // @ts-expect-error Props need to be passed to BOX component to make sure styles getting updated
              <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                <Grid2 container sx={{ alignItems: 'center' }}>
                  <Grid2>
                    <Box sx={{ color: 'text.secondary', mr: 2 }}>
                      <Avatar alt={displayName} src={option.avatarUrl}>
                        {option.avatarUrl ? '' : <PersonIcon />}
                      </Avatar>
                    </Box>
                  </Grid2>
                  <Grid2 size="grow">
                    {isSoftDeleted(option.deletedAt) ? (
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
            );
          }}
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
