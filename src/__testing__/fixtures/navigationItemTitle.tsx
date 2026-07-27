// Type-level fixture for `NavigationItem['title']`. It is compiled by
// `navigationItemTitleTypes.test.ts` via `tsc --noEmit`, never executed, and is
// deliberately outside jest's `*.test.*` glob so jest does not collect it.
//
// `NavigationNavbar` renders `title` into MUI's `ListItemText` `primary` slot,
// which is typed `React.ReactNode`. Declaring `title` as `string` therefore
// rejected composed labels that already rendered correctly - see
// https://github.com/layer5io/sistent/issues/1746.
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import type { NavigationItem } from '../../custom/NavigationNavbar';

// A plain string still compiles - the widening is source-compatible.
export const plainStringTitle: NavigationItem = {
  id: 'settings',
  title: 'Settings',
  onClick: () => {}
};

// A composed ReactNode title compiles: the exact shape that previously forced
// consumers into an `as unknown as string` assertion.
export const composedNodeTitle: NavigationItem = {
  id: 'api-docs',
  title: (
    <span>
      API Docs
      <OpenInNewIcon fontSize="small" />
    </span>
  ),
  onClick: () => {}
};

// Sub-items share the type, so they gain the same latitude.
export const composedSubItemTitle: NavigationItem = {
  id: 'docs',
  title: 'Docs',
  onClick: () => {},
  subItems: [
    {
      id: 'docs-api',
      title: <span>API</span>,
      onClick: () => {}
    }
  ]
};

// Self-check: if the compiler ever stops type-checking this fixture, the
// suppression below goes unused and tsc reports TS2578 here, failing the test
// rather than letting it pass vacuously. A plain object is not a `ReactNode`.
export const rejectsNonNode: NavigationItem = {
  id: 'bad',
  // @ts-expect-error - a plain object is not assignable to React.ReactNode
  title: { label: 'not a node' },
  onClick: () => {}
};
