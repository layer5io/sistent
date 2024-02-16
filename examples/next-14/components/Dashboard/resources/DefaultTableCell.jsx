import { Grid, Tooltip, Typography } from '@layer5/sistent';
import { TableCell } from '@mui/material';

export const DefaultTableCell = ({ columnData, icon, tooltip }) => {
  return (
    <TableCell>
      <Grid style={{ display: 'flex' }}>
        <Grid style={{ display: 'flex', alignItems: 'center' }}>
          <Typography>
            <b>{columnData.label}</b>
          </Typography>
          {icon ? (
            <Tooltip title={tooltip ? tooltip : ''} placement="top">
              <Typography style={{ display: 'flex', marginLeft: '5px' }} variant="body1">
                {icon}
              </Typography>
            </Tooltip>
          ) : (
            ''
          )}
        </Grid>
      </Grid>
    </TableCell>
  );
};
