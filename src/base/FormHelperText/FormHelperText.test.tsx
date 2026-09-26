import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import FormHelperText from './FormHelperText';

describe('FormHelperText Component', () => {
  it('renders children correctly', () => {
    render(<FormHelperText>Sample Helper Text</FormHelperText>);
    expect(screen.getByText('Sample Helper Text')).toBeInTheDocument();
  });

  it('forwards ref correctly to the underlying HTML element', () => {
    const ref = React.createRef<HTMLParagraphElement>();
    render(<FormHelperText ref={ref}>Ref Attached Text</FormHelperText>);
    expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
    expect(ref.current?.textContent).toBe('Ref Attached Text');
  });

  it('renders with custom component prop', () => {
    render(<FormHelperText component="span">Span Helper Text</FormHelperText>);
    const element = screen.getByText('Span Helper Text');
    expect(element.tagName).toBe('SPAN');
    expect(element).toBeInTheDocument();
  });

  it('applies custom className and props', () => {
    render(
      <FormHelperText data-testid="custom-helper" className="custom-class" error>
        Error state text
      </FormHelperText>
    );
    const element = screen.getByTestId('custom-helper');
    expect(element).toHaveClass('custom-class');
    expect(element).toHaveClass('Mui-error');
  });
});
