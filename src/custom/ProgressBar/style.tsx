import { styled } from '@mui/material';

export const ProgressBarWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  padding: theme.spacing(1.5, 2),
  minWidth: 300,
  maxWidth: 480,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  boxShadow: theme.shadows[6],
  border: `1px solid ${theme.palette.divider}`
}));

export const ProgressBarContent = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  gap: theme.spacing(1),
  minWidth: 0
}));

export const ProgressBarHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(1)
}));

export const ProgressBarMessage = styled('span')(({ theme }) => ({
  fontSize: theme.typography.body2.fontSize,
  fontWeight: 500,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  flex: 1
}));

export const ProgressBarLabel = styled('span')(({ theme }) => ({
  fontSize: theme.typography.caption.fontSize,
  color: theme.palette.text.secondary,
  fontWeight: 500,
  flexShrink: 0
}));

export const ProgressBarTrack = styled('div')({
  width: '100%'
});

export const CloseButtonWrapper = styled('button')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: 28,
  height: 28,
  padding: 0,
  border: 'none',
  borderRadius: '50%',
  backgroundColor: 'transparent',
  color: theme.palette.text.secondary,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.text.primary
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 1
  }
}));
