import { useEffect, useState } from 'react';

/**
 *
 * @returns {object} { width, height }
 */
function getWindowDimensions(): object {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

/**
 *
 * @returns {object} { width, height }
 */
export function useWindowDimensions(): object {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
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
