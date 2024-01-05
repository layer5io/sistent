import React from 'react';
import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ThemeContext from '../components/Theme';
import '../styles/global.css';
import Home from './home';
import Color from './identity/color';
import Elevation from './identity/elevation';
import PageLayout from './identity/page-layouts';
import Spacing from './identity/spacing';
import Typography from './identity/typography';
import Sidebar from './identity/Sidebar';
import Navbar from '../components/Navigation';
import Footer from '../components/Footer';

const IndexPage = () => {
  const theme = useContext(ThemeContext);

  return (
    <div className={`${theme.dark ? 'dark' : 'light'} bg-background-default`}>
      <Navbar />
      <div className="flex gap-8">
        <Sidebar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/identity/color" element={<Color />} />
            <Route path="/identity/color/:id" element={<Color />} />
            <Route path="/identity/typography" element={<Typography />} />
            <Route path="/identity/typography/:id" element={<Typography />} />
            <Route path="/identity/spacing" element={<Spacing />} />
            <Route path="/identity/layouts" element={<PageLayout />} />
            <Route path="/identity/elevation" element={<Elevation />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default IndexPage;

export const Head = () => <title>Layer5 Design System</title>;
