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
import AssignmentModal from './AssignmentModal';
import EditButton from './EditButton';
import useDesignAssignment from './hooks/useDesignAssignment';
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
  handlePublish: (publishModal: PublishModalState, data: any) => void;
  publishModalHandler: any;
  handleUnpublishModal: (design: Pattern, modalRef: React.RefObject<any>) => void;
  handleBulkUnpublishModal: (
    selected: any,
    designs: Pattern[],
    modalRef: React.RefObject<any>
  ) => void;
  handleShowDetails: (designId: string, designName: string) => void;
  isDownloadDisabled: boolean;
  isCopyLinkDisabled: boolean;
  isDeleteDisabled: boolean;
  isPublishDisabled: boolean;
  isUnpublishDisabled: boolean;
  GenericRJSFModal: any;
  isAssignDisabled: boolean;
  isRemoveDisabled: boolean;
}

export interface PublishModalState {
  open: boolean;
  pattern: Partial<Pattern>;
}

export interface ColumnVisibility {
  [key: string]: boolean;
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
  publishModalHandler,
  isCopyLinkDisabled,
  isDeleteDisabled,
  isDownloadDisabled,
  isPublishDisabled,
  isUnpublishDisabled,
  useAssignDesignToWorkspaceMutation,
  useUnassignDesignFromWorkspaceMutation,
  GenericRJSFModal,
  isAssignDisabled,
  isRemoveDisabled,
  useGetWorkspaceDesignsQuery
}) => {
  const [publishModal, setPublishModal] = useState<PublishModalState>({
    open: false,
    pattern: {}
  });
  const modalRef = useRef(null);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [sortOrder, setSortOrder] = useState<string>('');

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
    isDownloadDisabled,
    isCopyLinkDisabled,
    isDeleteDisabled,
    isPublishDisabled,
    isUnpublishDisabled
  });

  const [publishSchema, setPublishSchema] = useState<{
    rjsfSchema: any;
    uiSchema: any;
  }>({
    rjsfSchema: {},
    uiSchema: {}
  });

  const { width } = useWindowDimensions();
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>(() => {
    const showCols = updateVisibleColumns(designColumnsColViews, width);
    const initialVisibility: ColumnVisibility = {};
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

  const {
    disableTransferButton,
    assignModal,
    handleAssignModalClose,
    handleAssignModal,
    assignedItems,
    data,
    workspaceData,
    handleAssignablePage,
    handleAssignedPage,
    handleAssign,
    handleAssignData
  } = useDesignAssignment({
    workspaceId,
    useAssignDesignToWorkspaceMutation,
    useUnassignDesignFromWorkspaceMutation,
    useGetDesignsOfWorkspaceQuery: useGetWorkspaceDesignsQuery
  });

  const tableHeaderContent = (
    <TableHeader>
      <Typography variant="h6" fontWeight={'bold'}>
        Assigned Designs
      </Typography>
      <TableRightActionHeader>
        <CustomColumnVisibilityControl
          columns={columns}
          customToolsProps={{
            columnVisibility,
            setColumnVisibility
          }}
          id={'catalog-table'}
        />
        <EditButton onClick={handleAssignModal} disabled={!isAssignDisabled} />
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
          />
        </AccordionDetails>
      </Accordion>
      <AssignmentModal
        open={assignModal}
        onClose={handleAssignModalClose}
        title={`Assign Designs to ${workspaceName}`}
        headerIcon={<DesignIcon height="40" width="40" secondaryFill="white" />}
        name="Designs"
        assignableData={data}
        handleAssignedData={handleAssignData}
        originalAssignedData={workspaceData}
        emptyStateIcon={<DesignIcon height="5rem" width="5rem" secondaryFill={'#808080'} />}
        handleAssignablePage={handleAssignablePage}
        handleAssignedPage={handleAssignedPage}
        originalLeftCount={data?.length}
        originalRightCount={assignedItems?.length}
        onAssign={handleAssign}
        disableTransfer={disableTransferButton}
        helpText={`Assign Designs to ${workspaceName}`}
        isAssignDisabled={isAssignDisabled}
        isRemoveDisabled={isRemoveDisabled}
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
