import { BaseButton } from '@layer5/sistent-components/src';
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: 'Example/Button',
  component: BaseButton,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' }
  }
};

// More on writing stories with args: https://storybook.js.org/docs/react/
export function Primary() {
  return (
    <BaseButton variant="contained" color="primary">
      Hello
    </BaseButton>
  );
}

export function Secondary() {
  return (
    <BaseButton color="secondary" variant="contained">
      Hello
    </BaseButton>
  );
}

export function Large() {
  return (
    <BaseButton color="primary" variant="contained" size="large">
      Hello
    </BaseButton>
  );
}

export function Small() {
  return (
    <BaseButton color="primary" variant="contained" size="small">
      Hello
    </BaseButton>
  );
}
