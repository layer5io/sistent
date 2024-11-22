export interface AssignmentHookResult<T> {
  data: T[];
  workspaceData: T[];
  assignModal: boolean;
  handleAssignModal: (e?: React.MouseEvent) => void;
  handleAssignModalClose: (e?: React.MouseEvent) => void;
  handleAssignablePage: () => void;
  handleAssignedPage: () => void;
  handleAssign: () => void;
  handleAssignData: (data: T[]) => void;
  disableTransferButton: boolean;
  assignedItems: T[];
}

export interface Workspace {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
  deleted_at: {
    Valid: boolean;
  };
}

export interface Environment {
  id: string;
  name: string;
  description?: string;
  organization_id: string;
  created_at: string;
  updated_at: string;
}

export interface ColumnVisibility {
  [key: string]: boolean;
}

export interface Team {
  id: string;
  name: string;
}
