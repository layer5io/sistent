import Slide, { SlideProps } from '@mui/material/Slide';
import { readableTextColor, useTheme } from '../../theme';
import React, { useId } from 'react';
import { Box } from '../../base/Box';
import { Dialog } from '../../base/Dialog';
import { DialogContent } from '../../base/DialogContent';
import { IconButton } from '../../base/IconButton';
import { Typography } from '../../base/Typography';
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
  headerBackgroundColor?: string;
  headerTextColor?: string;
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
  headerBackgroundColor,
  headerTextColor
}: BottomSheetProps) => {
  const titleId = useId();
  const theme = useTheme();

  const tint = theme.palette.surface?.tint;
  const finalHeaderBackgroundColor =
    headerBackgroundColor || tint || theme.palette.background.default;

  const defaultForeground = headerBackgroundColor
    ? readableTextColor(
        headerBackgroundColor,
        theme.palette.text.inverse,
        theme.palette.text.default
      )
    : tint
      ? // surface.tint is a dark gradient in both palettes, so always light ink
        // (matches Modal / UniversalFilter tinted headers).
        theme.palette.common.white
      : theme.palette.text.default;

  const finalHeaderTextColor = headerTextColor ?? defaultForeground;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      aria-labelledby={title ? titleId : undefined}
      slots={{ transition: SlideUp }}
      sx={(theme) => ({
        zIndex: theme.zIndex.modal,
        '& .MuiDialog-container': { alignItems: 'flex-end' },
        '& .MuiDialog-paper': {
          margin: 0,
          width: '100%',
          maxWidth: '100%',
          borderRadius: '12px 12px 0 0',
          maxHeight
        }
      })}
    >
      {title && (
        <>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1rem',
              textAlign: 'center',
              background: finalHeaderBackgroundColor,
              color: finalHeaderTextColor
            }}
          >
            <Typography
              id={titleId}
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                flex: 1,
                minWidth: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                color: 'inherit'
              }}
            >
              {title}
            </Typography>
            <IconButton
              aria-label={closeButtonAriaLabel}
              onClick={onClose}
              size="small"
              edge="end"
              sx={{
                '& svg': {
                  fill: finalHeaderTextColor
                },
                transform: 'rotate(-90deg)',
                '&:hover': {
                  transform: 'rotate(90deg)',
                  transition: 'all 0.3s ease-in',
                  cursor: 'pointer'
                }
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </>
      )}
      <DialogContent sx={{ px: 2, py: 1.5, overflowY: 'auto' }}>{children}</DialogContent>
    </Dialog>
  );
};

export default BottomSheet;
