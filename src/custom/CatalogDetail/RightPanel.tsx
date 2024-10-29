import React from 'react';
import { Pattern } from '../CustomCatalog/CustomCard';
import CaveatsSection from './CaveatsSection';
import OverviewSection from './OverviewSection';
import RelatedDesigns, { PatternsPerUser } from './RelatedDesigns';
import { Class } from './types';

interface RightPanelProps {
  details: Pattern;
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
  onSuggestedPatternClick: (pattern: Pattern) => void;
  handleCopyUrl: (type: string, name: string, id: string) => void;
  fontFamily?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useGetUserProfileByIdQuery: any;
}

const RightPanel: React.FC<RightPanelProps> = ({
  details,
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
  useGetUserProfileByIdQuery
}) => {
  const cleanedType = type.replace('my-', '').replace(/s$/, '');
  const { data: userProfile } = useGetUserProfileByIdQuery({
    id: details.user_id
  });

  return (
    <div style={{ fontFamily }}>
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
      />
      {showCaveats && <CaveatsSection details={details} />}
      <RelatedDesigns
        details={details}
        type={type}
        patternsPerUser={patternsPerUser}
        onSuggestedPatternClick={onSuggestedPatternClick}
        userProfile={userProfile}
      />
    </div>
  );
};

export default RightPanel;
