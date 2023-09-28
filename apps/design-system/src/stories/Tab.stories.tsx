import { Box, Tab as MuiTab, Stack, Tabs, Typography } from '@layer5/sistent-components';
import type { Meta } from '@storybook/react';
import { SyntheticEvent, useState } from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
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

export const Tab = ({ textColor, disabled, ...rest }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
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
          aria-label={`tabs example`}
        >
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

const meta = {
  title: 'Example/Tab',
  component: Tab,
  tags: ['autodocs']
} satisfies Meta<typeof Tab>;

export default meta;
// type Story = StoryObj<typeof meta>;

export function BasicTab() {
  return (
    <Stack direction="row" spacing={1}>
      <Tab textColor={undefined} disabled={undefined} />
    </Stack>
  );
}

export function ColoredTab() {
  return (
    <Stack direction="row" spacing={1}>
      <Tab textColor="secondary" indicatorColor="secondary" disabled={undefined} />
    </Stack>
  );
}

export function DisabledTab() {
  return (
    <Stack direction="row" spacing={1}>
      <Tab disabled={true} textColor={undefined} />
    </Stack>
  );
}

export function verticalTab() {
  return (
    <Stack direction="row" spacing={1}>
      <Tab orientation="vertical" textColor={undefined} disabled={undefined} />
    </Stack>
  );
}
