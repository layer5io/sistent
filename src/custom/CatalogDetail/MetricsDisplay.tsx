import React from 'react';
import { Grid2 } from '../../base';
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
    { label: 'Opens', value: details.viewCount },
    { label: 'Downloads', value: details.downloadCount },
    { label: 'Deploys', value: details.deploymentCount },
    { label: 'Clones', value: details.cloneCount },
    { label: 'Shares', value: details.shareCount }
  ];

  return (
    <Grid2
      style={{ marginLeft: 'auto' }}
      size={{
        lg: 8,
        md: 8,
        sm: 12,
        xs: 12
      }}
    >
      <MetricsSection>
        {metrics.map((metric) => (
          <MetricsContainer key={metric.label}>
            <MetricsData>{metric.value}</MetricsData>
            <MetricsType>{metric.label}</MetricsType>
          </MetricsContainer>
        ))}
      </MetricsSection>
    </Grid2>
  );
};

export default MetricsDisplay;
