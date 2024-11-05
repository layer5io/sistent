import { Autocomplete } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Box, Chip, Grid, TextField, Tooltip, Typography } from '../../base';
import { iconLarge, iconSmall } from '../../constants/iconsSizes';
import { CloseIcon, OrgIcon } from '../../icons';

interface Option {
  id: string;
  name: string;
}

interface InputFieldSearchProps {
  defaultData?: Option[];
  label?: string;
  fetchSuggestions: (value: string) => void;
  setFilterData: (data: Option[]) => void;
  isLoading: boolean;
  type: string;
  disabled?: boolean;
}

const InputFieldSearch: React.FC<InputFieldSearchProps> = ({
  defaultData = [],
  label,
  fetchSuggestions,
  setFilterData,
  isLoading,
  type,
  disabled
}) => {
  const [data, setData] = useState<Option[]>([]);
  const [error, setError] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | undefined>(undefined);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!isFirstRender.current) {
      setFilterData(data);
    } else {
      isFirstRender.current = false;
    }
  }, [data, setFilterData]);

  const handleDelete = (id: string) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const handleAdd = (event: React.SyntheticEvent, value: Option | null) => {
    if (!value) return;

    setData((prevData) => {
      const isDuplicate = prevData.some((item) => item.id === value.id);
      if (isDuplicate) {
        setError(`${type} already selected`);
        return prevData;
      }

      setError('');
      return [...prevData, value];
    });
    setSelectedOption(undefined);
    setInputValue('');
  };

  const handleInputChange = (event: React.SyntheticEvent, value: string) => {
    setInputValue(value);
    if (value === '') {
      setOpen(false);
    } else {
      const encodedValue = encodeURIComponent(value);
      fetchSuggestions(encodedValue);
      setError('');
      setOpen(true);
    }
  };

  return (
    <>
      <Autocomplete<Option, false, true, false>
        id={`${type}-search-field`}
        sx={{ width: 'auto' }}
        options={defaultData}
        getOptionLabel={(option: Option) => option.name}
        isOptionEqualToValue={(option: Option, value: Option) => option.id === value.id}
        noOptionsText={isLoading ? 'Loading...' : `No ${type} found`}
        loading={isLoading}
        open={open}
        disabled={disabled}
        value={selectedOption}
        inputValue={inputValue}
        onChange={handleAdd}
        onInputChange={handleInputChange}
        ffilterOptions={(options) => options}
        disableClearable
        includeInputInList
        filterSelectedOptions
        disableListWrap
        clearOnBlur
        renderInput={(params) => (
          <TextField
            {...params}
            label={label || `Add ${type}`}
            error={!!error}
            helperText={error}
            fullWidth
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>{isLoading ? <div color="inherit" /> : null}</React.Fragment>
              )
            }}
          />
        )}
        renderOption={(props, option: Option) => (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item>
                <Box sx={{ color: 'text.secondary', mr: 2 }}>
                  <OrgIcon {...iconLarge} />
                </Box>
              </Grid>
              <Grid item xs>
                <Typography variant="body2">{option.name}</Typography>
              </Grid>
            </Grid>
          </li>
        )}
      />
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 0.5,
          mt: data?.length > 0 ? '0.5rem' : ''
        }}
      >
        {!showAllUsers && data?.length > 0 && (
          <Chip
            key={data[data.length - 1]?.id}
            avatar={<OrgIcon {...iconSmall} />}
            label={data[data.length - 1]?.name}
            size="small"
            onDelete={() => handleDelete(data[data.length - 1]?.id)}
            deleteIcon={
              <Tooltip title="Remove member">
                <CloseIcon style={iconSmall} />
              </Tooltip>
            }
          />
        )}
        {showAllUsers &&
          data?.map((obj) => (
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
        {data?.length > 1 && (
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
            {showAllUsers ? '(hide)' : `(+${data?.length - 1})`}
          </Typography>
        )}
      </Box>
    </>
  );
};

export default InputFieldSearch;
