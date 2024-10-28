import { Box } from '@mui/material';
import React from 'react';
import { InfoTooltip } from '../CustomTooltip';
import { ContentDetailsPoints, ContentDetailsText } from '../Typography';
import { CONTENT_CLASS, formatToTitleCase } from './helper';
import { Class } from './types';

interface ContentClassInfoProps {
  contentClass: string;
  classes: Class[];
}

const ClassIcon: React.FC<{ className: string }> = ({ className }) => {
  const Icon = CONTENT_CLASS[className]?.icon;
  return Icon ? <Icon width="25px" height="25px" /> : null;
};

const ContentClassInfo: React.FC<ContentClassInfoProps> = ({ contentClass, classes }) => {
  const classDescription = (className: string): string | undefined => {
    const classObj = classes && classes.find((classObj) => classObj.class === className);
    return classObj?.description;
  };

  return (
    <div>
      <Box style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
        <ContentDetailsPoints>CLASS</ContentDetailsPoints>
        <InfoTooltip
          variant="standard"
          helpText={classDescription(contentClass)}
          style={{ marginBottom: '0.2rem' }}
        />
      </Box>
      <ContentDetailsText
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem'
        }}
      >
        <ClassIcon className={contentClass} />
        {formatToTitleCase(contentClass)}
      </ContentDetailsText>
    </div>
  );
};

export default ContentClassInfo;
