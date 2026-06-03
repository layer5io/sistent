import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { SistentThemeProvider } from '../../theme';
import UserSearchField from './UserSearchFieldInput';

// Regression guard for the user-picker type-ahead.
//
// The picker is a controlled MUI Autocomplete. In MUI v9 the
// `renderInput` params expose the native <input> wiring (value, onChange,
// onKeyDown, focus handlers and the anchor ref from `getInputProps`) under
// `params.slotProps.htmlInput`. If the TextField is handed an explicit
// `slotProps` object that omits `htmlInput`, that object REPLACES the one
// spread from `{...params}` and the input is silently disconnected from the
// Autocomplete: keystrokes no longer reach `onInputChange`, the search never
// fires and the suggestion list never opens. These tests assert the wiring
// survives so the type-ahead keeps working.

const renderWithTheme = (ui: React.ReactElement) =>
  render(<SistentThemeProvider>{ui}</SistentThemeProvider>);

const jane = {
  userId: 'u-jane',
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane@example.com'
};

const renderField = (overrides: Record<string, unknown> = {}) => {
  const props = {
    usersData: [],
    setUsersData: jest.fn(),
    currentUserData: null,
    searchedUsers: [jane],
    isUserSearchLoading: false,
    fetchSearchedUsers: jest.fn(),
    usersSearch: '',
    setUsersSearch: jest.fn(),
    ...overrides
  };
  const utils = renderWithTheme(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <UserSearchField {...(props as any)} />
  );
  const input = utils.container.querySelector('input') as HTMLInputElement;
  return { props, input, ...utils };
};

describe('UserSearchField type-ahead wiring', () => {
  it('forwards keystrokes to the search callback', () => {
    const { props, input } = renderField();

    fireEvent.change(input, { target: { value: 'jane' } });

    // Only reachable when the Autocomplete's htmlInput slot is forwarded to
    // the TextField; a dropped slot leaves the input inert and this stays 0.
    expect(props.fetchSearchedUsers).toHaveBeenCalledWith('jane');
  });

  it('opens the suggestion list with matching users as the query is typed', async () => {
    const { input } = renderField({ usersSearch: 'jane' });

    fireEvent.change(input, { target: { value: 'jane' } });

    await waitFor(() => {
      expect(screen.queryByText('jane@example.com')).not.toBeNull();
    });
    expect(screen.queryByText('Jane Doe')).not.toBeNull();
  });
});
