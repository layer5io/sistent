import { render } from '@testing-library/react';
import { MoreHorizIcon } from '../icons';

describe('MoreHorizIcon', () => {
  it('renders without errors', () => {
    render(<MoreHorizIcon width={24} height={24} />);
  });

  it('applies width and height', () => {
    const { getByTestId } = render(<MoreHorizIcon width={24} height={24} />);
    const svgElement = getByTestId('morehoriz-icon-svg');
    expect(svgElement.getAttribute('width')).toBe('24');
    expect(svgElement.getAttribute('height')).toBe('24');
  });
});
