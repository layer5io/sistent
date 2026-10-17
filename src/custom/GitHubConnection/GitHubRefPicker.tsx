import { Autocomplete } from '@mui/material';
import React from 'react';
import { Box, Button, CircularProgress, Paper, TextField } from '../../base';
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
  filter: '',
  allowCustomRef: false,
  request: (): void => undefined,
  requestIfArmed: (): void => undefined,
  setNoMatchShown: ((): void => undefined) as (shown: boolean) => void
});

const noMatchMessage = (loading: boolean, hasMore: boolean, allowCustomRef: boolean): string =>
  loading
    ? 'Searching more branches...'
    : allowCustomRef
      ? hasMore
        ? 'No loaded branch matches. Press Enter to use this ref.'
        : 'No matching branch. Press Enter to use this ref.'
      : hasMore
        ? 'No loaded branch matches. Press Enter to load more.'
        : 'No matching branch';

/**
 * The popup's paper with a loading row under the list while a further page is
 * fetched. Outside the list box, so the row is never an option.
 *
 * MUI shows no "no options" text for free text (`allowCustomRef`), so the
 * paper, kept mounted for it while the popup is open, shows the no-match state
 * itself when nothing else is in it.
 */
const RefPickerPaper = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof Paper>>(
  function RefPickerPaper({ children, ...props }, ref) {
    const { loadingMore } = React.useContext(PagingContext);
    const empty = React.Children.toArray(children).length === 0;
    return (
      <Paper {...props} ref={ref}>
        {children}
        {empty && (
          <Box
            role="presentation"
            onMouseDown={(event) => event.preventDefault()}
            sx={{ color: 'text.secondary', padding: '14px 16px' }}
          >
            <NoMatchingBranch />
          </Box>
        )}
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
 * one instead, once per typed filter, so a filter no branch will ever match (a
 * tag, a typo) does not fetch every page. Further pages come on request: the
 * button, or ArrowDown in the field, and Enter unless `allowCustomRef` makes
 * Enter use the typed ref (see `GitHubRefPicker`).
 */
function NoMatchingBranch(): JSX.Element {
  const {
    loading,
    hasMore,
    branchCount,
    filter,
    allowCustomRef,
    request,
    requestIfArmed,
    setNoMatchShown
  } = React.useContext(PagingContext);
  React.useLayoutEffect(() => {
    setNoMatchShown(true);
    return () => setNoMatchShown(false);
  }, [setNoMatchShown]);
  // Before paint, so the load-more action does not flash ahead of the request.
  React.useLayoutEffect(requestIfArmed, [requestIfArmed, loading, hasMore, branchCount, filter]);
  const canLoadMore = hasMore && !loading;
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
      <span>{noMatchMessage(loading, hasMore, allowCustomRef)}</span>
      {canLoadMore && (
        <Button
          size="small"
          // Keep focus in the field, so the popup stays open for the page.
          onMouseDown={(event) => event.preventDefault()}
          onClick={request}
        >
          Load more branches
        </Button>
      )}
    </Box>
  );
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

  // MUI lists every branch, unfiltered, until the reader types after opening.
  const [typed, setTyped] = React.useState(false);
  const filter = typed ? inputValue : '';
  const paging = useLoadMore({
    hasMore,
    loading,
    onLoadMore,
    contentKey: branches.length,
    filter
  });

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

  // Enter and ArrowDown have nothing to act on while no branch matches, so
  // they ask for the next page, keeping focus in the field; with
  // `allowCustomRef`, Enter uses the typed ref instead. Enter must not also
  // submit a surrounding form.
  const [noMatchShown, setNoMatchShown] = React.useState(false);
  const noMatchShownRef = React.useRef(noMatchShown);
  noMatchShownRef.current = noMatchShown;
  const pagingRequest = paging.request;
  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (!noMatchShownRef.current) return;
      if (event.key === 'Enter') event.preventDefault();
      if (event.key === 'ArrowDown' || (event.key === 'Enter' && !latest.current.allowCustomRef)) {
        pagingRequest();
      }
    },
    [pagingRequest]
  );

  const [popupOpen, setPopupOpen] = React.useState(false);

  const firstPageLoading = loading && branches.length === 0;
  const pagingState = React.useMemo(
    () => ({
      loading,
      loadingMore: loading && branches.length > 0,
      hasMore,
      branchCount: branches.length,
      filter,
      allowCustomRef,
      request: pagingRequest,
      requestIfArmed: paging.requestIfArmed,
      setNoMatchShown
    }),
    [
      loading,
      hasMore,
      branches.length,
      filter,
      allowCustomRef,
      pagingRequest,
      paging.requestIfArmed
    ]
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
        onInputChange={(_event, next, reason) => {
          setInputValue(next);
          if (reason === 'input') setTyped(true);
          else if (reason === 'reset' || reason === 'selectOption') setTyped(false);
        }}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onOpen={(event) => {
          setPopupOpen(true);
          // Typing into a closed field opens it, after reporting the input.
          if (event.type !== 'change') setTyped(false);
        }}
        onClose={() => setPopupOpen(false)}
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
          // Only while open: a hidden list box left mounted would keep auto-filling.
          popper: { keepMounted: allowCustomRef && popupOpen },
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
      handleKeyDown,
      allowCustomRef,
      value,
      disabled,
      firstPageLoading,
      attachListbox,
      handleListboxScroll,
      defaultBranch,
      fieldLabel,
      unnamedDefault,
      hasMore,
      popupOpen
    ]
  );

  return (
    <PagingContext.Provider value={pagingState}>
      {field}
      {/* Outside the popup, which mounts afresh: a live region inserted with its text is not announced. */}
      <VisuallyHidden role="status" aria-live="polite">
        {noMatchShown ? noMatchMessage(loading, hasMore, allowCustomRef) : ''}
      </VisuallyHidden>
    </PagingContext.Provider>
  );
}

export default GitHubRefPicker;
