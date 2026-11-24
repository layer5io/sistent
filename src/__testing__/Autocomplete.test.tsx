import { render } from '@testing-library/react';
import React from 'react';
import { TextField } from '../base';
import Autocomplete from '../base/Autocomplete/Autocomplete';
import { SistentThemeProvider } from '../theme';
import { MuiAutocomplete } from '../theme/components/autocomplete.modifier';
import { createCustomTheme } from '../theme/theme';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<SistentThemeProvider>{ui}</SistentThemeProvider>);

describe('Autocomplete dynamic label size', () => {
  const options = ['Option 1', 'Option 2'];

  it('defines dynamic font size and line height overrides for small and default sizes', () => {
    const rootOverride = MuiAutocomplete?.styleOverrides?.root;
    expect(typeof rootOverride).toBe('function');

    if (typeof rootOverride === 'function') {
      const smallStyles = (rootOverride as any)({ ownerState: { size: 'small' } });
      expect(smallStyles['& .MuiInputLabel-root']).toEqual({
        fontSize: '0.875rem',
        lineHeight: '1.25rem'
      });
      expect(smallStyles['& .MuiInputLabel-sizeSmall']).toEqual({
        fontSize: '0.875rem',
        lineHeight: '1.25rem'
      });

      const defaultStyles = (rootOverride as any)({ ownerState: { size: 'medium' } });
      expect(defaultStyles['& .MuiInputLabel-root']).toEqual({
        fontSize: '1rem',
        lineHeight: '1.75rem'
      });

      const undefinedSizeStyles = (rootOverride as any)({ ownerState: {} });
      expect(undefinedSizeStyles['& .MuiInputLabel-root']).toEqual({
        fontSize: '1rem',
        lineHeight: '1.75rem'
      });
    }
  });

  it('integrates dynamic label size override into the custom theme for both themes', () => {
    ['light', 'dark'].forEach((mode) => {
      const theme = createCustomTheme(mode as any);
      const rootOverride = theme.components?.MuiAutocomplete?.styleOverrides?.root;
      expect(typeof rootOverride).toBe('function');

      if (typeof rootOverride === 'function') {
        const small = (rootOverride as any)({ ownerState: { size: 'small' } });
        expect(small['& .MuiInputLabel-root']?.fontSize).toBe('0.875rem');
        expect(small['& .MuiInputLabel-root']?.lineHeight).toBe('1.25rem');

        const regular = (rootOverride as any)({ ownerState: { size: 'medium' } });
        expect(regular['& .MuiInputLabel-root']?.fontSize).toBe('1rem');
        expect(regular['& .MuiInputLabel-root']?.lineHeight).toBe('1.75rem');
      }
    });
  });

  it('renders autocomplete with regular label size by default', () => {
    const { container } = renderWithTheme(
      <Autocomplete
        options={options}
        renderInput={(params) => <TextField {...params} label="Standard Size" />}
      />
    );

    const label = container.querySelector('label');
    expect(label).not.toBeNull();
    expect(label?.textContent).toBe('Standard Size');
  });

  it('renders autocomplete with small dynamic label size when size is small', () => {
    const { container } = renderWithTheme(
      <Autocomplete
        size="small"
        options={options}
        renderInput={(params) => <TextField {...params} label="Small Size" />}
      />
    );

    const label = container.querySelector('label');
    expect(label).not.toBeNull();
    expect(label?.textContent).toBe('Small Size');
    expect(label?.classList.contains('MuiInputLabel-sizeSmall')).toBe(true);

    const rootOverride = MuiAutocomplete?.styleOverrides?.root;
    if (typeof rootOverride === 'function') {
      const smallStyles = (rootOverride as any)({ ownerState: { size: 'small' } });
      expect(smallStyles['& .MuiInputLabel-root']?.fontSize).toBe('0.875rem');
      expect(smallStyles['& .MuiInputLabel-root']?.lineHeight).toBe('1.25rem');
    }
  });
});
