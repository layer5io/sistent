import { Modal as MuiModal, type ModalProps as MuiModalProps } from '@mui/material';
import React from 'react';

const Modal = React.forwardRef<HTMLDivElement, MuiModalProps>((props, ref) => {
  return <MuiModal {...props} ref={ref} />;
});

export default Modal;
