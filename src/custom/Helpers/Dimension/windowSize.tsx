import React from 'react';

/**
 * Returns the width and height of the window.
 *
 * During server-side rendering / static prerender there is no `window`,
 * so this returns zeroed dimensions instead of throwing a
 * `ReferenceError`. The real values are picked up on the client after the
 * `resize` listener (and the first effect-driven read) run.
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
 * @returns {WindowDimensions} { width, height }
 */
export function useWindowDimensions(): WindowDimensions {
  const [windowDimensions, setWindowDimensions] = React.useState(getWindowDimensions());

  React.useEffect(() => {
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
