import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { ChartOptions } from 'billboard.js';
import _ from 'lodash';
import React, { useCallback, useContext, useMemo } from 'react';
import { Box, Chip, Collapse, Grid2, IconButton, Typography } from '../../base';

import { CARIBBEAN_GREEN, KEPPEL, SAFFRON, blue, red } from '../../theme';
import { BBChart } from '../BBChart';
import { CustomTooltip } from '../CustomTooltip';
import ResponsiveDataTable from '../ResponsiveDataTable';
import { CopyToClipboard, EnvironmentVariables, KeyValueInRow, SectionHeading } from './Component';
import ExpandArrow from './ExpandArrow';
import { Level, LevelContext } from './context';
import {
  CodeFormatterCode,
  CodeFormatterPre,
  CollapsibleSectionContainer,
  CollapsibleSectionContent,
  CollapsibleSectionTitle,
  Details,
  ElementData,
  ElementDataWrap,
  EnvironmentVariablesContainer,
  FlexResourceContainer,
  KeyValField,
  LongWrap,
  NumberStateContainer,
  NumberStateQuantity,
  NumberStateTitle,
  NumberStateValue,
  NumberStateValueContainer,
  ResourceProgressContainer,
  StyledArrayUl,
  StyledChip,
  StyledEnvironmentVariablesCode,
  StyledEnvironmentVariablesPre,
  StyledTitle,
  TextValue,
  Wrap
} from './styles';
import {
  ArrayFormatterProps,
  CodeFormatterProps,
  CollapsibleSectionProps,
  ContainerFormatterProps,
  DetailSectionProps,
  EnvironmentFormatterProps,
  LabelFormatterProps,
  ListFormatterProps,
  MemoryUsageProps,
  NumberStateProps,
  OperatorDynamicFormatterProps,
  PortsFormatterProps,
  SecretFormatterProps,
  StatusFormatterProps,
  TableDataFormatterProps,
  TextWithLinkFormatterProps
} from './types';
import { parseCpu, splitCamelCaseString } from './utils';

interface StatusColorType {
  background: string;
  text: string;
}

interface StatusColorsType {
  [key: string]: StatusColorType;
}

const STATUS_COLORS: StatusColorsType = {
  Active: { background: KEPPEL, text: 'white' },
  Pending: { background: SAFFRON, text: 'black' },
  Terminating: { background: red[30], text: 'white' },
  Succeeded: { background: blue[30], text: 'white' },
  Failed: { background: red[30], text: 'white' },
  Initializing: { background: blue[30], text: 'white' },
  Deleting: { background: red[30], text: 'white' },
  NotReady: { background: red[30], text: 'white' },
  Ready: { background: KEPPEL, text: 'white' },
  CrashLoopBackOff: { background: red[30], text: 'white' },
  Completed: { background: KEPPEL, text: 'black' },
  ImagePullBackOff: { background: red[30], text: 'white' },
  ErrImagePull: { background: red[30], text: 'white' },
  Running: { background: KEPPEL, text: 'white' },
  Waiting: { background: SAFFRON, text: 'black' },
  ContainerCreating: { background: blue[30], text: 'white' },
  Evicted: { background: red[30], text: 'white' },
  OOMKilled: { background: red[30], text: 'white' },
  RunningDegraded: { background: SAFFRON, text: 'black' },
  Restarting: { background: blue[30], text: 'white' },
  Preempted: { background: SAFFRON, text: 'black' },
  Provisioning: { background: blue[30], text: 'white' },
  Available: { background: KEPPEL, text: 'white' },
  Progressing: { background: blue[30], text: 'white' },
  ReplicaFailure: { background: red[30], text: 'white' },
  Bound: { background: KEPPEL, text: 'white' },
  Released: { background: SAFFRON, text: 'black' },
  Terminated: { background: red[30], text: 'white' }
};

export const EnvironmentFormatter: React.FC<EnvironmentFormatterProps> = ({ data }) => {
  if (!data) {
    return null;
  }
  const convertEnvironmentValue = (obj: {
    value?: string;
    valueFrom?: {
      [key: string]: {
        apiVersion: string;
        fieldPath: string;
      };
    };
  }) => {
    const { value, valueFrom } = obj;
    if (valueFrom) {
      const key = Object.keys(valueFrom)[0];
      const { apiVersion, fieldPath } = valueFrom[key];
      return `${key}(${apiVersion}: ${fieldPath})`;
    } else {
      return value;
    }
  };

  return (
    <EnvironmentVariablesContainer>
      <StyledEnvironmentVariablesPre>
        <StyledEnvironmentVariablesCode>
          {data?.map((item) => {
            const value = convertEnvironmentValue(item);
            return <EnvironmentVariables key={item.name} title={item.name} value={value} />;
          })}
        </StyledEnvironmentVariablesCode>
      </StyledEnvironmentVariablesPre>
    </EnvironmentVariablesContainer>
  );
};

