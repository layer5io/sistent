import type { Meta } from '@storybook/react';

import { Box, Paper as MuiPaper } from '@layer5/sistent-components';

const meta = {
  title: 'Example/Paper',
  component: MuiPaper,
  tags: ['autodocs']
} satisfies Meta<typeof MuiPaper>;

export default meta;
// type Story = StoryObj<typeof meta>;

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
      }}
    >
      <MuiPaper elevation={elevation} {...rest} />
    </Box>
  );
};
