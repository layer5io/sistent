import { useEffect, useRef } from 'react';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

export const useThrottledDragOver = (
  element: HTMLElement,
  callback: (event: Event) => void
): Subscription | undefined => {
  const subscriptionRef = useRef<Subscription>();

  useEffect(() => {
    const dragOver$: Observable<Event> = fromEvent(element, 'dragover').pipe(
      throttleTime(100, undefined, { leading: true, trailing: true })
    );

    const subscription: Subscription = dragOver$.subscribe(callback);
    subscriptionRef.current = subscription;

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }
    };
  }, [element, callback]);

  return subscriptionRef.current;
};

export default useThrottledDragOver;