export const CodeFormatter: React.FC<CodeFormatterProps> = ({ data }) => {
  return (
    <CodeFormatterPre>
      <CodeFormatterCode>
        <OperatorDynamicFormatter data={data} />
      </CodeFormatterCode>
    </CodeFormatterPre>
  );
};

export const PortsFormatter: React.FC<PortsFormatterProps> = ({ data }) => {
  return (
    <Box>
      {data?.map((item, index) => (
        <Details noPadding key={index}>
          <Box display="flex" alignItems="center">
            {item.name && <Typography variant="body1">{`${item.name}: `} </Typography>}
            <ElementData>{`(${item.containerPort || item.port}/${item.protocol})`}</ElementData>
          </Box>
        </Details>
      ))}
    </Box>
  );
};

export const ArrayFormatter: React.FC<ArrayFormatterProps> = ({ data }) => {
  return (
    <StyledArrayUl>
      {data.map((item, index) => (
        <OperatorDynamicFormatter data={item} key={index} />
      ))}
    </StyledArrayUl>
  );
};

export const ListFormatter: React.FC<ListFormatterProps> = ({ data }) => {
  return (
    <ol style={{ margin: 0, paddingLeft: '1rem' }}>
      {data.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ol>
  );
};

export const OperatorDynamicFormatter: React.FC<OperatorDynamicFormatterProps> = ({ data }) => {
  const level = useContext(LevelContext);
  const regex = /(.*--)|(^\/)|([$/:*=()<>{}]{2,})/;

  if (_.isNil(data)) {
    return null;
  }

  if (_.isNumber(data)) {
    return <ElementData>{data}</ElementData>;
  }

  if (_.isString(data)) {
    return (
      <>
        <ElementData>
          <TextValue>{data}</TextValue>
          {regex.test(data) && <CopyToClipboard data={data} />}
        </ElementData>
      </>
    );
  }

  if (_.isArray(data)) {
    return <ArrayFormatter data={data} />;
  }

  if (_.isBoolean(data)) {
    return (
      <ElementData
        style={{
          color: data ? 'green' : 'red'
        }}
      >
        {data ? 'TRUE' : 'FALSE'}
      </ElementData>
    );
  }

  if (_.isObject(data)) {
    if (
      Object.keys(data).length === 2 &&
      Object.keys(data).includes('key') &&
      Object.keys(data).includes('value')
    ) {
      const typedData = data as { key: string; value: string };
      return (
        <Details noPadding>
          <Wrap>
            <KeyValField>{typedData.key}: </KeyValField>
            <ElementDataWrap>{typedData.value}</ElementDataWrap>
          </Wrap>
        </Details>
      );
    }

    return Object.entries(data).map(([key, value]) => {
      if (key === 'args' || key === 'query') {
        return (
          <Details key={key} noPadding>
            <LongWrap>
              <SectionHeading>{splitCamelCaseString(key)}</SectionHeading>
              <CodeFormatter data={key === 'query' ? value : value.join(' ')} />
            </LongWrap>
          </Details>
        );
      }

      return (
        <Details key={key}>
          <LongWrap display={_.isString(key) && !_.isObject(value) ? 'flex' : 'block'}>
            <SectionHeading>{splitCamelCaseString(key)}</SectionHeading>
            <Level>
              <OperatorDynamicFormatter level={level + 1} data={value} />
            </Level>
          </LongWrap>
        </Details>
      );
    });
  }

  return null;
};

export const StatusFormatter: React.FC<StatusFormatterProps> = ({ status }) => {
  if (!status) {
    return null;
  }
  if (_.isObject(status)) {
    return (
      <Grid2 container spacing={1}>
        {Object.entries(status).map(([key, value]) => (
          <Grid2 key={key}>
            <StyledChip label={value as string} size="small" />
          </Grid2>
        ))}
      </Grid2>
    );
  }
  const statusColor = STATUS_COLORS[status];

  return (
    <StyledChip
      label={status}
      style={{
        backgroundColor: statusColor && statusColor.background,
        color: statusColor && statusColor.text,
        borderRadius: '0.25rem'
      }}
      size="small"
    />
  );
};

export const LabelFormatter: React.FC<LabelFormatterProps> = ({
  data,
  onClick,
  selectedLabels
}) => {
  if (!data) {
    return null;
  }
  const handleClick = (item: string) => {
    const newArr = selectedLabels.includes(item)
      ? selectedLabels.filter((i) => i !== item)
      : [...selectedLabels, item];
    onClick(newArr);
  };

  return (
    <Box display="flex" gap={1} flexWrap={'wrap'}>
      {data.map((item, index) => {
        return (
          <ElementData key={index}>
            <StyledChip
              label={item}
              size="small"
              onClickCapture={() => handleClick(item)}
              clickable={onClick !== undefined && true}
              style={{
                backgroundColor: selectedLabels.includes(item) ? KEPPEL : undefined
              }}
            />
          </ElementData>
        );
      })}
    </Box>
  );
};

export const StatusChip = ({ status }: { status: string }) => {
  if (!status) {
    return null;
  }
  const statusColor = STATUS_COLORS[status];

  return (
    <Chip
      label={status}
      style={{
        backgroundColor: statusColor && statusColor.background,
        color: statusColor && statusColor.text,
        borderRadius: '0.25rem',
        width: 'fit-content',
        alignSelf: 'end'
      }}
      size="small"
    />
  );
};

export const MemoryUsage: React.FC<MemoryUsageProps> = ({
  allocatable,
  capacity,
  height,
  width
}) => {
  const convertKiToBytes = useCallback((kiValue: string): number => {
    return parseInt(kiValue.replace('Ki', '')) * 1024;
  }, []);

  const reservedCpu = useMemo(() => {
    if (!allocatable || !capacity) return 0;
    const usedCPU = parseCpu(capacity.cpu) - parseCpu(allocatable.cpu);
    const capacityCPU = parseCpu(capacity.cpu);

    return (usedCPU / capacityCPU) * 100;
  }, [allocatable, capacity]);

  const memoryUsage = useMemo(() => {
    if (!allocatable || !capacity) return 0;
    const totalMemory = parseInt(capacity.memory.replace('Ki', ''));
    const availableMemory = parseInt(allocatable.memory.replace('Ki', ''));
    const usedMemory = totalMemory - availableMemory;
    return (usedMemory / totalMemory) * 100;
  }, [allocatable, capacity]);

  const diskUsagePercent = useMemo(() => {
    if (!allocatable || !capacity) return 0;

    const total = convertKiToBytes(capacity['ephemeral-storage']);
    const available = convertKiToBytes(allocatable['ephemeral-storage']);

    const used = total - available;
    return (used / total) * 100;
  }, [allocatable, capacity, convertKiToBytes]);

  const chartOptions = useCallback(
    (percentage: number, type: string): ChartOptions => {
      const roundedPercentage = parseFloat(percentage.toFixed(2));
      return {
        data: {
          columns: [[type, roundedPercentage]],
          type: 'gauge'
        },
        gauge: {
          min: 0,
          max: 100,
          label: {
            format: (value: number) => `${value}%`
          }
        },
        color: {
          pattern: [KEPPEL, SAFFRON, '#F97600', '#FF0000'],
          threshold: {
            values: [30, 60, 90, 100]
          }
        },
        size: {
          height: height ?? 150,
          width: width ?? 200
        },
        legend: {
          show: false
        }
      };
    },
    [height, width]
  );

  const renderResourceProgress = useCallback(
    (title: string, percentage: number, type: string) => (
      <ResourceProgressContainer key={type}>
        <Typography variant="body1">{title}</Typography>
        <BBChart options={chartOptions(percentage, type)} />
      </ResourceProgressContainer>
    ),
    [chartOptions]
  );

  if (!allocatable || !capacity) {
    return null;
  }

  return (
    <FlexResourceContainer>
      {renderResourceProgress('System Reserved Cpu', reservedCpu, 'CPU')}
      {renderResourceProgress('Memory Usage', memoryUsage, 'Memory')}
      {renderResourceProgress('Disk Usage', diskUsagePercent, 'Disk')}
    </FlexResourceContainer>
  );
};

export const TableDataFormatter: React.FC<TableDataFormatterProps> = ({
  title,
  data,
  showAll = true,
  mainTableData,
  mainTableCols
}) => {
  type ColumnType = {
    name: string;
    label: string;
    options: {
      sort: boolean;
    };
  };
  if (!showAll) {
    return null;
  }
  let columns: ColumnType[] = [];
  let tableData: string[][] = [];

  if (!mainTableCols && !mainTableData) {
    if (Array.isArray(data)) {
      if (data.length > 0) {
        columns = Object.keys(data[0]).map((key) => ({
          name: key,
          label: splitCamelCaseString(key),
          options: {
            sort: false
          }
        }));
        tableData = data.map((item) => Object.values(item));
      }
    } else {
      columns = Object.keys(data).map((key) => ({
        name: key,
        label: splitCamelCaseString(key),
        options: {
          sort: false
        }
      }));
      tableData = [Object.values(data)];
    }
  }
  const options = {
    filter: false,
    download: false,
    print: false,
    viewColumns: false,
    selectableRows: 'none',
    search: false,
    responsive: 'standard',
    pagination: false,
    elevation: 1
  };

  return (
    <Box
      width={'100%'}
      display={'flex'}
      flexDirection={'column'}
      gap={1}
      minWidth={'30rem'}
      marginBlock={1}
    >
      {title && <Typography variant="body1">{title}</Typography>}

      <ResponsiveDataTable
        columns={mainTableCols ? mainTableCols : columns}
        data={mainTableData ? mainTableData : tableData}
        columnVisibility={undefined}
        options={options}
        tableCols={mainTableCols ? mainTableCols : columns}
      />
    </Box>
  );
};

export const TextWithLinkFormatter: React.FC<TextWithLinkFormatterProps> = ({
  title,
  value,
  variant = 'row',
  onClick
}) => {
  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);

  const LinkComponent = (
    <span
      onClickCapture={handleClick}
      style={{
        color: onClick !== undefined ? CARIBBEAN_GREEN : undefined,
        cursor: onClick !== undefined ? 'pointer' : undefined,
        width: 'max-content'
      }}
    >
      {value}
    </span>
  );
  return variant === 'row' ? (
    <KeyValueInRow Key={title} Value={LinkComponent} />
  ) : (
    <Box display={'flex'} flexDirection={'column'} gap={'0.3rem'} marginBlock={'0.4rem'}>
      <Typography variant="body1">{title}</Typography>
      {LinkComponent}
    </Box>
  );
};

