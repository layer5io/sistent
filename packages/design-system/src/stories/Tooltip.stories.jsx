import { BaseButton, MesheryTooltip } from '@layer5/sistent-components';

export default {
  title: 'Example/Tooltip',
  component: MesheryTooltip,
  tags: ['autodocs']
};

export function NonInteractiveTooltip() {
  return (
    <MesheryTooltip title="Add" disableInteractive>
      <BaseButton>Not Interactive</BaseButton>
    </MesheryTooltip>
  );
}
