/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '../../base';
import { DesignIcon } from '../../icons';
import { publishCatalogItemSchema } from '../../schemas';
import { useTheme } from '../../theme';
import {
  CatalogDesignsTable,
  createDesignsColumnsConfig,
  designColumnsColViews
} from '../CatalogDesignTable';
import { Pattern } from '../CustomCatalog/CustomCard';
import { CustomColumnVisibilityControl } from '../CustomColumnVisibilityControl';
import { useWindowDimensions } from '../Helpers/Dimension';
import { updateVisibleColumns } from '../Helpers/ResponsiveColumns/responsive-coulmns.tsx/responsive-column';
import PromptComponent from '../Prompt';
import SearchBar from '../SearchBar';
import { VIEW_VISIBILITY } from '../VisibilityChipMenu/VisibilityChipMenu';
import AssignmentModal from './AssignmentModal';
import useDesignAssignment from './hooks/useDesignAssignment';
import { L5EditIcon, TableHeader, TableRightActionHeader } from './styles';
export interface DesignTableProps {
  workspaceId: string;
  isKanvasEnabled: boolean;
  workspaceName: string;
  designsOfWorkspace: any;
  meshModelModelsData: any;
  useGetWorkspaceDesignsQuery: any;
  useAssignDesignToWorkspaceMutation: any;
  useUnassignDesignFromWorkspaceMutation: any;
  handleCopyUrl: (type: string, name: string, id: string) => void;
  handleClone: (name: string, id: string) => void;
  handleWorkspaceDesignDeleteModal: (designId: string, workspaceId: string) => void;
  handleBulkWorkspaceDesignDeleteModal: (
    designs: Pattern[],
    modalRef: React.RefObject<any>,
    workspaceName: string,
    workspaceId: string
  ) => void;
  handlePublish: (publishModal: PublishModalState, data: any) => void;
  publishModalHandler: any;
  handleUnpublishModal: (design: Pattern, modalRef: React.RefObject<any>) => void;
  handleDownload?: (design: Pattern) => void;
  handleBulkUnpublishModal: (
    selected: any,
    designs: Pattern[],
    modalRef: React.RefObject<any>
  ) => void;
  handleShowDetails: (designId: string, designName: string) => void;
  getDownloadUrl?: (id: string) => string;
  GenericRJSFModal: any;
  isDownloadAllowed: boolean;
  isCopyLinkAllowed: boolean;
  isDeleteAllowed: boolean;
  isPublishAllowed: boolean;
  isUnpublishAllowed: boolean;
  isAssignAllowed: boolean;
  isRemoveAllowed: boolean;
  setDesignSearch: (value: string) => void;
  handleOpenInDesigner?: (designId: string, designName: string) => void;
  showPlaygroundActions?: boolean;
  handleVisibilityChange?: (id: string, visibility: VIEW_VISIBILITY) => void;
  currentUserId?: string;
}

export interface PublishModalState {
  open: boolean;
  pattern: Partial<Pattern>;
}

export interface TableColumn {
  name: string;
  label: string;
  [key: string]: any;
}

