/* eslint-disable @typescript-eslint/no-explicit-any */
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '../../base';
import { DesignIcon } from '../../icons';
import { publishCatalogItemSchema } from '../../schemas';
import { SistentThemeProvider } from '../../theme';
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
import AssignmentModal from './AssignmentModal';
import EditButton from './EditButton';
import useDesignAssignment from './hooks/useDesignAssignment';
import useViewAssignment from './hooks/useViewsAssignment';
import { TableHeader, TableRightActionHeader } from './styles';

export interface DesignTableProps {
  workspaceId: string;
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
  getDownloadUrl: (id: string) => string;
  handlePublish: (publishModal: PublishModalState, data: any) => void;
  publishModalHandler: any;
  handleUnpublishModal: (design: Pattern, modalRef: React.RefObject<any>) => void;
  handleBulkUnpublishModal: (
    selected: any,
    designs: Pattern[],
    modalRef: React.RefObject<any>
  ) => void;
  handleShowDetails: (designId: string, designName: string) => void;
  GenericRJSFModal: any;
  isDownloadAllowed: boolean;
  isCopyLinkAllowed: boolean;
  isDeleteAllowed: boolean;
  isPublishAllowed: boolean;
  isUnpublishAllowed: boolean;
  isAssignAllowed: boolean;
  isRemoveAllowed: boolean;
  setDesignSearch: (value: string) => void;
  showViews: boolean;
  useGetWorkspaceViewsQuery: any;
  useAssignviewToWorkspaceMutation: any;
  useUnassignviewFromWorkspaceMutation: any;
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
  handleShowDetails,
  handleUnpublishModal,
  handleWorkspaceDesignDeleteModal,
  getDownloadUrl,
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
  useGetWorkspaceViewsQuery,
  setDesignSearch,
  showViews,
  useAssignviewToWorkspaceMutation,
  useUnassignviewFromWorkspaceMutation
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

  const columns = createDesignsColumnsConfig({
    handleDeleteModal: (design) => () => handleWorkspaceDesignDeleteModal(design.id, workspaceId),
    handlePublishModal,
    handleUnpublishModal: (design) => () => handleUnpublishModal(design, modalRef),
    handleCopyUrl,
    handleClone,
    handleShowDetails,
    getDownloadUrl,
    isCopyLinkAllowed,
    isDeleteAllowed,
    isDownloadAllowed,
    isPublishAllowed,
    isUnpublishAllowed,
    isFromWorkspaceTable: true,
    isRemoveAllowed
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

  const [expanded, setExpanded] = useState<boolean>(true);
  const handleAccordionChange = () => {
    setExpanded(!expanded);
  };

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
    useGetDesignsOfWorkspaceQuery: useGetWorkspaceDesignsQuery
  });

  const viewsAssignment = useViewAssignment({
    workspaceId,
    useAssignviewToWorkspaceMutation,
    useUnassignviewFromWorkspaceMutation,
    useGetviewsOfWorkspaceQuery: useGetWorkspaceViewsQuery
  });

  const tableHeaderContent = (
    <TableHeader>
      <Typography variant="h6" fontWeight={'bold'}>
        Assigned Designs
      </Typography>
      <TableRightActionHeader>
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
        <EditButton onClick={designAssignment.handleAssignModal} disabled={!isAssignAllowed} />
      </TableRightActionHeader>
    </TableHeader>
  );

  return (
    <SistentThemeProvider>
      <Accordion expanded={expanded} onChange={handleAccordionChange} style={{ margin: 0 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            backgroundColor: 'background.paper'
          }}
        >
          {tableHeaderContent}
        </AccordionSummary>
        <AccordionDetails style={{ padding: 0 }}>
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
        </AccordionDetails>
      </Accordion>
      <AssignmentModal
        open={designAssignment.assignModal}
        onClose={designAssignment.handleAssignModalClose}
        title={`Assign Designs to ${workspaceName}`}
        headerIcon={<DesignIcon height="40" width="40" secondaryFill="white" />}
        name="Designs"
        assignableData={designAssignment.data}
        handleAssignedData={designAssignment.handleAssignData}
        originalAssignedData={designAssignment.workspaceData}
        emptyStateIcon={<DesignIcon height="5rem" width="5rem" secondaryFill={'#808080'} />}
        handleAssignablePage={designAssignment.handleAssignablePage}
        handleAssignedPage={designAssignment.handleAssignedPage}
        originalLeftCount={designAssignment.data?.length}
        originalRightCount={designAssignment.assignedItems?.length}
        onAssign={designAssignment.handleAssign || viewsAssignment.handleAssign}
        disableTransfer={designAssignment.disableTransferButton}
        helpText={`Assign Designs to ${workspaceName}`}
        isAssignAllowed={isAssignAllowed}
        isRemoveAllowed={isRemoveAllowed}
        showViews={showViews}
        nameViews="Views"
        assignableViewsData={viewsAssignment.data}
        handleAssignedViewsData={viewsAssignment.handleAssignData}
        originalAssignedViewsData={viewsAssignment.workspaceData}
        emptyStateViewsIcon={<DesignIcon height="5rem" width="5rem" secondaryFill={'#808080'} />}
        handleAssignableViewsPage={viewsAssignment.handleAssignablePage}
        handleAssignedViewsPage={viewsAssignment.handleAssignedPage}
        originalLeftViewsCount={viewsAssignment.data?.length}
        originalRightViewsCount={viewsAssignment.assignedItems?.length}
        onAssignViews={viewsAssignment.handleAssign}
        disableTransferViews={viewsAssignment.disableTransferButton}
        // isAssignAllowedViews={isAssignAllowed}
        // isRemoveAllowedViews={isRemoveAllowed}
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
    </SistentThemeProvider>
  );
};

export default DesignTable;
