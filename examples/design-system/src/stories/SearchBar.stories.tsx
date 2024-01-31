import type { Meta } from '@storybook/react';

import { StyledSearchBar } from '@layer5/sistent-components';

const meta = {
  title: 'Example/CustomSearchBar',
  component: StyledSearchBar,
  tags: ['autodocs']
} satisfies Meta<typeof StyledSearchBar>;

export default meta;
// type Story = StoryObj<typeof meta>;

export function SearchBar() {
  return <StyledSearchBar label={'Search '} />;
}
