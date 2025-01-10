/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentType, ReactNode } from 'react';

export interface PrimaryDetailsProps {
  title: string;
  value: string;
  hide?: boolean;
}

export interface CopyToClipboardProps {
  data: string;
}

export interface CollapsibleSectionProps {
  title: string;
  children: ReactNode;
  showAll?: boolean;
  numberText?: string | number;
  level?: number;
}

export interface SectionHeadingProps {
  children: string;
}

export interface LongDetailsProps {
  title: string;
  value: string;
}

export interface NumberStateProps {
  title?: string;
  value: string | number;
  quantity: string;
}

export interface EnvironmentVariablesProps {
  title: string;
  value?: string;
  hide?: boolean;
}

export interface CategoryProps {
  title: string;
  hide?: boolean;
}

export interface NumberStateData {
  title: string;
  value: string | number;
  quantity: string;
}

export interface NumberStateFormatterProps {
  data: NumberStateData[];
}

export interface ActionIconButtonProps {
  title: string;
  Icon: ComponentType<{ fill: string; height?: number; width?: number }>;
  onClick: () => void;
}

export interface KeyValueProps {
  Key: string;
  Value: string | number | ReactNode;
  showFold?: boolean;
}

export interface EnvironmentFormatterProps {
  data?: {
    name: string;
    value?: string;
    valueFrom?: {
      [key: string]: {
        apiVersion: string;
        fieldPath: string;
      };
    };
  }[];
}

export interface CodeFormatterProps {
  data: any;
}

export interface PortsFormatterProps {
  data?: {
    name?: string;
    containerPort?: number;
    port?: number;
    protocol: string;
  }[];
}

export interface ArrayFormatterProps {
  data: any[];
}

export interface ListFormatterProps {
  data: string[];
}

export interface OperatorDynamicFormatterProps {
  data: any;
  level?: number;
}

export interface StatusFormatterProps {
  status: string;
  rightPosition?: string;
}

export interface LabelFormatterProps {
  data: string[];
  onClick: (labels: string[]) => void;
  selectedLabels: string[];
}

export interface MemoryUsageProps {
  allocatable?: {
    cpu: string;
    memory: string;
    'ephemeral-storage': string;
  };
  capacity?: {
    cpu: string;
    memory: string;
    'ephemeral-storage': string;
  };
  height?: number;
  width?: number;
}

export interface TableDataFormatterProps {
  title?: string;
  data?: any;
  showAll?: boolean;
  mainTableData?: any[][];
  mainTableCols?: any[];
}

export interface TextWithLinkFormatterProps {
  title: string;
  value: string;
  variant: 'row' | 'column';
  onClick: () => void;
}

export interface JSONViewFormatterProps {
  data: any;
}

export interface DetailSectionProps {
  title?: string;
  data: any;
  formatter: React.ComponentType<any>;
}

export interface ContainerFormatterProps {
  containerSpec: {
    ports?: any[];
    imagePullPolicy?: string;
    image?: string;
    env?: any[];
    volumeMounts?: {
      name: string;
      mountPath: string;
      readOnly?: boolean;
    }[];
    command?: any[];
    livenessProbe?: any;
    readinessProbe?: any;
    startupProbe?: any;
    args?: any[];
    resources?: {
      requests?: any;
      limits?: any;
    };
  };
  containerStatus: {
    state: {
      [key: string]: {
        startedAt?: string;
      };
    };
    restartCount: number;
    containerID: string;
  };
}

export interface SecretFormatterProps {
  data: string;
}

export interface NumberState {
  title: string;
  value: number | string;
  quantity: string;
}

export interface Resource {
  status?: {
    attribute?: string;
    containerStatuses?: Array<{ restartCount?: number }>;
    nodeInfo?: { kubeletVersion?: string };
    podIP?: string;
    hostIP?: string;
    qosClass?: string;
    replicas?: number;
    availableReplicas?: number;
    readyReplicas?: number;
    loadBalancer?: { ingress?: Array<{ ip?: string }> };
    allocatable?: Record<string, string>;
    capacity?: Record<string, string>;
    conditions?: Array<{ type?: string }>;
  };
  spec?: {
    attribute?: string;
    containers?: Array<{ image?: string }>;
    initContainers?: Array<{ name?: string }>;
    nodeSelector?: Record<string, string>;
    template?: {
      spec?: {
        containers?: Array<{ image?: string }>;
        nodeSelector?: Record<string, string>;
      };
    };
    resources?: { requests?: { storage?: string } };
    claimRef?: { name?: string; namespace?: string };
    storageClassName?: string;
    type?: string;
    clusterIP?: string;
    updateStrategy?: { type?: string };
    externalIPs?: string[];
    finalizers?: string[];
    accessModes?: string[];
    selector?: { matchLabels?: Record<string, string> };
    serviceAccountName?: string;
    tolerations?: unknown;
    volumes?: unknown;
    rules?: Array<{ host?: string }>;
  };
  metadata?: {
    creationTimestamp?: string;
    namespace?: string;
    labels?: Array<{ key?: string; value?: string }>;
    annotations?: Array<{ key?: string; value?: string }>;
  };
  kind?: string;
  component?: {
    kind?: string;
  };
  apiVersion?: string;
  configuration?: {
    spec?: { strategy?: { type?: string } };
    data?: unknown;
  };
  type?: string;
  data?: string;
}

export interface GetResourceCleanDataProps {
  resource: Resource;
  dispatchMsgToEditor?: (msg: any) => void;
  activeLabels?: string[];
  showStatus?: boolean;
  router?: any;
}
