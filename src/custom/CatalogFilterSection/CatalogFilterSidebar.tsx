import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useTheme } from '@mui/material/styles';
import { useCallback, useState } from 'react';
import { Box, Drawer, Typography } from '../../base';
import { CloseIcon } from '../../icons';
import { darkTeal } from '../../theme';
import { CloseBtn } from '../Modal';
import CatalogFilterSidebarState from './CatalogFilterSidebarState';
import {
  FilterButton,
  FilterDrawerDiv,
  FilterText,
  FiltersCardDiv,
  FiltersDrawerHeader
} from './style';

export interface FilterOption {
  value: string;
  label: string;
  totalCount?: number;
  description?: string;
  Icon?: React.ComponentType<{
    width: string;
    height: string;
  }>;
}

export interface FilterList {
  filterKey: string;
  sectionDisplayName?: string;
  options: FilterOption[];
  defaultOpen?: boolean;
  isMultiSelect?: boolean;
}

export interface CatalogFilterSidebarProps {
  setData: (callback: (prevFilters: FilterValues) => FilterValues) => void;
  lists: FilterList[];
  value?: FilterValues;
}

export type FilterValues = Record<string, string | string[]>;

export interface StyleProps {
  backgroundColor?: string;
  sectionTitleBackgroundColor?: string;
}

/**
 * @function CatalogFilterSidebar
 * @description A functional component that renders the filter sidebar.
 * @param {Array} value - The data to be filtered.
 * @param {Function} setData - A function to set the filtered data.
 * @param {Array} lists - An array of filter sections and its options lists.
 */
const CatalogFilterSidebar: React.FC<CatalogFilterSidebarProps> = ({
  lists,
  setData,
  value = {}
}) => {
  const theme = useTheme(); // Get the current theme
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const handleDrawerOpen = useCallback(() => {
    setOpenDrawer(true);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setOpenDrawer(false);
  }, []);

  const styleProps: StyleProps = {
    backgroundColor:
      theme.palette.mode === 'light'
        ? theme.palette.background.default
        : theme.palette.background.secondary,
    sectionTitleBackgroundColor:
      theme.palette.mode === 'light' ? theme.palette.background.surfaces : darkTeal.main
  };

  return (
    <>
      <FiltersCardDiv styleProps={styleProps}>
        <CatalogFilterSidebarState
          lists={lists}
          onApplyFilters={setData}
          value={value}
          styleProps={styleProps}
        />
      </FiltersCardDiv>
      <FilterDrawerDiv>
        <FilterButton variant="contained" onClick={handleDrawerOpen}>
          <FilterAltIcon height="20" width="20" fill={theme.palette.text.default} />
          <FilterText>Filters</FilterText>
        </FilterButton>

        <Drawer
          anchor="bottom"
          open={openDrawer}
          variant="temporary"
          onClose={handleDrawerClose}
          style={{ zIndex: '1399' }}
        >
          <Box sx={{ overflowY: 'hidden', height: '90vh' }}>
            <FiltersDrawerHeader>
              <Typography variant="h6" sx={{ color: theme.palette.text.default }} component="div">
                Filters
              </Typography>
              <CloseBtn onClick={handleDrawerClose}>
                <CloseIcon height={'32px'} width={'32px'} />
              </CloseBtn>
            </FiltersDrawerHeader>
            <Box
              style={{
                height: '75vh',
                overflowY: 'auto',
                background: theme.palette.background.default
              }}
            >
              <CatalogFilterSidebarState
                lists={lists}
                onApplyFilters={setData}
                value={value}
                styleProps={styleProps}
              />
            </Box>
            <Box sx={{ backgroundColor: theme.palette.border.strong, height: '5vh' }} />
            {/* Use theme-aware color */}
          </Box>
        </Drawer>
      </FilterDrawerDiv>
    </>
  );
};

export default CatalogFilterSidebar;
