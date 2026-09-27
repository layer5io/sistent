import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Table, TableBody, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';
import { FeatureHeaderCell, StyledHeaderRow, StyledTableCell, StyledTableContainer } from './style';

export interface PlanFeature {
  featureName: string;
  freePlan: boolean | string;
  teamPlan: boolean | string;
  enterprisePlan: boolean | string;
}

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
  const renderValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <CheckIcon color="success" data-testid="check-icon" titleAccess="Included" aria-label="Included" />
      ) : (
        <CloseIcon color="error" data-testid="close-icon" titleAccess="Not included" aria-label="Not included" />
      );
    }
    return (
      <Typography variant="body2" fontWeight="fontWeightMedium">
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
            fontWeight: 'fontWeightBold'
          }}
        >
          {title}
        </Typography>
      )}
      <StyledTableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="subscription comparison table">
          <TableHead>
            <StyledHeaderRow>
              <StyledTableCell>
                <Typography variant="subtitle1" fontWeight="fontWeightBold" component="span">
                  {featuresLabel}
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography variant="subtitle1" fontWeight="fontWeightBold" component="span">
                  {freePlanLabel}
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <Button size="small" variant="outlined" onClick={() => onPlanSelect?.('free')}>
                    {freePlanButtonLabel}
                  </Button>
                </Box>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography variant="subtitle1" fontWeight="fontWeightBold" component="span">
                  {teamPlanLabel}
                </Typography>
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
              <StyledTableCell align="center">
                <Typography variant="subtitle1" fontWeight="fontWeightBold" component="span">
                  {enterprisePlanLabel}
                </Typography>
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
            {features.map((row) => (
              <TableRow
                key={row.featureName}
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

export default SubscriptionTable;
