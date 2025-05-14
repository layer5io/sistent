import { VISIBILITY } from "../constants/constants";

export interface User {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar_url?: string;
  deleted_at?: { Valid: boolean };
  role_names?:string[]
}


export const canUpdateResource= (selectedResource:{visibility:string}, currentUser:User,resourceOwner:User) => {
    const isOwner = resourceOwner.user_id == currentUser.user_id
    const isAdmin = currentUser.role_names?.includes("admin")
    return isOwner || isAdmin
};

export const  canUpdateResourceVisibility= canUpdateResource


export const canShareResourceWithNewUsers= (selectedResource:{visibility:string}, currentUser:User,resourceOwner:User) => {
    if (selectedResource.visibility == VISIBILITY.PUBLIC){
      return true
    }
    return canUpdateResource(selectedResource,currentUser,resourceOwner)
};
