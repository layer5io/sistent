// import _ from 'lodash';
import { CloneIcon } from '@layer5/sistent-svg';
import { truncate } from 'lodash';
import React from 'react';
import { Box } from '../base/Box';
import { IconButton } from '../base/IconButton';
import { Tooltip } from '../base/Tooltip';
import { Typography } from '../base/Typography';
// import { Launch as LaunchIcon } from '@material-ui/icons';
// import { isEmptyAtAllDepths } from '../../utils/objects';

// interface FormatterContextProps {
//   propertyFormatters: Record<string, any>; // Adjust the type accordingly
// }

// const FormatterContext = createContext<FormatterContextProps>({
//   propertyFormatters: {},
// });

// const LevelContext = createContext<number>(0);

// interface LevelProps {
//   children: React.ReactNode;
// }

// const Level: React.FC<LevelProps> = ({ children }) => {
//   const level = useContext(LevelContext);
//   return <LevelContext.Provider value={level + 1}>{children}</LevelContext.Provider>;
// };

export const formatDate = (date: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  const formattedDate = new Date(date).toLocaleDateString('en-US', options);
  return formattedDate;
};

export const formatTime = (date: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };
  const formattedTime = new Date(date).toLocaleTimeString('en-US', options);
  return formattedTime;
};

export const formatDateTime = (date: string): string => {
  const formattedDate = formatDate(date);
  const formattedTime = formatTime(date);
  return `${formattedDate} ${formattedTime || ''}`;
};

interface FormattedDateProps {
  date: string;
}

export const FormattedDate: React.FC<FormattedDateProps> = ({ date }) => {
  return (
    <Tooltip title={formatDateTime(date)} placement="top">
      <div>
        <Typography
          variant="body1"
          style={{
            wordWrap: 'break-word',
            color: '#000000',
            textTransform: 'capitalize'
          }}
        >
          {formatDate(date)}
        </Typography>
      </div>
    </Tooltip>
  );
};

interface FormatIdProps {
  id: string;
  length: number;
}

export const FormatId: React.FC<FormatIdProps> = ({ id, length }) => {
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(id)
      .then(() => {
        console.log('Copied to clipboard');
      })
      .catch((error) => {
        console.error('Error copying to clipboard:', error);
      });
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const truncatedId: string = truncate(id, { length: length }) as string;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
      <Tooltip title={id} placement="top">
        <Typography
          variant="body2"
          style={{
            cursor: 'pointer',
            color: '#000000'
          }}
        >
          {truncatedId}
        </Typography>
      </Tooltip>
      <Tooltip title="Copy" placement="top">
        <IconButton onClick={copyToClipboard} style={{ padding: '0.25rem' }}>
          <CloneIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
