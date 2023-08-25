import { render } from '@testing-library/react';
import CircleIcon from './CircleIcon';

describe('CircleIcon', () => {
  it('renders without errors', () => {
    render(<CircleIcon width={24} height={24} />);
  });

  it('applies width and height', () => {
    const { getByTestId } = render(<CircleIcon width={24} height={24} />)
    const svgElement = getByTestId('bus-icon-svg')
    expect(svgElement.getAttribute('width')).toBe('24');
    expect(svgElement.getAttribute('height')).toBe('24');
  })
});