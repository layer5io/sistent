import { Autocomplete } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { Box, Chip, CircularProgress, Grid, TextField, Tooltip, Typography } from '../../base';
import { iconLarge, iconSmall } from '../../constants/iconsSizes';
import { CloseIcon, OrgIcon } from '../../icons';

interface Option {
  id: string;
  name: string;
}

interface InputSearchFieldProps {
  data: Option[];
  setFilterData: (data: Option[]) => void;
  label?: string;
  fetchSuggestions: (value: string) => void;
  isLoading: boolean;
  type: string;
  disabled?: boolean;
  selectedData: Option[];
  searchValue: string;
  setSearchValue: (value: string) => void;
  iconComponent?: React.ReactElement;
}

const InputSearchField: React.FC<InputSearchFieldProps> = ({
  data,
  label,
  fetchSuggestions,
  setFilterData,
  isLoading,
  type,
  disabled,
  selectedData,
  searchValue,
  setSearchValue,
  iconComponent = (<OrgIcon {...iconLarge} />) as React.ReactElement
}) => {
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [showAllItems, setShowAllItems] = useState(false);
  const [localSelectedData, setLocalSelectedData] = useState<Option[]>(selectedData);

  // Sync local state with prop changes
  useEffect(() => {
    setLocalSelectedData(selectedData);
  }, [selectedData]);

  const handleDelete = useCallback(
    (id: string) => {
      const newData = localSelectedData.filter((item) => item.id !== id);
      setLocalSelectedData(newData);
      setFilterData(newData);
    },
    [localSelectedData, setFilterData]
  );

  const handleAdd = useCallback(
    (_event: React.SyntheticEvent, value: Option | null) => {
      if (!value) return;

      // Check for duplicates
      const isDuplicate = localSelectedData.some((item) => item.id === value.id);
      if (isDuplicate) {
        setError(`${type} already selected`);
        return;
      }

      // Update both local and parent state
      const newData = [...localSelectedData, value];
      setLocalSelectedData(newData);
      setFilterData(newData);
      setError('');
      setSearchValue('');
      setOpen(false);
    },
    [localSelectedData, setFilterData, type, setSearchValue]
  );

  const handleInputChange = useCallback(
    (_event: React.SyntheticEvent, value: string) => {
      setSearchValue(value);
      if (value === '') {
        setOpen(false);
      } else {
        const encodedValue = encodeURIComponent(value);
        fetchSuggestions(encodedValue);
        setError('');
        setOpen(true);
      }
    },
    [fetchSuggestions, setSearchValue]
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Autocomplete
        id={`${type}-search-field`}
        style={{ width: '100%' }}
        options={data}
        getOptionLabel={() => searchValue}
        isOptionEqualToValue={(option: Option, value: Option) => option.id === value.id}
        noOptionsText={isLoading ? 'Loading...' : `No ${type} found`}
        loading={isLoading}
        open={open}
        onClose={() => setOpen(false)}
        disabled={disabled}
        value={undefined}
        inputValue={searchValue}
        onChange={handleAdd}
        onInputChange={handleInputChange}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        filterOptions={(x) => x}
        disableClearable
        includeInputInList
        filterSelectedOptions
        disableListWrap
        clearOnBlur
        popupIcon={null}
        blurOnSelect
        forcePopupIcon={false}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label || `Add ${type}`}
            error={!!error}
            helperText={error}
            fullWidth
            InputLabelProps={{
              style: {
                fontFamily: 'inherit'
              }
            }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                </React.Fragment>
              )
            }}
          />
        )}
        renderOption={(props, option: Option) => (
          <li {...props} key={option.id}>
            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }}>
              <Grid container alignItems="center">
                <Grid item>
                  <Box sx={{ color: 'text.secondary', mr: 2 }}>{iconComponent}</Box>
                </Grid>
                <Grid item xs>
                  <Typography variant="body2">{option.name}</Typography>
                </Grid>
              </Grid>
            </Box>
          </li>
        )}
      />

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 0.5,
          mt: localSelectedData?.length > 0 ? '0.5rem' : ''
        }}
      >
        {!showAllItems && localSelectedData?.length > 0 && (
          <Chip
            key={localSelectedData[localSelectedData.length - 1]?.id}
            avatar={iconComponent}
            label={localSelectedData[localSelectedData.length - 1]?.name}
            size="small"
            onDelete={() => handleDelete(localSelectedData[localSelectedData.length - 1]?.id)}
            deleteIcon={
              <Tooltip title={`Remove ${type}`}>
                <CloseIcon style={iconSmall} />
              </Tooltip>
            }
          />
        )}
        {showAllItems &&
          localSelectedData?.map((obj) => (
            <Chip
              key={obj.id}
              avatar={<OrgIcon {...iconSmall} />}
              label={obj.name}
              size="small"
              onDelete={() => handleDelete(obj.id)}
              deleteIcon={
                <Tooltip title={`Remove ${type}`}>
                  <CloseIcon style={iconSmall} />
                </Tooltip>
              }
            />
          ))}
        {localSelectedData?.length > 1 && (
          <Typography
            onClick={() => setShowAllItems(!showAllItems)}
            sx={{
              cursor: 'pointer'
            }}
          >
            {showAllItems ? '(hide)' : `(+${localSelectedData?.length - 1})`}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default InputSearchField;
