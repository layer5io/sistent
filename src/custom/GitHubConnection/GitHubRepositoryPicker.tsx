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
import { isScrolledToEnd } from './loadMore';

export interface GitHubRepositoryPickerProps {
  /** Repositories the installation can see, as `owner/name`, in display order. */
  repositories: readonly string[];
  /** The selected repositories. Controlled: the host owns the selection. */
  selected: readonly string[];
  onChange: (selected: string[]) => void;
  /** A page of repositories is being fetched. */
  loading?: boolean;
  /** More pages exist; scrolling to the end of the list calls `onLoadMore`. */
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
 * more repositories as the menu is scrolled.
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
    onChange(typeof value === 'string' ? value.split(',') : (value as string[]));
  };

  const handleScroll = (event: React.UIEvent<HTMLElement>) => {
    if (onLoadMore && hasMore && !loading && isScrolledToEnd(event.currentTarget)) {
      onLoadMore();
    }
  };

  return (
    <FormControl fullWidth disabled={disabled} data-testid="github-repository-picker">
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        multiple
        id={fieldId}
        labelId={labelId}
        label={label}
        value={[...selected]}
        onChange={handleChange}
        renderValue={(value) => (value as string[]).join(', ')}
        MenuProps={{
          slotProps: {
            paper: {
              onScroll: handleScroll,
              style: { maxHeight: MENU_MAX_HEIGHT }
            }
          }
        }}
      >
        {repositories.map((repository) => (
          <MenuItem key={repository} value={repository}>
            <Checkbox checked={selected.includes(repository)} />
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
