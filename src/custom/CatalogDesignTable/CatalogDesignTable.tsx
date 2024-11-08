/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { Pattern } from '../CustomCatalog/CustomCard';
import { useWindowDimensions } from '../Helpers/Dimension';
import ResponsiveDataTable from '../ResponsiveDataTable';

interface CatalogDesignsTableProps {
  patters: Pattern[];
  filter: any;
  columns: Array<any>;
  totalCount: number;
  sortOrder: string;
  setSortOrder: (order: string) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  page: number;
  setPage: (page: number) => void;
  columnVisibility: Record<string, boolean>;
  colViews: any;
}

export const CatalogDesignsTable: React.FC<CatalogDesignsTableProps> = ({
  patters,
  filter,
  columns = [],
  totalCount = 0,
  sortOrder = '',
  setSortOrder,
  pageSize = 10,
  setPageSize,
  page = 0,
  setPage,
  columnVisibility = {},
  colViews = {}
}) => {
  const [tableCols, updateCols] = useState<Array<any>>([]);
  const { width } = useWindowDimensions();
  const smallScreen = width <= 360;
  // const modalRef = useRef(null);

  useEffect(() => {
    if (Array.isArray(columns) && columns.length > 0) {
      updateCols(columns);
    }
  }, [columns]);

  const options = {
    selectableRows: _.isNil(filter) ? 'none' : 'multiple',
    serverSide: true,
    filterType: 'multiselect',
    responsive: smallScreen ? 'vertical' : 'standard',
    count: totalCount,
    rowsPerPage: pageSize,
    page,
    elevation: 0,
    search: false,
    filter: false,
    download: false,
    print: false,
    viewColumns: false,
    onTableChange: (action: string, tableState: any) => {
      const sortInfo = tableState.announceText ? tableState.announceText.split(' : ') : [];
      let order = '';

      switch (action) {
        case 'changePage':
          setPage(tableState.page);
          break;
        case 'changeRowsPerPage':
          setPageSize(tableState.rowsPerPage);
          break;
        case 'sort':
          if (
            sortInfo.length === 2 &&
            tableState.activeColumn !== undefined &&
            Array.isArray(columns)
          ) {
            if (sortInfo[1] === 'ascending') {
              order = `${columns[tableState.activeColumn].name} asc`;
            } else {
              order = `${columns[tableState.activeColumn].name} desc`;
            }
          }
          if (order !== sortOrder) {
            setSortOrder(order);
          }
          break;
      }
    }
  };

  if (!Array.isArray(tableCols) || tableCols.length === 0) {
    return null;
  }

  return (
    <ResponsiveDataTable
      columns={tableCols ?? []}
      data={patters.map((pattern) => Object.values(pattern)) ?? []}
      options={options}
      colViews={colViews}
      tableCols={tableCols}
      updateCols={updateCols}
      columnVisibility={columnVisibility}
    />
  );
};

export default CatalogDesignsTable;
