import React from 'react';
import { Modal, Backdrop, Fade } from '@mui/material';

/**
 * A generic modal component.
 * @param {Object} props - The props object.
 * @param {boolean} [props.open] - Whether the modal is open or not.
 * @param {React.ReactNode | JSX.Element} [props.children] - The content of the modal.
 * @param {Function} [props.handleClose] - Function to handle modal close event.
 * @param {React.ReactInstance | Function} [props.container] - The container to render the modal into.
 * @returns {JSX.Element} A JSX element representing the generic modal.
 */
export function GenericModal({ open, children, handleClose, container }) {
  return (
    <Modal
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={Backdrop}
      slotProps={{ timeout: 200 }}
      container={container}
      id="searchClick"
    >
      <Fade in={open} style={{ maxHeight: '90vh', overflow: 'auto' }}>
        {children}
      </Fade>
    </Modal>
  );
}

export default GenericModal;
