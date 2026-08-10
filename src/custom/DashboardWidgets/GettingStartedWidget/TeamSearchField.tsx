/* eslint-disable @typescript-eslint/no-explicit-any */
import { Autocomplete, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { debounce } from 'lodash';
import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { Chip, CircularProgress, TextField, Tooltip } from '../../../base';
import { iconSmall } from '../../../constants/iconsSizes';
import { CloseIcon } from '../../../icons';
import { DeletedAt, isSoftDeleted } from '../../../utils/nullTime';
import { CanonicalTeam } from '../../Workspaces/types';

/**
 * The team-picker projection: the three fields this field reads off a team
 * record served by `getTeams`, derived from the canonical v1beta2 construct so
 * that a rename upstream fails here rather than silently rendering `undefined`.
 *
 * One deliberate widening: `deletedAt` is {@link DeletedAt} rather than the
 * canonical `string | undefined`, because some provider endpoints still emit
 * the legacy Go `sql.NullTime` `{ Valid, Time }` object. See
 * `src/utils/nullTime.ts` - this field's team search is the crash that
 * documents.
 *
 * This type previously also declared `ID`, read by the option and chip `key`
 * props. It has never existed on the wire: meshery-cloud aliases its `Team`
 * straight to the canonical `team.Team`, whose identity field is `id`. The
 * same phantom-identity defect the bulk-delete button carried through
 * `teamId` / `team_name`; see {@link CanonicalTeam}'s consumer in
 * `src/custom/Workspaces/types.ts`.
 */
export type Team = Pick<CanonicalTeam, 'id' | 'name'> & {
  deletedAt?: DeletedAt;
};

export interface TeamSearchFieldProps {
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
            setOptions(Array.isArray(response?.teams) ? response.teams : []);
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

  const handleAdd = (_: React.SyntheticEvent, value: Team): void => {
    setTeamsData((prevData: Team[]) => {
      const isDuplicate = prevData.some((team) => team.id === value.id);
      if (isDuplicate) {
        setError(true);
        return prevData;
      }
      setError(false);
      return [...prevData, value];
    });
  };

  const handleInputChange = (_: React.SyntheticEvent, value: string): void => {
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
        // MUI applies this through `isOptionEqualToValue` below, which is
        // reference equality here and so load-bearing: whether this filter hides
        // anything depends on whether a refetch has replaced `options` with new
        // objects. Do not rely on it - the duplicate guard in `handleAdd` is
        // what actually prevents a re-pick. Analysis and the fix:
        // https://github.com/layer5io/sistent/issues/1784.
        filterSelectedOptions
        noOptionsText={isLoading ? 'Loading...' : 'No team found'}
        onChange={handleAdd}
        onInputChange={handleInputChange}
        options={options}
        filterOptions={(x) => x}
        getOptionLabel={() => ''}
        getOptionKey={(option: Team) => option.id}
        clearOnBlur
        isOptionEqualToValue={(option, value) => option === value}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label || 'Add Team'}
            error={error}
            helperText={error ? 'Team Already Selected' : ''}
            fullWidth
            slotProps={{
              ...params.slotProps,
              input: {
                ...params.slotProps?.input,
                endAdornment: isLoading ? <CircularProgress color="inherit" size={20} /> : null
              }
            }}
          />
        )}
        renderOption={(props, option) => {
          if (!isSoftDeleted(option.deletedAt)) {
            const { key, ...optionProps } = props;
            return (
              <Box
                component="li"
                sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                key={key}
                {...optionProps}
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
                    key={team.id}
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
