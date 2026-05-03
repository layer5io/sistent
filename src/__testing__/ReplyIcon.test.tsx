import { render } from '@testing-library/react';
import { ReplyIcon } from '../icons';

describe('ReplyIcon', () => {
  it('renders without errors', () => {
    render(<ReplyIcon width={24} height={24} />);
  });

  it('uses default width and height', () => {
    const { getByTestId } = render(<ReplyIcon />);
    const svgElement = getByTestId('reply-icon-svg');
    expect(svgElement.getAttribute('width')).toBe('24');
    expect(svgElement.getAttribute('height')).toBe('24');
  });

  it('applies custom width and height', () => {
    const { getByTestId } = render(<ReplyIcon width={32} height={32} />);
    const svgElement = getByTestId('reply-icon-svg');
    expect(svgElement.getAttribute('width')).toBe('32');
    expect(svgElement.getAttribute('height')).toBe('32');
  });
});
