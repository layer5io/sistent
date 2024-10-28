import React from 'react';
import { Pattern } from '../CustomCatalog/CustomCard';
import CaveatsSection from './CaveatsSection';
import OverviewSection from './OverviewSection';
import RelatedDesigns, { PatternsPerUser } from './RelatedDesigns';
import { Class } from './types';

interface RightPanelProps {
  details: Pattern;
  type: string;
  cardId: string;
  handleClick: (event: React.MouseEvent) => void;
  title: string;
  id?: string;
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  getUrl: (type: string, id: string) => string;
  showContentDetails: boolean;
  ViewsComponent?: React.ReactNode;
  showVersion: boolean;
  showCaveats: boolean;
  classes: Class[];
  patternsPerUser: PatternsPerUser;
  handleCopyUrl: (type: string, name: string, id: string) => void;
  fontFamily?: string;
}

const RightPanel: React.FC<RightPanelProps> = ({
  details,
  type,
  cardId,
  handleClick,
  title,
  id = '',
  anchorEl,
  handleClose,
  getUrl,
  showContentDetails,
  ViewsComponent,
  showVersion,
  showCaveats,
  classes,
  patternsPerUser,
  handleCopyUrl,
  fontFamily
}) => {
  const cleanedType = type.replace('my-', '').replace(/s$/, '');

  return (
    <div style={{ fontFamily }}>
      <OverviewSection
        details={details}
        type={cleanedType}
        cardId={cardId}
        handleClick={handleClick}
        title={title}
        id={id}
        anchorEl={anchorEl}
        handleClose={handleClose}
        getUrl={getUrl}
        showContentDetails={showContentDetails}
        ViewsComponent={ViewsComponent}
        showVersion={showVersion}
        classes={classes}
        handleCopyUrl={handleCopyUrl}
      />
      {showCaveats && <CaveatsSection details={details} />}
      <RelatedDesigns details={details} type={type} patternsPerUser={patternsPerUser} />
    </div>
  );
};

export default RightPanel;
