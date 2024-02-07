import { Delimiter, FilterSchema, FilterStateType } from './typing.state';

export type Filters = Record<string, string[] | undefined>;

/**
 * Returns the filter object from the filterSchema
 *
 * @param value
 * @param filterSchema
 * @returns
 */
export const getFilterByValue = (
  value: string,
  filterSchema: FilterSchema
): { value: string; multiple: boolean } | undefined => {
  const matchingFilterKey = Object.keys(filterSchema).find(
    (key) => filterSchema[key].value === value
  );

  if (matchingFilterKey) {
    const matchingFilter = filterSchema[matchingFilterKey];
    return {
      value: matchingFilter.value ?? '',
      multiple: !!matchingFilter.multiple
    };
  }

  return undefined;
};

/**
 * Parses a filter string and returns a filter object
 *
 * @param filterString  - The input filter string of the form "type:value type2:value2 type:value2"
 * @param filterSchema - The filter object with types as keys and arrays of values as values
 * @returns
 */
export const getFilters = (filterString: string, filterSchema: FilterSchema): Filters => {
  const filters: Filters = {};

  const filterValuePairs = filterString.split(Delimiter.FILTER);

  filterValuePairs.forEach((filterValuePair) => {
    const [filter, value] = filterValuePair.split(Delimiter.FILTER_VALUE);

    const schemaEntry = filterSchema[filter];

    if (schemaEntry && schemaEntry.multiple) {
      filters[filter] = filters[filter] ?? [];
      filters[filter]!.push(value); // Using non-null assertion
    } else {
      filters[filter] = [value]; // Treat as an array
    }
  });

  return filters;
};

/**
 * Returns a filter string of form "type:value type2:value2 type:value2" from
 * a filter object of { type: { values }, type2: { values } }
 *
 * @param filters
 * @returns
 */
export const getFilterString = (filters: FilterSchema) => {
  return Object.entries(filters).reduce((filterString, [filter, values]) => {
    const valuesArray = values?.values ?? [];
    const filterValuesString = valuesArray
      .map((value) => `${filter}${Delimiter.FILTER_VALUE}${value}`)
      .join(' ');

    return filterString + filterValuesString;
  }, '');
};

/**
 *
 * @param filteringState
 * @returns
 */
export const getCurrentFilterAndValue = (filteringState: FilterStateType) => {
  const { context } = filteringState;
  const currentFilterValue = context?.value?.split(Delimiter.FILTER).at(-1);
  const currentFilter = currentFilterValue?.split(Delimiter.FILTER_VALUE)?.[0] ?? '';
  const currentValue = currentFilterValue?.split(Delimiter.FILTER_VALUE)?.[1] ?? '';
  return {
    filter: currentFilter,
    value: currentValue
  };
};
