import React, { useEffect, useState } from 'react';
import { ChevronLeft, CloseIcon, DropDownIcon } from '../../icons'; // Assuming DropDownIcon is imported
import { TOCWrapper } from './style';
interface ChapterData {
  fields: {
    slug: string;
    learnpath: string;
    course: string;
  };
}

interface CourseData {
  fields: {
    slug: string;
  };
  frontmatter: {
    courseTitle: string;
  };
}

interface Location {
  pathname: string;
}

interface TOCDataItem {
  fields: {
    section: string;
    chapter: string;
  };
}

interface TOCProps {
  TOCData: TOCDataItem[];
  courseData: CourseData;
  chapterData: ChapterData;
  location: Location;
}

const TOC: React.FC<TOCProps> = ({ TOCData, courseData, chapterData, location }) => {
  const [path, setPath] = useState<string>('');
  const [expand, setExpand] = useState<boolean>(false);

  const reformatTOC = (data: string): string => {
    let newData = data.split('-').join(' ');
    const firstLetter = newData.charAt(0).toUpperCase();
    newData = `${firstLetter}${newData.slice(1)}`;
    return newData;
  };

  const getActiveServiceMesh = (chapterData: ChapterData): string =>
    chapterData.fields.slug.split('/')[4];

  const getCurrentPage = (location: Location): string | undefined => {
    if (location !== undefined && location.pathname !== undefined) {
      const currentChapter = location.pathname.split('/');
      if (currentChapter[currentChapter.length - 1] !== '')
        return currentChapter[currentChapter.length - 1];
      else return currentChapter[currentChapter.length - 2];
    }
    return undefined;
  };

  const availableChapters = TOCData.filter(
    (toc) => toc.fields.section === getActiveServiceMesh(chapterData)
  ).map((toc) => toc.fields.chapter);

  useEffect(() => {
    if (location.pathname.split('/')[2] === 'learning-paths') {
      if (location) {
        setPath(getCurrentPage(location) || '');
      }
    }
  }, [location]);

  return (
    <TOCWrapper>
      <div className="chapter-back">
        <a href={`/${courseData.fields.slug}`}>
          <ChevronLeft />
          <h4>{courseData.frontmatter.courseTitle}</h4>
        </a>
        <div className="toc-toggle-btn">
          {expand ? (
            <CloseIcon
              className="toc-menu-icon"
              onClick={() => {
                setExpand(!expand);
              }}
            />
          ) : (
            <DropDownIcon
              className="toc-menu-icon"
              onClick={() => {
                setExpand(!expand);
              }}
            />
          )}
        </div>
      </div>
      <div className="toc-list">
        <ul className={`toc-ul ${expand ? 'toc-ul-open' : ''}`}>
          {availableChapters.map((item) => (
            <li key={item} className={item === path ? 'active-link' : ''}>
              <p className="toc-item" key={item}>
                <a
                  href={`/learn/learning-paths/${chapterData.fields.learnpath}/${
                    chapterData.fields.course
                  }/${getActiveServiceMesh(chapterData)}/${item}/`}
                >
                  {reformatTOC(item)}
                </a>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </TOCWrapper>
  );
};

export default TOC;
