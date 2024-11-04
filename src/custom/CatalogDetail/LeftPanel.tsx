import { useTheme } from '../../theme';
import { CatalogCardDesignLogo, CustomCatalogCard } from '../CustomCatalog';
import { Pattern } from '../CustomCatalog/CustomCard';
import ActionButtons from './ActionButton';
import ChallengesSection from './ChallengesSection';
import LearningSection from './LearningSection';
import TechnologySection from './TechnologySection';
import { FilteredAcademyData } from './types';

interface LeftPanelProps {
  details: Pattern;
  type: string;
  cardId?: string;
  actionItems?: boolean;
  isCloneLoading: boolean;
  handleClone: (name: string, id: string) => void;
  showTechnologies?: boolean;
  mode: string;
  filteredAcademyData: FilteredAcademyData;
  isCloneDisabled: boolean;
  technologySVGPath: string;
  technologySVGSubpath: string;
  fontFamily?: string;
  showOpenPlaygroundButton?: boolean;
  handleUnpublish: () => void;
  showUnpublishAction?: boolean;
}

const LeftPanel: React.FC<LeftPanelProps> = ({
  details,
  type,
  cardId = details.id,
  actionItems = true,
  isCloneLoading,
  handleClone,
  handleUnpublish,
  showTechnologies = true,
  mode,
  filteredAcademyData,
  isCloneDisabled,
  technologySVGPath,
  technologySVGSubpath,
  fontFamily,
  showUnpublishAction = false,
  showOpenPlaygroundButton = true
}) => {
  const theme = useTheme();

  return (
    <div style={{ fontFamily }}>
      <CustomCatalogCard
        pattern={details}
        shouldFlip={false}
        isDetailed={false}
        cardStyles={{
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
          backgroundColor: theme.palette.background.default,
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
          padding: '1.5rem 2rem',
          borderRadius: '0.4rem'
        }}
        patternType={type}
        cardHeight="18rem"
        cardWidth="100%"
      >
        <CatalogCardDesignLogo
          imgURL={details?.catalog_data?.imageURL}
          height={'100%'}
          width={'100%'}
          zoomEffect={false}
          type={{ type: type }}
        />
      </CustomCatalogCard>
      <ActionButtons
        actionItems={actionItems}
        details={details}
        type={type}
        cardId={cardId}
        isCloneLoading={isCloneLoading}
        handleClone={handleClone}
        showUnpublishAction={showUnpublishAction}
        handleUnpublish={handleUnpublish}
        mode={mode}
        isCloneDisabled={isCloneDisabled}
        showOpenPlaygroundButton={showOpenPlaygroundButton}
      />
      {showTechnologies && (
        <TechnologySection
          technologySVGPath={technologySVGPath}
          technologySVGSubpath={technologySVGSubpath}
          technologies={details.catalog_data?.compatibility || []}
        />
      )}
      <LearningSection filteredAcademyData={filteredAcademyData} />
      <ChallengesSection filteredAcademyData={filteredAcademyData} />
    </div>
  );
};

export default LeftPanel;
