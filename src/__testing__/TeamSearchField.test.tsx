import { render, screen } from '@testing-library/react';
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
});
