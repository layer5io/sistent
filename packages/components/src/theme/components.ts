import { Components, Theme } from '@mui/material';
import { SistentAppBar } from './components/appbar.modifiter';
import { SistentButton } from './components/button.modifier';
import { SistentCard } from './components/card.modifier';
import { SistentCheckbox } from './components/checkbox.modifier';
import { SistentCollapse } from './components/collapse.modifier';
import { SistentCssBaseline } from './components/cssbaseline.modifier';
import { SistentDrawer } from './components/drawer.modifier';
import { SistentFormLabel } from './components/formlabel.modifier';
import { SistentIconButton } from './components/iconbutton.modifier';
import { SistentLink } from './components/link.modifier';
import { SistentMenu } from './components/menu.modifier';
import { SistentMenuItem } from './components/menuitem.modifier';
import { SistentOutlinedInput } from './components/outlinedinput.modifier';
import { SistentPagination } from './components/pagination.modifier';
import { SistentSvgIcon } from './components/svgicon.modifier';
import { SistentTab } from './components/tab.modifier.ts';

export const components: Components<Theme> = {
  MuiAppBar: SistentAppBar,
  MuiCard: SistentCard,
  MuiCheckbox: SistentCheckbox,
  MuiCollapse: SistentCollapse,
  MuiCssBaseline: SistentCssBaseline,
  MuiDrawer: SistentDrawer,
  MuiFormLabel: SistentFormLabel,
  MuiIconButton: SistentIconButton,
  MuiLink: SistentLink,
  MuiMenu: SistentMenu,
  MuiMenuItem: SistentMenuItem,
  MuiOutlinedInput: SistentOutlinedInput,
  MuiPagination: SistentPagination,
  MuiSvgIcon: SistentSvgIcon,
  MuiTab: SistentTab,
  MuiButton: SistentButton
};
