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
  GitHubFileTree,
  type GitHubFileTreeNode,
  type GitHubFileTreeProps
} from './GitHubFileTree';
export {
  GitHubFinishSummary,
  type GitHubFailedImport,
  type GitHubFinishRepository,
  type GitHubFinishSummaryProps,
  type GitHubFinishWorkflow,
  type GitHubImportedDesign
} from './GitHubFinishSummary';
export {
  GitHubImportConnectWizard,
  type GitHubImportConnectWizardProps
} from './GitHubImportConnectWizard';
export { GitHubRefPicker, type GitHubRefPickerProps } from './GitHubRefPicker';
export { GitHubRepositoryPicker, type GitHubRepositoryPickerProps } from './GitHubRepositoryPicker';
export {
  GitHubRepositorySection,
  type GitHubRepositoryCounts,
  type GitHubRepositorySectionProps
} from './GitHubRepositorySection';
export { GitHubWizardInfo, type GitHubWizardInfoProps } from './GitHubWizardInfo';
export {
  GitHubWizardStep,
  type GitHubWizardAction,
  type GitHubWizardStepProps
} from './GitHubWizardStep';
export { GITHUB_IMPORT_CONNECT_WIZARD_STEPS, type GitHubWizardStepDefinition } from './steps';
