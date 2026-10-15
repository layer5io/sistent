import { Autocomplete } from '@mui/material';
import React from 'react';
import { Box, CircularProgress, Paper, TextField } from '../../base';
import { useLoadMore } from './loadMore';
import { CountBadge, VisuallyHidden } from './style';

export interface GitHubRefPickerProps {
  /** Branch names, in display order. */
  branches: readonly string[];
  /** The repository's default branch: listed first and marked "default". */
  defaultBranch?: string;
  /**
   * The selected ref. Controlled: the host owns the selection. `''` means the
   * repository's default branch.
   */
  value: string;
  /**
   * Receives the new ref, trimmed. Picking or typing the default branch, or
   * clearing the field, reports `''`, so the default branch has one value.
   */
  onChange: (ref: string) => void;
  /**
   * Accept a ref that is not in `branches`, typed as free text: a tag, a
   * commit, or a branch on a page not fetched yet. The host resolves it.
   */
  allowCustomRef?: boolean;
  /** A page of branches is being fetched. */
  loading?: boolean;
  /**
   * More pages exist. `onLoadMore` is called when the open list is scrolled to
   * its end, or when it opens without filling its height.
   */
  hasMore?: boolean;
  /** Fetch the next page. Not called while `loading` or once `hasMore` is false. */
  onLoadMore?: () => void;
  /** Field label. Defaults to "Branch", or "Branch or tag" with `allowCustomRef`. */
  label?: string;
  disabled?: boolean;
  /** Id of the input; the list box derives its id from it. Defaults to a generated id. */
  id?: string;
}

/** Matches `GitHubRepositoryPicker`: about five rows before the list scrolls. */
const LISTBOX_MAX_HEIGHT = 224;

/**
 * Paging state for the popup, which MUI renders. It travels by context rather
 * than as Autocomplete props so that a page request does not re-render the
 * Autocomplete; see `GitHubRefPicker`.
 */
const PagingContext = React.createContext({
  loading: false,
  loadingMore: false,
  hasMore: false,
  branchCount: 0,
  searchMore: () => undefined as void
});

/**
 * The popup's paper with a loading row under the list while a further page is
 * fetched. Outside the list box, so the row is never an option.
 */
const RefPickerPaper = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof Paper>>(
  function RefPickerPaper({ children, ...props }, ref) {
    const { loadingMore } = React.useContext(PagingContext);
    return (
      <Paper {...props} ref={ref}>
        {children}
        {loadingMore && (
          <Box
            role="status"
            aria-label="Loading more branches"
            sx={{ display: 'flex', justifyContent: 'center', py: 1 }}
          >
            <CircularProgress color="inherit" size={20} aria-hidden />
          </Box>
        )}
      </Paper>
    );
  }
);

const sameRefs = (a: readonly string[], b: readonly string[]): boolean =>
  a.length === b.length && a.every((ref, index) => ref === b[index]);

/**
 * Shown when typing matches no loaded branch. MUI renders no list box then, so
 * the list box's auto-fill cannot fire; while more pages exist this requests
 * them instead, as a short list of matches would.
 */
function NoMatchingBranch(): JSX.Element {
  const { loading, hasMore, branchCount, searchMore } = React.useContext(PagingContext);
  React.useEffect(searchMore, [searchMore, loading, hasMore, branchCount]);
  return <>{hasMore || loading ? 'Searching more branches...' : 'No matching branch'}</>;
}

/**
 * The ref (branch or tag) pick list of a source binding: Cloud's remap of a
 * design to a repository, ref, and file. A searchable list of the
 * repository's branches with the default branch first and marked, paged in as
 * the list is scrolled; `allowCustomRef` also takes a typed tag name.
 *
 * Purely presentational, like `GitHubRepositoryPicker`: the host fetches the
 * branch pages, owns the selection, and resolves a typed ref to a commit.
 */
