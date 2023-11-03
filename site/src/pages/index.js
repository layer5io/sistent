import * as React from "react"
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "../components/Navigation"
import Sidebar from "../components/Sidebar"
import Footer from "../components/Footer"
import Home from "./home";
import Color from "./identity/colors";
import Typography from "./identity/typography";
import Elevation from "./identity/elevation";
import Spacing from "./identity/spacing";
import PageLayout from "./identity/page-layouts";

const IndexPage = () => {
const routes = (
  <Routes>
    <Route path="/" element={<Home/>} exact/>
    <Route path="/identity/color" element={<Color/>} exact/>
    <Route path="/identity/color/:id" element={<Color/>} exact/>
    <Route path="/identity/typography" element={<Typography/>} exact/>
    <Route path="/identity/typography/:id" element={<Typography/>} exact/>
    <Route path="/identity/spacing" element={<Spacing/>} exact/>
    <Route path="/identity/layouts" element={<PageLayout/>} exact/>
    <Route path="/identity/elevation" element={<Elevation/>} exact/>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
)
  return (
    <>
    <Router>
    <Navbar/>
    <div className="flex gap-8">
      <Sidebar/>
      <main>{routes}</main>
    </div>
    <Footer/>
    </Router>
    </>
  )
}

export default IndexPage

export const Head = () => <title>Layer5 Design System</title>
