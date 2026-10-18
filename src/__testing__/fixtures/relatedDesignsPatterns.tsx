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

// 1. RightPanel accepts undefined patternsPerUser.
export const rightPanelWithUndefined: React.ReactElement = (
  <RightPanel
    details={completePattern}
    detailsByType={detailsByType}
    type="pattern"
    title="Test Pattern"
    getUrl={() => ''}
    showContentDetails={true}
    showVersion={true}
    showCaveats={false}
    classes={[]}
    patternsPerUser={undefined}
    handleCopyUrl={() => {}}
    onSuggestedPatternClick={() => {}}
    useGetUserProfileByIdQuery={() => ({ data: undefined })}
    technologySVGPath=""
    technologySVGSubpath=""
    orgName=""
    fetchingOrgError={false}
    showShareAction={false}
    handleShare={() => {}}
    isVisibilityEnabled={false}
    handleVisibilityChange={() => {}}
  />
);

// 2. RightPanel accepts the canonical GetPatternsApiResponse without a cast.
export const rightPanelWithCanonical: React.ReactElement = (
  <RightPanel
    details={completePattern}
    detailsByType={detailsByType}
    type="pattern"
    title="Test Pattern"
    getUrl={() => ''}
    showContentDetails={true}
    showVersion={true}
    showCaveats={false}
    classes={[]}
    patternsPerUser={canonicalResponse}
    handleCopyUrl={() => {}}
    onSuggestedPatternClick={() => {}}
    useGetUserProfileByIdQuery={() => ({ data: undefined })}
    technologySVGPath=""
    technologySVGSubpath=""
    orgName=""
    fetchingOrgError={false}
    showShareAction={false}
    handleShare={() => {}}
    isVisibilityEnabled={false}
    handleVisibilityChange={() => {}}
  />
);

// 3. RightPanel accepts optional response (GetPatternsApiResponse | undefined).
export const rightPanelWithOptionalResponse: React.ReactElement = (
  <RightPanel
    details={completePattern}
    detailsByType={detailsByType}
    type="pattern"
    title="Test Pattern"
    getUrl={() => ''}
    showContentDetails={true}
    showVersion={true}
    showCaveats={false}
    classes={[]}
    patternsPerUser={optionalResponse}
    handleCopyUrl={() => {}}
    onSuggestedPatternClick={() => {}}
    useGetUserProfileByIdQuery={() => ({ data: undefined })}
    technologySVGPath=""
    technologySVGSubpath=""
    orgName=""
    fetchingOrgError={false}
    showShareAction={false}
    handleShare={() => {}}
    isVisibilityEnabled={false}
    handleVisibilityChange={() => {}}
  />
);

// 4. RightPanel accepts omitted patternsPerUser (optional prop).
export const rightPanelWithOmittedProp: React.ReactElement = (
  <RightPanel
    details={completePattern}
    detailsByType={detailsByType}
    type="pattern"
    title="Test Pattern"
    getUrl={() => ''}
    showContentDetails={true}
    showVersion={true}
    showCaveats={false}
    classes={[]}
    handleCopyUrl={() => {}}
    onSuggestedPatternClick={() => {}}
    useGetUserProfileByIdQuery={() => ({ data: undefined })}
    technologySVGPath=""
    technologySVGSubpath=""
    orgName=""
    fetchingOrgError={false}
    showShareAction={false}
    handleShare={() => {}}
    isVisibilityEnabled={false}
    handleVisibilityChange={() => {}}
  />
);

// 5. RightPanel accepts response with missing patterns property.
export const rightPanelWithMissingPatterns: React.ReactElement = (
  <RightPanel
    details={completePattern}
    detailsByType={detailsByType}
    type="pattern"
    title="Test Pattern"
    getUrl={() => ''}
    showContentDetails={true}
    showVersion={true}
    showCaveats={false}
    classes={[]}
    patternsPerUser={{}}
    handleCopyUrl={() => {}}
    onSuggestedPatternClick={() => {}}
    useGetUserProfileByIdQuery={() => ({ data: undefined })}
    technologySVGPath=""
    technologySVGSubpath=""
    orgName=""
    fetchingOrgError={false}
    showShareAction={false}
    handleShare={() => {}}
    isVisibilityEnabled={false}
    handleVisibilityChange={() => {}}
  />
);

// 6. RightPanel accepts existing consumer passing complete Pattern[].
export const rightPanelWithCompletePattern: React.ReactElement = (
  <RightPanel
    details={completePattern}
    detailsByType={detailsByType}
    type="pattern"
    title="Test Pattern"
    getUrl={() => ''}
    showContentDetails={true}
    showVersion={true}
    showCaveats={false}
    classes={[]}
    patternsPerUser={{ patterns: [completePattern] }}
    handleCopyUrl={() => {}}
    onSuggestedPatternClick={(pattern: SuggestedPattern) => {
      // SuggestedPattern does not require avatarUrl or user
      void pattern.id;
      void pattern.name;
    }}
    useGetUserProfileByIdQuery={() => ({ data: undefined })}
    technologySVGPath=""
    technologySVGSubpath=""
    orgName=""
    fetchingOrgError={false}
    showShareAction={false}
    handleShare={() => {}}
    isVisibilityEnabled={false}
    handleVisibilityChange={() => {}}
  />
);

// 7. RelatedDesigns directly accepts undefined, canonical, and complete Pattern.
export const relatedDesignsWithCanonical: React.ReactElement = (
  <RelatedDesigns
    details={completePattern}
    type="pattern"
    patternsPerUser={canonicalResponse}
    onSuggestedPatternClick={() => {}}
    technologySVGPath=""
    technologySVGSubpath=""
    orgName=""
    fetchingOrgError={false}
  />
);

export const relatedDesignsWithUndefined: React.ReactElement = (
  <RelatedDesigns
    details={completePattern}
    type="pattern"
    patternsPerUser={undefined}
    onSuggestedPatternClick={() => {}}
    technologySVGPath=""
    technologySVGSubpath=""
    orgName=""
    fetchingOrgError={false}
  />
);

export const relatedDesignsWithCompletePattern: React.ReactElement = (
  <RelatedDesigns
    details={completePattern}
    type="pattern"
    patternsPerUser={{ patterns: [completePattern] }}
    onSuggestedPatternClick={() => {}}
    technologySVGPath=""
    technologySVGSubpath=""
    orgName=""
    fetchingOrgError={false}
  />
);

// 8. Self-check: verifying that patternsPerUser rejects incompatible types.
export const rejectsIncompatiblePatterns: React.ReactElement = (
  <RelatedDesigns
    details={completePattern}
    type="pattern"
    // @ts-expect-error - invalid object cannot be assigned to PatternsPerUser
    patternsPerUser={{ patterns: [{ invalidField: 123 }] }}
    onSuggestedPatternClick={() => {}}
    technologySVGPath=""
    technologySVGSubpath=""
    orgName=""
    fetchingOrgError={false}
  />
);
