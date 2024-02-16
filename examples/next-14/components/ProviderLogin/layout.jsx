import { Paper } from '@layer5/sistent';
import React from 'react';

export default function ProviderLayout({ children }) {
  return (
    <React.Fragment>
      <Paper elevation={2} sx={{ padding: '170px 0px', minWidth: '90%', textAlign: 'center' }}>
        {children}
      </Paper>
    </React.Fragment>
  );
}
