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
  isActivityOccurred?: (allItems: T[]) => boolean;
  disableTransferButton: boolean;
  assignedItems: T[];
}

export interface Workspace {
  id: string;
  name: string;
  description?: string;
  organizationId?: string;
  owner?: string;
  metadata?: Record<string, string>;
  createdAt: string;
  updatedAt: string;
  deletedAt: {
    Valid: boolean;
  };
}

export interface Environment {
  id: string;
  name: string;
  description?: string;
  organizationId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Team {
  id: string;
  name: string;
  team_id: string;
  description?: string;
  team_name: string;
  deletedAt: {
    Valid: boolean;
  };
}
