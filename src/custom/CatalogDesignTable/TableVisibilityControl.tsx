import React, { Dispatch, SetStateAction } from 'react';
import { CustomColumnVisibilityControl } from '../CustomColumnVisibilityControl';
import { CustomColumn } from '../CustomColumnVisibilityControl/CustomColumnVisibilityControl';
import { ViewSwitch } from './ViewSwitch';

type TypeView = 'grid' | 'table';

interface TableVisibilityControlProps {
  viewType: TypeView;
  setViewType: (view: TypeView) => void;
  filteredColumns: CustomColumn[];
  columnVisibility: Record<string, boolean>;
  setColumnVisibility: Dispatch<SetStateAction<Record<string, boolean>>>;
  viewSwitchDisabled?: boolean;
}

export const TableVisibilityControl: React.FC<TableVisibilityControlProps> = ({
  viewType,
  setViewType,
  filteredColumns,
  columnVisibility,
  setColumnVisibility,
  viewSwitchDisabled = false
}) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {viewType !== 'grid' && (
        <CustomColumnVisibilityControl
          columns={filteredColumns}
          customToolsProps={{
            columnVisibility,
            setColumnVisibility
          }}
          id={'catalog-table'}
          style={{ zIndex: 9999 }}
        />
      )}
      <ViewSwitch view={viewType} changeView={setViewType} disabled={viewSwitchDisabled} />
    </div>
  );
};
