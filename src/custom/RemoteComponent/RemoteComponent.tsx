import React, { ReactNode } from 'react';
import {
  createUseRemoteComponent,
  getDependencies,
  createRequires,
} from '@paciolan/remote-component';
import { CircularProgress, Typography, Box } from '@mui/material';

const requires = createRequires(getDependencies);
const useRemoteComponent = createUseRemoteComponent({ requires });

export interface RemoteComponentUrl {
  url: string;
}

export interface RemoteComponentProps {
  url: RemoteComponentUrl;
  loaderType?: 'circular' | 'default';
  fallback?: ReactNode;
  [key: string]: unknown;
}

const DefaultLoader = ({ loaderType }: { loaderType?: 'circular' | 'default' }) => {
  if (loaderType === 'circular') {
    return null;
  }
  return (
    <Box
      sx={{
        textAlign: 'center',
        marginTop: 'calc(50vh - 141px)',
        transform: 'translateY(-50%)',
      }}
      data-testid="page-loader"
    >
      <CircularProgress size={100} sx={{ margin: '4px 0px 8px' }} />
      <Typography variant="caption" component="div">
        Establishing Remote Connection
      </Typography>
    </Box>
  );
};

export const RemoteComponent: React.FC<RemoteComponentProps> = ({ url, loaderType, fallback, ...props }) => {
  const [loading, err, RemoteComponentInstance] = useRemoteComponent(url.url);

  if (loading) {
    if (fallback) {
      return <>{fallback}</>;
    }
    return <DefaultLoader loaderType={loaderType} />;
  }

  if (err != null) {
    console.error(`Extension Error: ${err.toString()}`);
    return <></>;
  }

  return (
    <div>
      <RemoteComponentInstance {...props} />
    </div>
  );
};

export default RemoteComponent;