const DetailSection: React.FC<DetailSectionProps> = ({
  title = '',
  data,
  formatter: Formatter
}) => {
  if (!data) {
    return null;
  }
  return (
    <Box width={'100%'}>
      <KeyValueInRow
        Key={title}
        Value={
          <ElementData>
            <Formatter data={data} />
          </ElementData>
        }
      />
    </Box>
  );
};

export const ContainerFormatter: React.FC<ContainerFormatterProps> = ({
  containerSpec,
  containerStatus
}) => {
  const state = containerStatus?.state || {};
  const status = _.capitalize(Object.keys(state)?.[0] || 'unknown');
  const stateValues = Object.values(state)?.[0] || {};
  const startedAt = stateValues ? stateValues?.startedAt : null;
  return (
    <Box display="flex" flexDirection="column" gap={'0.5rem'}>
      <KeyValueInRow
        Key={'Status'}
        Value={<StatusFormatter status={status} rightPosition="1rem" />}
      />
      <DetailSection title="Ports" data={containerSpec.ports} formatter={PortsFormatter} />
      <DetailSection
        title="Started At"
        data={startedAt}
        formatter={({ data }) => (
          <Typography variant="body1">
            {data ? new Date(data).toLocaleString() : 'Not Available'}
          </Typography>
        )}
      />
      <DetailSection
        title="Image Pull Policy"
        data={containerSpec?.imagePullPolicy}
        formatter={({ data }) => <Typography variant="body1">{data}</Typography>}
      />

      <DetailSection
        title="Total Restarts"
        data={containerStatus?.restartCount}
        formatter={({ data }) => <NumberState value={data} quantity="times" />}
      />

      <DetailSection
        title="Image"
        data={containerSpec?.image}
        formatter={({ data }) => <StyledChip label={data} size="small" />}
      />
      <DetailSection
        title="Container"
        data={containerStatus?.containerID}
        formatter={({ data }) => <StyledChip label={data} size="small" />}
      />

      <DetailSection
        title="Environment Variables"
        data={containerSpec?.env}
        formatter={EnvironmentFormatter}
      />

      <KeyValueInRow
        Key="Volume Mounts"
        Value={
          <Box display={'flex'} flexDirection={'column'} gap={1}>
            {containerSpec?.volumeMounts?.map((item, index) => {
              const roStatus = item?.readOnly ? ' (RO)' : ' (RW)';
              return (
                <Box display={'flex'} key={index} flexWrap={'wrap'} gap={'0.25rem 0.5rem'}>
                  <ElementData key={index}>
                    <StyledChip label={item?.mountPath} size="small" />
                  </ElementData>
                  <ElementData>
                    <Typography variant="body1">{`from ${item?.name}${roStatus}`}</Typography>
                  </ElementData>
                </Box>
              );
            })}
          </Box>
        }
      />
      {containerSpec?.command && (
        <DetailSection title="Command" data={containerSpec.command} formatter={CodeFormatter} />
      )}
      {containerSpec?.livenessProbe && (
        <DetailSection
          title="Liveness Probe"
          data={containerSpec.livenessProbe}
          formatter={CodeFormatter}
        />
      )}
      {containerSpec?.readinessProbe && (
        <DetailSection
          title="Readiness Probe"
          data={containerSpec?.readinessProbe}
          formatter={CodeFormatter}
        />
      )}
      {containerSpec?.startupProbe && (
        <DetailSection
          title="Startup Probe"
          data={containerSpec?.startupProbe}
          formatter={CodeFormatter}
        />
      )}
      <DetailSection title="Arguments" data={containerSpec?.args} formatter={CodeFormatter} />
      {containerSpec.resources?.requests && (
        <DetailSection
          title="Resources"
          data={containerSpec?.resources?.requests}
          formatter={CodeFormatter}
        />
      )}
      {containerSpec?.resources?.limits && (
        <DetailSection
          title="Limits"
          data={containerSpec?.resources?.limits}
          formatter={CodeFormatter}
        />
      )}
    </Box>
  );
};

