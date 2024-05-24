// SistentIcon.test.tsx
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';
import { DEFAULT_WHITE_FILL } from '../constants/constants';
import SistentIcon from '../icons/SistentIcon';

describe('SistentIcon', () => {
  test('renders correctly with default props', () => {
    render(<SistentIcon size="medium" width={32} height={32} />);
    const iconElement = screen.getByRole('img');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveAttribute('width', 32);
    expect(iconElement).toHaveAttribute('height', 32);
    expect(iconElement).toHaveAttribute('fill', 'CHARCOAL_FILL');
  });

  test('renders correctly with custom props', () => {
    render(
      <SistentIcon
        size="large"
        fill="red"
        stroke="blue"
        strokeWidth={2}
        viewBox="0 0 24 24"
        data-testid="custom-icon"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </SistentIcon>
    );
    const iconElement = screen.getByTestId('custom-icon');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveAttribute('width', '40');
    expect(iconElement).toHaveAttribute('height', '40');
    expect(iconElement).toHaveAttribute('fill', 'red');
    expect(iconElement).toHaveAttribute('stroke', 'blue');
    expect(iconElement).toHaveAttribute('stroke-width', '2');
    expect(iconElement).toHaveAttribute('viewBox', '0 0 24 24');
  });

  test('renders correctly in dark mode', () => {
    const darkTheme = createTheme({
      palette: {
        mode: 'dark'
      }
    });
    render(
      <ThemeProvider theme={darkTheme}>
        <SistentIcon />
      </ThemeProvider>
    );
    const iconElement = screen.getByRole('img');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveAttribute('fill', DEFAULT_WHITE_FILL);
  });
});
