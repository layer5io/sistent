import React from 'react';
import Layout from '../../components/Layout';
import PageHeader from '../../components/UI/PageHeader';
import Heading from '../../components/UI/Heading';
import Paragraph from '../../components/UI/Paragraph';

const Components = () => {
  return (
    <Layout>
      <PageHeader>
        <Heading>Components</Heading>
        <Paragraph>
          Components are reusable elements that serve as the building blocks of the design system.
          They are curated using the established identity principles and can be combined to form
          various elements, patterns, and templates that can be used to design user interfaces.
        </Paragraph>
      </PageHeader>
    </Layout>
  );
};

export default Components;
