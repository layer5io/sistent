import React from 'react';
import { CircularProgress } from '../../base';
import { CopyIcon, KanvasIcon, PublishIcon } from '../../icons';
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
  onOpenPlaygroundClick
}) => {
  const cleanedType = type.replace('my-', '').replace(/s$/, '');
  const theme = useTheme();
  return (
    <StyledActionWrapper>
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
              backgroundColor: theme.palette.background.brand?.default,
              gap: '10px',
              color: charcoal[100]
            }}
            onClick={() =>
              cleanedType === RESOURCE_TYPES.FILTERS
                ? downloadFilter(details.id, details.name)
                : downloadYaml(details.pattern_file, details.name)
            }
          >
            <Download width={24} height={24} fill={charcoal[100]} />
            Download
          </ActionButton>

          {cleanedType !== RESOURCE_TYPES.FILTERS && (
            <ActionButton
              sx={{
                borderRadius: '0.2rem',
                gap: '10px',
                color: charcoal[100],
                backgroundColor: theme.palette.background.cta?.default
              }}
              onClick={() => handleClone(details?.name, details?.id)}
              disabled={isCloneDisabled}
            >
              {isCloneLoading ? (
                <CircularProgress size={24} color={'inherit'} />
              ) : (
                <>
                  <CopyIcon width={24} height={24} fill={charcoal[100]} />
                  Clone
                </>
              )}
            </ActionButton>
          )}
        </div>
      )}
      {showOpenPlaygroundAction && (
        <ActionButton
          sx={{
            borderRadius: '0.2rem',
            backgroundColor: 'transparent',
            border: `1px solid ${theme.palette.border.normal}`,
            color: theme.palette.text.default,
            gap: '10px',
            width: '100%'
          }}
          onClick={() => onOpenPlaygroundClick(details.id, details.name)}
        >
          <KanvasIcon
            width={24}
            height={24}
            primaryFill={theme.palette.icon.default}
            fill={theme.palette.icon.default}
          />
          Open in Playground
        </ActionButton>
      )}

      {showUnpublishAction && (
        <UnpublishAction
          sx={{
            borderRadius: '0.2rem',
            gap: '10px',
            width: '100%'
          }}
          onClick={handleUnpublish}
        >
          <PublishIcon width={24} height={24} fill={charcoal[10]} />
          Unpublish
        </UnpublishAction>
      )}
    </StyledActionWrapper>
  );
};

export default ActionButtons;
