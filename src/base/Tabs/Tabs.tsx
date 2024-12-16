// import { Tabs as MuiTabs, type TabsProps as MuiTabsProps } from '@mui/material';

// export function Tabs(props: MuiTabsProps): JSX.Element {
//   return (
//     <MuiTabs
//       {...props}
//       sx={(theme) => ({
//         width: '100%',
//         marginLeft: 0,
//         '& .MuiTabs-indicator': {
//           backgroundColor:
//             theme.palette.mode === 'dark'
//               ? theme.palette.background?.default
//               : theme.palette.background?.brand?.hover
//         },
//         '& .MuiTab-root': {
//           backgroundColor: 'transparent',
//           color:
//             theme.palette.mode === 'dark' ? theme.palette.text.default : theme.palette.text.default,
//           '&.Mui-selected': {
//             backgroundColor: 'transparent',
//             color:
//               theme.palette.mode === 'dark'
//                 ? theme.palette.background?.brand
//                 : theme.palette.background?.brand?.default
//           }
//         }
//       })}
//     />
//   );
// }

// export default Tabs;

import { Tabs as MuiTabs, type TabsProps as MuiTabsProps } from '@mui/material';

export function Tabs(props: MuiTabsProps): JSX.Element {
  return <MuiTabs {...props} />;
}

export default Tabs;
