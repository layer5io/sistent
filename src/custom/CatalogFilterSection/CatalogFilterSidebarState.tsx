import { useCallback, useState } from 'react';
import {
  CatalogFilterSidebarProps,
  FilterListType,
  FilterValues,
  StyleProps
} from './CatalogFilterSidebar';
import FilterSection from './FilterSection';

/**
 * @component CatalogFilterSidebarState
 * @description A functional component that manages the filter state.
 * @param {Array} lists - An array of filter sections and its options lists.
 * @param {Function} onApplyFilters - A function to apply the filters.
 * @param {Object} value - The selected filters.
 * @param {Object} styleProps - The style properties for the component.
 */
const CatalogFilterSidebarState: React.FC<{
  lists: FilterListType[];
  onApplyFilters: CatalogFilterSidebarProps['setData'];
  value: FilterValues;
  styleProps: StyleProps;
}> = ({ lists, onApplyFilters, value, styleProps }) => {
  // Generate initial state with all sections open by default
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => {
    const initialOpenSections: Record<string, boolean> = {};
    lists.forEach((list) => {
      initialOpenSections[list.filterKey] = !!list.defaultOpen;
    });
    return initialOpenSections;
  });

  /**
   * @function handleSectionToggle
   * @description Handles the section toggle event.
   * @param {string} filterKey - The name of the filter section.
   */
  const handleSectionToggle = useCallback((filterKey: string) => {
    setOpenSections((prevOpenSections) => ({
      ...prevOpenSections,
      [filterKey]: !prevOpenSections[filterKey]
    }));
  }, []);

  /**
   * @function handleCheckboxChange
   * @description Handles the checkbox change event.
   * @param {string} filterKey - The name of the filter section.
   * @param {string} value - The value of the checkbox.
   * @param {boolean} checked - The checked state of the checkbox.
   */
  const handleCheckboxChange = useCallback(
    (filterKey: string, value: string, checked: boolean) => {
      onApplyFilters((prevFilters) => {
        const updatedFilters = { ...prevFilters };
        const filterList = lists.find((list) => list.filterKey === filterKey);

        // default is multi select
        if (filterList?.isMultiSelect !== false) {
          let currentValues = updatedFilters[filterKey] as string[] | undefined;

          if (!Array.isArray(currentValues)) {
            currentValues = currentValues ? [currentValues as string] : []; // convert to array;
          }

          updatedFilters[filterKey] = checked
            ? [...currentValues, value]
            : currentValues.filter((item) => item !== value);
        } else {
          updatedFilters[filterKey] = checked ? value : '';
        }

        return updatedFilters;
      });
    },
    [lists, onApplyFilters]
  );

  return (
    <>
      {lists.map((list) => {
        if (list.customComponent) {
          return (
            <FilterSection
              key={list.filterKey}
              filterKey={list.filterKey}
              filters={value}
              sectionDisplayName={list.sectionDisplayName}
              onSectionToggle={handleSectionToggle}
              styleProps={styleProps}
              openSections={openSections}
              customComponent={list.customComponent}
            />
          );
        }

        return (
          <FilterSection
            key={list.filterKey}
            filterKey={list.filterKey}
            sectionDisplayName={list.sectionDisplayName}
            options={list.options}
            filters={value}
            openSections={openSections}
            onCheckboxChange={handleCheckboxChange}
            onSectionToggle={handleSectionToggle}
            styleProps={styleProps}
          />
        );
      })}
    </>
  );
};

export default CatalogFilterSidebarState;
