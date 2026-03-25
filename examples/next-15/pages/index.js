import ModeToggleButton from '../components/ModeToggleButton';
import dynamic from 'next/dynamic';
import React from 'react';

const ResponsiveDataTableClient = dynamic(
  () =>
    import('../components/ResponsiveDataTable/ResponsiveDataTable.jsx').then((m) => ({
      default: m.ResponsiveDataTable
    })),
  { ssr: false }
);

export default function Home() {
  const columns = [
    { name: 'name', label: 'Name' },
    { name: 'company', label: 'Company' },
    { name: 'city', label: 'City' },
    { name: 'state', label: 'State' }
  ];

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
      <ResponsiveDataTableClient
        title={'Employee List'}
        data={data}
        columns={columns}
        options={options}
      />
    </React.Fragment>
  );
}
