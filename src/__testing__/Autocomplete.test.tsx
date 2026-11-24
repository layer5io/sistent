import { render } from '@testing-library/react';
import React from 'react';
import { TextField } from '../base';
import Autocomplete from '../base/Autocomplete/Autocomplete';
import { SistentThemeProvider } from '../theme';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<SistentThemeProvider>{ui}</SistentThemeProvider>);

describe('Autocomplete dynamic label size', () => {
  const options = ['Option 1', 'Option 2'];

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
