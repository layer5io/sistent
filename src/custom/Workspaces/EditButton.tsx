import { IconButton } from '@mui/material';
import React from 'react';
import { CustomTooltip } from '../CustomTooltip';
import { L5EditIcon } from './styles';

interface EditButtonProps {
  onClick: (e: React.MouseEvent) => void;
  disabled?: boolean;
  title?: string;
}

const EditButton: React.FC<EditButtonProps> = ({ onClick, disabled, title = 'Edit' }) => {
  return (
    <CustomTooltip title={title}>
      <div>
        <IconButton onClick={onClick} disabled={disabled} size="small" sx={{ ml: 1 }}>
          <L5EditIcon />
        </IconButton>
      </div>
    </CustomTooltip>
  );
};

export default EditButton;
