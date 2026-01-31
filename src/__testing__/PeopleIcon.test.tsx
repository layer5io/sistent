import { render } from '@testing-library/react';
import { PeopleIcon } from '../icons';

describe('PeopleIcon', () => {
  it('renders without errors', () => {
    render(<PeopleIcon width={24} height={24} />);
  });

  it('applies width and height', () => {
    const { getByTestId } = render(<PeopleIcon width={24} height={24} />);
    const svgElement = getByTestId('people-icon-svg');
    expect(svgElement.getAttribute('width')).toBe('24');
    expect(svgElement.getAttribute('height')).toBe('24');
  });
});