export function GitHubRefPicker({
  branches,
  defaultBranch,
  value,
  onChange,
  allowCustomRef = false,
  loading = false,
  hasMore = false,
  onLoadMore,
  label,
  disabled = false,
  id
}: GitHubRefPickerProps): JSX.Element {
  const generatedId = React.useId();
  const fieldId = id ?? `github-ref-picker-${generatedId}`;
  const fieldLabel = label ?? (allowCustomRef ? 'Branch or tag' : 'Branch');

  // What the field shows: `''` stands for the default branch, by name when known.
  const shown = value === '' ? (defaultBranch ?? null) : value;
  // The default branch is selected but not known by name yet.
  const unnamedDefault = value === '' && !defaultBranch;

  // The default branch first, as GitHub lists it; a ref the host bound that
  // is not on a fetched page still has to be an option to be shown. The list
  // keeps its identity while its content does, so a host that passes a fresh
  // `branches` array on every render does not re-render the Autocomplete.
  const listed = defaultBranch ? [defaultBranch] : [];
  for (const ref of [...branches, ...(shown === null ? [] : [shown])]) {
    if (!listed.includes(ref)) listed.push(ref);
  }
  const stableOptions = React.useRef(listed);
  if (!sameRefs(stableOptions.current, listed)) stableOptions.current = listed;
  const options = stableOptions.current;

  const [inputValue, setInputValue] = React.useState(shown ?? '');

  // The handlers read the latest props through a ref, so they keep one
  // identity and a host re-render alone never re-renders the Autocomplete.
  const latest = React.useRef({ value, defaultBranch, onChange, allowCustomRef, inputValue });
  latest.current = { value, defaultBranch, onChange, allowCustomRef, inputValue };

  const commit = React.useCallback((next: string | null) => {
    const props = latest.current;
    const ref = (next ?? '').trim();
    const normalized = ref === props.defaultBranch ? '' : ref;
    if (normalized !== props.value) props.onChange(normalized);
  }, []);

  // Free text is committed on blur and Enter (`autoSelect`); an emptied field
  // means the default branch rather than a ref named "".
  const handleBlur = React.useCallback(() => {
    const props = latest.current;
    if (props.allowCustomRef && props.inputValue.trim() === '') {
      setInputValue(props.defaultBranch ?? '');
      commit('');
    }
  }, [commit]);

  const paging = useLoadMore({ hasMore, loading, onLoadMore, contentKey: branches.length });

  // Two MUI behaviours (still present in @mui/material 9.5) undo paging while
  // the list is open. On every render that follows a change of options, MUI
  // re-highlights the selected ref; and it scrolls a highlight it did not get
  // from the pointer back into view. So requesting a page, or one landing,
  // would throw the reader back to the selected branch.
  // - The Autocomplete re-renders only when what it shows changes (the memo
  //   below); paging state reaches the popup through `PagingContext`.
  // - The list box goes back to where the reader scrolled it after a page
  //   lands; this component's effects run after MUI's, which are its children's.
  const listboxRef = React.useRef<HTMLElement | null>(null);
  const readerScrollTop = React.useRef<number | null>(null);
  const pagingRef = paging.ref;
  const attachListbox = React.useCallback(
    (element: HTMLElement | null) => {
      listboxRef.current = element;
      // A list opened afresh starts from MUI's position, the selected ref.
      if (!element) readerScrollTop.current = null;
      pagingRef(element);
    },
    [pagingRef]
  );
  const pagingScroll = paging.onScroll;
  const handleListboxScroll = React.useCallback(
    (event: React.UIEvent<HTMLElement>) => {
      readerScrollTop.current = event.currentTarget.scrollTop;
      pagingScroll(event);
    },
    [pagingScroll]
  );
  React.useEffect(() => {
    const element = listboxRef.current;
    const top = readerScrollTop.current;
    if (element && top !== null && element.scrollTop !== top) element.scrollTop = top;
  }, [options]);

  // Like `useLoadMore`'s auto-fill: at most one request per page count, so a
  // failed page is not re-requested on its own.
  const pagingProps = React.useRef({ hasMore, loading, onLoadMore, branchCount: branches.length });
  pagingProps.current = { hasMore, loading, onLoadMore, branchCount: branches.length };
  const searchedFor = React.useRef<number | null>(null);
  const searchMore = React.useCallback(() => {
    const props = pagingProps.current;
    if (
      props.onLoadMore &&
      props.hasMore &&
      !props.loading &&
      searchedFor.current !== props.branchCount
    ) {
      searchedFor.current = props.branchCount;
      props.onLoadMore();
    }
  }, []);

  const firstPageLoading = loading && branches.length === 0;
  const pagingState = React.useMemo(
    () => ({
      loading,
      loadingMore: loading && branches.length > 0,
      hasMore,
      branchCount: branches.length,
      searchMore
    }),
    [loading, hasMore, branches.length, searchMore]
  );

  const field = React.useMemo(
    () => (
      // MUI's own Autocomplete: Sistent's base wrapper fixes `freeSolo` to false in its type.
      <Autocomplete<string, false, boolean, boolean>
        id={fieldId}
        data-testid="github-ref-picker"
        options={options}
        value={shown}
        onChange={(_event, next) => commit(next)}
        inputValue={inputValue}
        onInputChange={(_event, next) => setInputValue(next)}
        onBlur={handleBlur}
        freeSolo={allowCustomRef}
        autoSelect={allowCustomRef}
        // MUI drops the arrow for free text; keep it so the branch list stays discoverable.
        forcePopupIcon
        // Arrowing past the last loaded branch must wait for the next page, not wrap to the top.
        disableListWrap={hasMore}
        // Clearing the default branch would leave an empty field showing nothing.
        disableClearable={value === ''}
        disabled={disabled}
        // The first page: MUI's own "Loading..." while the list is still empty.
        loading={firstPageLoading}
        loadingText="Loading branches..."
        noOptionsText={<NoMatchingBranch />}
        fullWidth
        slots={{ paper: RefPickerPaper }}
        slotProps={{
          listbox: {
            ref: attachListbox,
            onScroll: handleListboxScroll,
            style: { maxHeight: LISTBOX_MAX_HEIGHT }
          }
        }}
        renderOption={({ key, ...optionProps }, option) => (
          <li key={key} {...optionProps} style={{ gap: 8, overflowWrap: 'anywhere' }}>
            {option}
            {option === defaultBranch && (
              <>
                <CountBadge tone="neutral" aria-hidden>
                  default
                </CountBadge>
                <VisuallyHidden>, default branch</VisuallyHidden>
              </>
            )}
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label={fieldLabel}
            placeholder={unnamedDefault ? 'Default branch' : undefined}
            // Keep "Default branch" visible before focus: an empty field is a choice here.
            slotProps={{
              ...params.slotProps,
              inputLabel: { ...params.slotProps?.inputLabel, shrink: unnamedDefault || undefined }
            }}
          />
        )}
      />
    ),
    [
      fieldId,
      options,
      shown,
      commit,
      inputValue,
      handleBlur,
      allowCustomRef,
      value,
      disabled,
      firstPageLoading,
      attachListbox,
      handleListboxScroll,
      defaultBranch,
      fieldLabel,
      unnamedDefault,
      hasMore
    ]
  );

  return <PagingContext.Provider value={pagingState}>{field}</PagingContext.Provider>;
}

export default GitHubRefPicker;
