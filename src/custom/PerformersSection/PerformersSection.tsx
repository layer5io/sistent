/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useMemo } from 'react';
import {
  CloneIcon,
  DeploymentsIcon,
  DownloadIcon,
  OpenIcon,
  ShareIcon,
  TropyIcon
} from '../../icons';
import { useTheme } from '../../theme';
import { Pattern } from '../CustomCatalog/CustomCard';
import { ErrorBoundary } from '../ErrorBoundary';
import { StateCardSekeleton } from './PerformersToogleButton';
import {
  CardsContainer,
  ContentWrapper,
  ErrorContainer,
  HeaderSection,
  HeaderTitle,
  IconContainer,
  MainContainer,
  RepoSection,
  RepoTitle,
  StatsValue,
  StatusLabel,
  StyledCard,
  Title,
  UserNameText
} from './styles';

interface MetricConfig {
  label: string;
  icon: React.ComponentType<any>;
  id: string;
  countKey: keyof Pattern;
}

interface BaseQueryParams {
  pathType: string;
  page: number;
  pagesize: number;
  metrics: boolean;
  expandUser: boolean;
  trim: boolean;
  order?: string;
}

interface StatCardProps {
  label: string;
  count: number;
  patternName: string;
  pattern: Pattern;
  userName: string;
  userid: string;
  icon: React.ComponentType<any>;
  status: string;
  id: string;
  onCardClick: (pattern: Pattern) => void;
  onIconClick: () => void;
  onAuthorClick: (userId: string) => void;
  onStatusClick: (status: string) => void;
}

interface PerformersSectionProps {
  useGetCatalogFilters: (params: any) => any;
  onCardClick: (pattern: Pattern) => void;
  onIconClick: () => void;
  onAuthorClick: (userId: string) => void;
  onStatusClick: (status: string) => void;
}

type MetricType = 'view' | 'clone' | 'download' | 'deployment' | 'share';

const BASE_QUERY_PARAMS: BaseQueryParams = {
  pathType: 'pattern',
  page: 0,
  pagesize: 1,
  metrics: true,
  expandUser: true,
  trim: true
};

const METRICS: Record<MetricType, MetricConfig> = {
  view: {
    label: 'Most Opens',
    icon: OpenIcon,
    id: 'open-icon',
    countKey: 'view_count'
  },
  clone: {
    label: 'Most Clones',
    icon: CloneIcon,
    id: 'clone-icon',
    countKey: 'clone_count'
  },
  download: {
    label: 'Most Downloads',
    icon: DownloadIcon,
    id: 'download-icon',
    countKey: 'download_count'
  },
  deployment: {
    label: 'Most Deploys',
    icon: DeploymentsIcon,
    id: 'deployments-icon',
    countKey: 'deployment_count'
  },
  share: {
    label: 'Most Shares',
    icon: ShareIcon,
    id: 'share-icon',
    countKey: 'share_count'
  }
};

const createQueryParams = (metric: MetricType): BaseQueryParams => ({
  ...BASE_QUERY_PARAMS,
  order: `${METRICS[metric].countKey} desc`
});

const StatCardComponent: React.FC<StatCardProps> = ({
  label,
  count,
  patternName,
  pattern,
  userName,
  userid,
  icon: Icon,
  status,
  id,
  onCardClick,
  onIconClick,
  onAuthorClick,
  onStatusClick
}) => {
  const handleCardClick = () => {
    onCardClick(pattern);
  };

  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onIconClick();
  };

  const handleAuthorClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAuthorClick(userid);
  };

  const handleStatusClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onStatusClick(status);
  };

  return (
    <StyledCard elevation={0} status={status} onClick={handleCardClick}>
      <ContentWrapper cardId={id}>
        <HeaderSection>
          <HeaderTitle>{label}</HeaderTitle>
          <IconContainer onClick={handleIconClick}>
            <Icon className={id} />
          </IconContainer>
        </HeaderSection>

        <StatsValue>{count}</StatsValue>

        <RepoSection>
          <RepoTitle>{patternName}</RepoTitle>
          <UserNameText onClick={handleAuthorClick}>by {userName}</UserNameText>
        </RepoSection>
      </ContentWrapper>
      <StatusLabel labelType={status} onClick={handleStatusClick}>
        {status}
      </StatusLabel>
    </StyledCard>
  );
};
interface PageArgs {
  search?: string;
  order?: string;
  pagesize?: number;
  page?: number;
  [key: string]: any;
}

