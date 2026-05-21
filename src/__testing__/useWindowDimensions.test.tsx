/**
 * @jest-environment node
 */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { useWindowDimensions } from '../custom/Helpers/Dimension/windowSize';

function Probe() {
  const { width, height } = useWindowDimensions();
  return React.createElement('div', null, `${width}x${height}`);
}

describe('useWindowDimensions SSR safety', () => {
  it('does not read window during render and falls back to 0x0', () => {
    // The `node` environment has no `window`, mirroring Node SSR and
    // Next.js static-export prerender. Initial state is zeroed and the
    // mount effect does not run during renderToString, so `window` is
    // never touched during render.
    expect(typeof window).toBe('undefined');
    let html = '';
    expect(() => {
      html = renderToString(React.createElement(Probe));
    }).not.toThrow();
    expect(html).toContain('0x0');
  });
});
