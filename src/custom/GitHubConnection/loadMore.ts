/** Distance from the end of a scroll container, in px, at which the next page is requested. */
const LOAD_MORE_THRESHOLD_PX = 24;

/**
 * Whether a paged list has been scrolled close enough to its end to ask the
 * host for the next page. Shared by the repository pick list and the file
 * tree, which both page through GitHub results as the user scrolls.
 */
export function isScrolledToEnd(element: HTMLElement): boolean {
  return element.scrollHeight - element.scrollTop - element.clientHeight <= LOAD_MORE_THRESHOLD_PX;
}