const withDefaultPageArgs = (args: PageArgs = {}): PageArgs => ({
  search: args.search ?? '',
  order: args.order ?? '',
  pagesize: args.pagesize ?? 0,
  page: args.page ?? 0,
  ...args
});

const StatCard = memo(StatCardComponent);
StatCard.displayName = 'StatCard';

const useMetricQueries = (useGetCatalogFilters: PerformersSectionProps['useGetCatalogFilters']) => {
  const viewQuery = useGetCatalogFilters(withDefaultPageArgs(createQueryParams('view')));

  const cloneQuery = useGetCatalogFilters(withDefaultPageArgs(createQueryParams('clone')));

  const downloadQuery = useGetCatalogFilters(withDefaultPageArgs(createQueryParams('download')));

  const deploymentQuery = useGetCatalogFilters(
    withDefaultPageArgs(createQueryParams('deployment'))
  );

  const shareQuery = useGetCatalogFilters(withDefaultPageArgs(createQueryParams('share')));

  const metricQueries = {
    view: viewQuery,
    clone: cloneQuery,
    download: downloadQuery,
    deployment: deploymentQuery,
    share: shareQuery
  };

  return {
    queries: metricQueries,
    isLoading: Object.values(metricQueries).some((query) => query.isLoading),
    hasError: Object.values(metricQueries).some((query) => query.isError)
  };
};

const processQueryData = (
  queries: Record<MetricType, any>,
  metric: MetricType
): Omit<
  StatCardProps,
  'onCardClick' | 'onIconClick' | 'onAuthorClick' | 'onStatusClick'
> | null => {
  const query = queries[metric];
  const config = METRICS[metric];
  const pattern = query?.isSuccess && query.data?.patterns?.[0];

  if (!pattern) return null;

  return {
    label: config.label,
    count: pattern[config.countKey],
    patternName: pattern.name || 'Unknown',
    pattern: pattern,
    userName: pattern.user?.first_name || 'Unknown',
    userid: pattern.user?.id,
    icon: config.icon,
    id: config.id,
    status: pattern?.catalog_data?.content_class
  };
};

const PerformersSection: React.FC<PerformersSectionProps> = ({
  useGetCatalogFilters,
  onCardClick,
  onIconClick,
  onAuthorClick,
  onStatusClick
}) => {
  const theme = useTheme();
  const { queries, isLoading, hasError } = useMetricQueries(useGetCatalogFilters);

  const stats = useMemo(
    () =>
      (Object.keys(METRICS) as MetricType[])
        .map((metric) => processQueryData(queries, metric))
        .filter(
          (
            stat
          ): stat is Omit<
            StatCardProps,
            'onCardClick' | 'onIconClick' | 'onAuthorClick' | 'onStatusClick'
          > => Boolean(stat)
        ),
    [queries]
  );

  if (hasError)
    return (
      <MainContainer>
        <ErrorContainer>Error loading statistics. Please try again later.</ErrorContainer>
      </MainContainer>
    );

  return (
    <ErrorBoundary>
      <MainContainer>
        <Title>
          Top Performers
          <TropyIcon
            style={{
              height: '2rem',
              width: '2rem',
              color: theme.palette.icon.secondary
            }}
          />
        </Title>
        <CardsContainer>
          {isLoading && <StateCardSekeleton />}
          {!isLoading &&
            stats.map((stat, index) => (
              <StatCard
                key={`${stat.id}-${index}`}
                {...stat}
                onCardClick={onCardClick}
                onIconClick={onIconClick}
                onAuthorClick={onAuthorClick}
                onStatusClick={onStatusClick}
              />
            ))}
        </CardsContainer>
      </MainContainer>
    </ErrorBoundary>
  );
};

export default memo(PerformersSection);
