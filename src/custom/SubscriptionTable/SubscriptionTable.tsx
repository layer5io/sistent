import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Table, TableBody, TableHead, Typography } from '@mui/material';
import React from 'react';

// Strict TypeScript interfaces to handle dynamic table data
export interface SubscriptionTableProps {
  title?: string;
  features?: PlanFeature[];
  onPlanSelect?: (planType: 'free' | 'team' | 'enterprise') => void;
  featuresLabel?: string;
  freePlanLabel?: string;
  freePlanButtonLabel?: string;
  teamPlanLabel?: string;
  teamPlanButtonLabel?: string;
  enterprisePlanLabel?: string;
  enterprisePlanButtonLabel?: string;
}

export const SubscriptionTable: React.FC<SubscriptionTableProps> = ({
  title = 'Subscription Plans Comparison',
  features = [],
  onPlanSelect,
  featuresLabel = 'Features',
  freePlanLabel = 'Free Plan',
  freePlanButtonLabel = 'Get Started',
  teamPlanLabel = 'Team Plan',
  teamPlanButtonLabel = 'Upgrade',
  enterprisePlanLabel = 'Enterprise Plan',
  enterprisePlanButtonLabel = 'Contact Us'
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

      <StyledTableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="subscription comparison table">
          <TableHead>
            <StyledHeaderRow>
              <StyledTableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                {featuresLabel}
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                {freePlanLabel}
                <Box sx={{ mt: 1 }}>
                  <Button size="small" variant="outlined" onClick={() => onPlanSelect?.('free')}>
                    {freePlanButtonLabel}
                  </Button>
                </Box>
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                {teamPlanLabel}
                <Box sx={{ mt: 1 }}>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => onPlanSelect?.('team')}
                  >
                    {teamPlanButtonLabel}
                  </Button>
                </Box>
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                {enterprisePlanLabel}
                <Box sx={{ mt: 1 }}>
                  <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    onClick={() => onPlanSelect?.('enterprise')}
                  >
                    {enterprisePlanButtonLabel}
                  </Button>
                </Box>
              </StyledTableCell>
            </StyledHeaderRow>
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
                <FeatureHeaderCell component="th" scope="row">
                  {row.featureName}
                </FeatureHeaderCell>
                <StyledTableCell align="center">{renderValue(row.freePlan)}</StyledTableCell>
                <StyledTableCell align="center">{renderValue(row.teamPlan)}</StyledTableCell>
                <StyledTableCell align="center">{renderValue(row.enterprisePlan)}</StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </Box>
  );
};

SubscriptionTable.displayName = 'SubscriptionTable';
