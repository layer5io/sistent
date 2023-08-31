import { Select, Box, MenuItem } from '@layer5/sistent-components/src';
import React from 'react';

export default {
  title: 'Example/Select',
  component: Select,
  tags: ['autodocs']
};

export function Basic() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={age}
        label="Age"
        onChange={handleChange}>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </Box>
  );
}
