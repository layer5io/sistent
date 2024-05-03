import React, { useState } from 'react';
import { CloseIcon, DropDownIcon, OutlinedDoubleChevronIcon } from '../../icons';
import { TOCWrapper } from './style';
interface CourseData {
  frontmatter: {
    courseTitle: string;
  };
}

const preReqSteps = [
  { name: 'Set up', link: '/cloud-native-management/meshery' },
  {
    name: 'Run Meshery',
    link: '/cloud-native-management/meshery/getting-started'
  },
  {
    name: 'Manage Meshery',
    link: '/cloud-native-management/meshery/operating-service-meshes'
  }
];

interface TOCProps {
  coursesData: CourseData[];
}

const TOCLearning: React.FC<TOCProps> = ({ coursesData }) => {
  const [expand, setExpand] = useState(false);

  return (
    <TOCWrapper>
      <div className="go-back">
        <a href={'/learn/learning-paths'}>
          <OutlinedDoubleChevronIcon />
          <h4>Learning Paths</h4>
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
          <a href="#pre-requisites">
            <h5 className="toc-sub-heading">Pre-requisites</h5>
          </a>
          {preReqSteps.map((item, index) => (
            <li key={index}>
              <p className="toc-item">
                <a href={`#${item.name}`}>{item.name}</a>
              </p>
            </li>
          ))}

          <a href="#courses-list">
            <h5 className="toc-sub-heading">Courses</h5>
          </a>

          {coursesData.map((item, index) => (
            <li key={index}>
              <p className="toc-item">
                <a href={`#${item.frontmatter.courseTitle}`}>{item.frontmatter.courseTitle}</a>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </TOCWrapper>
  );
};

export default TOCLearning;
