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
  it('does not throw when window is undefined (server / static prerender)', () => {
    // The `node` environment has no `window`, mirroring Node SSR and
    // Next.js static-export prerender.
    expect(typeof window).toBe('undefined');
    let html = '';
    expect(() => {
      html = renderToString(React.createElement(Probe));
    }).not.toThrow();
    // Falls back to zeroed dimensions instead of reading `window`.
    expect(html).toContain('0x0');
  });

  it('reads real dimensions when window is present', () => {
    (global as unknown as { window: { innerWidth: number; innerHeight: number } }).window = {
      innerWidth: 1280,
      innerHeight: 800
    };
    try {
      const html = renderToString(React.createElement(Probe));
      expect(html).toContain('1280x800');
    } finally {
      delete (global as unknown as { window?: unknown }).window;
    }
  });
});
