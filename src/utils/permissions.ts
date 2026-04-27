import { VISIBILITY } from '../constants/constants';

export interface User {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string;
  deletedAt?: { Valid: boolean };
  roleNames?: string[];
}

export const canUpdateResource = (
  selectedResource: { visibility: string },
  currentUser: User,
  resourceOwner: User
) => {
  const isOwner = resourceOwner.userId == currentUser.userId;
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
