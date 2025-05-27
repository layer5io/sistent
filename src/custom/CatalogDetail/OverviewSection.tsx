import React from 'react';
import { Grid2 } from '../../base';
import { Pattern } from '../CustomCatalog/CustomCard';
import { VIEW_VISIBILITY } from '../VisibilityChipMenu/VisibilityChipMenu';
import ContentClassInfo from './ContentClassInfo';
import MetricsDisplay from './MetricsDisplay';
import PatternInfo from './PatternInfo';
import SocialSharePopper from './SocialSharePopper';
import UserInfo from './UserInfo';
import { ContentRow, DesignHeading, OverviewContainer, OverviewContainerHeader } from './style';
import { Class } from './types';

interface OverviewSectionProps {
  details: Pattern;
  type: string;
  cardId: string;
  title: string;
  getUrl: (type: string, id: string) => string;
  showContentDetails: boolean;
  ViewsComponent?: React.ReactNode;
  showVersion: boolean;
  classes: Class[];
  handleCopyUrl: (type: string, name: string, id: string) => void;
  fontFamily?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userProfile?: any;
  showShareAction: boolean;
  handleShare: () => void;
  isVisibilityEnabled: boolean;
  handleVisibilityChange: (visibility: VIEW_VISIBILITY) => void;
}

const OverviewSection: React.FC<OverviewSectionProps> = ({
  details,
  type,
  cardId,
  title,
  getUrl,
  showContentDetails,
  ViewsComponent,
  showVersion,
  classes,
  handleCopyUrl,
  fontFamily,
  userProfile,
  showShareAction,
  handleShare,
  isVisibilityEnabled,
  handleVisibilityChange
}) => {
  return (
    <OverviewContainer>
      <OverviewContainerHeader>
        <DesignHeading>{details?.name}</DesignHeading>
        <SocialSharePopper
          details={details}
          type={type}
          cardId={cardId}
          title={title}
          getUrl={getUrl}
          handleCopyUrl={handleCopyUrl}
          showShareAction={showShareAction}
          handleShare={handleShare}
        />
      </OverviewContainerHeader>
      <Grid2 container spacing={2}>
        <Grid2
          size={{
            lg: 4,
            md: 4,
            sm: 12,
            xs: 12
          }}
        >
          <Grid2 container>
            <Grid2
              style={{ fontFamily: fontFamily }}
              size={{
                lg: 12,
                md: 12,
                sm: 6,
                xs: 6
              }}
            >
              {details?.catalog_data?.content_class && (
                <ContentRow>
                  <ContentClassInfo
                    contentClass={details.catalog_data.content_class}
                    classes={classes}
                  />
                </ContentRow>
              )}
              <UserInfo
                details={details}
                showVersion={showVersion}
                userProfile={userProfile}
                isVisibilityEnabled={isVisibilityEnabled}
                handleVisibilityChange={handleVisibilityChange}
              />
            </Grid2>
          </Grid2>
        </Grid2>
        <Grid2
          size={{
            lg: 8,
            md: 8,
            sm: 12,
            xs: 12
          }}
        >
          {showContentDetails ? (
            <ContentRow>
              <h2 style={{ margin: '0' }}>WHAT DOES THIS DESIGN DO?</h2>
              {details?.catalog_data?.pattern_info ? (
                <PatternInfo text={decodeURIComponent(details.catalog_data.pattern_info)} />
              ) : (
                <div>No description available</div>
              )}
            </ContentRow>
          ) : (
            ViewsComponent
          )}
        </Grid2>
        {!(type === 'view' || type === 'filter') && <MetricsDisplay details={details} />}
      </Grid2>
    </OverviewContainer>
  );
};

export default OverviewSection;
