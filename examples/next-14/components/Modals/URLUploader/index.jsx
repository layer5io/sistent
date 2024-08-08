import { urlValidator } from '@/utils/urlValidator';
import { Tooltip, IconButton, Grid, TextField, Button } from '@layer5/sistent-components';
import GenericModal from '../GenericModal';
import React from 'react';

export function URLUploader({ onSubmit }) {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState('');
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    if (input) {
      setIsError(!urlValidator(input));
    }
  }, [input]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    onSubmit(input);
    handleClose();
  };

  return (
    <>
      <label htmlFor="url-upload-button">
        <Tooltip title="Upload URL">
          <IconButton aria-label="URL-Upload" component="span" onClick={handleOpen} size="large">
            <LinkIcon />
          </IconButton>
        </Tooltip>
        <GenericModal
          open={open}
          handleClose={handleClose}
          Content={
            <div
              style={{
                position: 'absolute',
                width: 600,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                borderRadius: 10,
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <h2 id="simple-modal-title">Import using URL</h2>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={isError}
                    helperText={isError && 'Invalid URL'}
                    variant="outlined"
                    label="Paste URL here"
                    fullWidth
                    onChange={(e) => setInput(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button fullWidth variant="contained" onClick={handleClose}>
                    Cancel
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    disabled={isError || !input}
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => handleSubmit()}
                  >
                    Import
                  </Button>
                </Grid>
              </Grid>
            </div>
          }
        />
      </label>
    </>
  );
}

export default URLUploader;
