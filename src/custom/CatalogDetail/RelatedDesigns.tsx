import { CatalogCardDesignLogo } from '../CustomCatalog';
import CustomCatalogCard, { Pattern } from '../CustomCatalog/CustomCard';
import { formatToTitleCase } from './helper';
import { AdditionalContainer, ContentHeading, DesignCardContainer } from './style';

export interface PatternsPerUser {
  patterns: Pattern[];
}

interface RelatedDesignsProps {
  details: Pattern;
  type: string;
  patternsPerUser: PatternsPerUser;
}

const RelatedDesigns: React.FC<RelatedDesignsProps> = ({ details, type, patternsPerUser }) => {
  const filteredPatternsPerUser = patternsPerUser?.patterns?.filter(
    (pattern) => pattern.id !== details.id
  );

  if (!filteredPatternsPerUser?.length) return null;

  return (
    <AdditionalContainer>
      <ContentHeading>
        <h2 style={{ margin: '0', textTransform: 'uppercase' }}>
          Other published design by {formatToTitleCase(details.user.first_name)}
        </h2>
      </ContentHeading>
      <DesignCardContainer>
        {filteredPatternsPerUser.map((pattern, index) => (
          <CustomCatalogCard key={`design-${index}`} pattern={pattern} patternType={type}>
            <CatalogCardDesignLogo
              imgURL={pattern?.catalog_data?.imageURL}
              height={'100%'}
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