export const SecretFormatter: React.FC<SecretFormatterProps> = ({ data }) => {
  const [showSecret, setShowSecret] = React.useState<{ [key: string]: boolean }>({});

  const handleToggleVisibility = useCallback((key: string): void => {
    setShowSecret((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  }, []);

  const parsedData = useMemo(() => {
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  }, [data]);

  if (!parsedData || typeof parsedData !== 'object') {
    return null;
  }

  const keys = Object.keys(parsedData);

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      {keys.map((key) => (
        <Box key={key} display="flex" gap={4} alignItems={'center'}>
          <Typography variant="body1">{key}</Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography>{showSecret[key] ? parsedData[key] : '••••••••'}</Typography>
            <IconButton
              size="small"
              onClick={() => handleToggleVisibility(key)}
              style={{ padding: '4px' }}
            >
              {showSecret[key] ? (
                <CustomTooltip title="Hide">
                  <div>
                    <VisibilityOffIcon />
                  </div>
                </CustomTooltip>
              ) : (
                <CustomTooltip title="Show">
                  <div>
                    <VisibilityIcon />
                  </div>
                </CustomTooltip>
              )}
            </IconButton>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export const CollapsibleSectionFormatter: React.FC<CollapsibleSectionProps> = ({
  title,
  children,
  showAll = true,
  numberText,
  level = 0
}) => {
  const margin = level * 16;
  const [openSection, setOpenSection] = React.useState(false);
  const toggleOpen = () => setOpenSection((prev) => !prev);
  if (!showAll) {
    return null;
  }
  return (
    <CollapsibleSectionContainer style={{ marginLeft: margin }}>
      <CollapsibleSectionTitle openSection={openSection} onClick={toggleOpen}>
        <StyledTitle variant="body1">{title}</StyledTitle>
        <Box display={'flex'} gap={1} style={{ marginRight: margin }}>
          <StyledTitle
            variant="body2"
            style={{
              width: 'max-content'
            }}
          >
            {numberText && `(${numberText})`}
          </StyledTitle>
          <IconButton style={{ padding: '0rem' }}>
            <ExpandArrow expanded={openSection} />
          </IconButton>
        </Box>
      </CollapsibleSectionTitle>
      <Collapse in={openSection} timeout="auto" unmountOnExit>
        <CollapsibleSectionContent>{children}</CollapsibleSectionContent>
      </Collapse>
    </CollapsibleSectionContainer>
  );
};

export const NumberState: React.FC<NumberStateProps> = ({ title, value, quantity }) => {
  return (
    <NumberStateContainer>
      {title && <NumberStateTitle variant="body1">{title}</NumberStateTitle>}
      <NumberStateValueContainer>
        <NumberStateValue variant="h2" fontWeight="1000" gutterBottom>
          <b>{value}</b>{' '}
        </NumberStateValue>
        <NumberStateQuantity variant="subtitle2" component="div">
          {quantity}
        </NumberStateQuantity>
      </NumberStateValueContainer>
    </NumberStateContainer>
  );
};
