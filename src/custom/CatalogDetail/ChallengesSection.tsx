import { useEffect, useState } from 'react';
import { Link, ListItemIcon } from '../../base';
import { CLOUD_URL } from '../../constants/constants';
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
  const [openChallenges, setOpenChallenges] = useState(false);
  const [autoUpdate, setAutoUpdate] = useState(true);

  useEffect(() => {
    if (autoUpdate) {
      setOpenChallenges((filteredAcademyData?.['challenges'] ?? []).length > 0);
    }
  }, [filteredAcademyData, autoUpdate]);

  const toggleOpenChallenges = () => {
    setOpenChallenges((prev) => !prev);
    setAutoUpdate(false);
  };

  const renderChallengeItem = (item: string, index: number) => (
    <Link
      href={`${CLOUD_URL}/academy/challenges/${slugify('' + item)}`}
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
