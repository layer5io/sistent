import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import UserSearchField from '../custom/UserSearchField/UserSearchFieldInput';
import { SistentThemeProvider } from '../theme';

// Regression guard for the user-picker type-ahead.
//
// The picker is a controlled MUI Autocomplete. In MUI v9 the `renderInput`
// params expose the native <input> wiring (value, onChange, onKeyDown, focus
// handlers and the anchor ref from `getInputProps`) under
// `params.slotProps.htmlInput`. If the TextField is handed an explicit
// `slotProps` object that omits `htmlInput`, that object REPLACES the one
// spread from `{...params}` and the input is silently disconnected from the
// Autocomplete: keystrokes no longer reach `onInputChange`, the search never
// fires and the suggestion list never opens. These tests assert the wiring
// survives so the type-ahead keeps working.

type FieldProps = React.ComponentProps<typeof UserSearchField>;

const renderWithTheme = (ui: React.ReactElement) =>
  render(<SistentThemeProvider>{ui}</SistentThemeProvider>);

const jane = {
  userId: 'u-jane',
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane@example.com'
};

const renderField = (overrides: Partial<FieldProps> = {}) => {
  const props: FieldProps = {
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
  const utils = renderWithTheme(<UserSearchField {...props} />);
  const input = screen.getByRole('combobox') as HTMLInputElement;
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

describe('UserSearchField v1beta3 user records', () => {
  // The v1beta3 user construct identifies users by `id` (the wire `userId` is
  // a deprecated alias) and reduced projections may carry only a username.
  const v1beta3Alex = {
    id: 'u-alex',
    username: 'alex',
    firstName: 'Alex',
    lastName: 'Rivera',
    email: 'alex@example.com'
  };
  const usernameOnly = { id: 'u-min', username: 'minimal-user' };

  it('renders and matches records that carry only the canonical id', async () => {
    const { input } = renderField({
      usersSearch: 'a',
      searchedUsers: [v1beta3Alex, usernameOnly],
      // same person as v1beta3Alex, but shaped like a legacy record
      currentUserData: { userId: 'u-alex' }
    });

    fireEvent.change(input, { target: { value: 'a' } });

    // current user is filtered out via id<->userId identity matching
    await waitFor(() => {
      expect(screen.queryByText('minimal-user')).not.toBeNull();
    });
    expect(screen.queryByText('Alex Rivera')).toBeNull();
  });

  it('renders soft-deleted v1beta3 records (deletedAt) as deleted options', async () => {
    // v1beta3 signals soft deletion via `deletedAt`, not the component-local
    // `deleted` boolean; both must render the "(deleted)" treatment.
    const deletedByTimestamp = {
      id: 'u-gone',
      email: 'gone@example.com',
      deletedAt: '2026-01-01T00:00:00Z'
    };
    const { input } = renderField({
      usersSearch: 'gone',
      searchedUsers: [deletedByTimestamp]
    });

    fireEvent.change(input, { target: { value: 'gone' } });

    await waitFor(() => {
      expect(screen.queryByText('gone@example.com (deleted)')).not.toBeNull();
    });
  });

  it('keeps MUI-generated option ids so aria-activedescendant resolves', async () => {
    // renderOption must spread the Autocomplete-provided props untouched:
    // overriding the option `id` with the user identifier orphans the
    // input's aria-activedescendant reference and breaks keyboard focus.
    const { input } = renderField({
      usersSearch: 'a',
      searchedUsers: [v1beta3Alex, usernameOnly]
    });

    fireEvent.change(input, { target: { value: 'a' } });
    await waitFor(() => {
      expect(screen.getAllByRole('option').length).toBeGreaterThan(0);
    });

    fireEvent.keyDown(input, { key: 'ArrowDown' });

    const activeDescendant = input.getAttribute('aria-activedescendant');
    expect(activeDescendant).toBeTruthy();
    const highlighted = document.getElementById(activeDescendant as string);
    expect(highlighted).not.toBeNull();
    expect(highlighted?.getAttribute('role')).toBe('option');
  });
});
