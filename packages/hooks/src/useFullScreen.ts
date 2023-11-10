import React from 'react';

import { useCytoscapeContext } from './context/CytoscapeProvider';

function toggleFullScreen(dom: HTMLElement) {
  if (document.fullscreenElement !== dom) {
    dom.requestFullscreen().catch((err) => {
      console.error('Error attempting to enable full screen:', err);
    });
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
  const [isFullScreen, setFullScreen] = React.useState<boolean>(false);
  const [element, setElement] = React.useState<HTMLElement>(
    container ? container : context.container
  );

  // const toggleState = () => setFullScreen((v) => !v)
  const toggleState = React.useCallback(() => {
    setFullScreen((prevState) => !prevState);
  }, [setFullScreen]);

  React.useEffect(() => {
    const handleFullscreenChange = () => toggleState();
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [toggleState]);

  React.useEffect(() => {
    setElement(container ?? context.container);
  }, [container, context.container]);

  const toggle = React.useCallback(() => {
    toggleFullScreen(element);
  }, [element]);

  return {
    toggle,
    isFullScreen
  };
}
