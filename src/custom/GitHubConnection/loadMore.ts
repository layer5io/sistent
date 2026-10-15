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
  /**
   * Identifies the content loaded so far, normally the raw item count. A
   * container that does not overflow requests a page at most once per key, so
   * a page that fails (and adds nothing) is not re-requested on every render.
   */
  contentKey: number;
}

/**
 * Paging for a scroll container, shared by the repository pick list and the
 * file tree. The next page is requested when the user scrolls to the end, and
 * also once per `contentKey` while the container does not overflow: a short
 * page, or one the extension filter emptied, leaves nothing to scroll, so
 * waiting for a scroll would stall paging for good.
 *
 * Attach `ref` and `onScroll` to the element that scrolls.
 */
export function useLoadMore({ hasMore, loading, onLoadMore, contentKey }: LoadMoreOptions): {
  ref: (element: HTMLElement | null) => void;
  onScroll: (event: React.UIEvent<HTMLElement>) => void;
} {
  const elementRef = React.useRef<HTMLElement | null>(null);
  const latest = React.useRef({ hasMore, loading, onLoadMore, contentKey });
  latest.current = { hasMore, loading, onLoadMore, contentKey };
  const autoFilledFor = React.useRef<number | null>(null);

  const canRequest = (): boolean => {
    const props = latest.current;
    return Boolean(elementRef.current && props.onLoadMore && props.hasMore && !props.loading);
  };

  const fillIfShort = React.useCallback(() => {
    const element = elementRef.current;
    const props = latest.current;
    if (
      canRequest() &&
      element &&
      autoFilledFor.current !== props.contentKey &&
      element.scrollHeight <= element.clientHeight
    ) {
      autoFilledFor.current = props.contentKey;
      props.onLoadMore?.();
    }
  }, []);

  const ref = React.useCallback(
    (element: HTMLElement | null) => {
      elementRef.current = element;
      fillIfShort();
    },
    [fillIfShort]
  );

  React.useEffect(fillIfShort);

  const onScroll = React.useCallback((event: React.UIEvent<HTMLElement>) => {
    if (canRequest() && isScrolledToEnd(event.currentTarget)) {
      latest.current.onLoadMore?.();
    }
  }, []);

  return { ref, onScroll };
}
