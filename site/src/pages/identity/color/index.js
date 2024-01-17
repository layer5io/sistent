import React, { useState } from 'react';
import Layout from '../../../components/Layout';
import Heading from '../../../components/UI/PageHeading';
import PageHeader from '../../../components/UI/PageHeader';
import Paragraph from '../../../components/UI/Paragraph';
import SectionNavigation from '../../../components/SectionNavigation';
import Overview from '../../../components/identity/color/overview';
import Guidance from '../../../components/identity/color/guidance';
import Code from '../../../components/identity/color/code';

const Color = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
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
      <SectionNavigation
        navItems={COLOR_PAGE_SECTIONS}
        activeIndex={activeTabIndex}
        onItemClick={(i) => setActiveTabIndex(i)}
      />
      {activeTabIndex === 0 && <Overview />}
      {activeTabIndex === 1 && <Guidance />}
      {activeTabIndex === 2 && <Code />}
    </Layout>
  );
};

const COLOR_PAGE_SECTIONS = ['Overview', 'Guidance', 'Code'];

export default Color;
