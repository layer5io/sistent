import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Avatar, Box, Typography, styled } from '@mui/material';
import React from 'react';
import { Grid } from '../../base';
import { CloneIcon, CommunityClassIcon, OfficialClassIcon, OpenIcon, ShareIcon } from '../../icons';
import VerificationClassIcon from '../../icons/ContentClassIcons/VerificationClassIcon';
import DeploymentsIcon from '../../icons/Deployments/DeploymentsIcon';
import { DownloadIcon } from '../../icons/Download';
import {
  CardBack,
  CardFront,
  DateText,
  DateType,
  DesignAuthorName,
  DesignCard,
  DesignDetailsDiv,
  DesignInnerCard,
  DesignName,
  DesignType,
  MetricsContainerFront,
  MetricsCount,
  MetricsDiv,
  ProfileSection,
  StyledClassWrapper,
  StyledInnerClassWrapper,
  TechnologiesSection,
  VersionTag
} from './style';

export const DesignCardUrl = styled('a')(() => ({
  textDecoration: 'none'
}));

interface Pattern {
  name: string;
  download_count: number;
  clone_count: number;
  view_count: number;
  deployment_count: number;
  share_count: number;
  userData?: {
    version?: string;
    avatarUrl?: string;
    userName?: string;
    technologies?: string[];
    updatedAt?: string;
  };
  catalog_data?: {
    content_class?: string;
    imageURL?: string;
  };
  visibility: string;
  updated_at: Date;
}

type CatalogCardProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pattern: Pattern;
  patternType: string;
  cardLink: string;
  cardHeight: string;
  cardWidth: string;
  cardStyles: React.CSSProperties;
  type: string;
  version?: string;
  avatarUrl: string;
  userName: string;
  technologies: string[];
  updatedAt: string;
  shouldFlip?: boolean;
  cardTechnologies?: boolean;
  isDetailed?: boolean;
  cardAvatarUrl?: boolean;
  date?: boolean;
  cardVersion?: boolean;
  UserName?: string;
  children?: React.ReactNode;
};

export const ClassToIconMap = {
  community: <CommunityClassIcon width="16px" height="12px" />,
  official: <OfficialClassIcon width="16px" height="12px" />,
  verified: <VerificationClassIcon width="16px" height="12px" />
};

const ClassWrap = ({ catalogClassName }: { catalogClassName: string }) => {
  if (!catalogClassName) return <></>;

  return (
    <StyledClassWrapper>
      <StyledInnerClassWrapper catalogClassName={catalogClassName}>
        {catalogClassName}
      </StyledInnerClassWrapper>
    </StyledClassWrapper>
  );
};

const CustomCatalogCard: React.FC<CatalogCardProps> = ({
  pattern,
  patternType,
  cardHeight,
  cardWidth,
  cardStyles,
  cardLink,
  shouldFlip,
  isDetailed,
  cardAvatarUrl,
  cardTechnologies,
  date,
  cardVersion,
  avatarUrl,
  UserName,
  children
}) => {
  const outerStyles = {
    height: cardHeight,
    width: cardWidth,
    ...cardStyles
  };

  return (
    <DesignCardUrl href={cardLink} target="_blank" rel="noreferrer">
      <DesignCard shouldFlip={shouldFlip} isDetailed={isDetailed} outerStyles={outerStyles}>
        <DesignInnerCard shouldFlip={shouldFlip} className="innerCard">
          <CardFront shouldFlip={shouldFlip} isDetailed={isDetailed}>
            {isDetailed && (
              <>
                <ClassWrap catalogClassName={pattern?.catalog_data?.content_class ?? ''} />
                <DesignType>{patternType}</DesignType>

                <DesignName
                  style={{
                    color: '#000D12',
                    margin: '3rem 0 1.59rem 0',
                    textAlign: 'center'
                  }}
                >
                  {pattern.name}
                </DesignName>
              </>
            )}
            <DesignDetailsDiv>
              <div
                style={{
                  background: 'rgba(231, 239, 243, 0.40)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.5rem',
                  width: '100%',
                  borderRadius: '0.5rem'
                }}
              >
                {children}
              </div>
            </DesignDetailsDiv>
            {isDetailed && (
              <MetricsContainerFront isDetailed={isDetailed}>
                <MetricsDiv>
                  <DownloadIcon width={18} height={18} />
                  <MetricsCount>{pattern.download_count}</MetricsCount>
                </MetricsDiv>
                <MetricsDiv>
                  <CloneIcon width={18} height={18} fill={'#51636B'} />
                  <MetricsCount>{pattern.clone_count}</MetricsCount>
                </MetricsDiv>
                <MetricsDiv>
                  <OpenIcon width={18} height={18} fill={'#51636B'} />
                  <MetricsCount>{pattern.view_count}</MetricsCount>
                </MetricsDiv>
                <MetricsDiv>
                  <DeploymentsIcon width={18} height={18} />
                  <MetricsCount>{pattern.deployment_count}</MetricsCount>
                </MetricsDiv>
                <MetricsDiv>
                  <ShareIcon width={18} height={18} fill={'#51636B'} />
                  <MetricsCount>{pattern.share_count}</MetricsCount>
                </MetricsDiv>
              </MetricsContainerFront>
            )}
          </CardFront>
          {shouldFlip && (
            <CardBack isCatalog={true}>
              {cardAvatarUrl && (
                <ProfileSection>
                  <Avatar
                    alt="Design Author"
                    src={avatarUrl}
                    sx={{ width: '32px', height: '32px', color: '#293B43' }}
                  />
                  <DesignAuthorName>{UserName}</DesignAuthorName>
                </ProfileSection>
              )}

              <DesignDetailsDiv style={{ marginTop: '0.7rem', gap: '5px' }}>
                {cardTechnologies && (
                  <TechnologiesSection>
                    <Typography
                      variant="subtitle1"
                      style={{ color: 'white', textDecoration: 'underline' }}
                    >
                      Technologies
                    </Typography>
                    <Box display="flex" alignItems="center" justifyContent="center" mt={1}>
                      <img
                        src="path_to_kubernetes_icon"
                        alt="Kubernetes"
                        style={{ width: '40px', height: '40px' }}
                      />
                    </Box>
                  </TechnologiesSection>
                )}
              </DesignDetailsDiv>

              {date && (
                <DesignDetailsDiv>
                  <Grid container style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <Grid
                      item
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          gap: '0.2rem',
                          alignItems: 'center'
                        }}
                      >
                        <CalendarMonthIcon width={18} height={18} />
                        <DateType>Updated At</DateType>
                      </div>
                      <DateText>
                        {' '}
                        {new Date(pattern.updated_at.toString().slice(0, 10)).toLocaleDateString(
                          'en-US',
                          {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          }
                        )}
                      </DateText>
                    </Grid>
                  </Grid>
                </DesignDetailsDiv>
              )}

              {cardVersion && (
                <VersionTag>
                  <Typography variant="body2">v{cardVersion}</Typography>
                </VersionTag>
              )}
            </CardBack>
          )}
        </DesignInnerCard>
      </DesignCard>
    </DesignCardUrl>
  );
};

export default CustomCatalogCard;
