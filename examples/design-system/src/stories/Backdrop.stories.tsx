import type { Meta } from '@storybook/react';
import { useState } from 'react';

import { Backdrop, Button } from '@layer5/sistent-components';

const meta = {
  title: 'Example/Backdrop',
  component: Backdrop,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Backdrop>;

export default meta;
// type Story = StoryObj<typeof meta>;

export function Basic() {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" label="Open Backdrop" />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        Hello
      </Backdrop>
    </div>
  );
}
