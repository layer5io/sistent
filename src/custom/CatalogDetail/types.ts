export interface User {
  id: string;
  first_name: string;
  last_name: string;
}

export interface FilteredAcademyData {
  'learning-path'?: string[];
  challenge?: string[];
  challenges?: string[];
}

export interface Class {
  class: string;
  description: string;
}

export interface Theme {
  palette: {
    background: {
      secondary: string;
      inverse: string;
      cta: {
        default: string;
      };
    };
    icon: {
      default: string;
      secondary: string;
    };
  };
}

export const RESOURCE_TYPES = {
  DESIGNS: 'design',
  FILTERS: 'filter',
  VIEWS: 'view'
};

export type ContentClassType = {
  community: {
    icon: React.ComponentType;
    color: string;
  };
  official: {
    icon: React.ComponentType;
    color: string;
  };
  verified: {
    icon: React.ComponentType;
    color: string;
  };
};

export type UserProfile = {
  first_name: string;
  last_name: string;
  avatar_url: string;
};
