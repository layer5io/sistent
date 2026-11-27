import React from 'react';
import { Box } from '../../base';
import { SistentThemeProvider } from '../../theme';
import ConnectionChip from './ConnectionChip';

/**
 * Sistent does not yet ship a Storybook runner, so these stories are authored
 * in standard CSF3 (a default `meta` export plus named story exports) and can
 * be dropped into a Storybook once one is configured. The chip takes its
 * colors from theme tokens, so each story renders it on the page background of
 * one palette mode; `src/__testing__/ConnectionChip.test.tsx` pins the same
 * tokens headlessly.
 */
const meta = {
  title: 'Custom/ConnectionChip',
  component: ConnectionChip
};

export default meta;

type Story = { name?: string; render: () => React.ReactElement };

const ChipRow = ({ mode }: { mode: 'light' | 'dark' }): React.ReactElement => (
  <SistentThemeProvider initialMode={mode}>
    <Box
      sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 3, bgcolor: 'background.default' }}
    >
      <ConnectionChip tooltip="Cluster connection" label="kind-meshery" />
      <ConnectionChip tooltip="Clickable connection" label="minikube" onClick={() => undefined} />
      <ConnectionChip tooltip="Removable connection" label="eks-prod" onDelete={() => undefined} />
    </Box>
  </SistentThemeProvider>
);

export const Light: Story = { name: 'Light mode', render: () => <ChipRow mode="light" /> };

export const Dark: Story = { name: 'Dark mode', render: () => <ChipRow mode="dark" /> };
