/* eslint-disable @typescript-eslint/no-explicit-any */
import { Lock, Public } from '@mui/icons-material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { MUIDataTableColumn, MUIDataTableMeta } from 'mui-datatables';
import React, { useState } from 'react';
import { Box } from '../../base';
import { EnvironmentIcon } from '../../icons';
import { useTheme } from '../../theme';
import { NameDiv } from '../CatalogDesignTable/style';
import { RESOURCE_TYPES } from '../CatalogDetail/types';
import { CustomColumnVisibilityControl } from '../CustomColumnVisibilityControl';
import { CustomTooltip } from '../CustomTooltip';
import { ErrorBoundary } from '../ErrorBoundary';
import { ConditionalTooltip } from '../Helpers/CondtionalTooltip';
import { useWindowDimensions } from '../Helpers/Dimension';
import {
  ColView,
  updateVisibleColumns
} from '../Helpers/ResponsiveColumns/responsive-coulmns.tsx/responsive-column';
import ResponsiveDataTable, { IconWrapper } from '../ResponsiveDataTable';
import SearchBar from '../SearchBar';
import { TooltipIcon } from '../TooltipIconButton';
import { UserTableAvatarInfo } from '../UsersTable';
import VisibilityChipMenu, { VIEW_VISIBILITY } from '../VisibilityChipMenu/VisibilityChipMenu';
import AssignmentModal from './AssignmentModal';
import useViewAssignment from './hooks/useViewsAssignment';
import { CellStyle, CustomBodyRenderStyle, L5EditIcon, TableHeader } from './styles';

interface ViewsTableProps {
  workspaceId: string;
  workspaceName: string;
  useGetViewsOfWorkspaceQuery: any;
  useUnassignViewFromWorkspaceMutation: any;
  useAssignViewToWorkspaceMutation: any;
  isRemoveAllowed: boolean;
  isAssignAllowed: boolean;
  handleShowDetails: (viewId: string, viewName: string, filterType: string) => void;
  handleOpenInOperator?: (designId: string, viewName: string, filterType: string) => void;
  showPlaygroundActions?: boolean;
  handleVisibilityChange?: (id: string, visibility: VIEW_VISIBILITY) => void;
  currentUserId?: string;
}

const colViews: ColView[] = [
  ['id', 'na'],
  ['avatar_url', 'xs'],
  ['email', 'na'],
  ['name', 'xs'],
  ['first_name', 'na'],
  ['last_name', 'na'],
  ['organization_id', 'xl'],
  ['created_at', 'na'],
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
  handleShowDetails,
  handleVisibilityChange,
  currentUserId
}) => {
  const theme = useTheme();

  const [search, setSearch] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [sortOrder, setSortOrder] = useState<string>('updated_at desc');
  const { data: viewsOfWorkspace, refetch } = useGetViewsOfWorkspaceQuery(
    {
      workspaceId,
      page: page,
      pagesize: pageSize,
      search: search,
      order: sortOrder,
      expandUser: true
    },
    {
      skip: !workspaceId
    }
  );
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
      name: 'avatar_url',
      label: 'Author',
      options: {
        filter: false,
        sort: false,
        searchable: false,
        customBodyRender: (value: string, tableMeta: MUIDataTableMeta) => {
          const getValidColumnValue = (
            rowData: any,
            columnName: string,
            columns: MUIDataTableColumn[]
          ) => {
            const columnIndex = columns.findIndex((column: any) => column.name === columnName);
            return rowData[columnIndex];
          };
          return (
            <Box sx={{ '& > img': { mr: 2, flexShrink: 0 } }}>
              <UserTableAvatarInfo
                userId={getValidColumnValue(tableMeta.rowData, 'user_id', columns)}
                userName={`${tableMeta.rowData[4]} ${tableMeta.rowData[5]}`}
                userEmail={tableMeta.rowData[3]}
                profileUrl={value}
              />
            </Box>
          );
        }
      }
    },
    {
      name: 'email',
      label: 'Email',
      options: {
        filter: false,
        sort: true,
        searchable: true
      }
    },
    {
      name: 'first_name',
      label: 'First Name',
      options: {
        filter: false,
        sort: true,
        searchable: true
      }
    },
    {
      name: 'last_name',
      label: 'Last Name',
      options: {
        filter: false,
        sort: true,
        searchable: true
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
        customBodyRender: (value: VIEW_VISIBILITY, tableMeta) => {
          const rowIndex = tableMeta.rowIndex;
          const viewId = tableMeta.tableData[rowIndex]?.id;
          const viewVisibility = tableMeta.tableData[rowIndex]?.visibility;
          const ownerId = tableMeta.tableData[rowIndex]?.user_id;
          const isOwner = ownerId === currentUserId;
          const isEnabled = viewVisibility !== VIEW_VISIBILITY.PUBLISHED && isOwner;
          return (
            <VisibilityChipMenu
              value={value as VIEW_VISIBILITY}
              onChange={(value) => {
                if (handleVisibilityChange) {
                  handleVisibilityChange(viewId, value as VIEW_VISIBILITY);
                  refetch();
                }
              }}
              enabled={isEnabled}
              options={[
                [VIEW_VISIBILITY.PUBLIC, Public],
                [VIEW_VISIBILITY.PRIVATE, Lock]
              ]}
            />
          );
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
              id={`delete_view-${tableMeta.rowIndex}`}
              title="Move View"
              onClick={() => {
                if (isRemoveAllowed) {
                  unassignviewFromWorkspace({
                    workspaceId,
                    viewId: tableMeta.rowData[0]
                  });
                }
              }}
              iconType="delete"
            >
              <RemoveCircleIcon style={{ color: theme?.palette.icon.default }} />{' '}
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
    useAssignViewToWorkspaceMutation,
    isViewsVisible: isAssignAllowed || isRemoveAllowed
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
    serverSide: true,
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
    <ErrorBoundary>
      <TableHeader style={{ padding: '1rem' }}>
        <Box
          style={{
            marginRight: '0rem',
            width: '100%',
            justifyContent: 'end',
            display: 'flex',
            alignItems: 'center'
          }}
        >
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
          <L5EditIcon
            onClick={viewAssignment.handleAssignModal}
            disabled={!isAssignAllowed}
            title="Assign Views"
          />
        </Box>
      </TableHeader>

      <ResponsiveDataTable
        columns={columns}
        data={viewsOfWorkspace?.views}
        options={options}
        colViews={colViews}
        tableCols={tableCols}
        updateCols={updateCols}
        columnVisibility={columnVisibility}
      />

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
    </ErrorBoundary>
  );
};

export default WorkspaceViewsTable;
