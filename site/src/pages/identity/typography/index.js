import React from 'react';

import Navigation from '../Navigation';
import Layout from '../../../components/Layout';
import Heading from '../../../components/UI/PageHeading';
import PageHeader from '../../../components/UI/PageHeader';
import Paragraph from '../../../components/UI/Paragraph';

const Typography = () => {
  return (
    <Layout>
      <PageHeader>
        <Heading>Typography</Heading>
        <Paragraph>
          Most of the information that is present in a user interface for the purpose of passing
          information across is represented via typography. Correct typography structure and
          appropriate application is important in all interfaces.
        </Paragraph>
      </PageHeader>
      <Navigation type="typography" />
    </Layout>
  );
};

export default Typography;
