import { Grid, Tooltip, Typography } from '@layer5/sistent';
import { TableCell, TableSortLabel } from '@mui/material';

export const SortableTableCell = ({ index, columnData, columnMeta, onSort, icon, tooltip }) => {
  return (
    <TableCell key={index} onClick={onSort}>
      <Grid style={{ display: 'flex' }}>
        <Grid style={{ display: 'flex', alignItems: 'center' }}>
          <Typography>
            <p>{columnData.label}</p>
          </Typography>
          {icon ? (
            <Tooltip title={tooltip} placement="top">
              <Typography style={{ display: 'flex', marginLeft: '2px' }} variant="caption">
                {icon}
              </Typography>
            </Tooltip>
          ) : (
            ''
          )}
        </Grid>
        <TableSortLabel
          active={columnMeta.name === columnData.name}
          direction={columnMeta.direction || 'asc'}
        />
      </Grid>
    </TableCell>
  );
};
