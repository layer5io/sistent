import { CopyLinkIcon } from '../icons';

/**
 * Descriptor for a single entry in a `ResponsiveDataTable` row-action menu
 * (`Column.options.actionsList`).
 */
export type TableAction = {
  title: string;
  icon: JSX.Element;
  onClick: () => void;
  disabled?: boolean;
  customComponent?: JSX.Element;
  type?: string;
};

/**
 * Returns a pre-built {@link TableAction} that copies a deeplink for the given
 * row to the clipboard. Drop it into any `actionsList` to give users a
 * one-click "Copy link" entry in the row-action menu.
 *
 * @param onCopy - Invoked when the user clicks the action. The caller is
 *   responsible for constructing and writing the URL to the clipboard.
 * @param title - Menu label; defaults to `'Copy link'` and is overridable for
 *   internationalisation.
 */
export const getCopyDeepLinkAction = (onCopy: () => void, title = 'Copy link'): TableAction => ({
  title,
  icon: <CopyLinkIcon width={20} height={20} />,
  onClick: onCopy
});
