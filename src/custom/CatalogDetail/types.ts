import type { CanonicalSearchableUser } from '../../utils/user';

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
  DESIGN: 'design',
  FILTER: 'filter',
  VIEW: 'view'
};

export const PATTERNS = 'patterns';
export const FILTERS = 'filters';
export const VIEWS = 'views';

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

/**
 * The design author as the catalog detail page renders them: the three fields
 * of the canonical v1beta3 user collaboration projection that appear in the
 * byline. Derived from {@link CanonicalSearchableUser} so a rename upstream is
 * a compile error here rather than a blank byline downstream.
 *
 * Required rather than optional (the canonical marks all three optional,
 * because reduced projections omit them) because the byline has no fallback:
 * these values are rendered directly.
 */
export type UserProfile = Required<
  Pick<CanonicalSearchableUser, 'firstName' | 'lastName' | 'avatarUrl'>
>;
