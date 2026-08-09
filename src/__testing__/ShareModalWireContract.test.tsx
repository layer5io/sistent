import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import ShareModal from '../custom/ShareModal/ShareModal';
import { SistentThemeProvider } from '../theme';

// `ShareModal` reaches `react-markdown` (via `CustomTooltip` and the modal's
// help text), which with its `remark`/`rehype` plugins publishes ESM-only
// sources that jest's `transformIgnorePatterns` does not pass through the
// transformer. None of them participate in the wire contract under test, so
// they are stubbed rather than dragged into the transform allowlist.
jest.mock('react-markdown', () => ({
  __esModule: true,
  default: ({ children }: { children?: React.ReactNode }) => <>{children}</>
}));
jest.mock('remark-gfm', () => ({ __esModule: true, default: () => undefined }));
jest.mock('rehype-raw', () => ({ __esModule: true, default: () => undefined }));

// End-to-end guard for the body `ShareModal` actually puts on the wire.
//
// `src/__testing__/resourceAccessPayload.test.ts` pins the builders in
// isolation; this pins the *component*, because the builders being right does
// not stop `ShareModal` from hand-rolling a body of its own - which is exactly
// how the April 2026 drift happened. The flow exercised here is the one a user
// performs: open the modal, search for a person, press Share (and, for revoke,
// press the remove-access button next to someone in the access list), then
// inspect what reached the host-supplied `resourceAccessMutator`.
//
// The server (meshery-cloud `HandleResourceShare` ->
// `models.ResourceAccessMappingPayload`) decodes with a strict `json.Unmarshal`
// into a struct whose fields all carry `omitempty`: unknown keys are dropped
// and the handler still answers 200. A stale key name is therefore a share
// that reports success and grants nothing, which no type on either side of the
// `any`-typed mutator can observe.

const owner = {
  id: 'b6e6d123-0000-4000-8000-0000000000aa',
  firstName: 'Olive',
  lastName: 'Owner',
  email: 'olive@example.com'
};

const jane = {
  id: 'b6e6d123-0000-4000-8000-000000000001',
  username: 'jdoe',
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane@example.com'
};

const selectedResource = {
  id: 'd0c5f1a2-0000-4000-8000-00000000beef',
  name: 'My Design',
  visibility: 'private'
};

type ShareModalProps = React.ComponentProps<typeof ShareModal>;

const renderShareModal = (overrides: Partial<ShareModalProps> = {}) => {
  const resourceAccessMutator = jest.fn().mockResolvedValue({});
  const props = {
    handleShareModalClose: jest.fn(),
    selectedResource,
    dataName: 'design',
    ownerData: owner,
    currentUser: owner,
    // Only the owner has access by default: the people-picker deliberately
    // does not resurface someone who is already on the access list, so a
    // grant flow needs the invitee absent from it.
    fetchAccessActors: jest.fn().mockResolvedValue([owner]),
    handleUpdateVisibility: jest.fn().mockResolvedValue({ error: '' }),
    handleShareWithNewUsers: jest.fn().mockResolvedValue({ error: '' }),
    canShareWithNewUsers: true,
    handleRevokeAccess: jest.fn().mockResolvedValue({ error: '' }),
    canRevokeAccess: true,
    resourceAccessMutator,
    notify: jest.fn(),
    useGetAllUsersQuery: (_args: unknown, options?: { skip?: boolean }) => ({
      data: options?.skip ? undefined : { data: [jane] },
      isLoading: false
    }),
    shareableLink: 'https://cloud.layer5.io/design/my-design',
    mesheryURL: 'https://cloud.layer5.io',
    ...overrides
  } as unknown as ShareModalProps;

  render(
    <SistentThemeProvider>
      <ShareModal {...props} />
    </SistentThemeProvider>
  );

  return { props, resourceAccessMutator };
};

/** The single argument the host mutator was called with, as it would be sent. */
const sentRequest = (mutator: jest.Mock) => mutator.mock.calls[0][0];

