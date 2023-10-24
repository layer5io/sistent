import React from 'react';
import Tooltip from '../../../base/Tooltip';

interface ConditionalTooltipProps {
  value: string;
  maxLength: number;
  // You can add more prop types here as needed
}

export const ConditionalTooltip: React.FC<ConditionalTooltipProps> = ({
  value,
  maxLength,
  ...restProps
}) => {
  return value.length > maxLength ? (
    <Tooltip title={value} arrow placement="top">
      <div
        style={{
          maxWidth: '15rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}
        {...restProps}
      >
        {`${value.slice(0, maxLength)}...`}
      </div>
    </Tooltip>
  ) : (
    <div
      style={{
        maxWidth: '15rem',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }}
      {...restProps}
    >
      {value}
    </div>
  );
};

export default ConditionalTooltip;
