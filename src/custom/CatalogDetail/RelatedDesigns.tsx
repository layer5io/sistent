import { Carousel } from '../Carousel';
import { CatalogCardDesignLogo } from '../CustomCatalog';
import CustomCatalogCard, { Pattern, SuggestedPattern } from '../CustomCatalog/CustomCard';
import { getCatalogImageURLs } from '../CustomCatalog/Helper';
import { getHeadingText } from './helper';
import { AdditionalContainer, ContentHeading } from './style';
import { UserProfile } from './types';

export interface PatternsPerUser {
  patterns?: SuggestedPattern[];
}

export interface DetailsByType {
  patterns: Pattern[];
}

interface RelatedDesignsProps {
  details: Pattern;
  type: string;
  patternsPerUser?: PatternsPerUser;
  detailsByType?: DetailsByType;
  onSuggestedPatternClick: (pattern: SuggestedPattern) => void;
  userProfile?: UserProfile;
  technologySVGPath: string;
  technologySVGSubpath: string;
  orgName: string;
  fetchingOrgError: boolean;
  filterByType?: boolean;
}

const RelatedDesigns: React.FC<RelatedDesignsProps> = ({
  details,
  type,
  patternsPerUser,
  detailsByType,
  onSuggestedPatternClick,
  userProfile,
  technologySVGPath,
  technologySVGSubpath,
  orgName,
  fetchingOrgError,
  filterByType
}) => {
  const filteredPatterns: SuggestedPattern[] = filterByType
    ? detailsByType?.patterns?.filter((pattern) =>
        Boolean(pattern?.id && pattern?.name && pattern.id !== details.id)
      ) || []
    : patternsPerUser?.patterns?.filter((pattern) =>
        Boolean(pattern?.id && pattern?.name && pattern.id !== details.id)
      ) || [];

  if (!filteredPatterns.length) return null;
  const organizationName = filterByType
    ? 'Similar Designs by Type'
    : fetchingOrgError || !orgName
      ? 'Unknown Organization'
      : orgName;

  const carouselItems = filteredPatterns.map((pattern) => (
    <CustomCatalogCard
      key={pattern.id}
      pattern={pattern}
      patternType={type}
      onCardClick={() => onSuggestedPatternClick(pattern)}
      UserName={`${userProfile?.firstName ?? ''} ${userProfile?.lastName ?? ''}`}
      avatarUrl={userProfile?.avatarUrl}
      basePath={technologySVGPath}
      subBasePath={technologySVGSubpath}
      cardTechnologies={true}
    >
      <CatalogCardDesignLogo
        imgURL={getCatalogImageURLs(pattern)}
        height={'5.5rem'}
        width={'100%'}
        zoomEffect={false}
        type={{ type: type }}
      />
    </CustomCatalogCard>
  ));
  return (
    <AdditionalContainer>
      <ContentHeading>
        <h2 style={{ margin: '0', textTransform: 'uppercase' }}>
          {filterByType
            ? organizationName
            : getHeadingText({ type, userProfile, organizationName, fetchingOrgError })}
        </h2>
      </ContentHeading>
      <Carousel items={carouselItems} scrollAmount={300} />
    </AdditionalContainer>
  );
};

export type { SuggestedPattern };
export default RelatedDesigns;
