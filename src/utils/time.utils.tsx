import moment from 'moment';
import { CustomTooltip } from '../custom';

/**
 * Returns the relative time (e.g. "2 hours ago") from a given date string
 * @param {string} date - ISO format date string
 * @returns {string} Human-readable relative time
 */
export const getRelativeTime = (date: string): string => {
  return moment(date).fromNow();
};

/**
 * Returns a fully formatted date and time string
 * @param {string} date - ISO format date string
 * @returns {string} Formatted date in "ddd, MMM D, YYYY h:mm A" format (e.g. "Mon, Jan 1, 2025 3:45 PM")
 */
export const getFullFormattedTime = (date: string): string => {
  return moment(date).format('ddd, MMM D, YYYY h:mm A');
};

/**
 * Formats a date string into a short date format
 * @param {string} date - ISO format date string
 * @returns {string} Formatted date in "Month Day, Year" format (e.g. "Jan 1, 2025")
 */
export const getFormatDate = (date: string) => {
  const options = { year: 'numeric' as const, month: 'short' as const, day: 'numeric' as const };
  const formattedDate = new Date(date).toLocaleDateString('en-US', options);
  return formattedDate;
};

/**
 * React component that displays relative time with a tooltip showing the full date and time
 * @param {Object} props - Component props
 * @param {string} props.date - ISO format date string
 * @returns {JSX.Element} Formatted time component with tooltip
 */
export const FormattedTime = ({ date }: { date: string }) => {
  return (
    <CustomTooltip title={getFullFormattedTime(date)} disableInteractive>
      <div>{getRelativeTime(date)}</div>
    </CustomTooltip>
  );
};
