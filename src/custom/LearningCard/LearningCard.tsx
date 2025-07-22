import React from 'react';
import { ExternalLinkIcon } from '../../icons';
import {
  Card2,
  CardActive,
  CardDesc,
  CardHead,
  CardImage,
  CardLink,
  CardParent,
  CardSubdata,
  CardWrapper,
  OwnLearningCard
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
  cardKey?: string;
}

const OptionalLink: React.FC<React.PropsWithChildren<{ path?: string; isExternal?: boolean }>> = ({
  path,
  children,
  isExternal
}) => {
  if (!path) {
    return <>{children}</>;
  }

  return (
    <CardLink
      href={path}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      {children}
    </CardLink>
  );
};

const LearningCard: React.FC<Props> = ({ tutorial, path, courseCount, courseType, cardKey }) => {
  const isCreateLearningPath = cardKey === 'create-learning-path';

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
        <OptionalLink path={path} isExternal={isCreateLearningPath}>
          {isCreateLearningPath ? (
            <OwnLearningCard>
              <CardParent style={{ borderTop: `5px solid ${tutorial.frontmatter.themeColor}` }}>
                <div>
                  <CardHead>
                    <h3>
                      {tutorial.frontmatter.title
                        ? tutorial.frontmatter.title
                        : tutorial.frontmatter.courseTitle}
                    </h3>
                    {isCreateLearningPath && path && (
                      <ExternalLinkIcon width="24px" height="24px" />
                    )}
                    {tutorial.frontmatter.status ? (
                      <p>
                        <span>New</span>
                      </p>
                    ) : null}
                  </CardHead>
                  <CardDesc>
                    <p className="summary">{tutorial.frontmatter.description}</p>
                  </CardDesc>
                  <CardImage>
                    <img src={tutorial.frontmatter.cardImage} />
                  </CardImage>
                </div>
              </CardParent>
            </OwnLearningCard>
          ) : (
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
                  {!isCreateLearningPath && (
                    <CardSubdata className="card-subdata">
                      <p>
                        {courseCount} {courseType}
                        {courseCount > 1 ? 's' : ''}
                      </p>
                    </CardSubdata>
                  )}
                  <CardImage>
                    <img src={tutorial.frontmatter.cardImage} />
                  </CardImage>
                </div>
              </CardParent>
            </CardActive>
          )}
        </OptionalLink>
      )}
    </CardWrapper>
  );
};

export default LearningCard;
