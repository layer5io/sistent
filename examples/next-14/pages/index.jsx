import Dashboard from '@/components/Dashboard';
import Head from 'next/head';

function Index() {
  return (
    <div>
      <Head>
        <title>Dashboard | Meshery</title>
      </Head>
      <Dashboard />
    </div>
  );
}

export default Index;
