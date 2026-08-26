import { render } from '@testing-library/react';
import React from 'react';
import { createIcon } from '../icons/createIcon';
import { SistentThemeProviderWithoutBaseLine } from '../theme';

function renderWithTheme(ui: React.ReactElement) {
  return render(
    <SistentThemeProviderWithoutBaseLine>{ui}</SistentThemeProviderWithoutBaseLine>
  );
}

describe('createIcon', () => {
  it('creates an icon with d string path definition', () => {
    const TestIcon = createIcon({
      displayName: 'TestPathIcon',
      d: 'M10 10 H 90 V 90 H 10 Z'
    });

    expect(TestIcon.displayName).toBe('TestPathIcon');

    const { container } = renderWithTheme(<TestIcon />);
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg?.getAttribute('viewBox')).toBe('0 0 24 24');
    expect(svg?.getAttribute('width')).toBe('24');
    expect(svg?.getAttribute('height')).toBe('24');
    expect(svg?.getAttribute('fill')).toBe('currentColor');

    const path = container.querySelector('path');
    expect(path).not.toBeNull();
    expect(path?.getAttribute('d')).toBe('M10 10 H 90 V 90 H 10 Z');
    expect(path?.getAttribute('fill')).toBe('currentColor');
  });

  it('creates an icon with path element (ReactNode)', () => {
    const CustomIcon = createIcon({
      displayName: 'CustomCircleIcon',
      viewBox: '0 0 50 50',
      path: <circle cx="25" cy="25" r="20" data-testid="test-circle" />
    });

    const { container } = renderWithTheme(<CustomIcon />);
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg?.getAttribute('viewBox')).toBe('0 0 50 50');

    const circle = container.querySelector('circle');
    expect(circle).not.toBeNull();
    expect(circle?.getAttribute('cx')).toBe('25');
    expect(circle?.getAttribute('cy')).toBe('25');
  });

  it('supports path as a function receiving props', () => {
    const DynamicIcon = createIcon({
      displayName: 'DynamicIcon',
      path: (props) => (
        <rect
          x="0"
          y="0"
          width="20"
          height="20"
          fill={props.fill}
        />
      )
    });

    const { container } = renderWithTheme(<DynamicIcon fill="red" />);
    const rect = container.querySelector('rect');
    expect(rect).not.toBeNull();
    expect(rect?.getAttribute('fill')).toBe('red');
  });

  it('forwards ref to the underlying svg element', () => {
    const RefIcon = createIcon({
      displayName: 'RefIcon',
      d: 'M0 0h24v24H0z'
    });

    const ref = React.createRef<SVGSVGElement>();
    renderWithTheme(<RefIcon ref={ref} />);

    expect(ref.current).toBeInstanceOf(SVGSVGElement);
    expect(ref.current?.tagName.toLowerCase()).toBe('svg');
  });

  it('allows overriding props (width, height, fill, className, style, data-testid)', () => {
    const OverridableIcon = createIcon({
      displayName: 'OverridableIcon',
      d: 'M0 0h24v24H0z'
    });

    const { container } = renderWithTheme(
      <OverridableIcon
        width={48}
        height="3rem"
        fill="#ff00ff"
        className="custom-icon-class"
        style={{ opacity: 0.8 }}
        data-testid="custom-svg-id"
      />
    );

    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg?.getAttribute('width')).toBe('48');
    expect(svg?.getAttribute('height')).toBe('3rem');
    expect(svg?.getAttribute('fill')).toBe('#ff00ff');
    expect(svg?.getAttribute('class')).toContain('custom-icon-class');
    expect(svg?.getAttribute('data-testid')).toBe('custom-svg-id');
    expect(svg?.style.opacity).toBe('0.8');

    const path = container.querySelector('path');
    expect(path).not.toBeNull();
    expect(path?.getAttribute('fill')).toBe('#ff00ff');
  });

  it('applies defaultProps when provided', () => {
    const DefaultedIcon = createIcon({
      displayName: 'DefaultedIcon',
      d: 'M0 0h24v24H0z',
      defaultProps: {
        fill: '#00B39F',
        width: 32,
        height: 32,
        'data-testid': 'default-test-id'
      }
    });

    const { container } = renderWithTheme(<DefaultedIcon />);
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg?.getAttribute('width')).toBe('32');
    expect(svg?.getAttribute('height')).toBe('32');
    expect(svg?.getAttribute('fill')).toBe('#00B39F');
    expect(svg?.getAttribute('data-testid')).toBe('default-test-id');
  });

  it('renders <title> element when title prop is provided', () => {
    const TitledIcon = createIcon({
      displayName: 'TitledIcon',
      d: 'M0 0h24v24H0z'
    });

    const { container } = renderWithTheme(<TitledIcon title="Accessible Title" />);
    const title = container.querySelector('title');
    expect(title).not.toBeNull();
    expect(title?.textContent).toBe('Accessible Title');
  });
});
