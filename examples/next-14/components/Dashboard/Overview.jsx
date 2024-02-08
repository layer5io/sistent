import { Grid } from '@layer5/sistent';
import MeshModelGraph from './charts/MeshModelGraph';
import { styled } from '@mui/material';
import ConnectionStatsChart from './charts/ConnectionStatsChart';
import MesheryConfigurationChart from './charts/MesheryConfigurationCharts';

const RootClass = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#202020' : '#FFFFFF',
  marginTop: '1rem',
}));

function Overview() {
  return (
    <RootClass>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <MeshModelGraph />
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <ConnectionStatsChart />
            </Grid>
            <Grid item xs={12} md={6}>
              <MesheryConfigurationChart />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </RootClass>
  );
}

export default Overview;
