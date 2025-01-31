/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, TableCell } from '@mui/material';
import { MUIDataTableColumn } from 'mui-datatables';
import { useTheme } from '../../theme';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary.js';
import { ColView } from '../Helpers/ResponsiveColumns/responsive-coulmns.tsx/index.js';
import ResponsiveDataTable from '../ResponsiveDataTable.js';
import UsersTable from '../UsersTable/UsersTable.js';

interface TeamTableProps {
  teams: any;
  tableOptions: object;
  columnVisibility: Record<string, boolean>;
  colViews: ColView[];
  tableCols: any[];
  columns: MUIDataTableColumn[];
  updateCols: (cols: any) => void;
  isRemoveFromTeamAllowed: boolean;
  org_id: string;
  useGetUsersForOrgQuery: any;
  useNotificationHandlers: any;
  useRemoveUserFromTeamMutation: any;
}

const TeamTable: React.FC<TeamTableProps> = ({
  teams,
  tableOptions,
  columnVisibility,
  colViews,
  tableCols,
  columns,
  updateCols,
  isRemoveFromTeamAllowed,
  org_id,
  useGetUsersForOrgQuery,
  useNotificationHandlers,
  useRemoveUserFromTeamMutation
}) => {
  const theme = useTheme();
  return (
    <ErrorBoundary>
      <ResponsiveDataTable
        columns={columns}
        data={teams}
        options={{
          ...tableOptions,
          renderExpandableRow: (_: any, rowMeta: any) => {
            const teamID = teams[rowMeta.dataIndex].id;
            return (
              <TableCell
                colSpan={6}
                sx={{
                  padding: '0.5rem'
                  // backgroundColor: 'rgba(0, 0, 0, 0.05)'
                }}
              >
                <Grid
                  container
                  xs={12}
                  spacing={1}
                  sx={{
                    margin: 'auto',
                    // backgroundColor: '#f3f1f1',
                    paddingLeft: '0.5rem',
                    borderRadius: '0.25rem',
                    width: 'inherit'
                  }}
                >
                  <UsersTable
                    teamID={teamID}
                    isRemoveFromTeamAllowed={isRemoveFromTeamAllowed}
                    org_id={org_id}
                    useGetUsersForOrgQuery={useGetUsersForOrgQuery}
                    useNotificationHandlers={useNotificationHandlers}
                    useRemoveUserFromTeamMutation={useRemoveUserFromTeamMutation}
                    theme={theme}
                  />
                </Grid>
              </TableCell>
            );
          }
        }}
        colViews={colViews}
        tableCols={tableCols}
        updateCols={updateCols}
        columnVisibility={columnVisibility}
      />
    </ErrorBoundary>
  );
};

export default TeamTable;
