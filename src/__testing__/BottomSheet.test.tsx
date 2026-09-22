import { render, screen } from '@testing-library/react';
import React from 'react';
import BottomSheet from '../custom/BottomSheet/BottomSheet';
import {
  createCustomTheme,
  readableTextColor,
  SistentThemeProvider,
  ThemeProvider
} from '../theme';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const noop = () => {};

const rgb = (hex: string | undefined) => {
  let h = String(hex).replace('#', '');
  if (h.length === 3)
    h = h
      .split('')
      .map((c) => c + c)
      .join('');
  const int = parseInt(h, 16);
  return `rgb(${(int >> 16) & 255}, ${(int >> 8) & 255}, ${int & 255})`;
};

/** The flex container that carries the resolved header `background`/`color`. */
const getHeader = () => screen.getByText('Test Title').parentElement as HTMLElement;

function renderSheet(
  props: Partial<React.ComponentProps<typeof BottomSheet>> = {},
  { mode = 'light' }: { mode?: 'light' | 'dark' } = {}
) {
  return render(
    <SistentThemeProvider initialMode={mode}>
      <BottomSheet open title="Test Title" onClose={noop} {...props}>
        <p>content</p>
      </BottomSheet>
    </SistentThemeProvider>
  );
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('BottomSheet header color resolution', () => {
  it('falls back to surface.tint for the background and light ink for the text', () => {
    const theme = createCustomTheme('light');
    renderSheet();

    const header = getHeader();
    expect(getComputedStyle(header).background).toContain('gradient');
    expect(getComputedStyle(header).color).toBe(rgb(theme.palette.common.white));
  });

  it('keeps the surface.tint header readable in dark mode (light ink, not text.inverse)', () => {
    const theme = createCustomTheme('dark');
    // In the dark palette text.inverse is near-black, which would be invisible
    // on the dark surface.tint gradient — the tint header must stay light.
    expect(rgb(theme.palette.text.inverse)).not.toBe(rgb(theme.palette.common.white));

    renderSheet({}, { mode: 'dark' });

    const header = getHeader();
    expect(getComputedStyle(header).background).toContain('gradient');
    expect(getComputedStyle(header).color).toBe(rgb(theme.palette.common.white));
  });

  it('falls back to background.default when the palette has no surface.tint', () => {
    const theme = createCustomTheme('light');
    delete (theme.palette.surface as { tint?: string }).tint;

    render(
      <ThemeProvider theme={theme}>
        <BottomSheet open title="Test Title" onClose={noop}>
          <p>content</p>
        </BottomSheet>
      </ThemeProvider>
    );

    const header = getHeader();
    expect(getComputedStyle(header).background).toBe(rgb(theme.palette.background.default));
    expect(getComputedStyle(header).color).toBe(rgb(theme.palette.text.default));
  });

  it('picks the light (inverse) ink for a dark custom background', () => {
    const theme = createCustomTheme('light');
    renderSheet({ headerBackgroundColor: '#121212' });

    const expected = readableTextColor(
      '#121212',
      theme.palette.text.inverse,
      theme.palette.text.default
    );
    expect(expected).toBe(theme.palette.text.inverse);
    expect(getComputedStyle(getHeader()).color).toBe(rgb(expected));
  });

  it('picks the dark (default) ink for a light custom background', () => {
    const theme = createCustomTheme('light');
    renderSheet({ headerBackgroundColor: '#f5f5f5' });

    const expected = readableTextColor(
      '#f5f5f5',
      theme.palette.text.inverse,
      theme.palette.text.default
    );
    expect(expected).toBe(theme.palette.text.default);
    expect(getComputedStyle(getHeader()).color).toBe(rgb(expected));
  });

  it('lets an explicit headerTextColor win over the computed ink', () => {
    renderSheet({ headerBackgroundColor: '#121212', headerTextColor: '#ff0000' });

    expect(getComputedStyle(getHeader()).color).toBe('rgb(255, 0, 0)');
  });

  it('applies the same resolved ink to the close-button icon', () => {
    renderSheet({ headerBackgroundColor: '#121212', headerTextColor: '#ff0000' });

    const icon = screen.getByLabelText('Close').querySelector('svg') as SVGElement;
    expect(getComputedStyle(icon).fill).toBe('#ff0000');
  });
});
