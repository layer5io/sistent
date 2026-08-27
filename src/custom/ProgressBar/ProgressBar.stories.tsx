import { SnackbarProvider } from 'notistack';
import React, { useEffect, useState } from 'react';
import { Button } from '../../base';
import { SistentThemeProvider } from '../../theme';
import { ProgressBar } from './ProgressBar';
import { useProgressBar } from './useProgressBar';

const meta = {
  title: 'Custom/ProgressBar',
  component: ProgressBar
};

export default meta;

type Story = { name?: string; render: () => React.ReactElement };

// Linear determinate with live updates
const LinearDeterminateDemo = (): React.ReactElement => {
  const { show, update, close } = useProgressBar();
  const [activeKey, setActiveKey] = useState<string | number | null>(null);

  const handleStart = () => {
    const key = show({ message: 'Uploading files...', progress: 0, persist: true });
    setActiveKey(key);
    let p = 0;
    const id = setInterval(() => {
      p += 10;
      if (p > 100) {
        clearInterval(id);
        close(key);
        setActiveKey(null);
        return;
      }
      update(key, { progress: p, message: `Uploading files... ${p}%` });
    }, 400);
  };

  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <Button variant="contained" onClick={handleStart} disabled={activeKey !== null}>
        Start linear upload
      </Button>
      {activeKey !== null && (
        <Button variant="outlined" onClick={() => activeKey !== null && close(activeKey)}>
          Dismiss
        </Button>
      )}
    </div>
  );
};

const LinearIndeterminateDemo = (): React.ReactElement => {
  const { show, close } = useProgressBar();
  const [key, setKey] = useState<string | number | null>(null);
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <Button
        variant="contained"
        onClick={() => {
          const k = show({ message: 'Processing...', persist: true });
          setKey(k);
        }}
        disabled={key !== null}
      >
        Show indeterminate
      </Button>
      {key !== null && (
        <Button
          variant="outlined"
          onClick={() => {
            close(key);
            setKey(null);
          }}
        >
          Dismiss
        </Button>
      )}
    </div>
  );
};

const CircularDemo = (): React.ReactElement => {
  const { show, update, close } = useProgressBar();
  const handleClick = () => {
    const k = show({ message: 'Syncing...', progress: 0, variant: 'circular', persist: true });
    let p = 0;
    const id = setInterval(() => {
      p += 15;
      if (p > 100) {
        clearInterval(id);
        close(k);
        return;
      }
      update(k, { progress: p });
    }, 350);
  };
  return (
    <Button variant="contained" onClick={handleClick}>
      Start circular progress
    </Button>
  );
};

// Direct render of ProgressBar without enqueueSnackbar (visual QA only) — still requires SnackbarProvider because ProgressBar uses useSnackbar()
const StandaloneDemo = (): React.ReactElement => {
  const [progress, setProgress] = useState(35);
  useEffect(() => {
    const id = setInterval(() => setProgress((prev) => (prev >= 100 ? 0 : prev + 5)), 600);
    return () => clearInterval(id);
  }, []);
  return (
    <SnackbarProvider maxSnack={3}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 520 }}>
        {/* Standalone preview - ProgressBar normally renders via enqueueSnackbar; this shows the visual only */}
        <div style={{ border: '1px dashed #ccc', padding: 12, borderRadius: 8 }}>
          <p style={{ margin: '0 0 8px', fontSize: 12, color: '#666' }}>
            Standalone preview (without snackbar positioning):
          </p>
          <ProgressBar
            id="preview-linear"
            message="Uploading design..."
            progress={progress}
            variant="linear"
          />
          <div style={{ height: 12 }} />
          <ProgressBar
            id="preview-circular"
            message="Syncing workspace..."
            progress={progress}
            variant="circular"
          />
          <div style={{ height: 12 }} />
          <ProgressBar id="preview-indeterminate" message="Processing..." variant="linear" />
        </div>
      </div>
    </SnackbarProvider>
  );
};

const WithProvider = (children: React.ReactElement): React.ReactElement => (
  <SistentThemeProvider>
    <SnackbarProvider maxSnack={3} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
      {children}
    </SnackbarProvider>
  </SistentThemeProvider>
);

export const LinearDeterminate: Story = {
  name: 'Linear - determinate (updatable)',
  render: () => WithProvider(<LinearDeterminateDemo />)
};

export const LinearIndeterminate: Story = {
  name: 'Linear - indeterminate (persistent)',
  render: () => WithProvider(<LinearIndeterminateDemo />)
};

export const Circular: Story = {
  name: 'Circular - determinate (updatable)',
  render: () => WithProvider(<CircularDemo />)
};

export const Standalone: Story = {
  name: 'Standalone preview',
  render: () => (
    <SistentThemeProvider>
      <StandaloneDemo />
    </SistentThemeProvider>
  )
};
