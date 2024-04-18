import React from 'react';
import {
  Card2,
  CardActive,
  CardDesc,
  CardHead,
  CardImage,
  CardLink,
  CardParent,
  CardSubdata,
  CardWrapper
} from './style';

interface Tutorial {
  frontmatter: {
    disabled: string;
    themeColor: string;
    title: string;
    courseTitle: string;
    description: string;
    status?: boolean;
    cardImage: {
      src: string;
    };
  };
}

interface Props {
  tutorial: Tutorial;
  path: string;
  courseCount: number;
}

const LearningCard: React.FC<Props> = ({ tutorial, path, courseCount }) => {
  return (
    <CardWrapper>
      {tutorial.frontmatter.disabled === 'yes' ? (
        <Card2>
          <CardParent style={{ borderTop: `5px solid ${tutorial.frontmatter.themeColor}` }}>
            <div>
              <CardHead>
                <h3>
                  {tutorial.frontmatter.title
                    ? tutorial.frontmatter.title
                    : tutorial.frontmatter.courseTitle}
                </h3>
                <div style={{ whiteSpace: 'nowrap' }}>
                  <span>Coming Soon</span>
                </div>
              </CardHead>
              <CardDesc>
                <p className="summary">{tutorial.frontmatter.description}</p>
              </CardDesc>
              <CardImage>
                <img src={tutorial.frontmatter.cardImage.src} alt={tutorial.frontmatter.title} />
              </CardImage>
            </div>
          </CardParent>
        </Card2>
      ) : (
        <CardLink href={path}>
          <CardActive>
            <CardParent style={{ borderTop: `5px solid ${tutorial.frontmatter.themeColor}` }}>
              <div>
                <CardHead>
                  <h3>
                    {tutorial.frontmatter.title
                      ? tutorial.frontmatter.title
                      : tutorial.frontmatter.courseTitle}
                  </h3>
                  {tutorial.frontmatter.status ? (
                    <p>
                      <span>New</span>
                    </p>
                  ) : null}
                </CardHead>
                <CardDesc>
                  <p className="summary">{tutorial.frontmatter.description}</p>
                </CardDesc>
                <CardSubdata className="card-subdata">
                  <p>
                    {courseCount} Course{courseCount === 1 ? '' : 's'}
                  </p>
                </CardSubdata>
                <CardImage>
                  <img src={tutorial.frontmatter.cardImage.src} alt={tutorial.frontmatter.title} />
                </CardImage>
              </div>
            </CardParent>
          </CardActive>
        </CardLink>
      )}
    </CardWrapper>
  );
};

export default LearningCard;
