import {
  Card,
  Typography,
  BaseButton,
  Box,
  CardActions,
  CardContent
} from '@layer5/sistent-components/src';
import React from 'react';

export default {
  title: 'Example/Card',
  component: Card,
  tags: ['autodocs']
};

const bull = (
  <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
    •
  </Box>
);

export function Basic() {
  return (
    <Card sx={{ minWidth: 275, maxWidth: 500 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          be{bull}nev{bull}o{bull}lent
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <BaseButton size="small">Learn More</BaseButton>
      </CardActions>
    </Card>
  );
}

export function Outlined() {
  return (
    <Card sx={{ minWidth: 275, maxWidth: 500 }} variant="outlined">
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          be{bull}nev{bull}o{bull}lent
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <BaseButton size="small">Learn More</BaseButton>
      </CardActions>
    </Card>
  );
}
