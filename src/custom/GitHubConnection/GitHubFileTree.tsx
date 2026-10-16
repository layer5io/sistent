import React from 'react';
import { Checkbox, CircularProgress, IconButton, Tooltip, Typography } from '../../base';
import {
  ArticleIcon,
  CheckCircleOutlineIcon,
  ChevronRightIcon,
  ErrorOutlineIcon,
  FolderRoundedIcon
} from '../../icons';
import { useLoadMore } from './loadMore';
import {
  FileTreeEmpty,
  FileTreeList,
  FileTreeRow,
  FileTreeScroller,
  FileTreeStatus,
  VisuallyHidden,
  VisuallyHiddenInput
} from './style';

/** One file or directory of a scanned repository. */
export interface GitHubFileTreeNode {
  /** Stable identifier; the selection is a list of these. */
  id: string;
  /** File or directory name. Supported-extension matching runs against it. */
  label: string;
  type: 'file' | 'dir';
  children?: readonly GitHubFileTreeNode[] | null;
  /**
   * Outcome of an earlier import of this file, shown as a mark after its name
   * (Cloud's `importedDesigns` / `errorsInImport` context).
   */
  status?: 'imported' | 'error';
  /** Explains `status`, e.g. the import error. Shown in a tooltip and to screen readers. */
  statusMessage?: string;
}

export interface GitHubFileTreeProps {
  items: readonly GitHubFileTreeNode[];
  /** Ids of the selected files. Controlled: the host owns the selection. */
  selected: readonly string[];
  onSelectionChange: (selected: string[]) => void;
  /**
   * Show only files with these extensions (".yaml", ".tar.gz"), and only the
   * directories that contain one. Omit or pass `null` to show every file
   * (Cloud's "Show all file types").
   */
  supportedExtensions?: readonly string[] | null;
  /**
   * Pick exactly one file and no directory (Cloud's snapshot design picker,
   * and the file step of a remap). Files are drawn without controls: the
   * chosen row is tinted, as on `GitHubRepositoryPicker singleSelect`.
   * Picking another file replaces the choice; picking the chosen file again
   * clears it. Up and Down arrows move between files.
   */
  singleSelect?: boolean;
  /** Directories expanded on first render. */
  defaultExpanded?: readonly string[];
  /** A page of the scan is being fetched. */
  loading?: boolean;
  /**
   * More pages exist. `onLoadMore` is called when the tree is scrolled to its
   * end, or when it does not fill `maxHeight`, e.g. a page the filter emptied.
   */
  hasMore?: boolean;
  /** Fetch the next page. Not called while `loading` or once `hasMore` is false. */
  onLoadMore?: () => void;
  /** Overrides the message shown when there is no file to pick. */
  emptyMessage?: React.ReactNode;
  /** Height at which the tree scrolls. Defaults to Cloud's 18.75rem. */
  maxHeight?: number | string;
  /** Accessible name of the tree, e.g. the repository it lists. */
  'aria-label'?: string;
}

const hasSupportedExtension = (name: string, extensions: readonly string[]): boolean => {
  const lower = name.toLowerCase();
  return extensions.some((extension) => lower.endsWith(extension.toLowerCase()));
};

/** Drops files without a supported extension, then directories left with no file. */
const filterTree = (
  nodes: readonly GitHubFileTreeNode[],
  extensions: readonly string[] | null | undefined
): GitHubFileTreeNode[] => {
  if (!extensions || extensions.length === 0) return [...nodes];
  return nodes.flatMap((node) => {
    if (node.type === 'file') {
      return hasSupportedExtension(node.label, extensions) ? [node] : [];
    }
    const children = filterTree(node.children ?? [], extensions);
    return children.length > 0 ? [{ ...node, children }] : [];
  });
};

const descendantFileIds = (node: GitHubFileTreeNode): string[] =>
  node.type === 'file' ? [node.id] : (node.children ?? []).flatMap(descendantFileIds);

const STATUS_TEXT: Record<NonNullable<GitHubFileTreeNode['status']>, string> = {
  imported: 'Imported',
  error: 'Import failed'
};

/**
 * The design file picker of the "Import Designs" and snapshot steps, extracted
 * from Meshery Cloud's `components/general/file-explorer.tsx` (`FileExplorer`):
 * a folder tree with a checkbox per file, a directory checkbox that selects
 * every file under it, an imported / failed mark per file, an extension
 * filter, and paging as the tree is scrolled. `singleSelect` picks one file
 * from the same tree, without checkboxes.
 *
 * Purely presentational: the host scans the repository, pages the results in,
 * and owns the selection. The selection holds file ids only; a directory's
 * checkbox is derived from its files.
 */
