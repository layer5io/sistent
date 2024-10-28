import React, { useState } from 'react';
import { RenderMarkdown } from '../Markdown';
import { ShowToggleBtn } from './style';

interface PatternInfoProps {
  text: string;
  redirect?: boolean;
  id?: string;
}

const PatternInfo: React.FC<PatternInfoProps> = ({ text, redirect, id }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleRedirect = () => {
    if (id) {
      window.location.href = `/catalog/content/design/${id}`;
    }
  };

  return (
    <div style={{ whiteSpace: 'normal' }}>
      {isExpanded ? (
        <div>
          <RenderMarkdown content={text} />
          <ShowToggleBtn onClick={toggleExpand}>show less</ShowToggleBtn>
        </div>
      ) : (
        <div>
          <RenderMarkdown content={text.substring(0, redirect ? 400 : 500)} />
          {text.length > (redirect ? 400 : 500) && (
            <ShowToggleBtn onClick={redirect ? handleRedirect : toggleExpand}>
              ...show more
            </ShowToggleBtn>
          )}
        </div>
      )}
    </div>
  );
};

export default PatternInfo;
