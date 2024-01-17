import React from 'react';
import Navigation from '../Navigation';
import Layout from '../../../components/Layout';
import Heading from '../../../components/UI/Heading';
import PageHeader from '../../../components/UI/PageHeader';
import Paragraph from '../../../components/UI/Paragraph';
import SectionNavigation from '../../../components/SectionNavigation';

const Color = () => {
  return (
    <Layout>
      <PageHeader>
        <Heading>Color</Heading>
        <Paragraph>
          Colors when accurately applied can be a potent tool that enables designers and developers
          to implement solutions with speed and efficiency. Here are a couple of things to keep in
          mind.
        </Paragraph>
      </PageHeader>
      <SectionNavigation navItems={COLOR_PAGE_SECTIONS} activeIndex={0} />
    </Layout>
  );
};

const COLOR_PAGE_SECTIONS = ['Overview', 'Guidance', 'Code'];

export default Color;
