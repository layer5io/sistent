import { CatalogCardDesignLogo } from '../CustomCatalog';
import CustomCatalogCard, { Pattern } from '../CustomCatalog/CustomCard';
import { formatToTitleCase } from './helper';
import { AdditionalContainer, ContentHeading, DesignCardContainer } from './style';
import { UserProfile } from './types';

export interface PatternsPerUser {
  patterns: Pattern[];
}

interface RelatedDesignsProps {
  details: Pattern;
  type: string;
  patternsPerUser: PatternsPerUser;
  onSuggestedPatternClick: (pattern: Pattern) => void;
  userProfile?: UserProfile;
  technologySVGPath: string;
  technologySVGSubpath: string;
  orgName: string;
  fetchingOrgError: boolean;
}

const RelatedDesigns: React.FC<RelatedDesignsProps> = ({
  details,
  type,
  patternsPerUser,
  onSuggestedPatternClick,
  userProfile,
  technologySVGPath,
  technologySVGSubpath,
  orgName,
  fetchingOrgError
}) => {
  const filteredPatternsPerUser = patternsPerUser?.patterns?.filter(
    (pattern) => pattern.id !== details.id
  );

  if (!filteredPatternsPerUser?.length) return null;

  return (
    <AdditionalContainer>
      <ContentHeading>
        <h2 style={{ margin: '0', textTransform: 'uppercase' }}>
          Other published design by {formatToTitleCase(userProfile?.first_name ?? '')}{' '}
          {fetchingOrgError ? '' : `under ${orgName}`}
        </h2>
      </ContentHeading>
      <DesignCardContainer>
        {filteredPatternsPerUser.map((pattern, index) => (
          <CustomCatalogCard
            key={`design-${index}`}
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
              height={'7.5rem'}
              width={'100%'}
              zoomEffect={false}
              type={{ type: type }}
            />
          </CustomCatalogCard>
        ))}
      </DesignCardContainer>
    </AdditionalContainer>
  );
};

export default RelatedDesigns;
