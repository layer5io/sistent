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
   * container that does not overflow auto-requests a page at most once per
   * distinct key, so a page that fails (and adds nothing) is not re-requested.
   */
  contentKey: number;
}

/**
 * Paging for a scroll container, shared by the repository and ref pick lists
 * and the file tree. The next page is requested when the user scrolls to the end, and
 * also, without a scroll, while the container does not overflow: a short
 * page, or one the extension filter emptied, leaves nothing to scroll, so
 * waiting for a scroll would stall paging for good.
 *
 * Auto-fill state rule: any change of `contentKey` (growth or reset) arms the
 * auto-fill; an auto-request disarms it until the key changes again. A failed
 * page leaves the key unchanged, so it is never retried without a scroll.
 *
 * Attach `ref` and `onScroll` to the element that scrolls. `request` is the
 * explicit ask, from a control or a key.
 */
export function useLoadMore({ hasMore, loading, onLoadMore, contentKey }: LoadMoreOptions): {
  ref: (element: HTMLElement | null) => void;
  onScroll: (event: React.UIEvent<HTMLElement>) => void;
  /**
   * Requests a page unless one is in flight, none is left, or none was asked;
   * reports whether it did.
   */
  request: () => boolean;
} {
  const elementRef = React.useRef<HTMLElement | null>(null);
  const latest = React.useRef({ hasMore, loading, onLoadMore, contentKey });
  latest.current = { hasMore, loading, onLoadMore, contentKey };
  const autoFilledFor = React.useRef<number | null>(null);
  const lastContentKey = React.useRef(contentKey);
  if (lastContentKey.current !== contentKey) {
    lastContentKey.current = contentKey;
    autoFilledFor.current = null;
  }

  const canRequest = (): boolean => {
    const props = latest.current;
    return Boolean(props.onLoadMore && props.hasMore && !props.loading);
  };

  const request = React.useCallback((): boolean => {
    if (!canRequest()) return false;
    latest.current.onLoadMore?.();
    return true;
  }, []);

  const requestIfArmed = React.useCallback(() => {
    const props = latest.current;
    if (canRequest() && autoFilledFor.current !== props.contentKey) {
      autoFilledFor.current = props.contentKey;
      props.onLoadMore?.();
    }
  }, []);

  const fillIfShort = React.useCallback(() => {
    const element = elementRef.current;
    if (element && element.scrollHeight <= element.clientHeight) requestIfArmed();
  }, [requestIfArmed]);

  const ref = React.useCallback(
    (element: HTMLElement | null) => {
      elementRef.current = element;
      fillIfShort();
    },
    [fillIfShort]
  );

  React.useEffect(fillIfShort);

  const onScroll = React.useCallback(
    (event: React.UIEvent<HTMLElement>) => {
      if (isScrolledToEnd(event.currentTarget)) request();
    },
    [request]
  );

  return { ref, onScroll, request };
}
