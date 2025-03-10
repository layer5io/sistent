import { Carousel } from '../Carousel';
import { CatalogCardDesignLogo } from '../CustomCatalog';
import CustomCatalogCard, { Pattern } from '../CustomCatalog/CustomCard';
import { getHeadingText } from './helper';
import { AdditionalContainer, ContentHeading } from './style';
import { UserProfile } from './types';
export interface PatternsPerUser {
  patterns: Pattern[];
}
export interface DetailsByType {
  patterns: Pattern[];
}
interface RelatedDesignsProps {
  details: Pattern;
  type: string;
  patternsPerUser: PatternsPerUser;
  detailsByType?: DetailsByType;
  onSuggestedPatternClick: (pattern: Pattern) => void;
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
  const filteredPatterns = filterByType
    ? detailsByType?.patterns?.filter((pattern) => pattern.id !== details.id) || []
    : patternsPerUser?.patterns?.filter((pattern) => pattern.id !== details.id) || [];

  if (!filteredPatterns.length) return null;
  const organizationName = filterByType
    ? 'Similar Designs by Type'
    : fetchingOrgError || !orgName
      ? 'Unknown Organization'
      : orgName;

  const carouselItems = filteredPatterns.map((pattern) => (
    <CustomCatalogCard
      pattern={pattern}
      patternType={type}
      onCardClick={() => onSuggestedPatternClick(pattern)}
      UserName={`${userProfile?.first_name ?? ''} ${userProfile?.last_name ?? ''}`}
      avatarUrl={userProfile?.avatar_url}
      basePath={technologySVGPath}
      subBasePath={technologySVGSubpath}
      cardTechnologies={true}
    >
      <CatalogCardDesignLogo
        imgURL={pattern?.catalog_data?.imageURL}
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

export default RelatedDesigns;
