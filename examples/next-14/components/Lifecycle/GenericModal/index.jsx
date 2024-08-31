import DialogTooltip from './DialogTooltip';
import {
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  CloseIcon,
  Grid,
  DialogContent,
} from '@layer5/sistent';

const CustomDialog = styled(Dialog)({
  '& .MuiDialogTitle-root': {
    backgroundColor: theme.palette.secondary.mainBackground,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '12px 20px',
    gap: '146px',
    color: theme.palette.secondary.white,
    textAlign: 'center',
    textOverflow: 'ellipsis',
    '& h2': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  },
  '& .closing': {
    transform: 'rotate(-90deg)',
    '&:hover': {
      transform: 'rotate(90deg)',
      transition: 'all .3s ease-in',
      cursor: 'pointer',
    },
  },
  '& .modalActions': {
    padding: '1rem 1.5rem',
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    gap: '10px',
  },
});

const GenericModal = ({
  open,
  handleClose,
  title,
  body,
  selector,
  action,
  buttonTitle,
  leftHeaderIcon,
  actionBtnIcon,
  hideFooter = false,
  disabled = false,
  helpText,
  maxWidth = 'xs',
}) => {
  return (
    <CustomDialog
      fullWidth={true}
      maxWidth={maxWidth}
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <DialogTitle textAlign="center" id="form-dialog-title">
        {leftHeaderIcon && (
          <div style={{ display: 'flex', alignItems: 'center' }}>{leftHeaderIcon}</div>
        )}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" component="h6">
            {title}
          </Typography>
          {selector ? selector : null}
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {helpText && (
            <DialogTooltip title={helpText}>
              <IconButton>
                <HelpOutlineIcon
                  height={'2rem'}
                  wdith={'2rem'}
                  fill={theme.palette.secondary.primaryModalText}
                />
              </IconButton>
            </DialogTooltip>
          )}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            component="button"
            className="closing"
            style={{
              color: theme.palette.secondary.primaryModalText,
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent style={{ padding: '1.5rem' }}>{body}</DialogContent>
      {!hideFooter && (
        <DialogActions
          style={{
            justifyContent: 'space-evenly',
            marginBottom: '0.5rem',
          }}
        >
          <Grid className="modalActions">
            <Button variant="outlined" onClick={handleClose} className="copyButton">
              Cancel
            </Button>
            <Button
              title={buttonTitle ? buttonTitle : 'Submit'}
              variant="contained"
              color="primary"
              className="submitButton"
              disabled={disabled}
              onClick={action}
            >
              {actionBtnIcon && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginRight: '0.27rem',
                    color: theme.palette.primaryModalText,
                  }}
                >
                  {actionBtnIcon}
                </div>
              )}
              <span className="btnText">{buttonTitle ? buttonTitle : 'Submit'}</span>
            </Button>
          </Grid>
        </DialogActions>
      )}
    </CustomDialog>
  );
};

export default GenericModal;
