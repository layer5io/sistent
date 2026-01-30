import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import SearchBar, { SearchBarProps } from '../custom/SearchBar';
import { SistentThemeProvider } from '../theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<SistentThemeProvider>{component}</SistentThemeProvider>);
};

describe('SearchBar Component', () => {
  const defaultProps: SearchBarProps = {
    onSearch: jest.fn(),
    expanded: true,
    setExpanded: jest.fn(),
  };

  describe('Integration (onSearch + onKeyDown)', () => {
    it('should call onKeyDown when pressing Enter (onSearch not triggered yet)', () => {
      const onKeyDownMock = jest.fn();
      const onSearchMock = jest.fn();

      renderWithTheme(
        <SearchBar
          {...defaultProps}
          onKeyDown={onKeyDownMock}
          onSearch={onSearchMock}
          placeholder="Search"
        />
      );

      const input = screen.getByTestId('searchbar-input');

      fireEvent.change(input, { target: { value: 'test query' } });
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', keyCode: 13 });

      // Assertions
      expect(onKeyDownMock).toHaveBeenCalled(); // this is fine
      expect(onSearchMock).not.toHaveBeenCalled(); // Enter does not trigger onSearch yet
    });
  });
});
