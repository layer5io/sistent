import React, { useContext } from 'react';
import ThemeContext from '../Theme';
import Navbar from '../Navigation';
import Sidebar from '../../pages/identity/Sidebar';
import Footer from '../Footer';

const Layout = ({ children }) => {
  const theme = useContext(ThemeContext);

  return (
    <div className={`${theme.dark ? 'dark' : 'light'} bg-background-default`}>
      <Navbar />
      <div className="flex gap-8">
        <Sidebar />
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
