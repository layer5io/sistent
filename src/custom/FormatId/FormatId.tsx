import { Box, Tooltip, Typography } from '@mui/material';
import _ from 'lodash';
import React, { useState } from 'react';
import { CopyIcon } from '../../icons';
import { useTheme } from '../../theme';

interface FormatIdProps {
  id: string;
}

export const FormatId: React.FC<FormatIdProps> = ({ id }) => {
  const [copied, setCopied] = useState(false);
  const theme = useTheme();

  // Truncates the id to 15 characters and adds an ellipsis and adds a clipboard copy button
  const copyToClipboard = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    setCopied(true);

    // Reset the copied status after a brief delay
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const truncatedId = _.truncate(id, { length: 15 });

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Tooltip title={id} placement="top">
        <Typography
          variant="body2"
          style={{
            cursor: 'pointer',
            textWrap: 'nowrap',
            color: theme.palette.text.primary
          }}
        >
          {truncatedId}
        </Typography>
      </Tooltip>
      <Tooltip title={copied ? 'Copied!' : 'Copy'} placement="top">
        <div onClick={copyToClipboard} style={{ padding: '0.25rem' }}>
          <CopyIcon width={16} height={16} fill={theme.palette.action.active} />
        </div>
      </Tooltip>
    </Box>
  );
};
