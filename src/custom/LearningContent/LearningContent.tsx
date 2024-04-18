import React from 'react';
import { ChapterContent, ChapterDesc, ChapterNumber, ContentCardWrapper } from './style';

interface ChapterProps {
  frontmatter: {
    courseTitle: string;
    chapterTitle?: string;
    description: string;
  };
}

interface ContentCardProps {
  chapterNum: number;
  chapter: ChapterProps;
}

const LearningContent: React.FC<ContentCardProps> = ({ chapterNum, chapter }) => (
  <ContentCardWrapper
    id={chapter.frontmatter.courseTitle ? chapter.frontmatter.courseTitle : undefined}
  >
    <ChapterContent>
      <ChapterNumber>{chapterNum}</ChapterNumber>
      <ChapterDesc>
        <h2>
          {chapter.frontmatter.chapterTitle
            ? chapter.frontmatter.chapterTitle
            : chapter.frontmatter.courseTitle}
        </h2>
        <p>{chapter.frontmatter.description}</p>
      </ChapterDesc>
    </ChapterContent>
  </ContentCardWrapper>
);

export default LearningContent;
