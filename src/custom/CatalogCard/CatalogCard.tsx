import { styled } from '@mui/material';
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

type CatalogCardProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pattern: any;
  patternType: string;
  cardLink: string;
  cardHeight: string;
  cardWidth: string;
  cardStyles: React.CSSProperties;
  type: string;
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
  cardLink
}) => {
  const outerStyles = {
    height: cardHeight,
    width: cardWidth,
    ...cardStyles
  };
  return (
    <DesignCardUrl href={cardLink} target="_blank" rel="noreferrer">
      <DesignCard outerStyles={outerStyles}>
        <DesignInnerCard className="innerCard">
          <ClassWrap catalogClassName={pattern?.catalog_data?.content_class} />
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
    </DesignCardUrl>
  );
};

export default CatalogCard;
