import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import UserShareSearch from '../custom/UserSearchField/UserSearchField';
import { SistentThemeProvider } from '../theme';

// Regression guard for the Share Design people-picker against the v1beta3
// user construct. The searchable collaboration projection identifies users by
// `id` (the wire `userId` is a deprecated alias that newer providers omit)
// and may omit names/email on reduced projections. The picker must:
//   - display first/last name and email for searchable-projection rows
//   - fall back to username when a reduced projection omits names/email
//   - key selection/identity on `id`, not on the retired `userId`

type SearchProps = React.ComponentProps<typeof UserShareSearch>;

const v1beta3Jane = {
  id: 'b6e6d123-0000-4000-8000-000000000001',
  username: 'jdoe',
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane@example.com'
};

const publicOnlyUser = {
  id: 'b6e6d123-0000-4000-8000-000000000003',
  username: 'publico'
};

const makeUseGetAllUsersQuery =
  (users: unknown[]) => (_args: unknown, options?: { skip?: boolean }) => ({
    data: options?.skip ? undefined : { data: users },
    isLoading: false
  });

const renderSearch = (overrides: Partial<SearchProps> = {}) => {
  const props: SearchProps = {
    usersData: [],
    shareWithNewUsers: jest.fn().mockResolvedValue({ error: '' }),
    useGetAllUsersQuery: makeUseGetAllUsersQuery([v1beta3Jane, publicOnlyUser]),
    ...overrides
  };
  const utils = render(
    <SistentThemeProvider>
      <UserShareSearch {...props} />
    </SistentThemeProvider>
  );
  const input = screen.getByRole('combobox') as HTMLInputElement;
  return { props, input, ...utils };
};

const typeSearch = async (input: HTMLInputElement, value: string) => {
  fireEvent.change(input, { target: { value } });
  // the query is debounced by 300ms
  await waitFor(() => expect(screen.queryByText('jane@example.com')).not.toBeNull(), {
    timeout: 2000
  });
};

describe('UserShareSearch with v1beta3 user records', () => {
  it('displays name and email for searchable-projection rows', async () => {
    const { input } = renderSearch();

    await typeSearch(input, 'jane');

    expect(screen.queryByText('Jane Doe')).not.toBeNull();
    expect(screen.queryByText('jane@example.com')).not.toBeNull();
  });

  it('falls back to username for rows from reduced projections', async () => {
    const { input } = renderSearch();

    await typeSearch(input, 'p');

    expect(screen.queryByText('publico')).not.toBeNull();
  });

  it('selects and shares by canonical id when the wire userId is absent', async () => {
    const { props, input } = renderSearch();

    await typeSearch(input, 'jane');
    fireEvent.click(screen.getByText('Jane Doe'));

    fireEvent.click(screen.getByRole('button', { name: 'Share' }));

    await waitFor(() =>
      expect(props.shareWithNewUsers).toHaveBeenCalledWith([expect.objectContaining(v1beta3Jane)])
    );
  });

  it('does not resurface users that already have access', async () => {
    // Existing access list arrives as canonical v1beta3 records (id, no
    // userId); the suggestion list must recognize them as the same user.
    const { input } = renderSearch({
      usersData: [{ id: v1beta3Jane.id, email: v1beta3Jane.email }]
    });

    fireEvent.change(input, { target: { value: 'jane' } });

    await waitFor(() => expect(screen.queryByText('publico')).not.toBeNull(), { timeout: 2000 });
    expect(screen.queryByText('Jane Doe')).toBeNull();
  });
});
