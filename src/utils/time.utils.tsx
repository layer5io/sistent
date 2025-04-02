import moment from 'moment';
import { CustomTooltip } from '../custom';

export const getRelativeTime = (date: string): string => {
  return moment(date).fromNow();
};

export const getFullFormattedTime = (date: string): string => {
  return moment(date).format('ddd, MMM D, YYYY h:mm A');
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
