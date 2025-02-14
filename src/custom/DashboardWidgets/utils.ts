import moment from 'moment';

export const formatDate = (date: string) => {
  const options = { year: 'numeric' as const, month: 'short' as const, day: 'numeric' as const };
  const formattedDate = new Date(date).toLocaleDateString('en-US', options);
  return formattedDate;
};

export const formatTime = (date: string) => {
  const options = { year: 'numeric' as const, month: 'short' as const, day: 'numeric' as const };
  const formattedTime = new Date(date).toLocaleTimeString('en-US', options);
  return formattedTime;
};

export const formatDateTime = (date: string) => {
  const formattedDate = formatDate(date);
  const formattedTime = formatTime(date);
  return `${formattedDate} ${formattedTime || ''}`;
};

export const formatRelativeDate = (date: string) => {
  const now = moment();
  const inputDate = moment(date);

  // Show "Just now" for dates within the last 5 minutes
  const minutesAgo = now.diff(inputDate, 'minutes');
  if (minutesAgo < 5) return 'just now';

  // Show "Today", "1 day ago", or "X days ago" depending on the difference
  const daysAgo = now.diff(inputDate, 'days');
  if (daysAgo === 0) return 'today';
  if (daysAgo === 1) return '1 day ago';
  if (daysAgo < 7) return `${daysAgo} days ago`;

  // For older dates, fall back to a standard format
  return inputDate.format('MMM D, YYYY');
};
