import { useCallback, useEffect, useState } from 'react';

import { useCytoscapeContext } from './context/CytoscapeProvider';

function toggleFullScreen(dom: HTMLElement) {
  if (document.fullscreenElement !== dom) {
    dom.requestFullscreen;
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

export function useFullScreen(container?: HTMLElement | null): {
  toggle: () => void;
  isFullScreen: boolean;
} {
  const context = useCytoscapeContext();
  const [isFullScreen, setFullScreen] = useState<boolean>(false);
  const [element, setElement] = useState<HTMLElement>(container ? container : context.container);

  // const toggleState = () => setFullScreen((v) => !v)
  const toggleState = useCallback(() => {
    setFullScreen((prevState) => !prevState);
  }, [setFullScreen]);

  useEffect(() => {
    document.addEventListener('fullscreenchange', toggleState);
    return () => document.removeEventListener('fullscreenchange', toggleState);
  }, [toggleState]);

  useEffect(() => {
    setElement(container || context.container);
  }, [container, context.container]);

  const toggle = useCallback(() => {
    toggleFullScreen(element);
  }, [element]);

  return {
    toggle,
    isFullScreen
  };
}
