import React, { useState } from 'react';
import { Grid2, Typography } from '../../base';
import { ExternalLinkIcon } from '../../icons';
import { Modal, ModalBody, ModalButtonPrimary, ModalButtonSecondary, ModalFooter } from '../Modal';
import { CopyToClipboard } from '../ResourceDetailFormatters/Component';
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
    type?: string;
    level?: string;
  };
}

interface Props {
  tutorial: Tutorial;
  path?: string;
  courseCount: number;
  courseType: string;
  orgId?: string;
  modalContent?: string;
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

const LearningCard: React.FC<Props> = ({
  tutorial,
  path,
  courseCount,
  courseType,
  orgId,
  modalContent
}) => {
  const isCreateLearningPath = courseType === 'learning-card';
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
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
        <>
          {isCreateLearningPath ? (
            <OwnLearningCard onClick={handleModalOpen} style={{ cursor: 'pointer' }}>
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
            <OptionalLink path={path} isExternal={isCreateLearningPath}>
              <CardActive>
                <CardParent style={{ borderTop: `5px solid ${tutorial.frontmatter.themeColor}` }}>
                  <div>
                    <CardHead style={{ flexDirection: 'column' }}>
                      <Typography variant="body1" color="textSecondary">
                        {tutorial.frontmatter.type}
                      </Typography>
                      <h3 style={{ margin: '0.2rem 0.1rem' }}>
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
                        <p>
                          Level:{' '}
                          {tutorial?.frontmatter?.level
                            ? tutorial.frontmatter.level.charAt(0).toUpperCase() +
                              tutorial.frontmatter.level.slice(1)
                            : ''}
                        </p>
                      </CardSubdata>
                    )}
                    <CardImage>
                      <img src={tutorial.frontmatter.cardImage} />
                    </CardImage>
                  </div>
                </CardParent>
              </CardActive>
            </OptionalLink>
          )}
        </>
      )}

      <Modal
        open={modalOpen}
        closeModal={handleModalClose}
        title={tutorial.frontmatter.title || tutorial.frontmatter.courseTitle}
        maxWidth="sm"
      >
        <ModalBody>
          <Typography variant="body1">{modalContent}</Typography>
          {orgId && (
            <Grid2 container direction="row" alignItems="center" spacing={1}>
              <Grid2>
                <Typography variant="body1" color="textSecondary">
                  Your Organization ID: {orgId}
                </Typography>
              </Grid2>
              <Grid2>
                <CopyToClipboard data={orgId} />
              </Grid2>
            </Grid2>
          )}
        </ModalBody>
        <ModalFooter variant="filled">
          <ModalButtonSecondary onClick={handleModalClose}>Close</ModalButtonSecondary>
          {path && (
            <ModalButtonPrimary
              onClick={() => {
                window.open(path, '_blank');
                handleModalClose();
              }}
            >
              Visit Docs
            </ModalButtonPrimary>
          )}
        </ModalFooter>
      </Modal>
    </CardWrapper>
  );
};

export default LearningCard;
