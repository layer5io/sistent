/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { PublishIcon } from '../../icons';
import { CHARCOAL, useTheme } from '../../theme';
import { Pattern } from '../CustomCatalog/CustomCard';
import { useWindowDimensions } from '../Helpers/Dimension';
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
  const [tableCols, updateCols] = useState<Array<any>>([]);
  const { width } = useWindowDimensions();
  const smallScreen = width <= 360;
  const theme = useTheme();
  const modalRef = useRef<PromptRef>(null);

  useEffect(() => {
    if (Array.isArray(columns) && columns.length > 0) {
      updateCols(columns);
    }
  }, [columns]);

  const options: any = {
    selectableRows: _.isNil(filter) ? 'none' : 'multiple',
    serverSide: true,
    filterType: 'multiselect',
    responsive: smallScreen ? 'vertical' : 'standard',
    count: totalCount,
    rowsPerPage: pageSize,
    page,
    elevation: 0,
    onTableChange: (action: string, tableState: any) => {
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
    }
  };

  if (_.isNil(filter)) {
    options.customToolbarSelect = (selected: any) => (
      <UnpublishTooltipIcon
        title="Unpublish"
        onClick={() => handleBulkpatternsDataUnpublishModal(selected, patterns, modalRef)}
        iconType="publish"
        id={'unpublish-button'}
      >
        <PublishIcon width={28.8} height={28.8} fill={CHARCOAL} />
      </UnpublishTooltipIcon>
    );
  } else {
    options.onRowsDelete = (rowsDeleted: any) => {
      const selectedPatterns = rowsDeleted.data.map(({ dataIndex }: any) => patterns[dataIndex]);
      handleBulkDeleteModal(selectedPatterns, modalRef);
      return false;
    };
  }

  if (!Array.isArray(tableCols) || tableCols.length === 0) {
    return null;
  }

  return (
    <>
      <PromptComponent ref={modalRef} />
      <ResponsiveDataTable
        columns={columns}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        data={patterns || []}
        options={options}
        colViews={colViews}
        tableCols={tableCols}
        updateCols={updateCols}
        columnVisibility={columnVisibility}
        backgroundColor={
          theme.palette.mode === 'light'
            ? theme.palette.background.default
            : theme.palette.background.secondary
        }
      />
    </>
  );
};

export default CatalogDesignsTable;
