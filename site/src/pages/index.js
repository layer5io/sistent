import { useContext } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navigation';
import Sidebar from '../components/Sidebar';
import ThemeContext from '../components/Theme';
import '../styles/global.css';
import Home from './home';
import Color from './identity/colors';
import Elevation from './identity/elevation';
import PageLayout from './identity/page-layouts';
import Spacing from './identity/spacing';
import Typography from './identity/typography';

const IndexPage = () => {
  const theme = useContext(ThemeContext);
  const routes = (
    <Routes>
      <Route path="/" element={<Home />} exact />
      <Route path="/identity/color" element={<Color />} exact />
      <Route path="/identity/color/:id" element={<Color />} exact />
      <Route path="/identity/typography" element={<Typography />} exact />
      <Route path="/identity/typography/:id" element={<Typography />} exact />
      <Route path="/identity/spacing" element={<Spacing />} exact />
      <Route path="/identity/layouts" element={<PageLayout />} exact />
      <Route path="/identity/elevation" element={<Elevation />} exact />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );

  return (
    <div className={`${theme.dark ? 'dark' : 'light'} bg-background-default`}>
      <Router>
        <Navbar />
        <div className="flex gap-8">
          <Sidebar />
          <main>{routes}</main>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default IndexPage;

export const Head = () => <title>Layer5 Design System</title>;
