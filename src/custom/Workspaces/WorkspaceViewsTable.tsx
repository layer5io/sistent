/* eslint-disable @typescript-eslint/no-explicit-any */
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { MUIDataTableColumn, MUIDataTableMeta } from 'mui-datatables';
import React, { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '../../base';
import { DeleteIcon, EnvironmentIcon } from '../../icons';
import { CHARCOAL, SistentThemeProvider } from '../../theme';
import { NameDiv } from '../CatalogDesignTable/style';
import { RESOURCE_TYPES } from '../CatalogDetail/types';
import { CustomColumnVisibilityControl } from '../CustomColumnVisibilityControl';
import { CustomTooltip } from '../CustomTooltip';
import { ConditionalTooltip } from '../Helpers/CondtionalTooltip';
import { useWindowDimensions } from '../Helpers/Dimension';
import {
  ColView,
  updateVisibleColumns
} from '../Helpers/ResponsiveColumns/responsive-coulmns.tsx/responsive-column';
import ResponsiveDataTable, { IconWrapper } from '../ResponsiveDataTable';
import SearchBar from '../SearchBar';
import { TooltipIcon } from '../TooltipIconButton';
import AssignmentModal from './AssignmentModal';
import EditButton from './EditButton';
import useViewAssignment from './hooks/useViewsAssignment';
import { CellStyle, CustomBodyRenderStyle, TableHeader, TableRightActionHeader } from './styles';

interface ViewsTableProps {
  workspaceId: string;
  workspaceName: string;
  useGetViewsOfWorkspaceQuery: any;
  useUnassignViewFromWorkspaceMutation: any;
  useAssignViewToWorkspaceMutation: any;
  isRemoveAllowed: boolean;
  isAssignAllowed: boolean;
  handleShowDetails: (viewId: string, viewName: string, filterType: string) => void;
}

const colViews: ColView[] = [
  ['id', 'na'],
  ['name', 'xs'],
  ['description', 'm'],
  ['organization_id', 'l'],
  ['created_at', 'xl'],
  ['updated_at', 'xl'],
  ['visibility', 'l'],
  ['actions', 'xs']
];

export const ResizableDescriptionCell = ({ value }: { value: string }) => (
  <div style={{ position: 'relative', height: '20px' }}>
    <CustomBodyRenderStyle>
      <CellStyle>
        <CustomTooltip title={value} placement="top-start">
          <span style={{ cursor: 'pointer' }}>{value}</span>
        </CustomTooltip>
      </CellStyle>
    </CustomBodyRenderStyle>
  </div>
);

const WorkspaceViewsTable: React.FC<ViewsTableProps> = ({
  workspaceId,
  workspaceName,
  isRemoveAllowed,
  useGetViewsOfWorkspaceQuery,
  useUnassignViewFromWorkspaceMutation,
  useAssignViewToWorkspaceMutation,
  isAssignAllowed,
  handleShowDetails
}) => {
  const [expanded, setExpanded] = useState<boolean>(true);
  const handleAccordionChange = () => {
    setExpanded(!expanded);
  };
  const [search, setSearch] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [sortOrder, setSortOrder] = useState<string>('updated_at desc');
  const { data: viewsOfWorkspace } = useGetViewsOfWorkspaceQuery({
    workspaceId,
    page: page,
    pageSize: pageSize,
    search: search,
    order: sortOrder
  });
  const { width } = useWindowDimensions();
  const [unassignviewFromWorkspace] = useUnassignViewFromWorkspaceMutation();
  const columns: MUIDataTableColumn[] = [
    {
      name: 'id',
      label: 'ID',
      options: {
        filter: false,
        customBodyRender: (value) => <ConditionalTooltip value={value} maxLength={10} />
      }
    },
    {
      name: 'name',
      label: 'Name',
      options: {
        filter: false,
        sort: true,
        searchable: true,
        customBodyRender: (value, tableMeta) => {
          const viewId = tableMeta.tableData[tableMeta.rowIndex]?.id ?? '';
          const viewName = tableMeta.tableData[tableMeta.rowIndex]?.name ?? '';
          return (
            <NameDiv onClick={() => handleShowDetails(viewId, viewName, RESOURCE_TYPES.VIEW)}>
              {value}
            </NameDiv>
          );
        }
      }
    },
    {
      name: 'created_at',
      label: 'Created At',
      options: {
        filter: false,
        sort: true,
        searchable: true,
        setCellHeaderProps: () => {
          return { align: 'center' };
        }
      }
    },
    {
      name: 'updated_at',
      label: 'Updated At',
      options: {
        filter: false,
        sort: true,
        searchable: true,
        setCellHeaderProps: () => {
          return { align: 'center' };
        }
      }
    },
    {
      name: 'visibility',
      label: 'Visibility',
      options: {
        filter: false,
        sort: false,
        searchable: true,
        setCellHeaderProps: () => {
          return { align: 'center' };
        }
      }
    },
    {
      name: 'actions',
      label: 'Actions',
      options: {
        filter: false,
        sort: false,
        searchable: false,
        customBodyRender: (_: string, tableMeta: MUIDataTableMeta) => (
          <IconWrapper disabled={!isRemoveAllowed}>
            <TooltipIcon
              id={`delete_team-${tableMeta.rowIndex}`}
              title="Remove View"
              onClick={() => {
                isRemoveAllowed &&
                  unassignviewFromWorkspace({
                    workspaceId,
                    viewId: tableMeta.rowData[0]
                  });
              }}
              iconType="delete"
            >
              <DeleteIcon height={28} width={28} fill={CHARCOAL} />
            </TooltipIcon>
          </IconWrapper>
        )
      }
    }
  ];

  const viewAssignment = useViewAssignment({
    workspaceId,
    useGetViewsOfWorkspaceQuery,
    useUnassignViewFromWorkspaceMutation,
    useAssignViewToWorkspaceMutation
  });

  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>(() => {
    const showCols = updateVisibleColumns(colViews, width);
    const initialVisibility: Record<string, boolean> = {};
    columns.forEach((col) => {
      initialVisibility[col.name] = showCols[col.name];
    });
    return initialVisibility;
  });

  const options = {
    filter: false,
    responsive: 'standard',
    selectableRows: 'none',
    count: viewsOfWorkspace?.total_count,
    rowsPerPage: pageSize,
    page,
    elevation: 0,
    sortOrder: {
      name: sortOrder.split(' ')[0],
      direction: sortOrder.split(' ')[1]
    },
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
          if (sortInfo.length == 2) {
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
  const [tableCols, updateCols] = useState(columns);

  return (
    <SistentThemeProvider>
      <Accordion expanded={expanded} onChange={handleAccordionChange} style={{ margin: 0 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            backgroundColor: 'background.paper'
          }}
        >
          <TableHeader>
            <Typography variant="h6" fontWeight={'bold'}>
              Assigned Views
            </Typography>
            <TableRightActionHeader>
              <SearchBar
                onSearch={(value) => {
                  setSearch(value);
                }}
                onClear={() => {
                  setSearch('');
                }}
                expanded={isSearchExpanded}
                setExpanded={setIsSearchExpanded}
                placeholder="Search workspaces..."
              />
              <CustomColumnVisibilityControl
                columns={columns}
                customToolsProps={{
                  columnVisibility,
                  setColumnVisibility
                }}
                id={'views-table'}
              />
              <EditButton onClick={viewAssignment.handleAssignModal} disabled={!isAssignAllowed} />
            </TableRightActionHeader>
          </TableHeader>
        </AccordionSummary>
        <AccordionDetails style={{ padding: 0 }}>
          <ResponsiveDataTable
            columns={columns}
            data={viewsOfWorkspace?.views}
            options={options}
            colViews={colViews}
            tableCols={tableCols}
            updateCols={updateCols}
            columnVisibility={columnVisibility}
          />
        </AccordionDetails>
      </Accordion>

      <AssignmentModal
        open={viewAssignment.assignModal}
        onClose={viewAssignment.handleAssignModalClose}
        title={`Assign Views to ${workspaceName}`}
        headerIcon={<EnvironmentIcon height="40" width="40" fill={'white'} />}
        name="Views"
        assignableData={viewAssignment.data}
        handleAssignedData={viewAssignment.handleAssignData}
        originalAssignedData={viewAssignment.workspaceData}
        emptyStateIcon={<EnvironmentIcon height="5rem" width="5rem" fill={'#808080'} />}
        handleAssignablePage={viewAssignment.handleAssignablePage}
        handleAssignedPage={viewAssignment.handleAssignedPage}
        originalLeftCount={viewAssignment.data?.length || 0}
        originalRightCount={viewsOfWorkspace?.total_count || 0}
        onAssign={viewAssignment.handleAssign}
        disableTransfer={viewAssignment.disableTransferButton}
        helpText={`Assign Views to ${workspaceName}`}
        isAssignAllowed={isAssignAllowed}
        isRemoveAllowed={isRemoveAllowed}
      />
    </SistentThemeProvider>
  );
};

export default WorkspaceViewsTable;
