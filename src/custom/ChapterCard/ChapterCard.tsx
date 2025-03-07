import React from 'react';
import { Typography } from '../../base';
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
        <Typography variant="h3">
          {chapter.frontmatter.chapterTitle
            ? chapter.frontmatter.chapterTitle
            : chapter.frontmatter.courseTitle}
        </Typography>
        <p>{chapter.frontmatter.description}</p>
      </ChapterDescription>
    </ChapterContent>
  </ChapterCardWrapper>
);

export default ChapterCard;
