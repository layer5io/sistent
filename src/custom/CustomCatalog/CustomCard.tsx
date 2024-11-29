import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import React, { useEffect, useState } from 'react';
import { Avatar, Grid } from '../../base';
import { CloneIcon, CommunityClassIcon, OfficialClassIcon, OpenIcon, ShareIcon } from '../../icons';
import VerificationClassIcon from '../../icons/ContentClassIcons/VerificationClassIcon';
import DeploymentsIcon from '../../icons/Deployments/DeploymentsIcon';
import { DownloadIcon } from '../../icons/Download';
import { DARK_TEAL, styled, useTheme } from '../../theme';
import { SNOW_WHITE } from '../../theme/colors/colors';
import { CustomTooltip } from '../CustomTooltip';
import { getVersion, handleImage } from './Helper';
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

export interface Pattern {
  id: string;
  user_id: string;
  pattern_file: string;
  user: {
    first_name: string;
    last_name: string;
  };
  first_name?: string;
  last_name?: string;
  avatar_url: string;
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
    imageURL?: string[];
    compatibility?: string[];
    published_version?: string;
    type?: string;
    pattern_info?: string;
    pattern_caveats?: string;
  };
  visibility: string;
  updated_at: Date;
  created_at: Date;
}

type CatalogCardProps = {
  pattern: Pattern;
  patternType: string;
  cardHeight?: string;
  cardWidth?: string;
  cardStyles?: React.CSSProperties;
  avatarUrl?: string;
  shouldFlip?: boolean;
  cardTechnologies?: boolean;
  isDetailed?: boolean;
  UserName?: string;
  children?: React.ReactNode; // catalogImage
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
  cardHeight = '18rem',
  cardWidth = '15rem',
  cardStyles,
  shouldFlip = true,
  isDetailed = true,
  cardTechnologies = true,
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
  const theme = useTheme();

  const technologies = pattern.catalog_data?.compatibility || [];
  const techlimit = 5;
  const [availableTechnologies, setAvailableTechnologies] = useState<string[]>([]);
  const version = getVersion(pattern);

  useEffect(() => {
    handleImage({
      technologies,
      basePath,
      subBasePath,
      setAvailableTechnologies
    });
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
              <DesignName>{pattern.name}</DesignName>
            </>
          )}
          <DesignDetailsDiv>
            <div
              style={{
                background:
                  theme.palette.mode === 'light' ? 'rgba(231, 239, 243, 0.4)' : 'transparent',
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
              {[
                { Icon: DownloadIcon, count: pattern.download_count },
                { Icon: CloneIcon, count: pattern.clone_count },
                { Icon: OpenIcon, count: pattern.view_count },
                { Icon: DeploymentsIcon, count: pattern.deployment_count },
                { Icon: ShareIcon, count: pattern.share_count }
              ].map(({ Icon, count }, index) => (
                <MetricsDiv key={index}>
                  <Icon
                    width={18}
                    height={18}
                    fill={theme.palette.mode === 'light' ? DARK_TEAL : SNOW_WHITE}
                  />
                  <MetricsCount>{count}</MetricsCount>
                </MetricsDiv>
              ))}
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
              <DesignDetailsDiv style={{ marginTop: '40px' }}>
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
            {version && (
              <VersionDiv>
                <VersionText>v{version}</VersionText>
              </VersionDiv>
            )}
          </CardBack>
        )}
      </DesignInnerCard>
    </DesignCard>
  );
};

export default CustomCatalogCard;
