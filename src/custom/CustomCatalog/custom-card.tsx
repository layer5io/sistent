import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Avatar, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Grid } from '../../base';
import { CloneIcon, CommunityClassIcon, OfficialClassIcon, OpenIcon, ShareIcon } from '../../icons';
import VerificationClassIcon from '../../icons/ContentClassIcons/VerificationClassIcon';
import DeploymentsIcon from '../../icons/Deployments/DeploymentsIcon';
import { DownloadIcon } from '../../icons/Download';
import { CustomTooltip } from '../CustomTooltip';
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
  NoTechnologyText,
  ProfileSection,
  StyledClassWrapper,
  StyledInnerClassWrapper,
  TechnologiesSection,
  TechnologyText,
  VersionDiv,
  VersionText
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
    compatibility?: string[];
  };
  visibility: string;
  updated_at: Date;
}

type CatalogCardProps = {
  pattern: Pattern;
  patternType: string;
  cardLink: string;
  cardHeight: string;
  cardWidth: string;
  cardStyles: React.CSSProperties;
  version?: string;
  avatarUrl: string;
  shouldFlip?: boolean;
  cardTechnologies?: boolean;
  isDetailed?: boolean;
  cardAvatarUrl?: boolean;
  date?: boolean;
  cardVersion?: boolean;
  UserName?: string;
  children?: React.ReactNode; // catalogImage
  TechnologyComponent?: React.ReactNode;
  basePath?: string; // path of meshmodel img stored
  subBasePath?: string; // path of meshmodel img stored
  getHostUrl?: () => string;
  onCardClick?: () => void;
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
  shouldFlip,
  isDetailed,
  cardTechnologies,
  cardVersion,
  avatarUrl,
  UserName,
  children,
  basePath,
  subBasePath,
  getHostUrl,
  onCardClick
}) => {
  const outerStyles = {
    height: cardHeight,
    width: cardWidth,
    ...cardStyles
  };

  const technologies = pattern.catalog_data?.compatibility || []; // an array
  const techlimit = 5;
  const [availableTechnologies, setAvailableTechnologies] = useState<string[]>([]);
  const checkImageUrlValidity = async (url: string, appendHostUrl = true) => {
    return new Promise((resolve) => {
      const img = new Image();
      // Only append host if the URL does not start with "http" or "https"
      if (appendHostUrl && !url.startsWith('http')) {
        img.src = (getHostUrl ? getHostUrl() : '') + url;
      } else {
        img.src = url;
      }
      img.onload = () => {
        // Check if the image loaded successfully
        resolve(true);
      };

      img.onerror = () => {
        // Handle the case where the image could not be loaded
        resolve(false);
      };
    });
  };

  const handleImage = async () => {
    const validSvgPaths = [];
    for (const technology of technologies) {
      const svgIconPath = `${basePath}/${technology.toLowerCase()}/${subBasePath}/${technology.toLowerCase()}-color.svg`;
      const isSvgPathValid = await checkImageUrlValidity(svgIconPath as string);
      if (isSvgPathValid) {
        validSvgPaths.push(technology);
      }
    }

    setAvailableTechnologies(validSvgPaths);
  };
  useEffect(() => {
    handleImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!shouldFlip) {
    return (
      <DesignCard shouldFlip={shouldFlip} isDetailed={isDetailed} outerStyles={outerStyles}>
        <DesignInnerCard shouldFlip={shouldFlip} className="innerCard">
          <CardFront shouldFlip={shouldFlip} isDetailed={isDetailed}>
            {children}
          </CardFront>
        </DesignInnerCard>
      </DesignCard>
    );
  }

  return (
    <DesignCard
      shouldFlip={shouldFlip}
      isDetailed={isDetailed}
      outerStyles={outerStyles}
      onClick={onCardClick}
    >
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
            <ProfileSection>
              <Avatar
                alt="Design Author"
                src={avatarUrl}
                sx={{ width: '32px', height: '32px', color: '#293B43' }}
              />
              <DesignAuthorName>{UserName}</DesignAuthorName>
            </ProfileSection>

            <DesignDetailsDiv style={{ marginTop: '0.7rem', gap: '5px' }}>
              {cardTechnologies && (
                <TechnologiesSection>
                  <TechnologyText>Technologies</TechnologyText>
                  <Grid
                    container
                    style={{ gap: '4px', alignItems: 'flex-start', flexWrap: 'nowrap' }}
                  >
                    {technologies.length < 1 || availableTechnologies.length < 1 ? (
                      <NoTechnologyText>No technologies</NoTechnologyText>
                    ) : (
                      <>
                        {availableTechnologies.slice(0, techlimit).map((technology, index) => {
                          const svgPath =
                            (getHostUrl ? getHostUrl() : '') +
                            `${basePath}/${technology.toLowerCase()}/${subBasePath}/${technology.toLowerCase()}-color.svg`;
                          return (
                            <Grid item key={index}>
                              <CustomTooltip key={index} title={technology.toLowerCase()}>
                                <img
                                  height="24px"
                                  width="24px"
                                  alt={technology.toLowerCase()}
                                  src={svgPath}
                                />
                              </CustomTooltip>
                            </Grid>
                          );
                        })}
                        {availableTechnologies.length > techlimit && (
                          <Grid
                            item
                            sx={{
                              padding: '0 8px 0 4px',
                              borderRadius: '16px',
                              border: '1px solid #C9DBE3',
                              background: '#E7EFF3',
                              color: '#3C494E',
                              fontSize: '14px',
                              lineHeight: '1.5',
                              fontWeight: '600'
                            }}
                          >
                            +{availableTechnologies.length - techlimit}
                          </Grid>
                        )}
                      </>
                    )}
                  </Grid>
                </TechnologiesSection>
              )}
            </DesignDetailsDiv>

            {isDetailed && (
              <DesignDetailsDiv style={{ marginTop: '50px' }}>
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
              <VersionDiv>
                <VersionText>v{cardVersion}</VersionText>
              </VersionDiv>
            )}
          </CardBack>
        )}
      </DesignInnerCard>
    </DesignCard>
  );
};

export default CustomCatalogCard;
