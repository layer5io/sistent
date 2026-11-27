import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import React, { useState } from 'react';
import TeamSearchField, {
  Team
} from '../custom/DashboardWidgets/GettingStartedWidget/TeamSearchField';
import { SistentThemeProvider } from '../theme';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<SistentThemeProvider>{ui}</SistentThemeProvider>);

describe('TeamSearchField', () => {
  const mockTeams = [
    { id: 'team-1', name: 'Alpha Team' },
    { id: 'team-2', name: 'Beta Team' }
  ];

  const mockUseLazyGetTeamsQuery = () => [
    jest.fn().mockReturnValue({
      unwrap: () => Promise.resolve({ teams: mockTeams })
    }),
    { isLoading: false }
  ];

  const mockUseNotificationHandlers = () => ({
    handleError: jest.fn()
  });

  const WrapperComponent: React.FC<{ initialTeams?: Team[] }> = ({ initialTeams = [] }) => {
    const [teams, setTeams] = useState<Team[]>(initialTeams);

    return (
      <TeamSearchField
        teamsData={teams}
        setTeamsData={setTeams}
        orgID="test-org"
        useLazyGetTeamsQuery={mockUseLazyGetTeamsQuery}
        useNotificationHandlers={mockUseNotificationHandlers}
      />
    );
  };

  it('renders the team search field input', () => {
    renderWithTheme(<WrapperComponent />);
    expect(screen.getByLabelText('Add Team')).not.toBeNull();
  });

  it('renders existing teams as chips', () => {
    renderWithTheme(<WrapperComponent initialTeams={[{ id: 'team-1', name: 'Alpha Team' }]} />);
    expect(screen.getByText('Alpha Team')).not.toBeNull();
  });

  it('filters out already-selected teams from suggestions list', async () => {
    renderWithTheme(<WrapperComponent initialTeams={[{ id: 'team-1', name: 'Alpha Team' }]} />);

    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'Team' } });

    await waitFor(
      () => {
        expect(screen.queryByRole('listbox')).not.toBeNull();
      },
      { timeout: 1500 }
    );

    const listbox = screen.getByRole('listbox');
    expect(within(listbox).queryByText('Beta Team')).not.toBeNull();
    expect(within(listbox).queryByText('Alpha Team')).toBeNull();
  });

  it('removes a selected team from available options when picked', async () => {
    renderWithTheme(<WrapperComponent />);

    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'Team' } });

    await waitFor(
      () => {
        expect(screen.queryByRole('listbox')).not.toBeNull();
      },
      { timeout: 1500 }
    );

    let listbox = screen.getByRole('listbox');
    expect(within(listbox).queryByText('Alpha Team')).not.toBeNull();
    expect(within(listbox).queryByText('Beta Team')).not.toBeNull();

    // Select Alpha Team
    fireEvent.click(within(listbox).getByText('Alpha Team'));

    // Assert it now renders as a chip
    expect(screen.getByText('Alpha Team')).not.toBeNull();

    // Open options again and assert Alpha Team is excluded
    fireEvent.change(input, { target: { value: 'Team' } });

    await waitFor(
      () => {
        expect(screen.queryByRole('listbox')).not.toBeNull();
      },
      { timeout: 1500 }
    );

    listbox = screen.getByRole('listbox');
    expect(within(listbox).queryByText('Beta Team')).not.toBeNull();
    expect(within(listbox).queryByText('Alpha Team')).toBeNull();
  });
});
