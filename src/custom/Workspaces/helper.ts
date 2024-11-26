import { formatDate } from '../CatalogDetail/helper';

/**
 * Helper function to parse and format the value of a field representing a deletion timestamp in the provided data object.
 * @param {Object} data - The data object containing the field representing the deletion timestamp.
 * @returns {string} - The formatted date string if the deletion timestamp is valid; otherwise, "N/A".
 */

export const DEFAULT_DATE = 'N/A'; // a constant to represent the default date value
export const parseDeletionTimestamp = (data: {
  deleted_at: { Valid: boolean; Time: string | number | Date };
}) => {
  if (data && data.deleted_at && data.deleted_at.Valid === true) {
    const date = new Date(data.deleted_at.Time);
    return formatDate(date);
  } else {
    return DEFAULT_DATE;
  }
};
