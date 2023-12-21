import { FC, ReactNode } from 'react';
import {
  StyledDialog,
  StyledDialogActions,
  StyledDialogContent,
  StyledDialogTitle
} from '../Dialog';

interface MesheryModalProps {
  open: boolean;
  content: ReactNode;
  title: string;
  actions?: ReactNode;
}

const MesheryModal: FC<MesheryModalProps> = ({ open, content, title, actions }) => {
  return (
    <StyledDialog fullWidth maxWidth="md" open={open}>
      <StyledDialogTitle>{title}</StyledDialogTitle>
      <StyledDialogContent>{content}</StyledDialogContent>
      <StyledDialogActions>{actions}</StyledDialogActions>
    </StyledDialog>
  );
};

export { MesheryModal as StyledModal };
