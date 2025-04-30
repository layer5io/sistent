/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';
import { MUIDataTableColumn } from 'mui-datatables';
import { useCallback, useMemo, useRef, useState } from 'react';
import { PublishIcon } from '../../icons';
import { CHARCOAL } from '../../theme';
import { Pattern } from '../CustomCatalog/CustomCard';
import { ErrorBoundary } from '../ErrorBoundary';
import { ColView } from '../Helpers/ResponsiveColumns/responsive-coulmns.tsx/responsive-column';
import PromptComponent from '../Prompt';
import { PromptRef } from '../Prompt/promt-component';
import ResponsiveDataTable from '../ResponsiveDataTable';
import UnpublishTooltipIcon from './UnpublishTooltipIcon';

interface CatalogDesignsTableProps {
  patterns: Pattern[];
  filter: any;
  columns: MUIDataTableColumn[];
  totalCount: number;
  sortOrder: string;
  setSortOrder: (order: string) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  page: number;
  setPage: (page: number) => void;
  columnVisibility: Record<string, boolean>;
  colViews: ColView[];
  rowsPerPageOptions?: number[];
  handleBulkDeleteModal: (patterns: Pattern[], modalRef: React.RefObject<PromptRef>) => void;
  setSearch?: (search: string) => void;
  tableBackgroundColor?: string;
  handleBulkpatternsDataUnpublishModal: (
    selected: any,
    patterns: Pattern[],
    modalRef: React.RefObject<PromptRef>
  ) => void;
}

export const CatalogDesignsTable: React.FC<CatalogDesignsTableProps> = ({
  patterns,
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
  colViews = [],
  handleBulkDeleteModal,
  setSearch,
  rowsPerPageOptions = [10, 25, 50, 100],
  handleBulkpatternsDataUnpublishModal
}) => {
  const modalRef = useRef<PromptRef>(null);
  const [tableCols, updateCols] = useState(columns);

  const handleTableChange = useCallback(
    (action: string, tableState: any) => {
      const sortInfo = tableState.announceText ? tableState.announceText.split(' : ') : [];
      let order = '';
      if (tableState.activeColumn) {
        order = `${columns[tableState.activeColumn].name} desc`;
      }
      switch (action) {
        case 'changePage':
          setPage(tableState.page);
          break;
        case 'changeRowsPerPage':
          setPageSize(tableState.rowsPerPage);
          break;
        case 'search':
          setSearch && setSearch(tableState.searchText !== null ? tableState.searchText : '');
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
    },
    [columns, setPage, setSearch, setPageSize, setSortOrder, sortOrder]
  );

  const options = useMemo(
    () => ({
      selectableRows: _.isNil(filter) ? 'none' : 'multiple',
      serverSide: true,
      filterType: 'multiselect',
      responsive: 'standard',
      count: totalCount,
      rowsPerPage: pageSize,
      page,
      elevation: 0,
      sortOrder: {
        name: sortOrder.split(' ')[0],
        direction: sortOrder.split(' ')[1]
      },
      onTableChange: handleTableChange,
      customToolbarSelect: _.isNil(filter)
        ? (selected: any) => (
            <UnpublishTooltipIcon
              title="Unpublish"
              onClick={() => handleBulkpatternsDataUnpublishModal(selected, patterns, modalRef)}
              iconType="publish"
              id={'unpublish-button'}
            >
              <PublishIcon width={28.8} height={28.8} fill={CHARCOAL} />
            </UnpublishTooltipIcon>
          )
        : undefined,
      onRowsDelete: !_.isNil(filter)
        ? (rowsDeleted: any) => {
            const selectedPatterns = rowsDeleted.data.map(
              ({ dataIndex }: any) => patterns[dataIndex]
            );
            handleBulkDeleteModal(selectedPatterns, modalRef);
            return false;
          }
        : undefined
    }),
    [
      filter,
      totalCount,
      pageSize,
      sortOrder,
      page,
      handleTableChange,
      patterns,
      handleBulkDeleteModal,
      handleBulkpatternsDataUnpublishModal
    ]
  );

  return (
    <ErrorBoundary>
      <PromptComponent ref={modalRef} />
      <ResponsiveDataTable
        columns={columns}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        data={patterns || []}
        rowsPerPageOptions={rowsPerPageOptions}
        options={options}
        colViews={colViews}
        tableCols={tableCols}
        updateCols={updateCols}
        columnVisibility={columnVisibility}
      />
    </ErrorBoundary>
  );
};

export default CatalogDesignsTable;
