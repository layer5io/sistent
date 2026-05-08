import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

export function ResponsiveDataTable({ data, columns, title, ...props }) {
  const safeColumns = Array.isArray(columns) ? columns : [];
  const safeData = Array.isArray(data) ? data : [];

  return (
    <TableContainer component={Paper} {...props}>
      {title ? (
        <Typography variant="h6" sx={{ p: 2 }}>
          {title}
        </Typography>
      ) : null}
      <Table size="small" aria-label="responsive data table">
        <TableHead>
          <TableRow>
            {safeColumns.map((col) => (
              <TableCell key={col.name || col.label}>{col.label || col.name}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {safeData.map((row, rowIndex) => (
            <TableRow key={`row-${rowIndex}`}>
              {safeColumns.map((col, colIndex) => (
                <TableCell key={`${rowIndex}-${col.name || colIndex}`}>{row[colIndex]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
