import { useMemo, useState } from 'react';
import { Link, ListItemIcon } from '../../base';
import { MESHERY_CLOUD_PROD } from '../../constants/constants';
import { ChallengesIcon } from '../../icons';
import { useTheme } from '../../theme';
import CollapsibleSection from './CollapsibleSection';
import { slugify } from './helper';
import { LabelDiv } from './style';
import { FilteredAcademyData } from './types';

interface ChallengesSectionProps {
  filteredAcademyData: FilteredAcademyData;
}

const ChallengesSection: React.FC<ChallengesSectionProps> = ({ filteredAcademyData }) => {
  const theme = useTheme();
  const [manualOverride, setManualOverride] = useState<boolean | null>(null);

  const hasChallenges = useMemo(
    () => (filteredAcademyData?.['challenge'] ?? []).length > 0,
    [filteredAcademyData]
  );

  const openChallenges = manualOverride !== null ? manualOverride : hasChallenges;

  const toggleOpenChallenges = () => {
    setManualOverride((prev) => (prev !== null ? !prev : !hasChallenges));
  };

  const renderChallengeItem = (item: string, index: number) => (
    <Link
      href={`${MESHERY_CLOUD_PROD}/academy/challenges/${slugify('' + item)}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <LabelDiv key={index} clickable={true}>
        <ListItemIcon sx={{ minWidth: '1.5rem', marginRight: 1 }}>
          <ChallengesIcon
            primaryFill={theme.palette.icon.default}
            secondaryFill={theme.palette.icon.secondary}
            brandFill={theme.palette.icon.secondary}
          />
        </ListItemIcon>
        {item}
      </LabelDiv>
    </Link>
  );

  return (
    <>
      <hr
        style={{
          backgroundColor: theme.palette.background.secondary,
          border: 'none',
          height: '1px',
          marginTop: '1rem',
          marginBottom: '1rem'
        }}
      />
      <CollapsibleSection
        title="Challenges"
        isOpen={openChallenges}
        onToggle={toggleOpenChallenges}
        items={filteredAcademyData['challenge'] ?? []}
        renderItem={renderChallengeItem}
        tooltip="Learn CNCF projects by taking and completing time-based, hands-on labs. [Browse all challenges](/academy/challenges)"
        emptyState="No active challenges for this technology"
      />
    </>
  );
};

export default ChallengesSection;
