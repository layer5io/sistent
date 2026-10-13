// `@sistent/mui-datatables` is sistent's fork of `mui-datatables` and ships no
// type declarations of its own. Its API is the upstream one, which
// `@types/mui-datatables` (a real `dependency`, so consumers have it too) types.
//
// Scope this shim to the runtime value import in `ResponsiveDataTable` only.
// Type imports name `mui-datatables` directly (`import type { MUIDataTableColumn }
// from 'mui-datatables'`): the declaration bundle keeps whatever specifier the
// source used, and only `mui-datatables` resolves in a consumer's tree - this
// ambient module is not published, so a type imported through it would reach
// consumers as `any`.
declare module '@sistent/mui-datatables' {
  import MUIDataTable from 'mui-datatables';

  export default MUIDataTable;
}
