import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Avatar, Box, Typography, styled } from '@mui/material';
import React from 'react';
import {
  CloneIcon,
  CommunityClassIcon,
  DesignIcon,
  OfficialClassIcon,
  OpenIcon,
  ShareIcon
} from '../../icons';
import VerificationClassIcon from '../../icons/ContentClassIcons/VerificationClassIcon';
import DeploymentsIcon from '../../icons/Deployments/DeploymentsIcon';
import { DownloadIcon } from '../../icons/Download';
import {
  BackFace,
  BackFaceContent,
  DesignCard,
  DesignDetailsDiv,
  DesignInnerCard,
  DesignName,
  DesignType,
  FlipCard,
  Flipper,
  FrontFace,
  ImageWrapper,
  MetricsContainerFront,
  MetricsCount,
  MetricsDiv,
  ProfileSection,
  StyledClassWrapper,
  StyledInnerClassWrapper,
  TechnologiesSection,
  UpdatedSection,
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
  };
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

const CatalogCard: React.FC<CatalogCardProps> = ({
  pattern,
  patternType,
  cardHeight,
  cardWidth,
  cardStyles,
  cardLink,
  version,
  avatarUrl,
  userName,
  updatedAt,
  technologies
}) => {
  const outerStyles = {
    height: cardHeight,
    width: cardWidth,
    ...cardStyles
  };

  const cardVersion = version || pattern?.userData?.version;
  const cardAvatarUrl = avatarUrl || pattern?.userData?.avatarUrl;
  const cardName = userName || pattern?.userData?.userName;
  const cardTechnologies = technologies || pattern?.userData?.technologies;
  const cardUpdatedAt = updatedAt || pattern?.userData?.updatedAt;
  const date = cardUpdatedAt ? new Date(cardUpdatedAt) : null;
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date ? date.toLocaleDateString('en-US', options) : 'N/A';

  return (
    <DesignCardUrl href={cardLink} target="_blank" rel="noreferrer">
      <FlipCard style={outerStyles}>
        <Flipper className="flipper">
          <FrontFace>
            <DesignCard outerStyles={outerStyles}>
              <DesignInnerCard className="innerCard">
                <ClassWrap catalogClassName={pattern?.catalog_data?.content_class ?? ''} />
                {/* {cardVersion && <VersionTag style={{ bottom: '65px', left: '18px' }}>v{cardVersion}</VersionTag>} */}
                <DesignType>{patternType}</DesignType>
                <DesignDetailsDiv>
                  <DesignName
                    style={{
                      margin: '3rem 0 1.59rem 0',
                      textAlign: 'center'
                    }}
                  >
                    {pattern.name}
                  </DesignName>
                  <ImageWrapper>
                    <DesignIcon height={'118'} width={'120'} />
                  </ImageWrapper>
                </DesignDetailsDiv>
                <MetricsContainerFront>
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
              </DesignInnerCard>
            </DesignCard>
          </FrontFace>
          <BackFace>
            <BackFaceContent>
              {cardAvatarUrl && (
                <ProfileSection>
                  <Avatar src={cardAvatarUrl} />
                  <Typography variant="h6" style={{ marginLeft: '8px', color: 'white' }}>
                    {cardName}
                  </Typography>
                </ProfileSection>
              )}

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

              {date && (
                <UpdatedSection>
                  <CalendarMonthIcon style={{ color: '#fff', marginRight: '8px' }} />
                  <Typography variant="body2" style={{ color: '#fff', marginRight: '24px' }}>
                    Updated At
                  </Typography>
                  <Typography variant="body2" style={{ color: '#fff' }}>
                    {formattedDate}
                  </Typography>
                </UpdatedSection>
              )}

              {cardVersion && (
                <VersionTag>
                  <Typography variant="body2">v{cardVersion}</Typography>
                </VersionTag>
              )}
            </BackFaceContent>
          </BackFace>
        </Flipper>
      </FlipCard>
    </DesignCardUrl>
  );
};

export default CatalogCard;
