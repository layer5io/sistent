import React from 'react'
import "./src/styles/global.css"
import { ThemeProvider } from "./src/components/Theme"

export const wrapRootElement = ({ element }) => (
    <ThemeProvider>{element}</ThemeProvider>
)