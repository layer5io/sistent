import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useRef } from 'react';
import { CatalogCardDesignLogo } from '../CustomCatalog';
import CustomCatalogCard, { Pattern } from '../CustomCatalog/CustomCard';
import {
  AdditionalContainer,
  CarouselButton,
  CarouselContainer,
  CarouselWrapper,
  ContentHeading
} from './style';
import { UserProfile } from './types';

export interface PatternsPerUser {
  patterns: Pattern[];
}
export interface DetailsByType {
  patterns: Pattern[];
}
interface SimilarDesignProps {
  details: Pattern;
  detailsByType: DetailsByType;
  type: string;
  patternsPerUser: PatternsPerUser;
  onSuggestedPatternClick: (pattern: Pattern) => void;
  userProfile?: UserProfile;
  technologySVGPath: string;
  technologySVGSubpath: string;
  orgName: string;
  fetchingOrgError: boolean;
}

const SimilarDesign: React.FC<SimilarDesignProps> = ({
  details,
  detailsByType,
  type,
  onSuggestedPatternClick,
  userProfile,
  technologySVGPath,
  technologySVGSubpath
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const filteredPatterns = detailsByType?.patterns?.filter((pattern) => pattern.id !== details.id);

  if (!filteredPatterns?.length) return null;
  const organizationName = 'Similar Designs by Type';

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 300; // Adjust scroll distance per click
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <AdditionalContainer>
      <ContentHeading>
        <h2 style={{ margin: '0', textTransform: 'uppercase' }}>{organizationName}</h2>
      </ContentHeading>
      <CarouselWrapper>
        <CarouselButton onClick={() => scroll('left')}>
          <ChevronLeft />
        </CarouselButton>
        <CarouselContainer ref={carouselRef}>
          {filteredPatterns.map((pattern, index) => (
            <div key={`design-${index}`} className="carousel-item">
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
                  height={'7.5rem'}
                  width={'100%'}
                  zoomEffect={false}
                  type={{ type: type }}
                />
              </CustomCatalogCard>
            </div>
          ))}
        </CarouselContainer>
        <CarouselButton onClick={() => scroll('right')}>
          <ChevronRight />
        </CarouselButton>
      </CarouselWrapper>
    </AdditionalContainer>
  );
};

export default SimilarDesign;
