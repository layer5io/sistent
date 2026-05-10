import { render } from '@testing-library/react';
import { InsertDriveFileIcon } from '../icons';

describe('InsertDriveFileIcon', () => {
  it('renders without errors', () => {
    render(<InsertDriveFileIcon width={24} height={24} />);
  });

  it('applies width and height', () => {
    const { getByTestId } = render(<InsertDriveFileIcon width={24} height={24} />);
    const svgElement = getByTestId('insert-drive-file-icon-svg');
    expect(svgElement.getAttribute('width')).toBe('24');
    expect(svgElement.getAttribute('height')).toBe('24');
  });
});
