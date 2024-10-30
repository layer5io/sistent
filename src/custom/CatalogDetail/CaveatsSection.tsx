import React from 'react';
import { Pattern } from '../CustomCatalog/CustomCard';
import { RenderMarkdown } from '../Markdown';
import { ContentDetailsText } from '../Typography';
import { CaveatsContainer, ContentHeading } from './style';

interface CaveatsSectionProps {
  details: Pattern;
}

const CaveatsSection: React.FC<CaveatsSectionProps> = ({ details }) => {
  return (
    <CaveatsContainer>
      <ContentHeading>
        <h2 style={{ margin: '0' }}>CAVEATS AND CONSIDERATIONS</h2>
      </ContentHeading>
      {details?.catalog_data?.pattern_caveats ? (
        <ContentDetailsText style={{ whiteSpace: 'normal', fontFamily: 'inherit' }}>
          <RenderMarkdown
            content={decodeURIComponent(details.catalog_data.pattern_caveats || '')}
          />
        </ContentDetailsText>
      ) : (
        <ContentDetailsText>No caveats registered</ContentDetailsText>
      )}
    </CaveatsContainer>
  );
};

export default CaveatsSection;
