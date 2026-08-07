import ShareModal from './ShareModal';

export { ShareModal };
export type { ResourceAccessArg, ShareModalProps } from './ShareModal';
export {
  ResourceAccessActorError,
  buildGrantAccessPayload,
  buildRevokeAccessPayload,
  toResourceAccessActors,
  type ResourceAccessActor,
  type ResourceAccessMappingPayload
} from './resourceAccessPayload';
