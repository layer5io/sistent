import React from 'react';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import { iconMedium } from '../../constants/iconsSizes';

export interface CatalogFilterProps {
  catalogVisibility: boolean;
  handleCatalogVisibility: () => void;
  hideCatalog?: boolean;
  classes?: string;
}

function CatalogFilter({
  catalogVisibility,
  handleCatalogVisibility,
  hideCatalog = false,
  classes = ''
}: CatalogFilterProps): React.JSX.Element {
  return (
    <>
      {!hideCatalog && ( // In application we  don't have catalog, hence this check
        <Button
          style={{
            // marginBottom : '0.2rem',
            alignItems: 'center',
            marginLeft: '-0.6rem'
          }}
          size="large"
          onClick={handleCatalogVisibility}
          variant="contained"
          color="primary"
        >
          {catalogVisibility ? (
            <VisibilityIcon style={iconMedium} />
          ) : (
            <VisibilityOffIcon style={iconMedium} />
          )}
          <span className={classes} style={{ marginLeft: '4px' }}>
            {' '}
            Catalog
          </span>
        </Button>
      )}
    </>
  );
}

export default CatalogFilter;
