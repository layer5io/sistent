import React from 'react';
import Navbar from '../Navbar';
import Sidebar from '../../pages/identity/Sidebar';
import Footer from '../Footer';
import PageContainerWrapper from './PageContainer';

const Layout = ({ children }) => {
  return (
    <PageContainerWrapper>
      <Navbar />
      <div className="flex gap-8">
        <Sidebar />
        <main>{children}</main>
      </div>
      <Footer />
    </PageContainerWrapper>
  );
};

export default Layout;
