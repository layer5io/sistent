import React from 'react';
import { Box, Paper as MuiPaper } from '@layer5/sistent-components';

export default {
  title: 'Example/Paper',
  component: MuiPaper,
  tags: ['autodocs']
};

export const Paper = ({ elevation, ...rest }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 128,
          height: 128
        }
      }}>
      <MuiPaper elevation={elevation} {...rest} />
    </Box>
  );
};
