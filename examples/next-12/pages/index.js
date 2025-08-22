import ModeToggleButton from '../components/ModeToggleButton';
import { ResponsiveDataTable } from '@layer5/sistent-components';
import React from 'react';

export default function Home() {
  const columns = ['Name', 'Company', 'City', 'State'];

  const data = [
    ['Joe James', 'Test Corp', 'Yonkers', 'NY'],
    ['John Walsh', 'Test Corp', 'Hartford', 'CT'],
    ['Bob Herm', 'Test Corp', 'Tampa', 'FL'],
    ['James Houston', 'Test Corp', 'Dallas', 'TX']
  ];

  const options = {
    filterType: 'checkbox'
  };

  return (
    <React.Fragment>
      <ModeToggleButton />
      <ResponsiveDataTable
        title={'Employee List'}
        data={data}
        columns={columns}
        options={options}
      />
    </React.Fragment>
  );
}
