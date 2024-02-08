import { EVENT_TYPES } from './Enum';

export function updateURLs(urlsSet, newUrls, eventType) {
  switch (eventType) {
    case EVENT_TYPES.DELETED:
      newUrls.forEach((url) => {
        urlsSet.delete(url);
      });
      break;
    case EVENT_TYPES.ADDED:
    case EVENT_TYPES.MODIFIED:
      newUrls.forEach((url) => {
        urlsSet.add(url);
      });
  }
}
