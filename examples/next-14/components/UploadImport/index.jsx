import { promisifiedDataFetch } from '@/utils/dataFetch';
import { urlValidator } from '@/utils/urlValidator';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@layer5/sistent';
import NativeSelect from '@mui/material/NativeSelect';
import React from 'react';

export function UploadImport() {
  const { handleUpload, handleUrlUpload, configuration, isFilter, open, handleClose, fetch } =
    props;
  const [input, setInput] = React.useState('');
  const [name, setName] = React.useState('');
  const [config, setConfig] = React.useState('');
  const [isError, setIsError] = React.useState(false);
  const [fileType, setFileType] = React.useState();
  const [sourceType, setSourceType] = React.useState();
  const [supportedTypes, setSupportedTypes] = React.useState();
  const isDesign = configuration === 'patterns';

  React.useEffect(() => {
    if (isDesign) {
      (async () => {
        setSupportedTypes(await promisifiedDataFetch('/api/pattern/types'));
      })();
    }
  }, []);

  const handleFileType = (index) => {
    if (isDesign) {
      setFileType(supportedTypes?.[index]?.supported_extensions);
      setSourceType(supportedTypes?.[index]?.design_type);
    }
  };

  React.useEffect(() => {
    if (input) {
      setIsError(!urlValidator(input));
    }
  }, [input]);

  React.useEffect(() => {
    if (isDesign) {
      setFileType(supportedTypes?.[0]?.supported_extensions);
      setSourceType(supportedTypes?.[0]?.design_type);
    }
  }, [open]);

  const handleSubmit = async () => {
    await handleUrlUpload(input, sourceType, { name, config });
    handleClose();
  };

  const handleUploader = async (input) => {
    await handleUpload(input, sourceType, { name, config });
    fetch?.();
    handleClose();
  };

  return (
    <>
      <label htmlFor="url-upload-button">
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            <b id="simple-modal-title" style={{ textAlign: 'center' }}>
              Import {configuration}
            </b>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={24} alignItems="center">
              <Grid item xs={3}>
                <h4>Name</h4>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  required
                  size="small"
                  variant="outlined"
                  label="Name"
                  style={{ width: '100%' }}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              {isFilter && (
                <>
                  <Grid container spacing={24} alignItems="center">
                    <Grid item xs={3}>
                      <h4>WASM Config</h4>
                    </Grid>
                    <Grid item xs={9}>
                      <TextField
                        placeholder=""
                        multiline
                        required
                        minRows={4}
                        size="small"
                        variant="outlined"
                        label="WASM Filter Config"
                        style={{ width: '100%' }}
                        onChange={(e) => setConfig(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                  <br />
                </>
              )}
              <Grid item xs={12}>
                <Divider style={{ margin: '8px 0px' }} />
              </Grid>
              <Grid item xs={3}>
                <h4>FROM URL</h4>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  size="small"
                  error={isError}
                  helperText={isError && 'Invalid URL'}
                  variant="outlined"
                  label={`URL for ${configuration}`}
                  style={{ width: '100%' }}
                  onChange={(e) => setInput(e.target.value)}
                />
              </Grid>
            </Grid>
            {isFilter && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography variant="caption">---OR---</Typography>
              </div>
            )}
            {sourceType !== 'Helm Chart' && (
              <Grid container spacing={24} alignItems="center">
                <Grid item xs={3}>
                  <h4>UPLOAD FILE</h4>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    size="small"
                    variant="outlined"
                    label="Filename"
                    style={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <label htmlFor="upload-button">
                    <Button
                      disabled={sourceType === 'Helm Chart'}
                      variant="contained"
                      aria-label="Upload Button"
                      onChange={sourceType === 'Helm Chart' ? null : handleUploader}
                      component="span"
                    >
                      <input
                        id="upload-button"
                        type="file"
                        accept={fileType}
                        disabled={sourceType === 'Helm Chart'}
                        hidden
                        name="upload-button"
                      />
                      Browse
                    </Button>
                  </label>
                </Grid>
              </Grid>
            )}

            <Grid container spacing={24} alignItems="center">
              {isDesign && <h4>SELECT TYPE</h4>}
              {isDesign && (
                <>
                  <NativeSelect
                    defaultValue={0}
                    onChange={(e) => handleFileType(e.target.value)}
                    inputProps={{
                      name: 'name',
                      id: 'uncontrolled-native',
                    }}
                  >
                    {supportedTypes?.map((type, index) => (
                      <option key={index} value={index}>
                        {type.design_type}
                      </option>
                    ))}
                  </NativeSelect>
                </>
              )}
            </Grid>
          </DialogContent>
          <DialogActions>
            <label htmlFor="cancel">
              <Button variant="outlined" color="secondary" onClick={handleClose}>
                Cancel
              </Button>
            </label>
            <label htmlFor="URL">
              <Button
                id="URL"
                disabled={isError || !input}
                variant="contained"
                onClick={async (e) => {
                  await handleSubmit(e, handleUploader);
                  fetch?.();
                }}
              >
                Import
              </Button>
            </label>
          </DialogActions>
        </Dialog>
      </label>
    </>
  );
}

export default UploadImport;
