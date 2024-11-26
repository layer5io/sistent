/* eslint-disable @typescript-eslint/no-explicit-any */

export const getColumnValue = (tableMeta: any, targetColumn: string): any => {
  const rowData = tableMeta.tableData[tableMeta.rowIndex];
  return (rowData as any)[targetColumn] || '';
};
