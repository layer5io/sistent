import { render } from '@testing-library/react';
import { CodeIcon } from '../icons';

describe('CodeIcon', () => {
  it('renders without errors', () => {
    render(<CodeIcon width={24} height={24} />);
  });

  it('applies width and height', () => {
    const { getByTestId } = render(<CodeIcon width={24} height={24} />);
    const svgElement = getByTestId('code-icon-svg');
    expect(svgElement.getAttribute('width')).toBe('24');
    expect(svgElement.getAttribute('height')).toBe('24');
  });
});
