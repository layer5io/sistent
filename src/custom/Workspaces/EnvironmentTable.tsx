/* eslint-disable @typescript-eslint/no-explicit-any */
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { MUIDataTableColumn, MUIDataTableMeta } from 'mui-datatables';
import React, { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '../../base';
import { DeleteIcon, EnvironmentIcon } from '../../icons';
import { useTheme } from '../../theme';
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
import useEnvironmentAssignment from './hooks/useEnvironmentAssignment';
import {
  CellStyle,
  CustomBodyRenderStyle,
  L5EditIcon,
  TableHeader,
  TableRightActionHeader
} from './styles';

interface EnvironmentTableProps {
  workspaceId: string;
  workspaceName: string;
  useGetEnvironmentsOfWorkspaceQuery: any;
  useUnassignEnvironmentFromWorkspaceMutation: any;
  useAssignEnvironmentToWorkspaceMutation: any;
  isRemoveAllowed: boolean;
  isAssignAllowed: boolean;
}

const colViews: ColView[] = [
  ['id', 'na'],
  ['name', 'xs'],
  ['description', 'm'],
  ['organization_id', 'l'],
  ['created_at', 'na'],
  ['updated_at', 'xl'],
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

const EnvironmentTable: React.FC<EnvironmentTableProps> = ({
  workspaceId,
  workspaceName,
  isRemoveAllowed,
  useGetEnvironmentsOfWorkspaceQuery,
  useUnassignEnvironmentFromWorkspaceMutation,
  useAssignEnvironmentToWorkspaceMutation,
  isAssignAllowed
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const handleAccordionChange = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };
  const [search, setSearch] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [sortOrder, setSortOrder] = useState<string>('updated_at desc');
  const { data: environmentsOfWorkspace } = useGetEnvironmentsOfWorkspaceQuery({
    workspaceId,
    page: page,
    pageSize: pageSize,
    search: search,
    order: sortOrder
  });
  const { width } = useWindowDimensions();
  const theme = useTheme();
  const [unassignEnvironmentFromWorkspace] = useUnassignEnvironmentFromWorkspaceMutation();
  const columns: MUIDataTableColumn[] = [
    {
      name: 'id',
      label: 'ID',
      options: {
        filter: false,
        customBodyRender: (value: string) => <ConditionalTooltip value={value} maxLength={10} />
      }
    },
    {
      name: 'name',
      label: 'Name',
      options: {
        filter: false,
        sort: true,
        searchable: true,
        customBodyRender: (value: string) => <ConditionalTooltip value={value} maxLength={10} />
      }
    },
    {
      name: 'organization_id',
      label: 'Organization ID',
      options: {
        filter: false,
        sort: false,
        searchable: false
      }
    },

    {
      name: 'description',
      label: 'Description',
      options: {
        filter: false,
        sort: true,
        searchable: true,
        customBodyRender: (value: string) => <ResizableDescriptionCell value={value} />
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
              title="Remove Environment"
              onClick={() => {
                isRemoveAllowed &&
                  unassignEnvironmentFromWorkspace({
                    workspaceId,
                    environmentId: tableMeta.rowData[0]
                  });
              }}
              iconType="delete"
            >
              <DeleteIcon height={28} width={28} fill={theme.palette.icon.default} />
            </TooltipIcon>
          </IconWrapper>
        )
      }
    }
  ];

  const environmentAssignment = useEnvironmentAssignment({
    workspaceId,
    useGetEnvironmentsOfWorkspaceQuery,
    useUnassignEnvironmentFromWorkspaceMutation,
    useAssignEnvironmentToWorkspaceMutation
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
    count: environmentsOfWorkspace?.total_count,
    rowsPerPage: pageSize,
    page,
    elevation: 0,
    sortOrder: {
      name: sortOrder.split(' ')[0],
      direction: sortOrder.split(' ')[1]
    },
    serverSide: true,
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
        case 'search':
          setSearch(tableState.searchText !== null ? tableState.searchText : '');
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
    <>
      <Accordion expanded={expanded} onChange={handleAccordionChange} style={{ margin: 0 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            backgroundColor: 'background.paper'
          }}
        >
          <TableHeader>
            <Typography variant="body1" fontWeight={'bold'}>
              Assigned Environments
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
                id={'environments-table'}
              />
              <L5EditIcon
                onClick={environmentAssignment.handleAssignModal}
                disabled={!isAssignAllowed}
              />
            </TableRightActionHeader>
          </TableHeader>
        </AccordionSummary>
        <AccordionDetails style={{ padding: 0 }}>
          <ResponsiveDataTable
            columns={columns}
            data={environmentsOfWorkspace?.environments}
            options={options}
            colViews={colViews}
            tableCols={tableCols}
            updateCols={updateCols}
            columnVisibility={columnVisibility}
            // backgroundColor={theme.palette.background.card}
          />
        </AccordionDetails>
      </Accordion>

      <AssignmentModal
        open={environmentAssignment.assignModal}
        onClose={environmentAssignment.handleAssignModalClose}
        title={`Assign Environments to ${workspaceName}`}
        headerIcon={<EnvironmentIcon height="40" width="40" fill={'white'} />}
        name="Environments"
        assignableData={environmentAssignment.data}
        handleAssignedData={environmentAssignment.handleAssignData}
        originalAssignedData={environmentAssignment.workspaceData}
        emptyStateIcon={<EnvironmentIcon height="5rem" width="5rem" fill={'#808080'} />}
        handleAssignablePage={environmentAssignment.handleAssignablePage}
        handleAssignedPage={environmentAssignment.handleAssignedPage}
        originalLeftCount={environmentAssignment.data?.length || 0}
        originalRightCount={environmentsOfWorkspace?.total_count || 0}
        onAssign={environmentAssignment.handleAssign}
        disableTransfer={environmentAssignment.disableTransferButton}
        helpText={`Assign Environments to ${workspaceName}`}
        isAssignAllowed={isAssignAllowed}
        isRemoveAllowed={isRemoveAllowed}
      />
    </>
  );
};

export default EnvironmentTable;
