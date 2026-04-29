import { render } from '@testing-library/react';
import { ExpandLessIcon } from '../icons';

describe('ExpandLessIcon', () => {
  it('renders without errors', () => {
    render(<ExpandLessIcon width={24} height={24} />);
  });

  it('applies width and height', () => {
    const { getByTestId } = render(<ExpandLessIcon width={24} height={24} />);
    const svgElement = getByTestId('expandless-icon-svg');
    expect(svgElement.getAttribute('width')).toBe('24');
    expect(svgElement.getAttribute('height')).toBe('24');
  });
});
