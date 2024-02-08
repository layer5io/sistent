import TextTooltip from '@/components/MesheryMeshInterface/TextTooltip';
import { useGetAllConnectionStatusQuery } from '@/lib/redux/rtk-query/queries/connection';
import { Typography, Box, IconButton } from '@layer5/sistent';
import Link from 'next/link';
import BBChart from '@/components/BBChart';
import { donut } from 'billboard.js';
import { dataToColors } from '@/utils/charts';
import DashboardSection from '@/styles/DashboardSection';
import { renderTooltipContent } from '@/components/MesheryMeshInterface/TextTooltip';
import DashboardInfoOutlined from '@/styles/DashboardInfoOutlined';
import ConnectClustersBtn from './ConnectClustersBtn';

export function ConnectionStatsChart() {
  const { data: statusData } = useGetAllConnectionStatusQuery();
  const chartData =
    statusData?.connections_status
      ?.filter((data) => isValidColumnName(data.status))
      .map((data) => [data.status, data.count]) || [];

  const chartOptions = {
    data: {
      columns: chartData,
      type: donut(),
      colors: dataToColors(chartData),
    },
    arc: {
      cornerRadius: {
        ratio: 0.05,
      },
    },
    donut: {
      title: 'Connections\n by Status',
      padAngle: 0.03,
      label: {
        format: function (value) {
          return value;
        },
      },
    },
    tooltip: {
      format: {
        value: function (v) {
          return v;
        },
      },
    },
  };

  const url = `https://docs.meshery.io/concepts/logical/connections`;

  return (
    <Link href="/management/connections">
      <DashboardSection>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" gutterBottom sx={{ cursor: 'pointer' }}>
            Connections
          </Typography>
          <div>
            <TextTooltip
              backgroundColor="#3C494F"
              interactive={true}
              title={renderTooltipContent({
                showPriortext:
                  'Meshery Connections are managed and unmanaged resources that either through discovery or manual entry are managed by a state machine and used within one or more Environments.',
                link: url,
                showAftertext: 'to know more about Meshery Connections',
              })}
              placement="left"
            >
              <IconButton
                disableRipple={true}
                disableFocusRipple={true}
                disableTouchRipple={true}
                sx={{ padding: '0px' }}
                onClick={(e) => e.stopPropagation()}
              >
                <DashboardInfoOutlined />
              </IconButton>
            </TextTooltip>
          </div>
        </div>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            height: '100%',
          }}
        >
          {chartData.length > 0 ? (
            <BBChart options={chartOptions} />
          ) : (
            <div
              style={{
                padding: '2rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <Typography style={{ fontSize: '1.5rem', marginBottom: '1rem' }} align="center">
                No connections found in your clusters
              </Typography>
              <ConnectClustersBtn />
            </div>
          )}
        </Box>
      </DashboardSection>
    </Link>
  );
}

export default ConnectionStatsChart;
