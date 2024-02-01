import { Tooltip } from '../../../base/Tooltip';

interface ConditionalTooltipProps {
  value: string;
  maxLength: number;
  // You can add more prop types here as needed
}

function ConditionalTooltip({
  value,
  maxLength,
  ...restProps
}: ConditionalTooltipProps): JSX.Element {
  if (value.length > maxLength) {
    return (
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
    );
  } else {
    return (
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
  }
}

export default ConditionalTooltip;
