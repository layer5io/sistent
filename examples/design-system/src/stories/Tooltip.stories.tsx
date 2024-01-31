import type { Meta } from '@storybook/react';

import { Button, StyledTooltip } from '@layer5/sistent-components';

const meta = {
  title: 'Example/Tooltip',
  component: StyledTooltip,
  tags: ['autodocs']
} satisfies Meta<typeof StyledTooltip>;

export default meta;
// type Story = StoryObj<typeof meta>;

export function NonInteractiveTooltip() {
  return (
    <StyledTooltip title="Add" disableInteractive>
      <Button>Not Interactive</Button>
    </StyledTooltip>
  );
}
