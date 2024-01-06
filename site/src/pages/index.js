import React from 'react';
import Home from './home';
import Layout from '../components/Layout';

const IndexPage = () => {
  return (
    <Layout>
      <Home />
    </Layout>
  );
};

export default IndexPage;

export const Head = () => <title>Layer5 Design System</title>;
