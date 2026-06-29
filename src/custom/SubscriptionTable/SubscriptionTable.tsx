import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import React from 'react';

// Strict TypeScript interfaces to handle dynamic table data
export interface PlanFeature {
  featureName: string;
  freePlan: boolean | string;
  teamPlan: boolean | string;
  enterprisePlan: boolean | string;
}

export interface SubscriptionTableProps {
  title?: string;
  features: PlanFeature[];
  onPlanSelect?: (planType: 'free' | 'team' | 'enterprise') => void;
}

export const SubscriptionTable: React.FC<SubscriptionTableProps> = ({
  title = 'Subscription Plans Comparison',
  features,
  onPlanSelect
}) => {
  // Helper function to render true/false values as Crisp Icons or Text
  const renderValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <CheckIcon color="success" data-testid="check-icon" />
      ) : (
        <CloseIcon color="error" data-testid="close-icon" />
      );
    }
    return (
      <Typography variant="body2" sx={{ fontWeight: 500 }}>
        {value}
      </Typography>
    );
  };

  return (
    <Box sx={{ width: '100%', my: 4 }}>
      {title && (
        <Typography
          variant="h4"
          component="h2"
          sx={{
            mb: 3,
            fontWeight: 700,
            fontFamily: 'Qanelas Soft, sans-serif' // Figma semantic typography mapping
          }}
        >
          {title}
        </Typography>
      )}

      <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Table sx={{ minWidth: 650 }} aria-label="subscription comparison table">
          <TableHead sx={{ backgroundColor: 'action.hover' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Features</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                Free Plan
                <Box sx={{ mt: 1 }}>
                  <Button size="small" variant="outlined" onClick={() => onPlanSelect?.('free')}>
                    Get Started
                  </Button>
                </Box>
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                Team Plan
                <Box sx={{ mt: 1 }}>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => onPlanSelect?.('team')}
                  >
                    Upgrade
                  </Button>
                </Box>
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                Enterprise Plan
                <Box sx={{ mt: 1 }}>
                  <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    onClick={() => onPlanSelect?.('enterprise')}
                  >
                    Contact Us
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {features.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': { backgroundColor: 'action.hover' }
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ fontWeight: 600, color: 'text.primary' }}
                >
                  {row.featureName}
                </TableCell>
                <TableCell align="center">{renderValue(row.freePlan)}</TableCell>
                <TableCell align="center">{renderValue(row.teamPlan)}</TableCell>
                <TableCell align="center">{renderValue(row.enterprisePlan)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

SubscriptionTable.displayName = 'SubscriptionTable';
