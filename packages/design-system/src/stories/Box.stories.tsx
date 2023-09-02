import { Box } from '@layer5/sistent-components';
import React from 'react';

export default {
  title: 'Example/Box',
  component: Box,
  tags: ['autodocs']
};

export function SxProp() {
  return (
    <Box
      sx={{
        width: 300,
        height: 300,
        backgroundColor: 'primary.dark',
        '&:hover': {
          backgroundColor: 'primary.main',
          opacity: [0.9, 0.8, 0.7]
        }
      }}
    />
  );
}
