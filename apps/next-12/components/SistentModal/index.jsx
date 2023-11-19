import Modal from '@/components/Modal';
import { Button, Typography } from '@layer5/sistent-components';
import React from 'react';

export default function SistentModal() {
  const [openModal, setOpenModal] = React.useState(true);

  const handleModalOpen = () => {
    setOpenModal(true);
  };
  const handleModalClose = () => {
    console.log('Closing modal...');
    setOpenModal(false);
  };
  const handleAction = () => {
    handleModalClose();
  };
  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleModalOpen}>Open</Button>
      <Modal
        open={openModal}
        modalTitle="Where do you want to start?"
        handleClose={handleModalClose}
        actionName="Start"
        cancelButton={false}
        onAction={handleAction}
      >
        <Typography gutterBottom>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
          in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        </Typography>
        <Typography gutterBottom>
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus
          vel augue laoreet rutrum faucibus dolor auctor.
        </Typography>
        <Typography gutterBottom>
          Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
          scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
          auctor fringilla.
        </Typography>
      </Modal>
    </React.Fragment>
  );
}