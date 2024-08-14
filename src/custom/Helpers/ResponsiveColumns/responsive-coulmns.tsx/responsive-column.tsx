// colViews screen size reference
/*
  na: Not visible at any screen width
  xs: width < 585,
  s: width > 585 && width < 690,
  m: width > 690 && width < 775,
  l: width > 775 && width < 915,
  xl: width > 915 && width < 1140
  All columns except "na" are visible for width > 1140
*/

export interface ColView {
  0: string; // column name
  1: 'na' | 'xs' | 's' | 'm' | 'l' | 'xl'; // screen size
}

export const updateVisibleColumns = (
  colViews: ColView[],
  width: number
): Record<string, boolean> => {
  // showCols object contains key value pairs that represent whether a column is visible or hidden.
  // i.e, Here, key = column name, and value = true/false where true means visible and false means hidden
  const showCols: Record<string, boolean> = {};

  // colViews is a 2D array where each element is an array of 2 elements namely,
  // column name and the screen size till which they are visible
  colViews.forEach((col) => {
    // Hide the columns for any screen size
    if (col[1] === 'na') {
      showCols[col[0]] = false;
    } else if (width > 1140) {
      // Display all columns above width 1140
      showCols[col[0]] = true;
    } else if (width >= 915 && width < 1140) {
      if (['xs', 's', 'm', 'l', 'xl'].includes(col[1])) {
        showCols[col[0]] = true;
      } else {
        showCols[col[0]] = false;
      }
    } else if (width >= 775 && width < 915) {
      if (['xs', 's', 'm', 'l'].includes(col[1])) {
        showCols[col[0]] = true;
      } else {
        showCols[col[0]] = false;
      }
    } else if (width >= 690 && width < 775) {
      if (['xs', 's', 'm'].includes(col[1])) {
        showCols[col[0]] = true;
      } else {
        showCols[col[0]] = false;
      }
    } else if (width >= 585 && width < 690) {
      if (['xs', 's'].includes(col[1])) {
        showCols[col[0]] = true;
      } else {
        showCols[col[0]] = false;
      }
    } else if (width < 585) {
      if (col[1] === 'xs') {
        showCols[col[0]] = true;
      } else {
        showCols[col[0]] = false;
      }
    }
  });

  return showCols;
};
