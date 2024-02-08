import { promisifiedDataFetch } from '@/utils/dataFetch';

export async function loadActiveK8sContexts() {
  try {
    const res = await promisifiedDataFetch('/api/system/sync');
    if (res?.k8sConfig) {
      return res.k8sConfig;
    } else {
      throw new Error('No kubernetes configurations found');
    }
  } catch (e) {
    console.error('An error occurred while loading k8sconfig', e);
  }
}