describe('ShareModal resource-access wire contract', () => {
  it('posts the canonical grantAccess body when a person is shared with', async () => {
    const { resourceAccessMutator } = renderShareModal();

    const input = screen.getByPlaceholderText('Add Users') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'jane' } });
    await waitFor(() => expect(screen.queryByText('Jane Doe')).not.toBeNull(), { timeout: 2000 });
    fireEvent.click(screen.getByText('Jane Doe'));
    fireEvent.click(screen.getByRole('button', { name: 'Share' }));

    await waitFor(() => expect(resourceAccessMutator).toHaveBeenCalledTimes(1));

    expect(sentRequest(resourceAccessMutator)).toEqual({
      // `design` is the UI name; the resource type on the wire is `pattern`.
      resourceType: 'pattern',
      resourceId: selectedResource.id,
      resourceAccessMappingPayload: {
        grantAccess: [{ actorId: jane.id, actorType: 'user' }],
        revokeAccess: [],
        notifyUsers: true
      }
    });
  });

  it('posts the canonical revokeAccess body when access is removed', async () => {
    const { resourceAccessMutator } = renderShareModal({
      fetchAccessActors: jest.fn().mockResolvedValue([owner, jane])
    } as Partial<ShareModalProps>);

    // The access list is fetched on mount; the owner row has no remove button.
    await waitFor(() => expect(screen.queryByText('jane@example.com')).not.toBeNull());
    fireEvent.click(screen.getByRole('button', { name: 'delete' }));

    await waitFor(() => expect(resourceAccessMutator).toHaveBeenCalledTimes(1));

    expect(sentRequest(resourceAccessMutator)).toEqual({
      resourceType: 'pattern',
      resourceId: selectedResource.id,
      resourceAccessMappingPayload: {
        grantAccess: [],
        revokeAccess: [{ actorId: jane.id, actorType: 'user' }],
        notifyUsers: true
      }
    });
  });

  it('never emits a retired snake_case key anywhere in the body', async () => {
    const { resourceAccessMutator } = renderShareModal();

    const input = screen.getByPlaceholderText('Add Users') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'jane' } });
    await waitFor(() => expect(screen.queryByText('Jane Doe')).not.toBeNull(), { timeout: 2000 });
    fireEvent.click(screen.getByText('Jane Doe'));
    fireEvent.click(screen.getByRole('button', { name: 'Share' }));

    await waitFor(() => expect(resourceAccessMutator).toHaveBeenCalledTimes(1));

    const body = JSON.stringify(sentRequest(resourceAccessMutator).resourceAccessMappingPayload);
    for (const retired of [
      'grant_access',
      'revoke_access',
      'notify_users',
      'actor_id',
      'actor_type'
    ]) {
      expect(body).not.toContain(retired);
    }
  });

  it('reports an error instead of posting when a record has no identifier', async () => {
    // An `actorId: ''` fails the handler's `json.Unmarshal` (gofrs
    // `uuid.UUID` rejects a zero-length string) and 400s the whole batch.
    const ghost = { username: 'ghost', email: 'ghost@example.com' };
    const { props, resourceAccessMutator } = renderShareModal({
      useGetAllUsersQuery: (_args: unknown, options?: { skip?: boolean }) => ({
        data: options?.skip ? undefined : { data: [ghost] },
        isLoading: false
      })
    } as Partial<ShareModalProps>);

    const input = screen.getByPlaceholderText('Add Users') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'ghost' } });
    await waitFor(() => expect(screen.queryByText('ghost@example.com')).not.toBeNull(), {
      timeout: 2000
    });
    fireEvent.click(screen.getByText('ghost@example.com'));
    fireEvent.click(screen.getByRole('button', { name: 'Share' }));

    await waitFor(() =>
      expect(props.notify).toHaveBeenCalledWith(expect.objectContaining({ event_type: 'error' }))
    );
    expect(resourceAccessMutator).not.toHaveBeenCalled();
  });
});
