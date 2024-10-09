import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useCallback, useState } from 'react';
import { Box, Drawer, Typography } from '../../base';
import { CloseIcon } from '../../icons';
import { CULTURED, DARK_SLATE_GRAY, WHITE } from '../../theme';
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
 * @param {Array} lists - An array of filter sections and it's options lists.
 */
const CatalogFilterSidebar: React.FC<CatalogFilterSidebarProps> = ({
  lists,
  setData,
  value = {}
}) => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const handleDrawerOpen = useCallback(() => {
    setOpenDrawer(true);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setOpenDrawer(false);
  }, []);

  const styleProps: StyleProps = {
    backgroundColor: WHITE,
    sectionTitleBackgroundColor: CULTURED
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
          <FilterAltIcon height="20" width="20" fill={WHITE} />
          <FilterText>Filters</FilterText>
        </FilterButton>

        <Drawer anchor="bottom" open={openDrawer} variant="temporary" onClose={handleDrawerClose}>
          <Box sx={{ overflowY: 'hidden', height: '90vh' }}>
            <FiltersDrawerHeader>
              <Typography variant="h6" sx={{ color: WHITE }} component="div">
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
                background: WHITE
              }}
            >
              <CatalogFilterSidebarState
                lists={lists}
                onApplyFilters={setData}
                value={value}
                styleProps={styleProps}
              />
            </Box>
            <Box sx={{ backgroundColor: DARK_SLATE_GRAY, height: '5vh' }} />
          </Box>
        </Drawer>
      </FilterDrawerDiv>
    </>
  );
};

export default CatalogFilterSidebar;
