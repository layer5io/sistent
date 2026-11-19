import { render, screen } from '@testing-library/react';
import React from 'react';
import { WidgetPicker } from '../custom/WidgetPicker';
import { createCustomTheme, ThemeProvider } from '../theme';

const noop = () => {};

const rgb = (hex: string | undefined) => {
  if (hex?.startsWith('rgb')) {
    return hex;
  }
  let value = String(hex).replace('#', '');
  if (value.length === 3) {
    value = value
      .split('')
      .map((character) => character + character)
      .join('');
  }
  const integer = parseInt(value, 16);
  return `rgb(${(integer >> 16) & 255}, ${(integer >> 8) & 255}, ${integer & 255})`;
};

const renderPicker = (
  props: Partial<React.ComponentProps<typeof WidgetPicker>> = {},
  {
    mode = 'light',
    customTheme,
    theme = createCustomTheme(mode, customTheme)
  }: {
    mode?: 'light' | 'dark';
    customTheme?: Parameters<typeof createCustomTheme>[1];
    theme?: ReturnType<typeof createCustomTheme>;
  } = {}
) => {
  render(
    <ThemeProvider theme={theme}>
      <WidgetPicker widgetsToAdd={[]} onAddWidget={noop} onClose={noop} {...props} />
    </ThemeProvider>
  );
  return theme;
};

const getHeader = () => screen.getByText('Widgets').parentElement as HTMLElement;

describe('WidgetPicker header colors', () => {
  it.each(['light', 'dark'] as const)(
    'keeps the neutral background.default / text.primary default in %s mode',
    (mode) => {
      const theme = renderPicker({}, { mode });

      expect(getComputedStyle(getHeader()).background).toBe(rgb(theme.palette.background.default));
      expect(getComputedStyle(screen.getByText('Widgets')).color).toBe(
        rgb(theme.palette.text.primary)
      );
    }
  );

  it.each(['light', 'dark'] as const)(
    'uses the tenant brand token and inverse text in %s mode when requested',
    (mode) => {
      const customTheme = {
        primary: '#663399',
        background: '#f0f0f0'
      };
      const theme = renderPicker({ headerPreset: 'brand' }, { mode, customTheme });

      expect(theme.palette.background.brand?.default).toBe('#663399');
      expect(getComputedStyle(getHeader()).background).toBe(
        rgb(theme.palette.background.brand?.default)
      );
      expect(getComputedStyle(screen.getByText('Widgets')).color).toBe(
        rgb(theme.palette.text.inverse)
      );
    }
  );

  it('falls back to primary.main when the brand background token is unavailable', () => {
    const theme = createCustomTheme('light');
    delete theme.palette.background.brand;
    renderPicker({ headerPreset: 'brand' }, { theme });

    expect(getComputedStyle(getHeader()).background).toBe(rgb(theme.palette.primary.main));
  });

  it('lets explicit header colors override the brand preset and colors the close icon too', () => {
    renderPicker({
      headerPreset: 'brand',
      headerBackgroundColor: '#123456',
      headerTextColor: '#fedcba'
    });

    expect(getComputedStyle(getHeader()).background).toBe('rgb(18, 52, 86)');
    expect(getComputedStyle(screen.getByText('Widgets')).color).toBe('rgb(254, 220, 186)');
    expect(
      screen.getByLabelText('Close widget picker').querySelector('svg')?.getAttribute('fill')
    ).toBe('#fedcba');
  });
});
