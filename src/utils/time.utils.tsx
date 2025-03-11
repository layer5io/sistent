import moment from 'moment-timezone';
import { CustomTooltip } from '../custom';

export const getRelativeTime = (date: string): string => {
  return moment(date).fromNow();
};

export const getFullFormattedTime = (date: string): string => {
  const timezone = moment.tz.guess();
  return moment(date).tz(timezone).format('ddd, MMM D, YYYY h:mm A, z');
};

export const getFormatDate = (date: string) => {
  const options = { year: 'numeric' as const, month: 'short' as const, day: 'numeric' as const };
  const formattedDate = new Date(date).toLocaleDateString('en-US', options);
  return formattedDate;
};

export const FormattedTime = ({ date }: { date: string }) => {
  return (
    <CustomTooltip title={getFullFormattedTime(date)} disableInteractive>
      <div>{getRelativeTime(date)}</div>
    </CustomTooltip>
  );
};
