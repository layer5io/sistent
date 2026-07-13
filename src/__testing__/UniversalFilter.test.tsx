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
  Select: ({ children, value, onChange, 'data-testid': dataTestId }: any) => (
    // No MenuProps — the Select menu should portal to document.body (default)
    // so it positions correctly outside the Popper container.
    <select
      data-testid={dataTestId}
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

jest.mock('../base/DateTimePicker', () => ({
  DateTimePicker: ({ label, value, onChange, 'data-testid': testId }: any) => (
    <input
      aria-label={label}
      data-testid={testId}
      value={value instanceof Date ? value.toISOString() : ''}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        onChange(new Date(event.target.value))
      }
    />
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

    fireEvent.click(screen.getByRole('button', { name: 'Filter' }));

    const select = screen.getByTestId('universal-filter-select-status');

    fireEvent.change(select, { target: { value: 'enabled' } });

    expect(setSelectedFilters).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: 'Apply' }));

    expect(setSelectedFilters).toHaveBeenCalledWith({ status: 'enabled' });
    expect(handleApplyFilter).toHaveBeenCalledWith({ status: 'enabled' });
  });

  it('does not render date range controls when datePicker is not enabled', () => {
    renderWithTheme(
      <UniversalFilter
        filters={{}}
        selectedFilters={{}}
        setSelectedFilters={jest.fn()}
        handleApplyFilter={jest.fn()}
        variant="outlined"
        id="events-filter"
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Filter' }));

    expect(screen.queryByTestId('universal-filter-quick-range-select')).toBeNull();
    expect(screen.queryByTestId('universal-filter-start-date')).toBeNull();
  });

  it('applies a quick date range immediately, without requiring Apply', () => {
    const setSelectedDateRange = jest.fn();
    const lastWeekRange = {
      startDate: new Date('2024-01-01T00:00:00.000Z'),
      endDate: new Date('2024-01-08T00:00:00.000Z')
    };

    renderWithTheme(
      <UniversalFilter
        filters={{}}
        selectedFilters={{}}
        setSelectedFilters={jest.fn()}
        handleApplyFilter={jest.fn()}
        variant="outlined"
        id="events-filter"
        datePicker
        selectedDateRange={{
          startDate: new Date('2023-01-01T00:00:00.000Z'),
          endDate: new Date('2023-01-08T00:00:00.000Z')
        }}
        setSelectedDateRange={setSelectedDateRange}
        quickDateRanges={[{ label: 'Last week', getRange: () => lastWeekRange }]}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Filter' }));

    fireEvent.change(screen.getByTestId('universal-filter-quick-range-select'), {
      target: { value: 'Last week' }
    });

    expect(setSelectedDateRange).toHaveBeenCalledWith(lastWeekRange);
  });

  it('clamps the end date to the new start date when the start date moves past it', () => {
    const setSelectedDateRange = jest.fn();

    renderWithTheme(
      <UniversalFilter
        filters={{}}
        selectedFilters={{}}
        setSelectedFilters={jest.fn()}
        handleApplyFilter={jest.fn()}
        variant="outlined"
        id="events-filter"
        datePicker
        selectedDateRange={{
          startDate: new Date('2024-01-01T00:00:00.000Z'),
          endDate: new Date('2024-01-08T00:00:00.000Z')
        }}
        setSelectedDateRange={setSelectedDateRange}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Filter' }));

    fireEvent.change(screen.getByTestId('universal-filter-start-date'), {
      target: { value: '2024-01-15T00:00:00.000Z' }
    });

    expect(setSelectedDateRange).toHaveBeenCalledWith({
      startDate: new Date('2024-01-15T00:00:00.000Z'),
      endDate: new Date('2024-01-15T00:00:00.000Z')
    });
  });
});
