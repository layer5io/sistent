import React from 'react';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import LayoutWrapper from './layout.style';
import { Col } from '../reuse/Layout';

const Layout = ({ children }) => {
  return (
    <LayoutWrapper>
      <Navbar />
      <div className="content">
        <div className="main-content">
          <Sidebar />
          <Col>
            <main className="main">{children}</main>
          </Col>
        </div>
        <Footer />
      </div>
    </LayoutWrapper>
  );
};

export default Layout;
