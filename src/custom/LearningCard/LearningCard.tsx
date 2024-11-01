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
    cardImage: string;
  };
}

interface Props {
  tutorial: Tutorial;
  path?: string;
  courseCount: number;
  courseType: string;
}

const OptionalLink: React.FC<React.PropsWithChildren<{ path?: string }>> = ({ path, children }) => {
  if (!path) {
    return <>{children}</>;
  }

  return <CardLink href={path}>{children}</CardLink>;
};

const LearningCard: React.FC<Props> = ({ tutorial, path, courseCount, courseType }) => {
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
                <img src={tutorial.frontmatter.cardImage} alt={tutorial.frontmatter.title} />
              </CardImage>
            </div>
          </CardParent>
        </Card2>
      ) : (
        <OptionalLink path={path}>
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
                    {courseCount} {courseType}
                    {courseCount > 1 ? 's' : ''}
                  </p>
                </CardSubdata>
                <CardImage>
                  <img src={tutorial.frontmatter.cardImage} />
                </CardImage>
              </div>
            </CardParent>
          </CardActive>
        </OptionalLink>
      )}
    </CardWrapper>
  );
};

export default LearningCard;
