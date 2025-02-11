/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';

interface TableData {
  name: string;
  [key: string]: string | number | undefined;
}

interface TableColumn {
  name: string;
  label: string;
  options: {
    sort: boolean;
  };
}

interface TableStructure {
  key: string;
  columns: TableColumn[];
  rows: TableData[];
}

export const splitCamelCaseString = (str: string): string => {
  const pluralPatternRegex = /(?<=\w)[A-Z]+s$/;
  const pluralMatches = str.match(pluralPatternRegex);

  if (!pluralMatches) {
    return _.startCase(str);
  }
  const reconstructedInput = str.replace(pluralPatternRegex, '');

  return _.startCase(reconstructedInput) + ' ' + pluralMatches[0];
};

export const extractPodVolumnTables = (data: TableData[] | null): TableStructure[] => {
  if (!data) {
    return [];
  }
  const uniqueKeys = _.uniq(
    _.flatMap(data, (item) => Object.keys(item).filter((key) => key !== 'name'))
  );

  return uniqueKeys.map((key) => {
    const rows = data
      .filter((item) => _.has(item, key))
      .map((item) => {
        const baseData: TableData = { name: item.name };
        const nestedData = _.get(item, key);

        if (_.isObject(nestedData)) {
          Object.entries(nestedData).forEach(([nestedKey, value]) => {
            baseData[nestedKey] =
              nestedKey === 'defaultMode'
                ? value?.toString()
                : nestedKey === 'sources' && _.isArray(value)
                ? value?.length
                : JSON.stringify(value);
          });
        } else {
          baseData[key] = JSON.stringify(nestedData);
        }

        return baseData;
      });

    const columns: TableColumn[] = rows.length
      ? Object.keys(rows[0]).map((columnKey) => ({
          name: columnKey,
          label: _.startCase(columnKey),
          options: {
            sort: false
          }
        }))
      : [];

    return { key, columns, rows };
  });
};

export function isEmptyAtAllDepths(input: any): boolean {
  if (_.isArray(input)) {
    // If the input is an array, check if all items are empty at all depths
    return input.every(isEmptyAtAllDepths);
  } else if (_.isObject(input)) {
    // If the input is an object, check if all properties are empty at all depths
    return _.every(input, isEmptyAtAllDepths);
  } else {
    // If the input is not an array or object, check if it's empty
    return _.isEmpty(input);
  }
}

export const convertToReadableUnit = (value: number): string => {
  if (!value) return '0';

  const units = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB'];
  let index = 0;

  while (value >= 1024 && index < units.length - 1) {
    value /= 1024;
    index++;
  }

  return `${value.toFixed(2)} ${units[index]}`;
};
