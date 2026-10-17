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
  /**
   * The text a pick list is filtered by, if any. While it is non-empty the
   * auto-fill requests at most one page per distinct filter value instead, so
   * a filter that matches few items or none does not fetch every page. The
   * record of filters is cleared when `contentKey` shrinks (a new list).
   */
  filter?: string;
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
 * A non-empty `filter` replaces that rule with once per filter value.
 *
 * Attach `ref` and `onScroll` to the element that scrolls. `request` is the
 * explicit ask, from a control or a key; `requestIfArmed` is the auto-fill
 * for a caller with nothing to measure, such as a pick list whose filter left
 * no list box.
 */
export function useLoadMore({
  hasMore,
  loading,
  onLoadMore,
  contentKey,
  filter = ''
}: LoadMoreOptions): {
  ref: (element: HTMLElement | null) => void;
  onScroll: (event: React.UIEvent<HTMLElement>) => void;
  /** Requests a page unless one is in flight, none is left, or none was asked. */
  request: () => void;
  /** Like `request`, under the auto-fill rule. */
  requestIfArmed: () => void;
} {
  const elementRef = React.useRef<HTMLElement | null>(null);
  const latest = React.useRef({ hasMore, loading, onLoadMore, contentKey, filter });
  latest.current = { hasMore, loading, onLoadMore, contentKey, filter };
  const autoFilledFor = React.useRef<number | null>(null);
  const autoFilledFilters = React.useRef(new Set<string>());
  const lastContentKey = React.useRef(contentKey);
  if (lastContentKey.current !== contentKey) {
    if (contentKey < lastContentKey.current) autoFilledFilters.current.clear();
    lastContentKey.current = contentKey;
    autoFilledFor.current = null;
  }

  const canRequest = (): boolean => {
    const props = latest.current;
    return Boolean(props.onLoadMore && props.hasMore && !props.loading);
  };

  const request = React.useCallback(() => {
    if (canRequest()) latest.current.onLoadMore?.();
  }, []);

  const requestIfArmed = React.useCallback(() => {
    const props = latest.current;
    if (!canRequest()) return;
    if (props.filter) {
      if (autoFilledFilters.current.has(props.filter)) return;
      autoFilledFilters.current.add(props.filter);
    } else {
      if (autoFilledFor.current === props.contentKey) return;
      autoFilledFor.current = props.contentKey;
    }
    props.onLoadMore?.();
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

  return { ref, onScroll, request, requestIfArmed };
}
