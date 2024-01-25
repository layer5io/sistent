import React from 'react';
import SidebarWrapper from './sidebar.style';
import { Link } from 'gatsby';
import { useLocation } from '@reach/router';
import Dropdown from './Dropdown';

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <SidebarWrapper xs={2}>
      <ul className="list">
        {SIDEBAR_ITEMS.map((item) => (
          <li key={item.id} className={`item ${path === item.path ? 'active' : ''}`}>
            {item.isLinked ? (
              <Link to={item.path}>{item.title}</Link>
            ) : (
              <Dropdown items={item.children}>{item.title}</Dropdown>
            )}
          </li>
        ))}
      </ul>
    </SidebarWrapper>
  );
};

const SIDEBAR_ITEMS = [
  {
    id: 1,
    title: 'About Sistent',
    isLinked: true,
    path: '/',
    children: []
  },
  {
    id: 2,
    title: 'Identity',
    isLinked: false,
    path: null,
    children: [
      {
        id: 2.1,
        title: 'Color',
        isLinked: true,
        path: '/identity/color/',
        children: []
      },
      {
        id: 2.2,
        title: 'Typography',
        isLinked: true,
        path: '/identity/typography/',
        children: []
      }
    ]
  },
  {
    id: 3,
    title: 'Components',
    isLinked: true,
    path: '/components/',
    children: []
  },
  {
    id: 4,
    title: 'Patterns & Templates',
    isLinked: true,
    path: '/patterns/',
    children: []
  },
  {
    id: 5,
    title: 'Visualization & Illustration',
    isLinked: true,
    path: '/illustrations/',
    children: []
  }
];

export default Sidebar;
