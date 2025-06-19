import InfoIcon from '@mui/icons-material/Info'; // Import your info icon
import React, { useState } from 'react';
import { IconButton, Popover } from '../../base';
import { WHITE } from '../../theme';
import { RenderMarkdownTooltip } from '../Markdown';

type HelperTextPopoverProps = {
  content: string | React.ReactNode | JSX.Element;
  fontSize?: string;
  fontWeight?: number;
  variant?: 'standard' | 'small';
  bgColor?: string;
  icon?: React.ReactNode;
};

function HelperTextPopover({
  content,
  fontSize,
  fontWeight = 400,
  variant = 'standard',
  bgColor = '#141414',
  icon = <InfoIcon fontSize="small" />,
  ...props
}: HelperTextPopoverProps): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        size="small"
        onClick={handleOpen}
        sx={{ color: 'inherit', padding: '2px', verticalAlign: 'middle' }}
      >
        {icon}
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        disablePortal
        container={anchorEl?.ownerDocument?.body}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        PaperProps={{
          sx: {
            background: bgColor,
            zIndex: 1501,
            opacity: '1',
            color: WHITE,
            maxWidth: '500px',
            fontSize: fontSize || (variant === 'standard' ? '1rem' : '0.75rem'),
            fontWeight: fontWeight,
            borderRadius: '0.5rem',
            padding: variant === 'standard' ? '0.9rem' : '0.5rem 0.75rem',
            boxShadow: 'rgba(0, 0, 0, 0.6) 0px 4px 10px, rgba(0, 0, 0, 0.5) 0px 2px 4px'
          }
        }}
        {...props}
      >
        {typeof content === 'string' ? <RenderMarkdownTooltip content={content} /> : content}
      </Popover>
    </>
  );
}

export default HelperTextPopover;
export type { HelperTextPopoverProps };
