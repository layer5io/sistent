// Type-level fixture for Issue #1873: RightPanel / RelatedDesigns patternsPerUser.
// It is compiled by `relatedDesignsPatternsTypes.test.ts` via `tsc --noEmit`.
import type { GetPatternsApiResponse } from '@meshery/schemas/cloudApi';
import React from 'react';
import type { DetailsByType, PatternsPerUser, SuggestedPattern } from '../../custom/CatalogDetail';
import RelatedDesigns from '../../custom/CatalogDetail/RelatedDesigns';
import RightPanel from '../../custom/CatalogDetail/RightPanel';
import type { Pattern } from '../../custom/CustomCatalog/CustomCard';

export type ExercisedPatternsPerUser = PatternsPerUser;

declare const canonicalResponse: GetPatternsApiResponse;
declare const optionalResponse: GetPatternsApiResponse | undefined;
declare const completePattern: Pattern;
declare const detailsByType: DetailsByType;

const baseRightPanelProps = {
  details: completePattern,
  detailsByType: detailsByType,
  type: 'pattern',
  title: 'Test Pattern',
  getUrl: () => '',
  showContentDetails: true,
  showVersion: true,
  showCaveats: false,
  classes: [],
  handleCopyUrl: () => {},
  onSuggestedPatternClick: () => {},
  useGetUserProfileByIdQuery: () => ({ data: undefined }),
  technologySVGPath: '',
  technologySVGSubpath: '',
  orgName: '',
  fetchingOrgError: false,
  showShareAction: false,
  handleShare: () => {},
  isVisibilityEnabled: false,
  handleVisibilityChange: () => {}
};

const baseRelatedDesignsProps = {
  details: completePattern,
  type: 'pattern',
  onSuggestedPatternClick: () => {},
  technologySVGPath: '',
  technologySVGSubpath: '',
  orgName: '',
  fetchingOrgError: false
};

// 1. RightPanel accepts undefined patternsPerUser.
export const rightPanelWithUndefined: React.ReactElement = (
  <RightPanel {...baseRightPanelProps} patternsPerUser={undefined} />
);

// 2. RightPanel accepts the canonical GetPatternsApiResponse without a cast.
export const rightPanelWithCanonical: React.ReactElement = (
  <RightPanel {...baseRightPanelProps} patternsPerUser={canonicalResponse} />
);

// 3. RightPanel accepts optional response (GetPatternsApiResponse | undefined).
export const rightPanelWithOptionalResponse: React.ReactElement = (
  <RightPanel {...baseRightPanelProps} patternsPerUser={optionalResponse} />
);

// 4. RightPanel accepts omitted patternsPerUser (optional prop).
export const rightPanelWithOmittedProp: React.ReactElement = (
  <RightPanel {...baseRightPanelProps} />
);

// 5. RightPanel accepts response with missing patterns property.
export const rightPanelWithMissingPatterns: React.ReactElement = (
  <RightPanel {...baseRightPanelProps} patternsPerUser={{}} />
);

// 6. RightPanel accepts complete Pattern[] from consumers (consumers must type onSuggestedPatternClick as (pattern: SuggestedPattern) => void).
export const rightPanelWithCompletePattern: React.ReactElement = (
  <RightPanel
    {...baseRightPanelProps}
    patternsPerUser={{ patterns: [completePattern] }}
    onSuggestedPatternClick={(pattern: SuggestedPattern) => {
      // SuggestedPattern does not require avatarUrl or user
      void pattern.id;
      void pattern.name;
    }}
  />
);

// 7. RelatedDesigns directly accepts undefined, canonical, and complete Pattern.
export const relatedDesignsWithCanonical: React.ReactElement = (
  <RelatedDesigns {...baseRelatedDesignsProps} patternsPerUser={canonicalResponse} />
);

export const relatedDesignsWithUndefined: React.ReactElement = (
  <RelatedDesigns {...baseRelatedDesignsProps} patternsPerUser={undefined} />
);

export const relatedDesignsWithCompletePattern: React.ReactElement = (
  <RelatedDesigns {...baseRelatedDesignsProps} patternsPerUser={{ patterns: [completePattern] }} />
);

// 8. Self-check: verifying that patternsPerUser rejects incompatible types.
export const rejectsIncompatiblePatterns: React.ReactElement = (
  <RelatedDesigns
    {...baseRelatedDesignsProps}
    // @ts-expect-error - invalid object cannot be assigned to PatternsPerUser
    patternsPerUser={{ patterns: [{ invalidField: 123 }] }}
  />
);
