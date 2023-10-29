import * as React from "react"
import Navbar from "../components/Navigation"
import Sidebar from "../components/Sidebar"
import Footer from "../components/Footer"

const IndexPage = () => {
  return (
    <>
    <Navbar/>
    <Sidebar/>
    <Footer/>
    </>
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>
