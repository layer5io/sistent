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
  DesignCard,
  DesignDetailsDiv,
  DesignInnerCard,
  DesignName,
  DesignType,
  ImageWrapper,
  MetricsContainerFront,
  MetricsCount,
  MetricsDiv,
  StyledClassWrapper,
  StyledInnerClassWrapper
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

export const VersionTag = styled('div')(({ theme }) => ({
  display: 'inline-block',
  backgroundColor: theme.palette.background.secondary,
  color: theme.palette.text.secondary,
  borderRadius: '4px',
  fontSize: '0.75rem',
  fontWeight: 'bold',
  margin: '5px 0',
  padding: '2px 5px',
  maxWidth: 'fit-content'
}));

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

const FlipCard = styled('div')(() => ({
  perspective: '1000px',
  '&:hover .flipper': {
    transform: 'rotateY(-180deg)'
  }
}));

const Flipper = styled('div')(() => ({
  transition: '0.6s',
  transformStyle: 'preserve-3d',
  position: 'relative'
}));

const Face = styled('div')(() => ({
  backfaceVisibility: 'hidden',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%'
}));

const FrontFace = styled(Face)(() => ({
  zIndex: 2,
  transform: 'rotateY(0deg)'
}));

const BackFace = styled(Box)(() => ({
  transform: 'rotateY(-180deg)',
  color: '#fff',
  display: 'inline-flex',
  flexDirection: 'column',
  padding: '16px',
  height: '100%',
  width: '100%',
  position: 'relative',
  bottom: 0,
  left: 0,
  backfaceVisibility: 'hidden'
}));

const BackFaceContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  background: `linear-gradient(to bottom right, black 40%, ${theme.palette.background.brand?.default})`,
  width: '100%',
  top: 0,
  left: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'left',
  padding: '16px',
  boxShadow: `2px 2px 3px 0px black`,
  borderRadius: '1rem'
}));

const ProfileSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '16px'
});

const TechnologiesSection = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.25)',
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  marginBottom: '16px'
}));

const UpdatedSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  color: '#fff',
  margin: '20px 0'
});

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
