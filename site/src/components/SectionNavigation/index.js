import React, { useState } from 'react';
import SectionNavigationWrapper from './navigation.style';
import { Col } from '../reuse/Layout';

const SectionNavigation = ({ navItems, defaultActiveIndex }) => {
  const [activeIndex, setActiveIndex] = useState();
  return (
    <SectionNavigationWrapper>
      <Col xs={4} className="nav-items">
        {navItems.map((item, index) => {
          return (
            <div
              className="item"
              style={{ width: `${100 / navItems.length}%` }}
              onClick={() => setActiveIndex(index)}
            >
              <p className={activeIndex === index && 'active'}>{item}</p>
            </div>
          );
        })}
        <div
          style={{
            width: `calc(${100 / navItems.length}%`,
            transform: `translateX(calc(${activeIndex * 100}%`
          }}
          className="active-indicator"
        ></div>
      </Col>
    </SectionNavigationWrapper>
  );
};

export default SectionNavigation;
