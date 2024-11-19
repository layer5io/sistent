/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';
import { useCallback, useMemo, useRef } from 'react';
import { PublishIcon } from '../../icons';
import { CHARCOAL, useTheme } from '../../theme';
import { Pattern } from '../CustomCatalog/CustomCard';
import { ErrorBoundary } from '../ErrorBoundary';
import PromptComponent from '../Prompt';
import { PromptRef } from '../Prompt/promt-component';
import ResponsiveDataTable from '../ResponsiveDataTable';
import UnpublishTooltipIcon from './UnpublishTooltipIcon';

interface CatalogDesignsTableProps {
  patterns: Pattern[];
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
  colViews: Record<string, boolean> | undefined;
  handleBulkDeleteModal: (patterns: Pattern[], modalRef: React.RefObject<PromptRef>) => void;
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
  colViews = {},
  handleBulkDeleteModal,
  handleBulkpatternsDataUnpublishModal
}) => {
  const theme = useTheme();
  const modalRef = useRef<PromptRef>(null);

  const formatDate = useCallback((date: string | Date): string => {
    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };
    return new Date(date).toLocaleDateString('en-US', dateOptions);
  }, []);

  const processedColumns = useMemo(() => {
    return columns.map((col) => {
      const newCol = { ...col };
      if (!newCol.options) newCol.options = {};
      newCol.options.display = columnVisibility[col.name];
      if (
        [
          'updated_at',
          'created_at',
          'deleted_at',
          'last_login_time',
          'joined_at',
          'last_run',
          'next_run'
        ].includes(col.name)
      ) {
        newCol.options.customBodyRender = (value: any) => {
          if (!value || value === 'NA') return <>NA</>;
          if (typeof value === 'object' && 'Valid' in value) {
            if (value.Valid && value.Time) {
              return <>{formatDate(value.Time)}</>;
            }
            return <>NA</>;
          }
          return <>{formatDate(value)}</>;
        };
      }
      return newCol;
    });
  }, [columns, columnVisibility, formatDate]);

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
    [columns, setPage, setPageSize, setSortOrder, sortOrder]
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
      page,
      handleTableChange,
      patterns,
      handleBulkDeleteModal,
      handleBulkpatternsDataUnpublishModal
    ]
  );

  if (!processedColumns.length) {
    return null;
  }

  return (
    <ErrorBoundary>
      <PromptComponent ref={modalRef} />
      <ResponsiveDataTable
        columns={processedColumns}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        data={patterns || []}
        options={options}
        colViews={colViews}
        tableCols={processedColumns}
        columnVisibility={columnVisibility}
        backgroundColor={
          theme.palette.mode === 'light'
            ? theme.palette.background.default
            : theme.palette.background.secondary
        }
      />
    </ErrorBoundary>
  );
};

export default CatalogDesignsTable;
