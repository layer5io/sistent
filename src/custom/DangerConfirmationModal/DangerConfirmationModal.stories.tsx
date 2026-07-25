import React, { useState } from 'react';
import { Typography } from '../../base';
import { SistentThemeProvider } from '../../theme';
import { DangerConfirmationModal } from './DangerConfirmationModal';

/**
 * Sistent does not yet ship a Storybook runner, so these stories are authored
 * in standard CSF3 (a default `meta` export plus named story exports) and can
 * be dropped into a Storybook once one is configured - swap the local `Story`
 * type for `StoryObj<typeof DangerConfirmationModal>` at that point. The same
 * three scenarios are exercised headlessly in
 * `src/__testing__/DangerConfirmationModal.test.tsx`.
 */
const meta = {
  title: 'Custom/DangerConfirmationModal',
  component: DangerConfirmationModal
};

export default meta;

type Story = { name?: string; render: () => React.ReactElement };

const TriggerButton = ({
  label,
  onClick
}: {
  label: string;
  onClick: () => void;
}): React.ReactElement => (
  <button type="button" onClick={onClick}>
    {label}
  </button>
);

/** (a) Simple checkbox-only confirmation. */
const CheckboxOnlyDemo = (): React.ReactElement => {
  const [open, setOpen] = useState(false);
  return (
    <SistentThemeProvider>
      <TriggerButton label="Delete workspace" onClick={() => setOpen(true)} />
      <DangerConfirmationModal
        open={open}
        title="Delete workspace"
        description={
          <>
            This permanently deletes the <b>Payments</b> workspace and everything inside it. This
            action cannot be undone.
          </>
        }
        checkboxes={[
          {
            id: 'acknowledge',
            label: 'I understand this action is permanent and cannot be undone.'
          }
        ]}
        confirmText="Delete workspace"
        onCancel={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
      />
    </SistentThemeProvider>
  );
};

/** (b) Type-to-confirm phrase gate plus a single acknowledgement checkbox. */
const TypeToConfirmWithCheckboxDemo = (): React.ReactElement => {
  const [open, setOpen] = useState(false);
  return (
    <SistentThemeProvider>
      <TriggerButton label="Delete organization" onClick={() => setOpen(true)} />
      <DangerConfirmationModal
        open={open}
        title="Delete organization"
        description={
          <>
            Deleting <b>Acme Corp</b> removes all of its workspaces, teams, and connections for
            every member.
          </>
        }
        confirmationPhrase="Acme Corp"
        checkboxes={[
          {
            id: 'acknowledge',
            label: 'I understand this will permanently delete the organization.'
          }
        ]}
        confirmText="Delete organization"
        onCancel={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
      />
    </SistentThemeProvider>
  );
};

/**
 * (c) Full destructive flow: type-to-confirm + primary destruction checkbox +
 * an extra shared-resource checkbox + a recommended-alternative callout.
 */
const FullDestructiveFlowDemo = (): React.ReactElement => {
  const [open, setOpen] = useState(false);
  return (
    <SistentThemeProvider>
      <TriggerButton label="Delete organization" onClick={() => setOpen(true)} />
      <DangerConfirmationModal
        open={open}
        title="Delete organization"
        description={
          <>
            Deleting <b>Acme Corp</b> permanently destroys all of its workspaces, teams, designs,
            and connections. This cannot be undone.
          </>
        }
        confirmationPhrase="Acme Corp"
        checkboxes={[
          {
            id: 'acknowledge',
            label: 'I understand this action is permanent and cannot be undone.'
          },
          {
            id: 'shared-resources',
            label:
              'I understand 12 resources shared with other organizations will be permanently destroyed.'
          }
        ]}
        recommendedAlternative={
          <Typography variant="body2" component="div">
            Prefer to keep this data? <b>Transfer ownership</b> to another member instead of
            deleting the organization.
          </Typography>
        }
        confirmText="Delete organization"
        onCancel={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
      />
    </SistentThemeProvider>
  );
};

export const CheckboxOnly: Story = {
  name: 'Checkbox only',
  render: () => <CheckboxOnlyDemo />
};

export const TypeToConfirmWithCheckbox: Story = {
  name: 'Type-to-confirm + checkbox',
  render: () => <TypeToConfirmWithCheckboxDemo />
};

export const FullDestructiveFlow: Story = {
  name: 'Type-to-confirm + shared-resource checkbox + recommended alternative',
  render: () => <FullDestructiveFlowDemo />
};
