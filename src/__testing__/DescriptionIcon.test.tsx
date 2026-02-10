import { render } from '@testing-library/react';
import { DescriptionIcon } from '../icons';

describe('DescriptionIcon', () => {
  it('renders without errors', () => {
    render(<DescriptionIcon width={24} height={24} />);
  });

  it('applies width and height', () => {
    const { getByTestId } = render(<DescriptionIcon width={24} height={24} />);
    const svgElement = getByTestId('description-icon-svg');
    expect(svgElement.getAttribute('width')).toBe('24');
    expect(svgElement.getAttribute('height')).toBe('24');
  });
});
