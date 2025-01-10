/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';
import moment from 'moment';
import { GetResourceCleanDataProps, NumberState } from './types';

export const useResourceCleanData = () => {
  const structureNumberStates = (parsedStatus: any, parsedSpec: any): NumberState[] => {
    const numberStates: NumberState[] = [];

    if (parsedSpec?.priority !== undefined) {
      numberStates.push({
        title: 'Priority',
        value: parsedSpec.priority,
        quantity: ''
      });
    }

    if (parsedSpec?.containers) {
      numberStates.push({
        title: 'Containers',
        value: parsedSpec.containers.length,
        quantity: 'total'
      });
    }

    if (parsedStatus?.containerStatuses) {
      const totalRestarts = parsedStatus.containerStatuses.reduce(
        (sum: number, container: { restartCount?: number }) => sum + (container.restartCount || 0),
        0
      );
      numberStates.push({
        title: 'Total Restarts',
        value: totalRestarts,
        quantity: 'times'
      });
    }

    return numberStates;
  };

  const getAge = (creationTimestamp?: string): string | undefined => {
    if (!creationTimestamp) return undefined;
    const creationTime = moment(creationTimestamp);
    const currentTime = moment();
    const ageInHours = currentTime.diff(creationTime, 'hours');
    return ageInHours >= 24 ? `${Math.floor(ageInHours / 24)} days` : `${ageInHours} hours`;
  };

  const getStatus = (attribute: any): string | false => {
    if (attribute?.phase) {
      return attribute.phase;
    }
    const readyCondition = attribute?.conditions?.find(
      (cond: { type: string }) => cond.type === 'Ready'
    );
    return readyCondition ? 'Ready' : false;
  };

  const joinwithEqual = (object: Record<string, string> | undefined): string[] => {
    if (!object) return [];
    return Object.entries(object).map(([key, value]) => {
      return `${key}=${value}`;
    });
  };

  const getResourceCleanData = ({
    resource,
    activeLabels,
    dispatchMsgToEditor,
    router,
    showStatus = true
  }: GetResourceCleanDataProps) => {
    const parsedStatus = resource?.status?.attribute && JSON.parse(resource?.status?.attribute);
    const parsedSpec = resource?.spec?.attribute && JSON.parse(resource?.spec.attribute);
    const numberStates = structureNumberStates(parsedStatus, parsedSpec);
    const kind = resource?.kind ?? resource?.component?.kind;
    const cleanData = {
      age: getAge(resource?.metadata?.creationTimestamp),
      kind: kind,
      status: showStatus && getStatus(parsedStatus),
      kubeletVersion: parsedStatus?.nodeInfo?.kubeletVersion,
      podIP: parsedStatus?.podIP,
      hostIP: parsedStatus?.hostIP,
      QoSClass: parsedStatus?.qosClass,
      size: parsedSpec?.resources?.requests?.storage,
      claim: parsedSpec?.claimRef?.name,
      claimNamespace: parsedSpec?.claimRef?.namespace,
      apiVersion: resource?.apiVersion,
      pods:
        parsedStatus?.replicas === undefined
          ? parsedStatus?.availableReplicas?.toString()
          : `${
              parsedStatus?.availableReplicas?.toString() ?? '0'
            } / ${parsedStatus?.replicas?.toString()}`,
      replicas:
        parsedStatus?.readyReplicas !== undefined &&
        parsedStatus?.replicas !== undefined &&
        `${parsedStatus?.readyReplicas} / ${parsedStatus?.replicas}`,
      strategyType: resource?.configuration?.spec?.strategy?.type,
      storageClass: parsedSpec?.storageClassName,
      secretType: resource?.type,
      serviceType: parsedSpec?.type,
      clusterIp: parsedSpec?.clusterIP,
      updateStrategy: parsedSpec?.updateStrategy?.type,
      externalIp: parsedSpec?.externalIPs,
      finalizers: parsedSpec?.finalizers,
      accessModes: parsedSpec?.accessModes,
      deeplinks: {
        links: [
          { nodeName: parsedSpec?.nodeName, label: 'Node' },
          { namespace: resource?.metadata?.namespace, label: 'Namespace' },
          {
            serviceAccount: parsedSpec?.serviceAccountName,
            label: 'ServiceAccount',
            resourceCategory: 'Security'
          }
        ],
        router: router,
        dispatchMsgToEditor: dispatchMsgToEditor
      },
      selector: parsedSpec?.selector?.matchLabels
        ? joinwithEqual(parsedSpec?.selector?.matchLabels)
        : joinwithEqual(parsedSpec?.selector),
      images: parsedSpec?.template?.spec?.containers?.map((container: { image?: string }) => {
        return container?.image;
      }),
      numberStates: numberStates,
      nodeSelector:
        joinwithEqual(parsedSpec?.nodeSelector) ||
        joinwithEqual(parsedSpec?.template?.spec?.nodeSelector),
      loadBalancer: parsedStatus?.loadBalancer?.ingress?.map((ingress: { ip?: string }) => {
        return ingress?.ip;
      }),
      rules: parsedSpec?.rules?.map((rule: { host?: string }) => {
        return rule?.host;
      }),
      usage: {
        allocatable: parsedStatus?.allocatable,
        capacity: parsedStatus?.capacity
      },
      configData: resource?.configuration?.data,
      capacity: parsedSpec?.capacity?.storage,
      totalCapacity: parsedStatus?.capacity,
      totalAllocatable: parsedStatus?.allocatable,
      conditions: {
        ...parsedStatus?.conditions?.map((condition: { type?: string }) => {
          return condition?.type;
        })
      },
      tolerations: parsedSpec?.tolerations,
      podVolumes: parsedSpec?.volumes,
      ingressRules: parsedSpec?.rules,
      connections: kind === 'Service' && _.omit(parsedSpec, ['selector', 'type']),
      labels: {
        data: resource?.metadata?.labels?.map((label) => {
          const value = label?.value !== undefined ? label?.value : '';
          return `${label?.key}=${value}`;
        }),
        dispatchMsgToEditor: dispatchMsgToEditor,
        activeViewFilters: activeLabels
      },
      annotations: resource?.metadata?.annotations?.map((annotation) => {
        const value = annotation?.value !== undefined ? annotation?.value : '';
        return `${annotation?.key}=${value}`;
      }),
      // secret: resource?.data, //TODO: show it when we have the role based access control for secrets
      initContainers: parsedSpec?.initContainers &&
        parsedStatus?.initContainerStatuses && {
          spec: parsedSpec?.initContainers,
          status: parsedStatus?.initContainerStatuses
        },
      containers: parsedSpec?.containers &&
        parsedStatus?.containerStatuses && {
          spec: parsedSpec?.containers,
          status: parsedStatus?.containerStatuses
        }
    };
    return cleanData;
  };

  return { getResourceCleanData, structureNumberStates, getAge, getStatus, joinwithEqual };
};
