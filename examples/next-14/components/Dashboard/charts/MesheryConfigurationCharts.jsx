import { useEffect, useState } from 'react';
import { donut } from 'billboard.js';
import Link from 'next/link';
import TextTooltip from '@/components/MesheryMeshInterface/TextTooltip';
import { Box, IconButton, Typography } from '@layer5/sistent';
import DashboardInfoOutlined from '@/styles/DashboardInfoOutlined';
import DashboardSection from '@/styles/DashboardSection';
import BBChart from '@/components/BBChart';
import { dataToColors } from '@/utils/charts';
import { useGetPatternsQuery } from '@/lib/redux/rtk-query/queries/design';
import { useGetFiltersQuery } from '@/lib/redux/rtk-query/queries/filter';
import { renderTooltipContent } from '@/components/MesheryMeshInterface/TextTooltip';
import CreateDesignBtn from './CreateDesignBtn';

export default function MesheryConfigurationChart() {
  // const { notify } = useNotification();

  const [chartData, setChartData] = useState([]);

  const { data: patternsData, error: patternsError } = useGetPatternsQuery({
    page: 0,
    pagesize: 25,
  });

  const { data: filtersData, error: filtersError } = useGetFiltersQuery({
    page: 0,
    pagesize: 25,
  });

  useEffect(() => {
    if (!patternsError && patternsData?.patterns) {
      setChartData((prevData) => [...prevData, ['Designs', patternsData.total_count]]);
    }
  }, [patternsData, patternsError]);

  useEffect(() => {
    if (!filtersError && filtersData?.filters) {
      setChartData((prevData) => [...prevData, ['Filters', filtersData.total_count]]);
    }
  }, [filtersData, filtersError]);

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
      title: 'Content\nby Type',
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

  const url = `https://docs.meshery.io/guides/configuration-management`;

  return (
    <Link href="/configuration/designs">
      <DashboardSection>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" gutterBottom sx={{ cursor: 'pointer' }}>
            Configuration
          </Typography>
          <div>
            <TextTooltip
              backgroundColor="#3C494F"
              placement="left"
              interactive="true"
              title={renderTooltipContent({
                showPriortext: 'Meshery’s ability to configure infrastructure and applications.',
                link: url,
              })}
            >
              <IconButton
                disableRipple={true}
                disableFocusRipple={true}
                onClick={(e) => {
                  e.stopPropagation();
                }}
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
                No Meshery configuration found
              </Typography>
              <CreateDesignBtn />
            </div>
          )}
        </Box>
      </DashboardSection>
    </Link>
  );
}
