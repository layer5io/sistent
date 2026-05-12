import { render, screen } from '@testing-library/react';
import React from 'react';
import { MenuItem, MenuList, Select } from '../base';
import { SistentThemeProvider } from '../theme';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<SistentThemeProvider>{ui}</SistentThemeProvider>);
};

describe('MenuItem', () => {
  it('renders as a standalone item without menu context', () => {
    renderWithTheme(<MenuItem>Standalone item</MenuItem>);

    expect(screen.getByRole('menuitem', { name: 'Standalone item' })).toBeTruthy();
  });

  it('renders inside MenuList without throwing', () => {
    renderWithTheme(
      <MenuList>
        <MenuItem>Nested item</MenuItem>
      </MenuList>
    );

    expect(screen.getByRole('menuitem', { name: 'Nested item' })).toBeTruthy();
  });

  it('renders as a Select option without throwing', () => {
    renderWithTheme(
      <Select value="standalone">
        <MenuItem value="standalone">Standalone option</MenuItem>
      </Select>
    );

    expect(screen.getByText('Standalone option')).toBeTruthy();
  });
});
