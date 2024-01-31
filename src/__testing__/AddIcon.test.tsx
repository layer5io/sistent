import { render } from '@testing-library/react';
import { AddIcon } from '../icons';

describe('AddIcon', () => {
  it('renders without errors', () => {
    render(<AddIcon width={24} height={24} />);
  });

  it('applies width and height', () => {
    const { getByTestId } = render(<AddIcon width={24} height={24} />);
    const svgElement = getByTestId('add-icon-svg');
    expect(svgElement.getAttribute('width')).toBe('24');
    expect(svgElement.getAttribute('height')).toBe('24');
  });
});
