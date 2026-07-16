import { VISIBILITY } from '../constants/constants';
import { getUserIdentifier, User } from './user';

export type { User };

export const canUpdateResource = (
  selectedResource: { visibility: string },
  currentUser: User,
  resourceOwner: User
) => {
  const ownerIdentifier = getUserIdentifier(resourceOwner);
  const isOwner = Boolean(ownerIdentifier) && ownerIdentifier === getUserIdentifier(currentUser);
  // Tolerate a nullish currentUser (auth-state transitions in JS consumers):
  // no user means no permission, consistent with getUserIdentifier above.
  const isAdmin = currentUser?.roleNames?.includes('admin') ?? false;
  return isOwner || isAdmin;
};

export const canUpdateResourceVisibility = canUpdateResource;

export const canShareResourceWithNewUsers = (
  selectedResource: { visibility: string },
  currentUser: User,
  resourceOwner: User
) => {
  if (selectedResource.visibility == VISIBILITY.PUBLIC) {
    return true;
  }
  return canUpdateResource(selectedResource, currentUser, resourceOwner);
};
