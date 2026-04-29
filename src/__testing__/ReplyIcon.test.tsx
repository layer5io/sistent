import { render } from '@testing-library/react';
import { ReplyIcon } from '../icons';

describe('ReplyIcon', () => {
  it('renders without errors', () => {
    render(<ReplyIcon width={24} height={24} />);
  });

  it('applies width and height', () => {
    const { getByTestId } = render(<ReplyIcon width={24} height={24} />);
    const svgElement = getByTestId('reply-icon-svg');
    expect(svgElement.getAttribute('width')).toBe('24');
    expect(svgElement.getAttribute('height')).toBe('24');
  });
});
