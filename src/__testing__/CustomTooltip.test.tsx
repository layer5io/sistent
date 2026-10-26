import { render, screen } from '@testing-library/react';
import React from 'react';
import CustomTooltip from '../custom/CustomTooltip/customTooltip';
import { createCustomTheme, ThemeProvider, useTheme } from '../theme';

// CustomTooltip -> Markdown -> react-markdown (ESM-only) is excluded by jest's
// transformIgnorePatterns allowlist, so those leaf modules are stubbed.
jest.mock('react-markdown', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));
jest.mock('remark-gfm', () => ({ __esModule: true, default: () => {} }));
jest.mock('rehype-raw', () => ({ __esModule: true, default: () => {} }));

const ModeProbe = () => <span data-testid="mode">{useTheme().palette.mode}</span>;

const renderTooltip = (pageMode: 'light' | 'dark', bgColor?: string) =>
  render(
    <ThemeProvider theme={createCustomTheme(pageMode)}>
      <CustomTooltip title={<ModeProbe />} open bgColor={bgColor}>
        <button>anchor</button>
      </CustomTooltip>
    </ThemeProvider>
  );

describe('CustomTooltip theme context', () => {
  it('resolves tooltip content against dark on the default dark surface of a light page', async () => {
    renderTooltip('light');
    expect((await screen.findByTestId('mode')).textContent).toBe('dark');
  });

  it('keeps the page theme when it already matches the surface', async () => {
    renderTooltip('dark');
    expect((await screen.findByTestId('mode')).textContent).toBe('dark');
  });

  it('follows a light bgColor rather than assuming dark', async () => {
    renderTooltip('dark', '#ffffff');
    expect((await screen.findByTestId('mode')).textContent).toBe('light');
  });
});
