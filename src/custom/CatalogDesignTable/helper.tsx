/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MUIDataTableMeta } from 'mui-datatables';

export const getColumnValue = (tableMeta: MUIDataTableMeta, targetColumn: string): any => {
  //@ts-ignore
  const rowData = tableMeta.tableData[tableMeta.rowIndex] as Pattern;
  return (rowData as any)[targetColumn] || '';
};
