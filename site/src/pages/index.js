import React from 'react';
import Layout from '../components/Layout';
import Paragraph from '../components/UI/Paragraph';
import Heading from '../components/UI/Heading';
import PageHeader from '../components/UI/PageHeader';

const IndexPage = () => {
  return (
    <Layout>
      <PageHeader>
        <Heading>About Sistent</Heading>
        <Paragraph>This Page will info about Sistent</Paragraph>
      </PageHeader>
    </Layout>
  );
};

export default IndexPage;

export const Head = () => <title>Layer5 Design System</title>;
