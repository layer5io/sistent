import React from 'react';
import { ChapterCardWrapper, ChapterContent, ChapterDescription, ChapterNumber } from './style';

interface Chapter {
  frontmatter: {
    chapterTitle?: string;
    courseTitle: string;
    description: string;
  };
}

interface Props {
  chapterNum: number;
  chapter: Chapter;
}

const ChapterCard: React.FC<Props> = ({ chapterNum, chapter }) => (
  <ChapterCardWrapper>
    <ChapterContent>
      <ChapterNumber>{chapterNum}</ChapterNumber>
      <ChapterDescription>
        <h3>
          {chapter.frontmatter.chapterTitle
            ? chapter.frontmatter.chapterTitle
            : chapter.frontmatter.courseTitle}
        </h3>
        <p>{chapter.frontmatter.description}</p>
      </ChapterDescription>
    </ChapterContent>
  </ChapterCardWrapper>
);

export default ChapterCard;
