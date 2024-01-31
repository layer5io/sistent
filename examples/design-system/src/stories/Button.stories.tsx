import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@layer5/sistent-components';

const meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'contained',
    label: 'contained'
  }
};

export const Secondary: Story = {
  args: {
    variant: 'outlined',
    label: 'outlined'
  }
};

export const Large: Story = {
  args: {
    variant: 'text',
    size: 'large',
    label: 'large text'
  }
};

export const Small: Story = {
  args: {
    variant: 'contained',
    size: 'small',
    label: 'small primary'
  }
};
