import { SxProps, Theme } from '@mui/material';
import React from 'react';
import { Box, Button, Card, CardActions, CardContent, Typography } from '../../base';

export interface StyledCardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
  btntitle?: string;
  onclick?: () => void;
  disabled?: boolean;
}

function StyledCard({
  title,
  icon,
  children,
  sx = {},
  btntitle,
  onclick,
  disabled = false
}: StyledCardProps): JSX.Element {
  return (
    <Card sx={{ height: '100%', ...sx }}>
      <CardContent>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              mb: 1.5
            }}
          >
            {icon}
            <Typography variant="h6" fontWeight="700" component="div" sx={{ mx: 1 }}>
              {title}
            </Typography>
          </Box>
          {btntitle && (
            <CardActions>
              <Button variant="contained" size="large" onClick={onclick} disabled={disabled}>
                {btntitle}
              </Button>
            </CardActions>
          )}
        </div>

        {children}
      </CardContent>
    </Card>
  );
}

export default StyledCard;
