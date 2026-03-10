import { styled } from '@mui/material';
import { DialogTitle } from '../../base/DialogTitle';

export const YamlDialogTitleText = styled(DialogTitle)(() => ({
  fontWeight: 600,
  fontSize: '1.25rem',
  flex: 1
}));

export const StyledCodeMirrorWrapper = styled('div')<{ fullScreen?: boolean }>(
  ({ fullScreen }) => ({
    height: fullScreen ? '100vh' : '400px',
    overflow: 'auto',
    '& .CodeMirror': {
      height: '100%',
      fontFamily: 'monospace'
    }
  })
);
