import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// initialize an empty api service that we'll inject endpoints into later as needed
// the name should be same as the of the api in ../index.js
export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    endpoints: () => ({})
});
