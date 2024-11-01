import React from 'react';
import { Grid } from '../../base';
import { Pattern } from '../CustomCatalog/CustomCard';
import { MetricsContainer, MetricsData, MetricsSection, MetricsType } from './style';

interface MetricItem {
  label: string;
  value: number;
}

interface MetricsDisplayProps {
  details: Pattern;
}

const MetricsDisplay: React.FC<MetricsDisplayProps> = ({ details }) => {
  const metrics: MetricItem[] = [
    { label: 'Opens', value: details.view_count },
    { label: 'Downloads', value: details.download_count },
    { label: 'Deploys', value: details.deployment_count },
    { label: 'Clones', value: details.clone_count },
    { label: 'Shares', value: details.share_count }
  ];

  return (
    <Grid item lg={8} md={8} sm={12} xs={12} style={{ marginLeft: 'auto' }}>
      <MetricsSection>
        {metrics.map((metric) => (
          <MetricsContainer key={metric.label}>
            <MetricsData>{metric.value}</MetricsData>
            <MetricsType>{metric.label}</MetricsType>
          </MetricsContainer>
        ))}
      </MetricsSection>
    </Grid>
  );
};

export default MetricsDisplay;
