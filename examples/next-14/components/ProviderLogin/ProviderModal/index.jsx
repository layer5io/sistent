import { useFetchProvidersQuery } from '@/lib/rtk-query/queries/provider';
import { providerData } from '@/pages/provider/providerData';
import {
  Box,
  CloseIcon,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  Typography,
  DARK_SHADE_GRAY,
  DialogActions,
  Button,
} from '@layer5/sistent';
import { ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import { Fragment } from 'react';

function ExternalLinkIcon({ width = 16, height = 16, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      width={width}
      height={height}
      {...props}
    >
      <g
        style={{
          stroke: 'gray',
          strokeWidth: 1,
        }}
      >
        <path d="M5 5v9m9-5v5m-9 0h9M5 5h4m1-3h7m0 0v7" />
        <path
          style={{
            strokeWidth: 1.5,
          }}
          d="m10 9 7-7"
        />
      </g>
    </svg>
  );
}

function ProviderDialogTitle({
  onClose,
  title,
  children,
  ...props
}) {
  const { ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#eee' }} {...other}>
      {title}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: '1rem',
            top: '1rem',
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

/**
 * Retrieve list of available providers
 *
 * Meshery or None
 *
 * @param param0
 * @returns
 */
function ProvidersAvailableList({ availableProviders }) {
  if (!Array.isArray(availableProviders)) {
    return null;
  }

  return (
    <Box>
      {availableProviders.map(
        (provider, index) => (
          <Box key={index} sx={{ marginBottom: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {provider.provider_name}
            </Typography>
            <List dense disablePadding>
              {provider.provider_description.map((desc, i) => (
                <ListItem dense disableGutters disablePadding key={i}>
                  <ListItemText primary={desc} />
                </ListItem>
              ))}
            </List>
          </Box>
        ),
      )}
    </Box>
  );
}

function ProviderList({
  providerData,
}) {
  return (
    <Box>
      {providerData.map((provider, index) => (
        <Box key={index} sx={{ marginBottom: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {provider.name}
          </Typography>
          <List dense disablePadding>
            {provider.description.map((desc, i) => (
              <ListItem dense disableGutters disablePadding key={i}>
                <ListItemText primary={desc} />
              </ListItem>
            ))}
          </List>
        </Box>
      ))}
    </Box>
  );
}

export const ProviderDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiDialogContentText-root > a': {
    color: DARK_SHADE_GRAY,
  },
}));

export const ProviderDialogActions = styled(DialogActions)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  background: '#eee',
  padding: theme.spacing(2),
  '& div > a': {
    color: DARK_SHADE_GRAY,
  },
}));

export const mesheryLoginText = `
Login to Meshery by choosing from the available providers.
Providers extend Meshery by offering various plugins and services,
including identity services, long-term persistence, advanced
performance analysis, multi-player user collaboration, and so on.
`;

export function ProviderModal({ open, handleClose }) {
  const { data: availableProviders = {}, isLoading, isError } = useFetchProvidersQuery({});

  return (
    <Fragment>
      <ProviderDialog
        open={open}
        onClose={handleClose}
        disableScrollLock={true}
        data-cy="providers-modal"
      >
        <ProviderDialogTitle title={' Choosing a Provider'} onClose={handleClose} />
        <DialogContent dividers>
          <DialogContentText>
            {mesheryLoginText}
            <Typography variant="h4">Available Providers</Typography>
            <ProvidersAvailableList availableProviders={availableProviders} />
            <ProviderList providerData={providerData} />
          </DialogContentText>
        </DialogContent>
        <ProviderDialogActions>
          <Link href="https://docs.meshery.io/extensibility/providers">
            Providers in Meshery Docs
          </Link>
          <ExternalLinkIcon />
          <Button
            onClick={handleClose}
            color="primary"
            data-cy="providers-modal-button-ok"
            variant="contained"
          >
            {' '}
            OK
          </Button>
        </ProviderDialogActions>
      </ProviderDialog>
    </Fragment>
  );
}

export default ProviderModal;
