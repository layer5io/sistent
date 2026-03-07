/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useMemo } from 'react';
import { Box, Button } from '../../base';
import { iconXSmall } from '../../constants/iconsSizes';
import { LeaderBoardIcon, TropyIcon } from '../../icons';
import { useMediaQuery, useTheme } from '../../theme';
import { Carousel } from '../Carousel';
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
  RepoTitle,
  StatsValue,
  StyledCard,
  Title,
  TitleBox,
  UserNameText
} from './styles';

interface MetricConfig {
  label: string;
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
  countKey: string;
  count: number;
  patternName: string;
  pattern: Pattern;
  userName: string;
  status: string;
  id: string;
  onCardClick: (pattern: Pattern) => void;
  onIconClick: (sortOrder: string) => void;
  onOpenLeaderboard?: () => void;
}

interface PerformersSectionProps {
  useGetCatalogFilters: (params: any) => any;
  onCardClick: (pattern: Pattern) => void;
  onIconClick: (sortOrder: string) => void;
  onOpenLeaderboard?: () => void;
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
    id: 'open',
    countKey: 'view_count'
  },
  clone: {
    label: 'Most Clones',
    id: 'clone',
    countKey: 'clone_count'
  },
  download: {
    label: 'Most Downloads',
    id: 'download',
    countKey: 'download_count'
  },
  deployment: {
    label: 'Most Deploys',
    id: 'deployments',
    countKey: 'deployment_count'
  },
  share: {
    label: 'Most Shares',
    id: 'share',
    countKey: 'share_count'
  }
};

const createQueryParams = (metric: MetricType): BaseQueryParams => ({
  ...BASE_QUERY_PARAMS,
  order: `${METRICS[metric].countKey} desc`
});

const StatCardComponent: React.FC<StatCardProps> = ({
  label,
  countKey,
  count,
  patternName,
  pattern,
  userName,
  status,
  id,
  onCardClick,
  onIconClick
}) => {
  const handleCardClick = () => {
    onCardClick(pattern);
  };

  const handleIconClick = (e: React.MouseEvent, sortOrder: string) => {
    e.stopPropagation();
    onIconClick(sortOrder);
  };

  const theme = useTheme();

  return (
    <StyledCard elevation={0} status={status} onClick={handleCardClick}>
      <ContentWrapper cardId={id}>
        <HeaderSection>
          <HeaderTitle>{label}</HeaderTitle>
          <IconContainer onClick={(e) => handleIconClick(e, `${countKey}+desc`)}>
            <LeaderBoardIcon {...iconXSmall} fill={theme.palette.common.black} />
          </IconContainer>
        </HeaderSection>

        <StatsValue>{count}</StatsValue>

        <Box>
          <RepoTitle>{patternName}</RepoTitle>
          <UserNameText>by {userName}</UserNameText>
        </Box>
      </ContentWrapper>
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

export const withDefaultPageArgs = (args: PageArgs = {}): PageArgs => ({
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
    countKey: config.countKey,
    count: pattern[config.countKey],
    patternName: pattern.name || 'Unknown',
    pattern: pattern,
    userName: pattern.user?.first_name || 'Unknown',
    id: config.id,
    status: pattern?.catalog_data?.content_class
  };
};

const PerformersSection: React.FC<PerformersSectionProps> = ({
  useGetCatalogFilters,
  onCardClick,
  onIconClick,
  onOpenLeaderboard
}) => {
  const theme = useTheme();
  const { queries, isLoading, hasError } = useMetricQueries(useGetCatalogFilters);
  const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const stats = useMemo(
    () =>
      (Object.keys(METRICS) as MetricType[])
        .map((metric) => processQueryData(queries, metric))
        .filter((stat): stat is Omit<StatCardProps, 'onCardClick' | 'onIconClick'> =>
          Boolean(stat)
        ),
    [queries]
  );

  if (hasError)
    return (
      <MainContainer>
        <ErrorContainer>Error loading statistics. Please try again later.</ErrorContainer>
      </MainContainer>
    );

  const statComponents = stats.map((stat, index) => (
    <StatCard
      key={`${stat.id}-${index}`}
      {...stat}
      onCardClick={onCardClick}
      onIconClick={onIconClick}
    />
  ));

  return (
    <ErrorBoundary>
      <MainContainer>
        <TitleBox>
          <Box display={'flex'} alignItems="center" gap={1}>
            <Title>Top Performers</Title>
            <TropyIcon
              style={{
                height: '2rem',
                width: '2rem',
                color: theme.palette.icon.secondary,
                display: smallScreen ? 'none' : 'inline-flex'
              }}
            />
          </Box>
          {onOpenLeaderboard && (
            <div>
              <Button variant="contained" size="large" onClick={() => onOpenLeaderboard()}>
                <TropyIcon
                  style={{
                    height: '2rem',
                    width: '2rem',
                    display: smallScreen ? 'inline-flex' : 'none'
                  }}
                />
                <p
                  style={{
                    margin: 0,
                    display: smallScreen ? 'none' : 'inline-flex'
                  }}
                >
                  Open Leaderboard
                </p>
              </Button>
            </div>
          )}
        </TitleBox>
        <CardsContainer>
          {isLoading && <StateCardSekeleton />}
          <Carousel items={statComponents} />
        </CardsContainer>
      </MainContainer>
    </ErrorBoundary>
  );
};

export default memo(PerformersSection);
