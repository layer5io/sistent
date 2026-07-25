import { VISIBILITY } from '../constants/constants';
import { getUserIdentifier, User } from './user';

export type { User };

export const canUpdateResource = (
  selectedResource: { visibility: string } | null | undefined,
  currentUser: User | null | undefined,
  resourceOwner: User | null | undefined
) => {
  // Deny-by-default on a nullish resource (JS consumers, initial load
  // states): there is nothing to grant permission on.
  if (!selectedResource) return false;
  const ownerIdentifier = getUserIdentifier(resourceOwner);
  const isOwner = Boolean(ownerIdentifier) && ownerIdentifier === getUserIdentifier(currentUser);
  // Tolerate a nullish currentUser (auth-state transitions in JS consumers):
  // no user means no permission, consistent with getUserIdentifier above.
  const isAdmin = currentUser?.roleNames?.includes('admin') ?? false;
  return isOwner || isAdmin;
};

export const canUpdateResourceVisibility = canUpdateResource;

export const canShareResourceWithNewUsers = (
  selectedResource: { visibility: string } | null | undefined,
  currentUser: User | null | undefined,
  resourceOwner: User | null | undefined
) => {
  if (selectedResource?.visibility == VISIBILITY.PUBLIC) {
    return true;
  }
  return canUpdateResource(selectedResource, currentUser, resourceOwner);
};
