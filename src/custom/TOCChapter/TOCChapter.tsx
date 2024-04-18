import React from 'react';
import { TOCWrapper } from './style';

interface TOCDataItem {
  chapter: string;
}

interface TOCProps {
  availableChapters: TOCDataItem[];
  currentChapter: string | undefined | null;
  onClick: (item: string, e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}

const TOC: React.FC<TOCProps> = ({ availableChapters, currentChapter, onClick }) => {
  const reformatTOC = (data: string): string => {
    let newData = data.split('-').join(' ');
    const firstLetter = newData.charAt(0).toUpperCase();
    newData = `${firstLetter}${newData.slice(1)}`;
    return newData;
  };
  return (
    <TOCWrapper>
      <div className="toc-list">
        <ul className={`toc-ul toc-ul-open`}>
          {availableChapters.map((item) => (
            <li
              key={item.chapter}
              className={item.chapter === currentChapter ? 'active-link' : ''}
              onClick={(e) => {
                onClick(item.chapter, e);
              }}
            >
              <p className="toc-item"> {reformatTOC(item.chapter)}</p>
            </li>
          ))}
        </ul>
      </div>
    </TOCWrapper>
  );
};

export default TOC;
