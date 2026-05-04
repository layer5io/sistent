import { render } from '@testing-library/react';
import { TableChartIcon } from '../icons';

describe('TableChartIcon', () => {
  it('renders without errors', () => {
    render(<TableChartIcon width={24} height={24} />);
  });

  it('applies width and height', () => {
    const { getByTestId } = render(<TableChartIcon width={24} height={24} />);
    const svgElement = getByTestId('table-chart-icon-svg');
    expect(svgElement.getAttribute('width')).toBe('24');
    expect(svgElement.getAttribute('height')).toBe('24');
  });
});