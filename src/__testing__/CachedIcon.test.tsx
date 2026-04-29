import { render } from '@testing-library/react';
import { CachedIcon } from '../icons';

describe('CachedIcon', () => {
  it('renders without errors', () => {
    render(<CachedIcon width={24} height={24} />);
  });

  it('applies width and height', () => {
    const { getByTestId } = render(<CachedIcon width={24} height={24} />);
    const svgElement = getByTestId('cached-icon-svg');
    expect(svgElement.getAttribute('width')).toBe('24');
    expect(svgElement.getAttribute('height')).toBe('24');
  });
});
