import React from 'react';
import { TOCWrapper } from './style';

interface TOCProps {
  availableChapters: string[];
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
              key={item}
              className={item + '.mdx' === currentChapter ? 'active-link' : ''}
              onClick={(e) => {
                onClick(item, e);
              }}
            >
              <p className="toc-item"> {reformatTOC(item)}</p>
            </li>
          ))}
        </ul>
      </div>
    </TOCWrapper>
  );
};

export default TOC;
