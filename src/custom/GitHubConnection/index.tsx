// GitHub connection primitives, extracted from Meshery Cloud's connect wizard so
// Cloud and Kanvas render one experience. Mapping to the Cloud sources, the host
// contract, and the deliberate departures from Cloud:
// system/patterns/github-connection.md
export { GitHubConnectButton, type GitHubConnectButtonProps } from './GitHubConnectButton';
export {
  GitHubConnectionNotice,
  type GitHubConnectionNoticeKind,
  type GitHubConnectionNoticeProps
} from './GitHubConnectionNotice';
export {
  GitHubConnectionStatus,
  type GitHubConnectionStatusProps,
  type GitHubConnectionStatusValue
} from './GitHubConnectionStatus';
export {
  GitHubImportConnectWizard,
  type GitHubImportConnectWizardProps
} from './GitHubImportConnectWizard';
export { GitHubWizardInfo, type GitHubWizardInfoProps } from './GitHubWizardInfo';
export {
  GitHubWizardStep,
  type GitHubWizardAction,
  type GitHubWizardStepProps
} from './GitHubWizardStep';
export { GITHUB_IMPORT_CONNECT_WIZARD_STEPS, type GitHubWizardStepDefinition } from './steps';
