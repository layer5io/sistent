/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
import { Autocomplete, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { debounce } from 'lodash';
import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { Chip, CircularProgress, TextField, Tooltip } from '../../../base';
import { iconSmall } from '../../../constants/iconsSizes';
import { CloseIcon } from '../../../icons';

interface Team {
  id: string;
  ID: string;
  name: string;
  deleted_at: {
    Valid: boolean;
  };
}

interface TeamSearchFieldProps {
  teamsData: Team[];
  setTeamsData: Dispatch<SetStateAction<Team[]>>;
  label?: string;
  orgID: string;
  disabled?: boolean;
  useLazyGetTeamsQuery: any;
  useNotificationHandlers: () => {
    handleError: (message: string) => void;
  };
}

interface TeamListContainerProps {
  hasTeams: boolean;
}

const TeamListContainer = styled(Box)<TeamListContainerProps>(({ theme, hasTeams }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(0.5),
  marginTop: hasTeams ? theme.spacing(1.7) : 0
}));

const ToggleButton = styled(Typography)(({ theme }) => ({
  cursor: 'pointer',
  marginLeft: theme.spacing(0.5),
  color: theme.palette.text.primary,
  fontWeight: 600,
  '&:hover': {
    color: theme.palette.primary.main
  }
}));

const TeamSearchField: React.FC<TeamSearchFieldProps> = ({
  teamsData,
  setTeamsData,
  label,
  orgID,
  disabled = false,
  useLazyGetTeamsQuery,
  useNotificationHandlers
}) => {
  const [error, setError] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [options, setOptions] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showAllTeams, setShowAllTeams] = useState<boolean>(false);
  const [getTeams] = useLazyGetTeamsQuery();
  const { handleError } = useNotificationHandlers();

  const fetchSuggestions = useMemo(
    () =>
      debounce((searchValue: string) => {
        if (!orgID) return;

        setIsLoading(true);
        getTeams({ orgId: orgID, search: searchValue }, true)
          .unwrap()
          .then((response: any) => {
            setOptions(typeof response === 'string' ? [] : response?.teams);
            setIsLoading(false);
          })
          .catch((err: any) => {
            handleError(err?.message);
            setIsLoading(false);
          });
      }, 300),
    [orgID, getTeams, handleError]
  );

  const handleDelete = (teamId: string): void => {
    setTeamsData(teamsData.filter((team) => team.id !== teamId));
  };

  const handleAdd = (_: string, value: Team): void => {
    setTeamsData((prevData: Team[]) => {
      const isDuplicate = prevData.some((team) => team.id === value.id);
      if (isDuplicate) {
        setError(true);
        return prevData;
      }
      setError(false);
      return [...prevData, value];
    });
    setInputValue('');
  };

  const handleInputChange = (_: string, value: string): void => {
    if (typeof value === 'string') {
      setError(false);
      fetchSuggestions(value);
    }
  };

  useEffect(() => {
    fetchSuggestions('');
  }, [fetchSuggestions, orgID]);

  const toggleShowAllTeams = (): void => {
    setShowAllTeams((prev) => !prev);
  };

  return (
    <>
      <Autocomplete
        disabled={disabled}
        disablePortal
        id="team-search-field"
        sx={{ width: 'auto' }}
        disableClearable
        loading={isLoading}
        value={inputValue}
        filterSelectedOptions
        noOptionsText={isLoading ? 'Loading...' : 'No team found'}
        onChange={handleAdd}
        onInputChange={handleInputChange}
        options={options}
        filterOptions={(x) => x}
        getOptionLabel={() => ''}
        clearOnBlur
        isOptionEqualToValue={(option, value) => option === value}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label || 'Add Team'}
            error={error}
            helperText={error ? 'Team Already Selected' : ''}
            fullWidth
            InputProps={{
              ...params.InputProps,
              endAdornment: isLoading ? <CircularProgress color="inherit" size={20} /> : null
            }}
          />
        )}
        renderOption={(props, option) => {
          if (!option?.deleted_at.Valid) {
            return (
              <Box
                component="li"
                sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                key={option.ID}
                {...props}
              >
                <Typography>{option.name}</Typography>
              </Box>
            );
          }
          return null;
        }}
      />
      <TeamListContainer hasTeams={teamsData.length > 0}>
        {teamsData.length > 0 && (
          <>
            {showAllTeams ? (
              <>
                {teamsData.map((team) => (
                  <Chip
                    key={team.ID}
                    label={team.name}
                    size="small"
                    onDelete={() => handleDelete(team.id)}
                    deleteIcon={
                      <Tooltip title="Remove Team">
                        <CloseIcon style={iconSmall} />
                      </Tooltip>
                    }
                  />
                ))}
                <ToggleButton onClick={toggleShowAllTeams}>Hide</ToggleButton>
              </>
            ) : (
              <Chip
                label={teamsData[teamsData.length - 1].name}
                size="small"
                onDelete={() => handleDelete(teamsData[teamsData.length - 1].id)}
                deleteIcon={
                  <Tooltip title="Remove Team">
                    <CloseIcon style={iconSmall} />
                  </Tooltip>
                }
              />
            )}
            {!showAllTeams && teamsData.length > 1 && (
              <ToggleButton onClick={toggleShowAllTeams}>(+{teamsData.length - 1})</ToggleButton>
            )}
          </>
        )}
      </TeamListContainer>
    </>
  );
};

export default TeamSearchField;
