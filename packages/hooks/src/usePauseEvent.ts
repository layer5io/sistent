import React from 'react';

export function usePauseEvent(): (e: Event) => boolean {
  const pauseEvent = React.useCallback((e: Event) => {
    if (e.stopPropagation) e.stopPropagation();
    if (e.preventDefault) e.preventDefault();
    return false;
  }, []);

  return pauseEvent;
}
