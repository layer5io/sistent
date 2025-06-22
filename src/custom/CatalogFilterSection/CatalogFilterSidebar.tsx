import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useTheme } from '@mui/material/styles';
import { useCallback, useState } from 'react';
import { Box, Drawer, Typography } from '../../base';
import { CloseIcon } from '../../icons';
import { darkTeal } from '../../theme';
import { darkModalGradient, lightModalGradient } from '../../theme/colors/colors';
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
  defaultOpen?: boolean;
  isMultiSelect?: boolean;
  options?: FilterOption[];
  customComponent?: React.ComponentType;
}

type FilterListWithOptions = FilterList & { options: FilterOption[]; customComponent?: never };

type FilterListWithCustomComponent = FilterList & {
  customComponent: React.ComponentType;
  options?: never;
};

export type FilterListType = FilterListWithOptions | FilterListWithCustomComponent;

export interface CatalogFilterSidebarProps {
  setData: (callback: (prevFilters: FilterValues) => FilterValues) => void;
  lists: FilterListType[];
  value?: FilterValues;
  styleProps?: StyleProps;

  /* eslint-disable @typescript-eslint/no-explicit-any */
  sx?: any;
}

export type FilterValues = Record<string, string | string[]>;

export interface StyleProps {
  backgroundColor?: string;
  sectionTitleBackgroundColor?: string;
  fontFamily?: string;
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
  value = {},
  styleProps,
  sx
}) => {
  const theme = useTheme(); // Get the current theme
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const handleDrawerOpen = useCallback(() => {
    setOpenDrawer(true);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setOpenDrawer(false);
  }, []);

  const defaultStyleProps: StyleProps = {
    backgroundColor:
      theme.palette.mode === 'light'
        ? theme.palette.background.default
        : theme.palette.background.secondary,
    sectionTitleBackgroundColor:
      theme.palette.mode === 'light' ? theme.palette.background.surfaces : darkTeal.main,
    fontFamily: theme.typography.fontFamily
  };

  const appliedStyleProps = {
    ...defaultStyleProps,
    ...styleProps
  };

  return (
    <>
      <FiltersCardDiv styleProps={appliedStyleProps}>
        <CatalogFilterSidebarState
          lists={lists}
          onApplyFilters={setData}
          value={value}
          styleProps={appliedStyleProps}
        />
      </FiltersCardDiv>
      <FilterDrawerDiv>
        <FilterButton variant="contained" onClick={handleDrawerOpen}>
          <FilterAltIcon
            style={{ height: '28px', width: '28px' }}
            fill={theme.palette.text.default}
          />
          <FilterText>Filters</FilterText>
        </FilterButton>

        <Drawer
          anchor="bottom"
          open={openDrawer}
          variant="temporary"
          onClose={handleDrawerClose}
          style={{ zIndex: '1399' }}
          sx={sx}
        >
          <Box sx={{ overflowY: 'hidden', height: '90vh' }}>
            <FiltersDrawerHeader className="filters-drawer-header">
              <Typography
                variant="h6"
                sx={{ color: theme.palette.text.constant?.white }}
                component="div"
              >
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
                background: theme.palette.background.surfaces,
                padding: '0 16px'
              }}
            >
              <CatalogFilterSidebarState
                lists={lists}
                onApplyFilters={setData}
                value={value}
                styleProps={appliedStyleProps}
              />
            </Box>
            <Box
              sx={{
                background:
                  theme.palette.mode === 'light'
                    ? lightModalGradient.fotter
                    : darkModalGradient.fotter,
                height: '5vh'
              }}
              className="filters-drawer-footer"
            />
          </Box>
        </Drawer>
      </FilterDrawerDiv>
    </>
  );
};

export default CatalogFilterSidebar;
