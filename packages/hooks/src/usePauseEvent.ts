import { useCallback } from 'react';

export function usePauseEvent(): (e: Event) => boolean {
  const pauseEvent = useCallback((e: Event) => {
    if (e.stopPropagation) e.stopPropagation();
    if (e.preventDefault) e.preventDefault();
    (e as any).cancelBubble = true;
    (e as any).returnValue = false;
    return false;
  }, []);

  return pauseEvent;
}
