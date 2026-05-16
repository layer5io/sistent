import { render } from '@testing-library/react';
import React from 'react';
import { StyledSearchBar } from '../custom/StyledSearchBar';
import { SistentThemeProvider } from '../theme';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<SistentThemeProvider>{ui}</SistentThemeProvider>);

const getInputRoot = (container: HTMLElement) =>
  container.querySelector('.MuiInputBase-root') as HTMLElement | null;

describe('StyledSearchBar', () => {
  it('defaults to fullWidth so existing callers keep their layout', () => {
    const { container } = renderWithTheme(<StyledSearchBar />);
    const root = getInputRoot(container);

    expect(root).not.toBeNull();
    expect(root?.className).toMatch(/MuiInputBase-fullWidth/);
  });

  it('drops the fullWidth class when fullWidth is false', () => {
    const { container } = renderWithTheme(<StyledSearchBar fullWidth={false} />);
    const root = getInputRoot(container);

    expect(root).not.toBeNull();
    expect(root?.className).not.toMatch(/MuiInputBase-fullWidth/);
  });

  it('lets callers control width via sx when fullWidth is false', () => {
    const { container } = renderWithTheme(
      <StyledSearchBar fullWidth={false} sx={{ width: 512 }} />
    );
    const root = getInputRoot(container);

    expect(root).not.toBeNull();
    // MUI converts numeric sx width to pixels; using a number here avoids
    // JSDOM's unstable rem→px normalization.
    expect(window.getComputedStyle(root as Element).width).toBe('512px');
  });
});
