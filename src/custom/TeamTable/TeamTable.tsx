/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid2, TableCell } from '@mui/material';
import { MUIDataTableColumn } from 'mui-datatables';
import { styled, useTheme } from '../../theme';
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
  isEditUserAllowed?: any;
  handleEditUser?: any;
  org_id: string;
  useGetUsersForOrgQuery: any;
  useNotificationHandlers: any;
  useRemoveUserFromTeamMutation: any;
}
const StyledGrid = styled(Grid2)(({ theme }) => ({
  display: 'grid',
  margin: 'auto',
  paddingLeft: '0.5rem',
  borderRadius: '0.25rem',
  width: 'inherit',
  gap: theme.spacing(1)
}));

const TeamTable: React.FC<TeamTableProps> = ({
  teams,
  tableOptions,
  columnVisibility,
  colViews,
  tableCols,
  columns,
  updateCols,
  isRemoveFromTeamAllowed,
  isEditUserAllowed,
  handleEditUser,
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
                  paddingInline: '4rem',
                  backgroundColor: `${theme.palette.background.secondary} !important`
                }}
              >
                <StyledGrid container size={12}>
                  <UsersTable
                    teamID={teamID}
                    isRemoveFromTeamAllowed={isRemoveFromTeamAllowed}
                    isEditUserAllowed={isEditUserAllowed}
                    handleEditUser={handleEditUser}
                    org_id={org_id}
                    useGetUsersForOrgQuery={useGetUsersForOrgQuery}
                    useNotificationHandlers={useNotificationHandlers}
                    useRemoveUserFromTeamMutation={useRemoveUserFromTeamMutation}
                    theme={theme}
                  />
                </StyledGrid>
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
