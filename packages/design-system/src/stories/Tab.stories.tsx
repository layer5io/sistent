import React, { useState } from 'react';
import { Box, Stack, Tab as MuiTab, Tabs, Typography } from '@layer5/sistent-components';

interface TabPanelProps {
  children?: React.ReactNode;
  value: number;
  index: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

interface TabProps {
  textColor?: 'inherit' | 'secondary' | 'primary';
  disabled?: boolean;
  indicatorColor?: 'secondary' | 'primary';
  orientation?: 'horizontal' | 'vertical';
}

export const Tab: React.FC<TabProps> = ({ textColor, disabled, ...rest }) => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent<Element, Event>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor={textColor}
          {...rest}
          aria-label={`tabs example`}>
          <MuiTab label="Item One" {...a11yProps(0)} />
          <MuiTab label="Item Two" {...a11yProps(1)} disabled={disabled} />
          <MuiTab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
};

export default {
  title: 'Example/Tab',
  component: Tab,
  tags: ['autodocs']
};

export function BasicTab() {
  return (
    <Stack direction="row" spacing={1}>
      <Tab />
    </Stack>
  );
}

export function ColoredTab() {
  return (
    <Stack direction="row" spacing={1}>
      <Tab textColor="secondary" indicatorColor="secondary" />
    </Stack>
  );
}

export function DisabledTab() {
  return (
    <Stack direction="row" spacing={1}>
      <Tab disabled={true} />
    </Stack>
  );
}

export function verticalTab() {
  return (
    <Stack direction="row" spacing={1}>
      <Tab orientation="vertical" />
    </Stack>
  );
}
