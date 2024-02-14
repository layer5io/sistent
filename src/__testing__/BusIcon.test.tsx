import { render } from '@testing-library/react';
import { BusIcon } from '../icons';

describe('BusIcon', () => {
  it('renders without errors', () => {
    render(<BusIcon width={24} height={24} />);
  });

  it('applies width and height', () => {
    const { getByTestId } = render(<BusIcon width={24} height={24} />);
    const svgElement = getByTestId('bus-icon-svg');
    expect(svgElement.getAttribute('width')).toBe('24');
    expect(svgElement.getAttribute('height')).toBe('24');
  });
});
