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
  actionItems?: boolean;
  isCloneLoading: boolean;
  handleClone: (name: string, id: string) => void;
  showTechnologies?: boolean;
  filteredAcademyData: FilteredAcademyData;
  isCloneDisabled: boolean;
  technologySVGPath: string;
  technologySVGSubpath: string;
  fontFamily?: string;
  handleUnpublish: () => void;
  showUnpublishAction?: boolean;
  showOpenPlaygroundAction?: boolean;
  onOpenPlaygroundClick: (designId: string, name: string) => void;
}

const LeftPanel: React.FC<LeftPanelProps> = ({
  details,
  type,
  actionItems = true,
  isCloneLoading,
  handleClone,
  handleUnpublish,
  showTechnologies = true,
  filteredAcademyData,
  isCloneDisabled,
  technologySVGPath,
  technologySVGSubpath,
  fontFamily,
  showUnpublishAction = false,
  showOpenPlaygroundAction = true,
  onOpenPlaygroundClick
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
          zoomEffect={true}
          type={{ type: type }}
        />
      </CustomCatalogCard>
      <ActionButtons
        actionItems={actionItems}
        details={details}
        type={type}
        isCloneLoading={isCloneLoading}
        handleClone={handleClone}
        showUnpublishAction={showUnpublishAction}
        handleUnpublish={handleUnpublish}
        isCloneDisabled={isCloneDisabled}
        showOpenPlaygroundAction={showOpenPlaygroundAction}
        onOpenPlaygroundClick={onOpenPlaygroundClick}
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
