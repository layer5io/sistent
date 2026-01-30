import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { StyledSearchBar } from '../custom/StyledSearchBar';
import { SistentThemeProvider } from '../theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<SistentThemeProvider>{component}</SistentThemeProvider>);
};

describe('StyledSearchBar', () => {
  describe('onKeyDown functionality', () => {
    it('should call onKeyDown handler when key is pressed', () => {
      const onKeyDownMock = jest.fn();
      const onChangeMock = jest.fn();

      renderWithTheme(
        <StyledSearchBar
          value=""
          onChange={onChangeMock}
          onKeyDown={onKeyDownMock}
          placeholder="Search"
        />
      );

      const input = screen.getByRole('searchbox');
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', keyCode: 13 });

      expect(onKeyDownMock).toHaveBeenCalledTimes(1);
    });

    it('should handle Escape key to clear search', () => {
      const onKeyDownMock = jest.fn((event) => {
        if (event.key === 'Escape') {
          // Simulate clearing logic
          event.preventDefault();
        }
      });
      const onChangeMock = jest.fn();

      renderWithTheme(
        <StyledSearchBar
          value="test"
          onChange={onChangeMock}
          onKeyDown={onKeyDownMock}
          placeholder="Search"
        />
      );

      const input = screen.getByRole('searchbox');
      fireEvent.keyDown(input, { key: 'Escape', code: 'Escape', keyCode: 27 });

      expect(onKeyDownMock).toHaveBeenCalled();
      const event = onKeyDownMock.mock.calls[0][0];
      expect(event.key).toBe('Escape');
    });
  });
});
