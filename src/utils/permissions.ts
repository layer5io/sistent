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
  const isAdmin = currentUser.roleNames?.includes('admin');
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
