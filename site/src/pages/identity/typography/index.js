import React from 'react';

import Navigation from '../Navigation';
import Text from '../Text';
import Layout from '../../../components/Layout';

const Typography = () => {
  return (
    <Layout>
      <Text
        title="Typography"
        description="Most of the information that is present in a user interface for the purpose of passing information across is represented via typography. Correct structuring and appropriate application is important for all interfaces."
      />
      <Navigation type="typography" />
    </Layout>
  );
};

export default Typography;
