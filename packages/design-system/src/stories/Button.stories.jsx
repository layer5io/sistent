import { Button } from '@layer5/sistent-components';

export default {
  title: 'Example/Button',
  component: Button,
  tags: ['autodocs'],
};

export const Primary = {
  args: {
    variant: "contained",
    label: "contained"
  }
};

export const Secondary = {
  args: {
    variant: "outlined",
    label: 'outlined'
  }
};

export const Large = {
  args: {
    variant: "text",
    size: 'large',
    label: 'large text'
  }
};

export const Small = {
  args: {
    variant: "contained",
    size: 'small',
    label: 'small primary'
  }
};
