import React from 'react';

/**
 * Reads the current window dimensions.
 *
 * Only invoked on the client - from the mount effect and the resize handler
 * in `useWindowDimensions`, never during render. The `typeof window` guard is
 * a defensive net so a stray render-time call can never throw a
 * `ReferenceError` under SSR / static prerender.
 *
 * @returns {WindowDimensions} { width, height }
 */
function getWindowDimensions(): WindowDimensions {
  if (typeof window === 'undefined') {
    return { width: 0, height: 0 };
  }
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

/**
 * Custom hook for getting window dimensions.
 *
 * State is initialised to zeroed dimensions rather than by reading `window`
 * in the `useState` initialiser. This keeps the server render and the first
 * client (hydration) render identical - reading `window` during render would
 * make them diverge (`0x0` on the server vs the real size on the client) and
 * trigger a hydration mismatch. The real dimensions are read once on mount
 * via the effect below and then kept current by the debounced resize listener.
 *
 * @returns {WindowDimensions} { width, height }
 */
export function useWindowDimensions(): WindowDimensions {
  const [windowDimensions, setWindowDimensions] = React.useState<WindowDimensions>({
    width: 0,
    height: 0
  });

  React.useEffect(() => {
    // Sync to the real dimensions on mount (client only).
    setWindowDimensions(getWindowDimensions());

    let resizeTimeout: number;

    function handleResize() {
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
      resizeTimeout = window.setTimeout(() => {
        setWindowDimensions(getWindowDimensions());
      }, 500);
    }

    window.addEventListener('resize', handleResize);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
    };
  }, []);

  return windowDimensions;
}

/**
 * Represents the width and height of the window.
 */
interface WindowDimensions {
  width: number;
  height: number;
}
