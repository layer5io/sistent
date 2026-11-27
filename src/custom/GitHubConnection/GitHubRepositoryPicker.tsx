import type { SelectChangeEvent } from '@mui/material';
import React from 'react';
import {
  Box,
  Checkbox,
  CircularProgress,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select
} from '../../base';
import { useLoadMore } from './loadMore';

export interface GitHubRepositoryPickerProps {
  /** Repositories the installation can see, as `owner/name`, in display order. */
  repositories: readonly string[];
  /**
   * The selected repositories. Controlled: the host owns the selection. With
   * `singleSelect` it holds at most one entry.
   */
  selected: readonly string[];
  /** Receives the new selection; with `singleSelect`, always `[repository]`. */
  onChange: (selected: string[]) => void;
  /**
   * Pick exactly one repository: a plain single-value list without checkboxes,
   * for a flow that binds one repository (Cloud's remap of a design's source).
   */
  singleSelect?: boolean;
  /** A page of repositories is being fetched. */
  loading?: boolean;
  /**
   * More pages exist. `onLoadMore` is called when the open menu is scrolled to
   * its end, or when it opens without filling its height.
   */
  hasMore?: boolean;
  /** Fetch the next page. Not called while `loading` or once `hasMore` is false. */
  onLoadMore?: () => void;
  /** Field label. Defaults to "Select a repository". */
  label?: string;
  disabled?: boolean;
  /** Base id for the field and its label. Defaults to a generated id. */
  id?: string;
}

/** Cloud's menu height: about five repositories before the list scrolls. */
const MENU_MAX_HEIGHT = 224;

/**
 * The repository pick list of the "Select Repositories" step, extracted from
 * `SelectRepository` in Meshery Cloud's `stepper/stepper-content.tsx`: a
 * multi-select of `owner/name` entries with a checkbox per row that pages in
 * more repositories as the menu is scrolled. `singleSelect` turns it into a
 * one-repository pick list with the same paging.
 *
 * Purely presentational: the host fetches the pages, owns the selection, and
 * decides policy such as pre-selecting a lone repository or the repositories
 * already on a connection being reconfigured. Pair it with a
 * `GitHubConnectionNotice kind="empty"` when the installation sees nothing.
 */
export function GitHubRepositoryPicker({
  repositories,
  selected,
  onChange,
  singleSelect = false,
  loading = false,
  hasMore = false,
  onLoadMore,
  label = 'Select a repository',
  disabled = false,
  id
}: GitHubRepositoryPickerProps): JSX.Element {
  const generatedId = React.useId();
  const fieldId = id ?? `github-repository-picker-${generatedId}`;
  const labelId = `${fieldId}-label`;

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const value = event.target.value;
    if (singleSelect) {
      onChange([value as string]);
      return;
    }
    onChange(typeof value === 'string' ? value.split(',') : (value as string[]));
  };

  const current = selected[0];
  // A single-value Select must find its value among the options, but the
  // repository a host binds may sit on a page not fetched yet; list it first.
  const options =
    singleSelect && current !== undefined && !repositories.includes(current)
      ? [current, ...repositories]
      : repositories;

  const paging = useLoadMore({ hasMore, loading, onLoadMore, contentKey: repositories.length });

  return (
    <FormControl fullWidth disabled={disabled} data-testid="github-repository-picker">
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        multiple={!singleSelect}
        id={fieldId}
        labelId={labelId}
        label={label}
        value={singleSelect ? (current ?? '') : [...selected]}
        onChange={handleChange}
        renderValue={(value) => (singleSelect ? (value as string) : (value as string[]).join(', '))}
        MenuProps={{
          slotProps: {
            paper: {
              ref: paging.ref,
              onScroll: paging.onScroll,
              style: { maxHeight: MENU_MAX_HEIGHT }
            }
          }
        }}
      >
        {options.map((repository) => (
          <MenuItem key={repository} value={repository}>
            {!singleSelect && <Checkbox checked={selected.includes(repository)} />}
            <ListItemText primary={repository} sx={{ overflowWrap: 'anywhere' }} />
          </MenuItem>
        ))}
        {/* Select renders every child as an option; with no tabindex and no value it stays inert. */}
        {loading && (
          <Box
            component="li"
            aria-disabled="true"
            aria-label="Loading more repositories"
            sx={{ display: 'flex', justifyContent: 'center', py: 1 }}
          >
            <CircularProgress color="inherit" size={20} aria-hidden />
          </Box>
        )}
      </Select>
    </FormControl>
  );
}

export default GitHubRepositoryPicker;
