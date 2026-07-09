/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: () => false
}));

jest.mock('../base/Button', () => ({
  Button: ({ children, onClick, ...props }: any) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  )
}));

jest.mock('../base/ClickAwayListener', () => ({
  ClickAwayListener: ({ children }: any) => <div>{children}</div>
}));

jest.mock('../base/InputLabel', () => ({
  InputLabel: ({ children, ...props }: any) => <label {...props}>{children}</label>
}));

jest.mock('../base/MenuItem', () => ({
  MenuItem: ({ children, value, ...props }: any) => (
    <option value={value} {...props}>
      {children}
    </option>
  )
}));

jest.mock('../base/Paper', () => ({
  Paper: ({ children, ...props }: any) => <div {...props}>{children}</div>
}));

jest.mock('../base/Select', () => ({
  Select: ({ children, value, onChange, MenuProps, 'data-testid': dataTestId }: any) => (
    <select
      data-testid={dataTestId}
      data-disable-portal={String(Boolean(MenuProps?.disablePortal))}
      value={value}
      onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
        onChange?.({ target: { value: event.target.value } })
      }
    >
      {children}
    </select>
  )
}));

jest.mock('../custom/PopperListener', () => ({
  __esModule: true,
  default: ({ children, open }: any) => (open ? <div>{children}</div> : null)
}));

jest.mock('../custom/TooltipIconButton', () => ({
  TooltipIcon: ({ onClick, title }: any) => (
    <button aria-label={title} onClick={onClick}>
      {title}
    </button>
  )
}));

import UniversalFilter from '../custom/UniversalFilter';
import { SistentThemeProvider } from '../theme';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<SistentThemeProvider>{ui}</SistentThemeProvider>);

describe('UniversalFilter', () => {
  it('commits the latest draft filters only when Apply is clicked', () => {
    const setSelectedFilters = jest.fn();
    const handleApplyFilter = jest.fn();

    renderWithTheme(
      <UniversalFilter
        filters={{
          status: {
            name: 'Status',
            options: [{ label: 'Enabled', value: 'enabled' }]
          }
        }}
        selectedFilters={{ status: 'All' }}
        setSelectedFilters={setSelectedFilters}
        handleApplyFilter={handleApplyFilter}
        variant="outlined"
        id="users-filter"
      />
    );

    fireEvent.click(screen.getByTestId('universal-filter-trigger'));

    const select = screen.getByTestId('universal-filter-select-status');
    expect(select.getAttribute('data-disable-portal')).toBe('true');

    fireEvent.change(select, { target: { value: 'enabled' } });

    expect(setSelectedFilters).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: 'Apply' }));

    expect(setSelectedFilters).toHaveBeenCalledWith({ status: 'enabled' });
    expect(handleApplyFilter).toHaveBeenCalledWith({ status: 'enabled' });
  });
});
