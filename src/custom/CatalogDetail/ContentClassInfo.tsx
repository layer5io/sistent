import React from 'react';
import { Box } from '../../base';
import { CommunityClassIcon, OfficialClassIcon, VerificationClassIcon } from '../../icons';
import { KEPPEL, useTheme } from '../../theme';
import { InfoTooltip } from '../CustomTooltip';
import { ContentDetailsPoints, ContentDetailsText } from '../Typography';
import { formatToTitleCase } from './helper';
import { Class, ContentClassType } from './types';

interface ContentClassInfoProps {
  contentClass: string;
  classes: Class[];
}

const ContentClassInfo: React.FC<ContentClassInfoProps> = ({ contentClass, classes }) => {
  const _classDescription = (className: string): string | undefined => {
    const classObj = classes && classes.find((classObj) => classObj.class === className);
    return classObj?.description;
  };

  const theme = useTheme();

  const CONTENT_CLASS: ContentClassType = {
    community: {
      icon: CommunityClassIcon,
      color: theme.palette.icon.secondary
    },
    official: {
      icon: OfficialClassIcon,
      color: '#EBC017'
    },
    verified: {
      icon: VerificationClassIcon,
      color: theme.palette.primary.brand?.default || KEPPEL
    }
  } as const;

  const ClassIcon: React.FC<{ className: string }> = ({ className }) => {
    const Icon = CONTENT_CLASS[className]?.icon;
    const fill = CONTENT_CLASS[className]?.color;
    return Icon ? <Icon width="25px" height="25px" fill={fill} /> : null;
  };

  return (
    <div>
      <Box style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
        <ContentDetailsPoints style={{ fontFamily: 'inherit', fontWeight: 'bold' }}>
          CLASS
        </ContentDetailsPoints>
        <InfoTooltip
          variant="standard"
          helpText={_classDescription(contentClass)}
          style={{ marginBottom: '0.2rem' }}
        />
      </Box>
      <ContentDetailsText
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontFamily: 'inherit'
        }}
      >
        <ClassIcon className={contentClass} />
        {formatToTitleCase(contentClass)}
      </ContentDetailsText>
    </div>
  );
};

export default ContentClassInfo;
