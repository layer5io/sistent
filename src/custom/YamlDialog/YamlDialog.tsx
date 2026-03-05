import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  IconButton,
  Tooltip
} from '../../base';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import DeleteIcon from '@mui/icons-material/Delete';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import SaveIcon from '@mui/icons-material/Save';
import { YamlDialogTitleText, StyledCodeMirrorWrapper } from './style';

interface YamlDialogProps {
  name: string;
  open: boolean;
  fullScreen?: boolean;
  config_file: string;
  isReadOnly?: boolean;
  onClose: () => void;
  onToggleFullScreen: () => void;
  onYamlChange: (value: string) => void;
  onUpdate?: () => void;
  onDelete?: () => void;
  editorComponent?: React.ReactNode;
}

const YamlDialog = React.forwardRef<HTMLDivElement, YamlDialogProps>(
  (
    {
      name,
      open,
      fullScreen = false,
      isReadOnly = false,
      onClose,
      onToggleFullScreen,
      onUpdate,
      onDelete,
      editorComponent
    },
    ref
  ) => {
    return (
      <Dialog
        ref={ref}
        aria-labelledby="yaml-dialog-title"
        open={open}
        onClose={onClose}
        maxWidth="md"
        fullScreen={fullScreen}
        fullWidth={!fullScreen}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem'
          }}
          id="yaml-dialog-title"
        >
          <YamlDialogTitleText variant="h6">{name}</YamlDialogTitleText>
          <Tooltip title={fullScreen ? 'Exit Fullscreen' : 'Fullscreen'} arrow placement="bottom">
            <IconButton onClick={onToggleFullScreen} size="large">
              {fullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
            </IconButton>
          </Tooltip>
        </div>
        <Divider />
        <DialogContent>
          <StyledCodeMirrorWrapper fullScreen={fullScreen}>{editorComponent}</StyledCodeMirrorWrapper>
        </DialogContent>
        <Divider />
        {!isReadOnly && (
          <DialogActions>
            <Tooltip title="Update Pattern">
              <IconButton
                aria-label="Update"
                color="primary"
                onClick={onUpdate}
                size="large"
              >
                <SaveIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Filter">
              <IconButton
                aria-label="Delete"
                color="primary"
                onClick={onDelete}
                size="large"
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </DialogActions>
        )}
      </Dialog>
    );
  }
);

YamlDialog.displayName = 'YamlDialog';

export default YamlDialog;