export function GitHubFileTree({
  items,
  selected,
  onSelectionChange,
  supportedExtensions,
  singleSelect = false,
  defaultExpanded = [],
  loading = false,
  hasMore = false,
  onLoadMore,
  emptyMessage,
  maxHeight = '18.75rem',
  'aria-label': ariaLabel = 'Repository files'
}: GitHubFileTreeProps): JSX.Element {
  const instanceId = React.useId();
  const [expanded, setExpanded] = React.useState<ReadonlySet<string>>(
    () => new Set(defaultExpanded)
  );
  const visible = React.useMemo(
    () => filterTree(items, supportedExtensions),
    [items, supportedExtensions]
  );
  const selectedSet = React.useMemo(() => new Set(selected), [selected]);

  const toggleExpanded = (id: string) =>
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });

  const toggleFile = (id: string) => {
    if (singleSelect) {
      onSelectionChange(selectedSet.has(id) ? [] : [id]);
      return;
    }
    onSelectionChange(
      selectedSet.has(id) ? selected.filter((each) => each !== id) : [...selected, id]
    );
  };

  const toggleDirectory = (fileIds: string[], allSelected: boolean) => {
    if (allSelected) {
      const removed = new Set(fileIds);
      onSelectionChange(selected.filter((each) => !removed.has(each)));
      return;
    }
    onSelectionChange([...selected, ...fileIds.filter((each) => !selectedSet.has(each))]);
  };

  const paging = useLoadMore({ hasMore, loading, onLoadMore, contentKey: items.length });

  const renderStatus = (node: GitHubFileTreeNode) => {
    if (!node.status) return null;
    const text = node.statusMessage ?? STATUS_TEXT[node.status];
    const Icon = node.status === 'imported' ? CheckCircleOutlineIcon : ErrorOutlineIcon;
    return (
      <Tooltip title={text}>
        <FileTreeStatus status={node.status} data-testid="github-file-tree-status">
          <Icon width={16} height={16} fill="currentColor" aria-hidden />
          <VisuallyHidden>{`, ${text}`}</VisuallyHidden>
        </FileTreeStatus>
      </Tooltip>
    );
  };

  const renderNode = (node: GitHubFileTreeNode): React.ReactNode => {
    if (node.type === 'file' && singleSelect) {
      const checked = selectedSet.has(node.id);
      return (
        <li key={node.id}>
          <FileTreeRow
            component="label"
            selected={checked}
            data-testid={`github-file-tree-item-${node.id}`}
          >
            <VisuallyHiddenInput
              type="checkbox"
              className="choice"
              checked={checked}
              onChange={() => toggleFile(node.id)}
            />
            <span className="slot" aria-hidden />
            <ArticleIcon width={18} height={18} fill="currentColor" aria-hidden />
            <Typography variant="textB1Regular" component="span" className="label">
              {node.label}
            </Typography>
            {renderStatus(node)}
          </FileTreeRow>
        </li>
      );
    }

    if (node.type === 'file') {
      return (
        <li key={node.id}>
          <FileTreeRow component="label" data-testid={`github-file-tree-item-${node.id}`}>
            <Checkbox
              size="small"
              checked={selectedSet.has(node.id)}
              onChange={() => toggleFile(node.id)}
            />
            <ArticleIcon width={18} height={18} fill="currentColor" aria-hidden />
            <Typography variant="textB1Regular" component="span" className="label">
              {node.label}
            </Typography>
            {renderStatus(node)}
          </FileTreeRow>
        </li>
      );
    }

    const isExpanded = expanded.has(node.id);
    const fileIds = descendantFileIds(node);
    const selectedCount = fileIds.filter((id) => selectedSet.has(id)).length;
    const allSelected = fileIds.length > 0 && selectedCount === fileIds.length;
    const groupId = `github-file-tree-${instanceId}-group-${encodeURIComponent(node.id)}`;

    return (
      <li key={node.id}>
        <FileTreeRow data-testid={`github-file-tree-item-${node.id}`}>
          <IconButton
            size="small"
            aria-expanded={isExpanded}
            aria-controls={isExpanded ? groupId : undefined}
            aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${node.label}`}
            onClick={() => toggleExpanded(node.id)}
            className={isExpanded ? 'disclosure expanded' : 'disclosure'}
          >
            <ChevronRightIcon width={14} height={14} fill="currentColor" />
          </IconButton>
          {!singleSelect && (
            <Checkbox
              size="small"
              checked={allSelected}
              indeterminate={selectedCount > 0 && !allSelected}
              disabled={fileIds.length === 0}
              onChange={() => toggleDirectory(fileIds, allSelected)}
              slotProps={{ input: { 'aria-label': `Select every file in ${node.label}` } }}
            />
          )}
          <FolderRoundedIcon width={18} height={18} fill="currentColor" aria-hidden />
          <Typography
            variant="textB1Regular"
            component="span"
            className="label"
            sx={{ fontWeight: 600 }}
            onClick={() => toggleExpanded(node.id)}
          >
            {node.label}
          </Typography>
        </FileTreeRow>
        {isExpanded && (
          <FileTreeList id={groupId} nested>
            {(node.children ?? []).map(renderNode)}
          </FileTreeList>
        )}
      </li>
    );
  };

  const filteredOut = items.length > 0 && supportedExtensions && supportedExtensions.length > 0;
  const defaultEmpty = filteredOut
    ? `No files with ${supportedExtensions.join(', ')} found.`
    : 'No files found in this repository.';
  const isEmpty = visible.length === 0 && !loading && !hasMore;

  // Up and Down move between the files of a single choice, skipping folders.
  const moveBetweenChoices = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    const target = event.target as HTMLElement;
    if (!target.classList.contains('choice')) return;
    const choices = Array.from(
      event.currentTarget.querySelectorAll<HTMLInputElement>('input.choice')
    );
    const next =
      choices[choices.indexOf(target as HTMLInputElement) + (event.key === 'ArrowDown' ? 1 : -1)];
    event.preventDefault();
    next?.focus();
  };

  return (
    <FileTreeScroller
      ref={paging.ref}
      onScroll={paging.onScroll}
      sx={{ maxHeight }}
      data-testid="github-file-tree"
      aria-busy={loading || undefined}
      onKeyDown={singleSelect ? moveBetweenChoices : undefined}
    >
      {isEmpty ? (
        <FileTreeEmpty role="status">{emptyMessage ?? defaultEmpty}</FileTreeEmpty>
      ) : (
        <FileTreeList aria-label={ariaLabel}>{visible.map(renderNode)}</FileTreeList>
      )}
      {loading && (
        <FileTreeEmpty role="status" aria-label="Loading more files" sx={{ border: 0 }}>
          <CircularProgress color="inherit" size={20} aria-hidden />
        </FileTreeEmpty>
      )}
    </FileTreeScroller>
  );
}

export default GitHubFileTree;
