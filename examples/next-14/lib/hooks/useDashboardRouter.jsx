import { useRouter } from 'next/navigation';

export const useDashboardRouter = () => {
  const router = useRouter();
  const { query, push: pushRoute, route } = router;

  const resourceCategory = query && query.resourceCategory ? query.resourceCategory : 'Overview';
  const selectedResource = query && query.resource;

  const changeResourceTab = (resourceCategory) => {
    if (query.resourceCategory === resourceCategory) {
      return;
    }
    pushRoute(
      `${route}?resourceCategory=${resourceCategory || query.resourceCategory}`,
      undefined,
      { shallow: true },
    );
  };

  const handleChangeSelectedResource = (resource) => {
    if (query.resource === resource) {
      return;
    }
    pushRoute(`${route}?resourceCategory=${resourceCategory}&resource=${resource}`, undefined, {
      shallow: true,
    });
  };

  return { resourceCategory, changeResourceTab, selectedResource, handleChangeSelectedResource };
};

export default useDashboardRouter;
