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

  it('does not force width: 100% when fullWidth is false', () => {
    const { container } = renderWithTheme(<StyledSearchBar fullWidth={false} />);
    const root = getInputRoot(container);

    expect(root).not.toBeNull();
    expect(root?.className).not.toMatch(/MuiInputBase-fullWidth/);
    // The styled wrapper used to hardcode width: 100% which made siblings
    // wrap onto a new row inside flex toolbars (catalog, designs, views).
    // With fullWidth=false there must be no inline 100% width applied.
    expect(root?.style.width).toBe('');
  });

  it('lets callers control width via sx when fullWidth is false', () => {
    const { container } = renderWithTheme(
      <StyledSearchBar fullWidth={false} sx={{ width: '32rem' }} />
    );
    const root = getInputRoot(container);

    expect(root).not.toBeNull();
    expect(window.getComputedStyle(root as Element).width).toBe('32rem');
  });
});
