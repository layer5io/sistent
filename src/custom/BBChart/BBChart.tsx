import { ChartOptions, bb } from 'billboard.js';
import { memo, useEffect, useRef } from 'react';

interface BBChartProps {
  options: ChartOptions;
}

const BBChart = ({ options }: BBChartProps) => {
  const _chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!_chartRef.current) return;

    const chart = bb.generate({
      bindto: _chartRef.current,
      ...options
    });

    return () => {
      chart.destroy();
    };
  }, [options]);

  return <div ref={_chartRef} onClickCapture={(e) => e.stopPropagation()} />;
};

export default memo(BBChart);
