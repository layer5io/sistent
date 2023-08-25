import { render } from '@testing-library/react';
import { ApplicationIcon } from '../icons';

describe('ApplicationIcon', () => {
  it('renders without errors', () => {
    render(<ApplicationIcon width={24} height={24} />);
  });

  it('applies width and height', () => {
    const { getByTestId } = render(<ApplicationIcon width={24} height={24} />);
    const svgElement = getByTestId('application-icon-svg');
    expect(svgElement.getAttribute('width')).toBe('24');
    expect(svgElement.getAttribute('height')).toBe('24');
  });
});
