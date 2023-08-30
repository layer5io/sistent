import { Backdrop, BaseButton } from '@layer5/sistent-components/src';
import React from 'react';

export default {
  title: 'Example/Backdrop',
  component: Backdrop,
  tags: ['autodocs']
};

export function Basic() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <BaseButton variant="contained" onClick={handleOpen}>
        Show backdrop
      </BaseButton>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}>
        Hello
      </Backdrop>
    </div>
  );
}
