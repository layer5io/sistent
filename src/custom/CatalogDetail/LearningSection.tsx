import React, { useEffect, useState } from 'react';
import { Link, ListItemIcon } from '../../base';
import { CLOUD_URL } from '../../constants/constants';
import { LearningIcon } from '../../icons';
import { useTheme } from '../../theme';
import CollapsibleSection from './CollapsibleSection';
import { slugify } from './helper';
import { LabelDiv } from './style';
import { FilteredAcademyData } from './types';

interface LearningSectionProps {
  filteredAcademyData: FilteredAcademyData;
}

const LearningSection: React.FC<LearningSectionProps> = ({ filteredAcademyData }) => {
  const theme = useTheme();
  const [openLearning, setOpenLearning] = useState<boolean>(false);
  const [autoUpdate, setAutoUpdate] = useState<boolean>(true);

  useEffect(() => {
    if (autoUpdate) {
      setOpenLearning(Boolean((filteredAcademyData?.['learning-path'] ?? []).length > 0));
    }
  }, [filteredAcademyData, autoUpdate]);

  const toggleOpenLearning = (): void => {
    setOpenLearning((prev) => !prev);
    setAutoUpdate(false);
  };

  const renderLearningItem = (item: string, index: number) => (
    <Link
      href={`${CLOUD_URL}/academy/learning-paths/${slugify('' + item)}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <LabelDiv key={index} clickable={true}>
        <ListItemIcon sx={{ minWidth: '1.5rem', marginRight: 1 }}>
          <LearningIcon
            primaryFill={theme.palette.icon.default}
            secondaryFill={theme.palette.icon.secondary}
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
        title="Learning Paths"
        isOpen={openLearning}
        onToggle={toggleOpenLearning}
        items={filteredAcademyData['learning-path'] || []}
        renderItem={renderLearningItem}
        tooltip="Learning Paths are designed to help you understand and master cloud native technologies by combining theoretical knowledge with hands-on, practical experience. [Browse all learning paths](/academy/learning-paths)"
        emptyState="No learning paths available for this technology"
      />
    </>
  );
};

export default LearningSection;
