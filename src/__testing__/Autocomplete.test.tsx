import { render } from '@testing-library/react';
import React from 'react';
import { TextField } from '../base';
import Autocomplete from '../base/Autocomplete/Autocomplete';
import { SistentThemeProvider } from '../theme';
import { MuiAutocomplete } from '../theme/components/autocomplete.modifier';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<SistentThemeProvider>{ui}</SistentThemeProvider>);

describe('Autocomplete dynamic label size', () => {
  const options = ['Option 1', 'Option 2'];

  it('defines dynamic font size and line height overrides for small and default sizes', () => {
    const rootOverride = MuiAutocomplete?.styleOverrides?.root;
    expect(typeof rootOverride).toBe('function');

    if (typeof rootOverride === 'function') {
      const smallStyles = (rootOverride as any)({ ownerState: { size: 'small' } });
      expect(smallStyles['& .MuiInputLabel-root']?.fontSize).toBe('0.875rem');
      expect(smallStyles['& .MuiInputLabel-root']?.lineHeight).toBe('1.25rem');
      expect(smallStyles['& .MuiInputLabel-sizeSmall']?.fontSize).toBe('0.875rem');
      expect(smallStyles['& .MuiInputLabel-sizeSmall']?.lineHeight).toBe('1.25rem');

      const defaultStyles = (rootOverride as any)({ ownerState: { size: 'medium' } });
      expect(defaultStyles['& .MuiInputLabel-root']?.fontSize).toBe('1rem');
      expect(defaultStyles['& .MuiInputLabel-root']?.lineHeight).toBe('1.75rem');

      const undefinedSizeStyles = (rootOverride as any)({ ownerState: {} });
      expect(undefinedSizeStyles['& .MuiInputLabel-root']?.fontSize).toBe('1rem');
      expect(undefinedSizeStyles['& .MuiInputLabel-root']?.lineHeight).toBe('1.75rem');
    }
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
  });
});
