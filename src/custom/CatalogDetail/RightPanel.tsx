import React from 'react';
import { Pattern } from '../CustomCatalog/CustomCard';
import { VIEW_VISIBILITY } from '../VisibilityChipMenu/VisibilityChipMenu';
import CaveatsSection from './CaveatsSection';
import OverviewSection from './OverviewSection';
import RelatedDesigns, { DetailsByType, PatternsPerUser } from './RelatedDesigns';
import { Class } from './types';

interface RightPanelProps {
  details: Pattern;
  detailsByType: DetailsByType;
  type: string;
  cardId?: string;
  title: string;
  getUrl: (type: string, id: string) => string;
  showContentDetails: boolean;
  ViewsComponent?: React.ReactNode;
  showVersion: boolean;
  showCaveats: boolean;
  classes: Class[];
  patternsPerUser: PatternsPerUser;
  handleCopyUrl: (type: string, name: string, id: string) => void;
  onSuggestedPatternClick: (pattern: Pattern) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useGetUserProfileByIdQuery: any;
  fontFamily?: string;
  technologySVGPath: string;
  technologySVGSubpath: string;
  orgName: string;
  fetchingOrgError: boolean;
  showShareAction: boolean;
  handleShare: () => void;
  isVisibilityEnabled: boolean;
  handleVisibilityChange: (visibility: VIEW_VISIBILITY) => void;
}

const RightPanel: React.FC<RightPanelProps> = ({
  details,
  detailsByType,
  type,
  cardId = details.id,
  title,
  getUrl,
  showContentDetails,
  ViewsComponent,
  showVersion,
  showCaveats,
  classes,
  patternsPerUser,
  onSuggestedPatternClick,
  handleCopyUrl,
  fontFamily,
  useGetUserProfileByIdQuery,
  technologySVGPath,
  technologySVGSubpath,
  orgName,
  fetchingOrgError,
  showShareAction,
  handleShare,
  isVisibilityEnabled = false,
  handleVisibilityChange
}) => {
  const cleanedType = type.replace('my-', '').replace(/s$/, '');
  const { data: userProfile } = useGetUserProfileByIdQuery({
    id: details.user_id
  });

  return (
    <div>
      <OverviewSection
        details={details}
        type={cleanedType}
        cardId={cardId}
        title={title}
        getUrl={getUrl}
        showContentDetails={showContentDetails}
        ViewsComponent={ViewsComponent}
        showVersion={showVersion}
        classes={classes}
        handleCopyUrl={handleCopyUrl}
        fontFamily={fontFamily}
        userProfile={userProfile}
        showShareAction={showShareAction}
        handleShare={handleShare}
        isVisibilityEnabled={isVisibilityEnabled}
        handleVisibilityChange={handleVisibilityChange}
      />
      {showCaveats && <CaveatsSection details={details} />}
      <RelatedDesigns
        details={details}
        detailsByType={detailsByType}
        orgName={orgName}
        fetchingOrgError={fetchingOrgError}
        type={type}
        patternsPerUser={patternsPerUser}
        onSuggestedPatternClick={onSuggestedPatternClick}
        userProfile={userProfile}
        technologySVGPath={technologySVGPath}
        technologySVGSubpath={technologySVGSubpath}
        filterByType={false}
      />
      <RelatedDesigns
        details={details}
        detailsByType={detailsByType}
        orgName={orgName}
        fetchingOrgError={fetchingOrgError}
        type={type}
        patternsPerUser={patternsPerUser}
        onSuggestedPatternClick={onSuggestedPatternClick}
        userProfile={userProfile}
        technologySVGPath={technologySVGPath}
        technologySVGSubpath={technologySVGSubpath}
        filterByType={true}
      />
    </div>
  );
};

export default RightPanel;
