import React from 'react';
import { CircularProgress } from '../../base';
import {
  CopyIcon,
  DeleteIcon,
  EditIcon,
  KanvasIcon,
  PublishIcon,
  ShareLineIcon
} from '../../icons';
import Download from '../../icons/Download/Download';
import { charcoal, useTheme } from '../../theme';
import { Pattern } from '../CustomCatalog/CustomCard';
import { downloadFilter, downloadYaml } from './helper';
import { ActionButton, StyledActionWrapper, UnpublishAction } from './style';
import { RESOURCE_TYPES } from './types';

interface ActionButtonsProps {
  actionItems: boolean;
  details: Pattern;
  type: string;
  isCloneLoading: boolean;
  handleClone: (name: string, id: string) => void;
  handleUnpublish: () => void;
  isCloneDisabled: boolean;
  showUnpublishAction: boolean;
  showOpenPlaygroundAction: boolean;
  onOpenPlaygroundClick: (designId: string, name: string) => void;
  showInfoAction?: boolean;
  handleInfoClick?: () => void;
  showShareAction?: boolean;
  handleShare: () => void;
  showDeleteAction?: boolean;
  handleDelete: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  actionItems,
  details,
  type,
  isCloneLoading,
  handleClone,
  isCloneDisabled,
  showUnpublishAction,
  handleUnpublish,
  showOpenPlaygroundAction,
  onOpenPlaygroundClick,
  showInfoAction,
  handleInfoClick,
  showShareAction,
  handleShare,
  showDeleteAction,
  handleDelete
}) => {
  const cleanedType = type.replace('my-', '').replace(/s$/, '');
  const theme = useTheme();
  return (
    <StyledActionWrapper>
      {showOpenPlaygroundAction && (
        <ActionButton
          sx={{
            borderRadius: '0.2rem',
            backgroundColor: theme.palette.background.cta?.default,
            color: theme.palette.text.inverse,
            gap: '10px',
            width: '100%'
          }}
          onClick={() => onOpenPlaygroundClick(details.id, details.name)}
        >
          <KanvasIcon
            width={24}
            height={24}
            primaryFill={theme.palette.icon.inverse}
            fill={theme.palette.icon.default}
          />
          Open in Playground
        </ActionButton>
      )}
      {actionItems && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '0.75rem',
            width: '100%'
          }}
        >
          <ActionButton
            sx={{
              borderRadius: '0.2rem',
              backgroundColor: 'transparent',
              border: `1px solid ${theme.palette.border.normal}`,
              gap: '10px',
              color: theme.palette.text.default
            }}
            onClick={() =>
              cleanedType === RESOURCE_TYPES.FILTERS
                ? downloadFilter(details.id, details.name)
                : downloadYaml(details.pattern_file, details.name)
            }
          >
            <Download width={24} height={24} fill={theme.palette.icon.default} />
            Download
          </ActionButton>

          {cleanedType !== RESOURCE_TYPES.FILTERS && (
            <ActionButton
              sx={{
                borderRadius: '0.2rem',
                gap: '10px',
                color: theme.palette.text.default,
                backgroundColor: 'transparent',
                border: `1px solid ${theme.palette.border.normal}`
              }}
              onClick={() => handleClone(details?.name, details?.id)}
              disabled={isCloneDisabled}
            >
              {isCloneLoading ? (
                <CircularProgress size={24} color={'inherit'} />
              ) : (
                <>
                  <CopyIcon width={24} height={24} fill={theme.palette.icon.default} />
                  Clone
                </>
              )}
            </ActionButton>
          )}
        </div>
      )}

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '0.75rem',
          width: '100%'
        }}
      >
        {showInfoAction && (
          <ActionButton
            sx={{
              borderRadius: '0.2rem',
              backgroundColor: 'transparent',
              border: `1px solid ${theme.palette.border.normal}`,
              gap: '10px',
              color: charcoal[10]
            }}
            onClick={handleInfoClick}
          >
            <EditIcon width={24} height={24} fill={theme.palette.icon.default} />
            Edit
          </ActionButton>
        )}
        {showShareAction && (
          <ActionButton
            sx={{
              borderRadius: '0.2rem',
              backgroundColor: 'transparent',
              border: `1px solid ${theme.palette.border.normal}`,
              gap: '10px',
              color: charcoal[10]
            }}
            onClick={handleShare}
          >
            <ShareLineIcon width="24" height="24" fill={theme.palette.icon.default} />
            Share
          </ActionButton>
        )}
        {showDeleteAction && (
          <UnpublishAction
            sx={{
              borderRadius: '0.2rem',
              gap: '10px'
            }}
            onClick={handleDelete}
          >
            <DeleteIcon width={24} height={24} fill={charcoal[100]} />
            Delete
          </UnpublishAction>
        )}
      </div>

      {showUnpublishAction && (
        <UnpublishAction
          sx={{
            borderRadius: '0.2rem',
            gap: '10px'
          }}
          onClick={handleUnpublish}
        >
          <PublishIcon width={24} height={24} fill={charcoal[100]} />
          Unpublish
        </UnpublishAction>
      )}
    </StyledActionWrapper>
  );
};

export default ActionButtons;
