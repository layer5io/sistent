import React, { useId } from 'react';
import Slide, { SlideProps } from '@mui/material/Slide';
import { Dialog } from '../../base/Dialog';
import { DialogContent } from '../../base/DialogContent';
import { IconButton } from '../../base/IconButton';
import { Box } from '../../base/Box';
import { Typography } from '../../base/Typography';
import { Divider } from '../../base/Divider';
import { CloseIcon } from '../../icons/Close';

const SlideUp = React.forwardRef<unknown, SlideProps>((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));
SlideUp.displayName = 'SlideUp';

export interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  /** @default '80vh' */
  maxHeight?: string;
  closeButtonAriaLabel?: string;
}

/**
 * BottomSheet — a mobile-friendly dialog that slides up from the bottom of the screen.
 */
const BottomSheet = ({
  open,
  onClose,
  title,
  children,
  maxHeight = '80vh',
  closeButtonAriaLabel = 'Close',
}: BottomSheetProps) => {
  const titleId = useId();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      aria-labelledby={title ? titleId : undefined}
      slots={{ transition: SlideUp }}
      sx={{
        zIndex: 1600,
        '& .MuiDialog-container': { alignItems: 'flex-end' },
        '& .MuiDialog-paper': {
          margin: 0,
          width: '100%',
          maxWidth: '100%',
          borderRadius: '12px 12px 0 0',
          maxHeight,
        },
      }}
    >
      {title && (
        <>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              px: 2,
              py: 1.25,
              minHeight: 52,
            }}
          >
            <Typography
              id={titleId}
              variant="subtitle1"
              sx={{ fontWeight: 600, flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
            >
              {title}
            </Typography>
            <IconButton aria-label={closeButtonAriaLabel} onClick={onClose} size="small" edge="end">
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
        </>
      )}
      <DialogContent sx={{ px: 2, py: 1.5, overflowY: 'auto' }}>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default BottomSheet;