const DesignTable: React.FC<DesignTableProps> = ({
  workspaceId,
  workspaceName,
  designsOfWorkspace,
  meshModelModelsData,
  handleBulkUnpublishModal,
  handleBulkWorkspaceDesignDeleteModal,
  handleClone,
  handleCopyUrl,
  handlePublish,
  handleDownload,
  getDownloadUrl,
  handleShowDetails,
  handleUnpublishModal,
  handleWorkspaceDesignDeleteModal,
  publishModalHandler,
  isCopyLinkAllowed,
  isDeleteAllowed,
  isDownloadAllowed,
  isPublishAllowed,
  isUnpublishAllowed,
  useAssignDesignToWorkspaceMutation,
  useUnassignDesignFromWorkspaceMutation,
  GenericRJSFModal,
  isAssignAllowed,
  isRemoveAllowed,
  useGetWorkspaceDesignsQuery,
  setDesignSearch,
  handleOpenInDesigner,
  showPlaygroundActions = true,
  handleVisibilityChange,
  currentUserId
}) => {
  const [publishModal, setPublishModal] = useState<PublishModalState>({
    open: false,
    pattern: {}
  });
  const modalRef = useRef(null);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [sortOrder, setSortOrder] = useState<string>('updated_at desc');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const handlePublishModal = (pattern: Pattern): void => {
    const result = publishModalHandler(pattern);
    setPublishModal({
      open: true,
      pattern: result
    });
  };
  const theme = useTheme();
  const columns = createDesignsColumnsConfig({
    handleDeleteModal: (design) => () => handleWorkspaceDesignDeleteModal(design.id, workspaceId),
    handlePublishModal,
    handleUnpublishModal: (design) => () => handleUnpublishModal(design, modalRef),
    handleCopyUrl,
    handleClone,
    handleShowDetails,
    handleDownload,
    getDownloadUrl,
    isCopyLinkAllowed,
    isDeleteAllowed,
    isDownloadAllowed,
    isPublishAllowed,
    isUnpublishAllowed,
    isFromWorkspaceTable: true,
    isRemoveAllowed,
    theme,
    handleOpenInDesigner,
    showPlaygroundActions,
    handleVisibilityChange,
    currentUserId
  });

  const [publishSchema, setPublishSchema] = useState<{
    rjsfSchema: any;
    uiSchema: any;
  }>({
    rjsfSchema: {},
    uiSchema: {}
  });

  const { width } = useWindowDimensions();
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>(() => {
    const showCols = updateVisibleColumns(designColumnsColViews, width);
    const initialVisibility: Record<string, boolean> = {};
    columns.forEach((col) => {
      initialVisibility[col.name] = showCols[col.name];
    });
    return initialVisibility;
  });

  useEffect(() => {
    const fetchSchema = async () => {
      const modelNames = _.uniq(
        meshModelModelsData?.models?.map((model: any) => model.display_name)
      );
      const modifiedSchema = _.set(
        _.cloneDeep(publishCatalogItemSchema),
        'properties.compatibility.items.enum',
        modelNames
      );
      setPublishSchema({
        rjsfSchema: modifiedSchema,
        uiSchema: publishCatalogItemSchema
      });
    };
    fetchSchema();
  }, [meshModelModelsData]);

  const designAssignment = useDesignAssignment({
    workspaceId,
    useAssignDesignToWorkspaceMutation,
    useUnassignDesignFromWorkspaceMutation,
    useGetDesignsOfWorkspaceQuery: useGetWorkspaceDesignsQuery,
    isDesignsVisible: isAssignAllowed || isRemoveAllowed
  });

  const tableHeaderContent = (
    <TableHeader style={{ padding: '1rem' }}>
      <Box display={'flex'} alignItems="center" gap={1} width="100%">
        <DesignIcon height="1.5rem" width="1.5rem" />
        <Typography variant="body1" fontWeight={'bold'}>
          Assigned Designs
        </Typography>
      </Box>
      <TableRightActionHeader style={{ marginRight: '0rem' }}>
        <SearchBar
          onSearch={(value) => {
            setDesignSearch(value);
          }}
          onClear={() => {
            setDesignSearch('');
          }}
          expanded={isSearchExpanded}
          setExpanded={setIsSearchExpanded}
          placeholder="Search designs..."
        />
        <CustomColumnVisibilityControl
          columns={columns}
          customToolsProps={{
            columnVisibility,
            setColumnVisibility
          }}
          id={'catalog-table'}
        />
        <L5EditIcon
          onClick={designAssignment.handleAssignModal}
          disabled={!isAssignAllowed}
          title="Assign Designs"
        />
      </TableRightActionHeader>
    </TableHeader>
  );

  return (
    <>
      {tableHeaderContent}
      <CatalogDesignsTable
        patterns={designsOfWorkspace?.designs || []}
        totalCount={designsOfWorkspace?.total_count}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        pageSize={pageSize}
        setPageSize={setPageSize}
        page={page}
        setPage={setPage}
        columnVisibility={columnVisibility}
        colViews={designColumnsColViews}
        columns={columns}
        handleBulkpatternsDataUnpublishModal={handleBulkUnpublishModal}
        handleBulkDeleteModal={(designs, modalRef) =>
          handleBulkWorkspaceDesignDeleteModal(designs, modalRef, workspaceName, workspaceId)
        }
        filter={'my-designs'}
        setSearch={setDesignSearch}
      />
      <AssignmentModal
        open={designAssignment.assignModal}
        onClose={designAssignment.handleAssignModalClose}
        title={`Assign Designs to ${workspaceName}`}
        headerIcon={<DesignIcon height="40" width="40" />}
        name="Designs"
        assignableData={designAssignment.data}
        handleAssignedData={designAssignment.handleAssignData}
        originalAssignedData={designAssignment.workspaceData}
        emptyStateIcon={<DesignIcon height="5rem" width="5rem" secondaryFill={'#808080'} />}
        handleAssignablePage={designAssignment.handleAssignablePage}
        handleAssignedPage={designAssignment.handleAssignedPage}
        originalLeftCount={designAssignment.data?.length || 0}
        originalRightCount={designAssignment.assignedItems?.length || 0}
        onAssign={designAssignment.handleAssign}
        disableTransfer={designAssignment.disableTransferButton}
        helpText={`Assign Designs to ${workspaceName}`}
        isAssignAllowed={isAssignAllowed}
        isRemoveAllowed={isRemoveAllowed}
        showViews={false}
      />
      <GenericRJSFModal
        open={publishModal.open}
        handleClose={() => setPublishModal({ open: false, pattern: {} })}
        schema={publishSchema?.rjsfSchema}
        uiSchema={publishSchema?.uiSchema}
        handleSubmit={(data: any) => handlePublish(publishModal, data)}
        title={`Publish ${publishModal?.pattern?.name}`}
        buttonTitle="Publish"
      />
      <PromptComponent ref={modalRef} />
    </>
  );
};

export default DesignTable;
