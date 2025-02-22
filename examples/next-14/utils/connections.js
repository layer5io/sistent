import { promisifiedDataFetch } from './dataFetch';

export const getConnectionStatusSummary = async () => {
  return await promisifiedDataFetch('/api/integrations/connections/status');
};
