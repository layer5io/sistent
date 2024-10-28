import { Grid } from '@mui/material';
import React from 'react';
import { Pattern } from '../CustomCatalog/CustomCard';
import ContentClassInfo from './ContentClassInfo';
import MetricsDisplay from './MetricsDisplay';
import PatternInfo from './PatternInfo';
import SocialSharePopper from './SocialSharePopper';
import UserInfo from './UserInfo';
import { ContentRow, DesignHeading, OverviewContainer } from './style';
import { Class } from './types';

interface OverviewSectionProps {
  details: Pattern;
  type: string;
  cardId: string;
  handleClick: (event: React.MouseEvent) => void;
  title: string;
  id: string;
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  getUrl: (type: string, id: string) => string;
  showContentDetails: boolean;
  ViewsComponent?: React.ReactNode;
  showVersion: boolean;
  classes: Class[];
  handleCopyUrl: (type: string, name: string, id: string) => void;
}

const OverviewSection: React.FC<OverviewSectionProps> = ({
  details,
  type,
  cardId,
  handleClick,
  title,
  id,
  anchorEl,
  handleClose,
  getUrl,
  showContentDetails,
  ViewsComponent,
  showVersion,
  classes,
  handleCopyUrl
}) => {
  return (
    <OverviewContainer>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          flexWrap: 'wrap'
        }}
      >
        <DesignHeading>{details?.name}</DesignHeading>
        <SocialSharePopper
          details={details}
          type={type}
          cardId={cardId}
          handleClick={handleClick}
          title={title}
          id={id}
          anchorEl={anchorEl}
          handleClose={handleClose}
          getUrl={getUrl}
          handleCopyUrl={handleCopyUrl}
        />
      </div>
      <Grid container spacing={2}>
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <Grid container>
            <Grid item lg={12} md={12} sm={6} xs={6}>
              {details?.catalog_data?.content_class && (
                <ContentRow>
                  <ContentClassInfo
                    contentClass={details.catalog_data.content_class}
                    classes={classes}
                  />
                </ContentRow>
              )}
              <UserInfo details={details} showVersion={showVersion} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={8} md={8} sm={12} xs={12}>
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
        </Grid>
        {!(type === 'view' || type === 'filter') && <MetricsDisplay details={details} />}
      </Grid>
    </OverviewContainer>
  );
};

export default OverviewSection;
