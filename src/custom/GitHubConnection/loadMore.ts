import React from 'react';

/** Distance from the end of a scroll container, in px, at which the next page is requested. */
const LOAD_MORE_THRESHOLD_PX = 24;

const isScrolledToEnd = (element: HTMLElement): boolean =>
  element.scrollHeight - element.scrollTop - element.clientHeight <= LOAD_MORE_THRESHOLD_PX;

export interface LoadMoreOptions {
  /** More pages exist. */
  hasMore: boolean;
  /** A page is being fetched; no further page is requested until it lands. */
  loading: boolean;
  onLoadMore?: () => void;
}

/**
 * Paging for a scroll container, shared by the repository pick list and the
 * file tree. The next page is requested when the user scrolls to the end, and
 * also whenever the container is attached or re-rendered without overflowing:
 * a short page, or one the extension filter emptied, leaves nothing to scroll,
 * so waiting for a scroll would stall paging for good.
 *
 * Attach `ref` and `onScroll` to the element that scrolls.
 */
export function useLoadMore({ hasMore, loading, onLoadMore }: LoadMoreOptions): {
  ref: (element: HTMLElement | null) => void;
  onScroll: (event: React.UIEvent<HTMLElement>) => void;
} {
  const elementRef = React.useRef<HTMLElement | null>(null);
  const latest = React.useRef({ hasMore, loading, onLoadMore });
  latest.current = { hasMore, loading, onLoadMore };
  const requestedFor = React.useRef<object | null>(null);

  const requestIf = React.useCallback((reachedEnd: (element: HTMLElement) => boolean) => {
    const element = elementRef.current;
    const props = latest.current;
    if (
      element &&
      props.onLoadMore &&
      props.hasMore &&
      !props.loading &&
      requestedFor.current !== props &&
      reachedEnd(element)
    ) {
      requestedFor.current = props;
      props.onLoadMore();
    }
  }, []);

  const fillIfShort = React.useCallback(
    () => requestIf((element) => element.scrollHeight <= element.clientHeight),
    [requestIf]
  );

  const ref = React.useCallback(
    (element: HTMLElement | null) => {
      elementRef.current = element;
      fillIfShort();
    },
    [fillIfShort]
  );

  React.useEffect(fillIfShort);

  const onScroll = React.useCallback(() => requestIf(isScrolledToEnd), [requestIf]);

  return { ref, onScroll };
}
