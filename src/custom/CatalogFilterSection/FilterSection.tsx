import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useCallback, useState } from 'react';
import { Box, Checkbox, Collapse, List, Stack, Typography } from '../../base';
import { InfoTooltip } from '../CustomTooltip';
import { StyledSearchBar } from '../StyledSearchBar';
import { FilterOption, FilterValues, StyleProps } from './CatalogFilterSidebar';
import { EndAdornmentText, FilterTitleButton } from './style';

interface FilterSectionProps {
  filterKey: string;
  sectionDisplayName?: string;
  options?: FilterOption[];
  filters: FilterValues;
  openSections: Record<string, boolean>;
  onCheckboxChange?: (filterKey: string, value: string, checked: boolean) => void;
  onSectionToggle: (filterKey: string) => void;
  styleProps: StyleProps;
  customComponent?: React.ComponentType;
}

/**
 * @component FilterSection
 * @description A functional component that renders a filter section.
 * @param {string} filterKey - The key of the filter section.
 * @param {string} sectionDisplayName - The title of the filter section.
 * @param {Array} options - The available options for the filter section.
 * @param {Object} filters - The selected filters.
 * @param {Object} openSections - The open/closed state of the filter sections.
 * @param {Function} onCheckboxChange - A function to handle checkbox change event.
 * @param {Function} onSectionToggle - A function to handle section toggle event.
 * @param {Object} styleProps - The style properties for the component.
 */
const FilterSection: React.FC<FilterSectionProps> = ({
  filterKey,
  sectionDisplayName,
  options = [],
  filters,
  openSections,
  onCheckboxChange,
  onSectionToggle,
  styleProps,
  customComponent: CustomComponent
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleTextFieldChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const showSearch = options.length > 10;
  const searchedOptions =
    searchQuery && options.length
      ? options.filter((option) => option.label.toLowerCase().includes(searchQuery.toLowerCase()))
      : options;

  return (
    <>
      <FilterTitleButton
        onClick={() => onSectionToggle(filterKey)}
        style={{
          backgroundColor: styleProps.sectionTitleBackgroundColor
        }}
      >
        <Typography variant="h6" fontWeight="bold" fontFamily={styleProps.fontFamily}>
          {(sectionDisplayName || filterKey).toUpperCase()}
        </Typography>
        {openSections[filterKey] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </FilterTitleButton>
      <Collapse in={openSections[filterKey]} timeout="auto" unmountOnExit>
        {CustomComponent ? (
          <CustomComponent />
        ) : (
          <List
            component="div"
            sx={{
              overflowY: 'auto',
              maxHeight: '25rem',
              backgroundColor: styleProps.backgroundColor
            }}
          >
            {showSearch && (
              <Box px={'0.5rem'} mb={'0.5rem'}>
                <StyledSearchBar
                  value={searchQuery}
                  onChange={handleTextFieldChange}
                  placeholder="Search"
                  endAdornment={
                    <EndAdornmentText>Total : {searchedOptions.length ?? 0}</EndAdornmentText>
                  }
                />
              </Box>
            )}
            {searchedOptions.map((option, index) => (
              <Stack
                key={`${option.value}-${index}`}
                direction="row"
                alignItems="center"
                px={'0.5rem'}
                justifyContent="space-between"
              >
                <Stack direction="row" alignItems="center" gap="0.35rem">
                  <Checkbox
                    id={`checkbox-${option.label}`}
                    checked={
                      Array.isArray(filters[filterKey])
                        ? (filters[filterKey] as string[]).includes(option.value)
                        : filters[filterKey] === option.value
                    }
                    onChange={(e) =>
                      onCheckboxChange &&
                      onCheckboxChange(filterKey, option.value, e.target.checked)
                    }
                    value={option.value}
                  />

                  {option.Icon && <option.Icon width="20px" height="20px" />}

                  <Typography fontFamily={styleProps.fontFamily}>{option.label}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" gap="0.35rem">
                  {option.totalCount !== undefined && `(${option.totalCount || 0})`}
                  {option.description && (
                    <InfoTooltip variant="standard" helpText={option.description} />
                  )}
                </Stack>
              </Stack>
            ))}
          </List>
        )}
      </Collapse>
    </>
  );
};

export default FilterSection;
