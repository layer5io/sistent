import { useEffect, useRef, memo } from 'react';
import bb from 'billboard.js';

function BBChart({ options }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = bb.generate({ ...options, bindto: chartRef.current });

    return () => {
      chart.destroy();
    };
  }, [options]);

  return <div ref={chartRef}></div>;
}

export default memo(BBChart);
