import React from "react"
import { ThemeToggler } from "gatsby-plugin-dark-mode"
import Weather from '../../assets/images/Weather.svg';
import Search from '../../assets/images/Search.svg';
// import SearchDark from "../../assets/images/Search-dark.svg";

export default function ThemeToggle() {
     return (
       <ThemeToggler>
        {({ theme, toggleTheme }) => (
          <img
          src={theme === 'dark' ? Search : Weather }
          alt="Toggle Theme"
          onClick={() => toggleTheme(theme === 'dark' ? 'light' : 'dark')}
        />         
         
         )}
        </ThemeToggler>
     )
}

// export function SearchToggle(){
//   return (
//     <ThemeToggler>
//         {({ theme}) => (
//           <img
//           src={theme === 'dark' ? SearchDark : Search }
//           alt="Toggle Search"
//         />    
//         )}
//         </ThemeToggler>
//   )
// }