import { getFormatDate } from '../../utils';

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
    return getFormatDate(data.deleted_at.Time as string);
  } else {
    return DEFAULT_DATE;
  }
};

/**
 * Formats a date into a short date-time string (e.g., "Jan 1, 2024, 09:30 AM")
 *
 * @param {Date | string} date - The date to format. Can be a Date object or date string
 * @returns {string} Formatted date string in the format "MMM D, YYYY, HH:MM AM/PM"
 *
 * @example
 * formatShortDateTime("2024-01-01T09:30:00") // Returns "Jan 1, 2024, 09:30 AM"
 * formatShortDateTime(new Date()) // Returns current date-time in short format
 *
 */
export const formatShortDateTime = (date: Date | string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Formats a date into a short date string (e.g., "Jan 1, 2024")
 *
 * @param {Date | string} date - The date to format. Can be a Date object or date string
 * @returns {string} Formatted date string in the format "MMM D, YYYY"
 *
 * @example
 * formatShortDate("2024-01-01") // Returns "Jan 1, 2024"
 * formatShortDate(new Date()) // Returns current date in short format
 *
 */
export const formatShortDate = (date: Date | string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

/**
 * Formats a date into a long date string (e.g., "January 1, 2024")
 *
 * @param {Date | string} date - The date to format. Can be a Date object or date string
 * @returns {string} Formatted date string in the format "MMMM D, YYYY"
 *
 * @example
 * formattoLongDate("2024-01-01") // Returns "January 1, 2024"
 * formattoLongDate(new Date()) // Returns current date in long format
 *
 */
export const formattoLongDate = (date: Date | string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};
