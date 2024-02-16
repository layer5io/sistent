import { api } from "../config";

const providerApi = api.injectEndpoints({
    endpoints: (builder) => ({
      fetchProviders: builder.query({
        query: () => 'providers',
      }),
    }),
  });
  
  export const { useFetchProvidersQuery, useLazyFetchProvidersQuery } = providerApi;
  
  export default providerApi;
  