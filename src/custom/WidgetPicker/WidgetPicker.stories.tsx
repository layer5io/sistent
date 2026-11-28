import React from 'react';
import { Box } from '../../base';
import { SistentThemeProvider } from '../../theme';
import { WidgetPicker, type WidgetPickerHeaderPreset } from './WidgetPicker';

const meta = {
  title: 'Custom/WidgetPicker',
  component: WidgetPicker
};

export default meta;

type Story = { name?: string; render: () => React.ReactElement };

const Preview = ({
  mode,
  headerPreset,
  customTheme
}: {
  mode: 'light' | 'dark';
  headerPreset?: WidgetPickerHeaderPreset;
  customTheme?: { primary: string; background: string };
}): React.ReactElement => (
  <SistentThemeProvider initialMode={mode} customTheme={customTheme}>
    <Box sx={{ width: 360, height: 480, p: 2, bgcolor: 'background.default' }}>
      <WidgetPicker widgetsToAdd={[]} onAddWidget={() => undefined} headerPreset={headerPreset} />
    </Box>
  </SistentThemeProvider>
);

/** The neutral background.default / text.primary treatment is the effective default. */
export const LightDefault: Story = {
  name: 'Light mode — neutral default',
  render: () => <Preview mode="light" />
};

export const DarkDefault: Story = {
  name: 'Dark mode — neutral default',
  render: () => <Preview mode="dark" />
};

/** Opt in to the tenant's background.brand.default and inverse text colors. */
export const TenantBrandPreset: Story = {
  name: 'Tenant brand preset',
  render: () => (
    <Preview
      mode="light"
      headerPreset="brand"
      customTheme={{ primary: '#663399', background: '#f0f0f0' }}
    />
  )
};
